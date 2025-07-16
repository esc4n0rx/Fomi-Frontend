import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Carregando promoções...</p>
        </div>
      </div>
    </div>
  )
} 