// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"

// interface NdiProof {
//   proofRequestURL: string
//   threadId: string
//   deepLinkURL?: string
// }

// export function useNdiVerification(autoRedirect = false) {
//   const router = useRouter()

//   const [qrData, setQrData] = useState<NdiProof | null>(null)
//   const [isQrLoading, setIsQrLoading] = useState(false)
//   const [proofData, setProofData] = useState<Record<string, string> | null>(null)

//   /** Start NDI flow (auth + proof request) */
//   const startNdi = async () => {
//     try {
//       setIsQrLoading(true)

//       const authRes = await fetch("http://localhost:3001/api/ndi/auth", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       })
//       if (!authRes.ok) throw new Error("NDI auth failed")

//       const { access_token } = await authRes.json()
//       if (!access_token) throw new Error("Missing token")

//       const proofRes = await fetch(
//         "http://localhost:3001/api/ndi-verifier/proof-request",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       )

//       const proofResult = await proofRes.json()
//       if (!proofRes.ok) throw new Error("Proof request failed")

//       const data = {
//         proofRequestURL: proofResult.data.proofRequestURL,
//         threadId: proofResult.data.threadId,
//         deepLinkURL: proofResult.data.deepLinkURL,
//       }

//       setQrData(data)
//       sessionStorage.setItem("ndiProof", JSON.stringify(data))
//       setIsQrLoading(false)
//     } catch (err) {
//       setIsQrLoading(false)
//       console.error("NDI start failed:", err)
//     }
//   }

//   /** Poll proof result */
//   useEffect(() => {
//     if (!qrData?.threadId) return

//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3001/api/proof-result/${qrData.threadId}`
//         )

//         if (res.status === 202) return

//         const data = await res.json()

//         if (res.status === 200 && data.status === "COMPLETED") {
//           setProofData(data.attributes)
//           sessionStorage.setItem(
//             "userProofData",
//             JSON.stringify(data.attributes)
//           )

//           clearInterval(interval)

//           if (autoRedirect) {
//             router.push("/loan-application?step=1")
//           }
//         }
//       } catch (err) {
//         console.error("Polling error:", err)
//         clearInterval(interval)
//       }
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [qrData?.threadId, autoRedirect, router])

//   return {
//     startNdi,
//     qrData,
//     isQrLoading,
//     proofData,
//   }
// }
