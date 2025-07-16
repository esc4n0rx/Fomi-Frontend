"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Package, AlertTriangle, CheckCircle, Crown } from "lucide-react"
import { ProductLimits } from "@/types/auth"

interface ProductLimitsDisplayProps {
  limits: ProductLimits | null
  isLoading?: boolean
  onUpgradeClick?: () => void
}

export function ProductLimitsDisplay({
  limits,
  isLoading = false,
  onUpgradeClick
}: ProductLimitsDisplayProps) {
  if (isLoading || !limits) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'fomi_supremo':
        return <Crown className="w-4 h-4 text-yellow-500" />
      case 'fomi_duplo':
        return <Package className="w-4 h-4 text-blue-500" />
      default:
        return <Package className="w-4 h-4 text-gray-500" />
    }
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'fomi_supremo':
        return 'Fomi Supremo'
      case 'fomi_duplo':
        return 'Fomi Duplo'
      default:
        return 'Fomi Simples'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'fomi_supremo':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500'
      case 'fomi_duplo':
        return 'bg-gradient-to-r from-blue-400 to-purple-500'
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500'
    }
  }

  const isLimitReached = limits.limit > 0 && limits.current >= limits.limit
  const isNearLimit = limits.limit > 0 && limits.current >= limits.limit * 0.8
  const progressPercentage = limits.limit > 0 ? (limits.current / limits.limit) * 100 : 0

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {getPlanIcon(limits.plan)}
            Limite de Produtos
          </CardTitle>
          <Badge 
            variant={isLimitReached ? "destructive" : isNearLimit ? "secondary" : "outline"}
            className="text-xs"
          >
            {getPlanName(limits.plan)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {limits.current} / {limits.limit === -1 ? '∞' : limits.limit} produtos
              </span>
              {limits.limit > 0 && (
                <span className="text-gray-500">
                  {Math.round(progressPercentage)}%
                </span>
              )}
            </div>
            
            {limits.limit > 0 && (
              <Progress 
                value={progressPercentage} 
                className={`h-2 ${isLimitReached ? "[&>div]:bg-red-500" : isNearLimit ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`}
              />
            )}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm">
            {isLimitReached ? (
              <>
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-red-700 font-medium">Limite atingido</span>
              </>
            ) : isNearLimit ? (
              <>
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-700">Próximo do limite</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-700">Dentro do limite</span>
              </>
            )}
          </div>

          {/* Features */}
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              {limits.can_upload_images ? (
                <CheckCircle className="w-3 h-3 text-green-500" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-gray-400" />
              )}
              <span>Upload de imagens</span>
            </div>
            
            {limits.max_extra_images && limits.max_extra_images > 0 && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Até {limits.max_extra_images} imagens extras por produto</span>
              </div>
            )}
          </div>

          {/* Upgrade Message */}
          {limits.upgrade_message && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800 mb-2">
                {limits.upgrade_message}
              </p>
              {onUpgradeClick && (
                <Button 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={onUpgradeClick}
                >
                  Fazer Upgrade
                </Button>
              )}
            </div>
          )}

          {/* Plan Comparison */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Limites por plano:</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fomi Simples:</span>
                <span className="font-medium">10 produtos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fomi Duplo:</span>
                <span className="font-medium">50 produtos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fomi Supremo:</span>
                <span className="font-medium">Ilimitado</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 