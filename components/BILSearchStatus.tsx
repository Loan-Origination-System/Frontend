"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Loader2,
  CheckCircle2,
  Search,
  AlertCircle,
  QrCode,
} from "lucide-react"
import { useEffect, useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { useRouter } from "next/navigation"

interface DocumentPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProceed?: () => void
  searchStatus?: "searching" | "found" | "not_found"
}

export default function DocumentPopup({
  open,
  onOpenChange,
  onProceed,
  searchStatus = "searching",
}: DocumentPopupProps) {
  const router = useRouter()

  const [showQR, setShowQR] = useState(false)
  const [isQrLoading, setIsQrLoading] = useState(false)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [qrData, setQrData] = useState<{ proofRequestURL: string; threadId: string } | null>(null)
  const [proofCompleted, setProofCompleted] = useState(false) // <-- Success message flag

  /* ===============================
     Start NDI Proof Request
  =============================== */
  const handleUseNDI = async () => {
    try {
      setShowQR(true)
      setIsQrLoading(true)

      const authRes = await fetch("http://localhost:3001/api/ndi/auth", { method: "POST" })
      const { access_token } = await authRes.json()

      const proofRes = await fetch("http://localhost:3001/api/ndi-verifier/proof-request", {
        method: "POST",
        headers: { Authorization: `Bearer ${access_token}` },
      })

      const result = await proofRes.json()

      setQrData({
        proofRequestURL: result.data.proofRequestURL,
        threadId: result.data.threadId,
      })

      setThreadId(result.data.threadId)
      setIsQrLoading(false)
    } catch (err) {
      console.error("NDI start failed:", err)
      setIsQrLoading(false)
    }
  }

  /* ===============================
     Poll Proof Result & Auto-Close Dialog
  =============================== */
  useEffect(() => {
    if (!threadId) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/proof-result/${threadId}`)

        if (res.status === 202) return

        const data = await res.json()

        if (res.status === 200 && data.status === "COMPLETED") {
          console.log("✅ NDI USER DATA:", data.attributes)

          // Show success message
          setProofCompleted(true)

          clearInterval(interval)

          // Wait 1.5 seconds before closing
          setTimeout(() => {
            onOpenChange(false)
            if (onProceed) onProceed()
            setProofCompleted(false) // reset for next use
          }, 1500)
        }
      } catch (err) {
        console.error("Polling error:", err)
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [threadId, onOpenChange, onProceed])

  const handleFoundAction = () => {
    onOpenChange(false)
    onProceed?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-8 rounded-2xl shadow-2xl min-h-[420px] flex flex-col items-center justify-center">
        <DialogTitle className="sr-only">Verification</DialogTitle>

        <Image src="/logo.png" alt="BIL" width={90} height={90} />

        {/* ================= QR VIEW / SUCCESS ================= */}
        {proofCompleted ? (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Verification Successful!</h3>
            <p className="text-gray-600">Closing dialog...</p>
          </div>
        ) : showQR && searchStatus === "not_found" ? (
          <div className="space-y-5 text-center">
            <h3 className="text-xl font-bold">Scan with Bhutan NDI</h3>

            {isQrLoading ? (
              <p className="animate-pulse text-gray-500">Generating QR…</p>
            ) : (
              qrData && (
                <div className="p-4 bg-white rounded-xl border-4 border-green-400 shadow-lg">
                  <QRCodeCanvas value={qrData.proofRequestURL} size={260} />
                </div>
              )
            )}

            {/* Instructions */}
            <div className="space-y-2 text-gray-700 text-left">
              <p><strong>1.</strong> Open Bhutan NDI Wallet</p>
              <p><strong>2.</strong> Tap Scan and scan this QR code</p>
            </div>
          </div>
        ) : (
          <>
            {/* SEARCHING STATE */}
            {searchStatus === "searching" && (
              <div className="flex flex-col items-center justify-center py-4 space-y-5 text-center">
                <div className="relative">
                  <Loader2 className="h-16 w-16 text-[#003DA5] animate-spin" />
                  <Search className="h-6 w-6 text-[#003DA5] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Verifying Co-Borrower</h3>
                  <p className="text-sm text-gray-500 max-w-[280px] leading-relaxed">
                    Please wait while we search the BIL database for existing records...
                  </p>
                </div>
              </div>
            )}

            {/* FOUND */}
            {searchStatus === "found" && (
              <div className="flex flex-col items-center justify-center py-4 space-y-5 text-center">
                <div className="bg-green-50 p-4 rounded-full">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Record Found</h3>
                  <p className="text-sm text-gray-600 leading-relaxed px-4">
                    This co-borrower is already registered with BIL. Their information will be automatically retrieved.
                  </p>
                </div>
                <Button
                  className="w-full h-12 bg-[#003DA5] hover:bg-[#002D7A] text-white font-semibold rounded-xl transition-all"
                  onClick={handleFoundAction}
                >
                  Continue with Existing Data
                </Button>
              </div>
            )}

            {/* NOT FOUND */}
            {searchStatus === "not_found" && !showQR && (
              <div className="flex flex-col items-center justify-center py-4 space-y-5 text-center">
                <div className="bg-orange-50 p-4 rounded-full">
                  <AlertCircle className="h-12 w-12 text-orange-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">User Not Registered</h3>
                  <p className="text-sm text-gray-600 leading-relaxed px-4">
                    This user is not registered with BIL. Please continue using <span className="font-bold text-[#003DA5]">Bhutan NDI</span>.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleUseNDI}
                  className="w-full h-12 border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-semibold rounded-xl transition-all gap-2"
                >
                  <QrCode className="h-4 w-4" />
                  Continue with NDI
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
