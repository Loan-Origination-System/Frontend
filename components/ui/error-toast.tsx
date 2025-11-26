import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, XCircle, WifiOff } from "lucide-react"

interface ErrorToastProps {
  title?: string
  message: string
  type?: "error" | "warning" | "info"
}

export function ErrorToast({ title, message, type = "error" }: ErrorToastProps) {
  const Icon = type === "error" ? XCircle : type === "warning" ? AlertCircle : WifiOff
  
  return (
    <Alert variant={type === "error" ? "destructive" : "default"} className="mb-4">
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
