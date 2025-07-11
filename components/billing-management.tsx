"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBilling } from "@/hooks/useBilling";
import { CreditCard, Calendar, Download, ExternalLink, Crown, AlertTriangle } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function BillingManagement() {
  const { subscription, invoices, isLoading, openBillingPortal, cancelSubscription } = useBilling();

  // Função auxiliar para formatar datas com validação
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Data não disponível";
    
    try {
      // Tentar converter string ISO para Date
      const date = parseISO(dateString);
      
      // Verificar se a data é válida
      if (!isValid(date)) {
        console.warn("Data inválida recebida:", dateString);
        return "Data inválida";
      }
      
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (error) {
      console.error("Erro ao formatar data:", error, "Data recebida:", dateString);
      return "Erro na data";
    }
  };

  // Função auxiliar para formatar período
  const formatPeriod = (startDate: string | undefined, endDate: string | undefined): string => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);
    
    if (formattedStart === "Data não disponível" || formattedEnd === "Data não disponível") {
      return "Período não disponível";
    }
    
    if (formattedStart === "Data inválida" || formattedEnd === "Data inválida" || 
        formattedStart === "Erro na data" || formattedEnd === "Erro na data") {
      return "Período com data inválida";
    }
    
    return `${formattedStart} - ${formattedEnd}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'trialing':
        return 'bg-blue-100 text-blue-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'trialing':
        return 'Período de Teste';
      case 'canceled':
        return 'Cancelado';
      case 'past_due':
        return 'Em Atraso';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Assinatura Atual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Crown size={24} className="text-primary" />
              <CardTitle>Assinatura Atual</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {subscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg capitalize">{subscription.plano.replace('_', ' ')}</h3>
                    <p className="text-gray-600">
                      {subscription.active ? 'Assinatura ativa' : 'Assinatura inativa'}
                    </p>
                  </div>
                  <Badge className={getStatusColor(subscription.status)}>
                    {getStatusText(subscription.status)}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Período Atual</p>
                    <p className="font-medium">
                      {formatPeriod(subscription.current_period_start, subscription.current_period_end)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Próxima Cobrança</p>
                    <p className="font-medium">
                      {formatDate(subscription.current_period_end)}
                    </p>
                  </div>
                </div>

                {subscription.canceled_at && (
                  <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle size={20} className="text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Assinatura Cancelada</p>
                      <p className="text-sm text-yellow-700">
                        Cancelada em {formatDate(subscription.canceled_at)}. 
                        Você terá acesso até {formatDate(subscription.current_period_end)}.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={openBillingPortal}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink size={16} />
                    <span>Gerenciar Assinatura</span>
                  </Button>
                  
                  {subscription.active && !subscription.canceled_at && (
                    <Button
                      onClick={cancelSubscription}
                      variant="outline"
                      className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    >
                      Cancelar Assinatura
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Crown size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Plano Gratuito</h3>
                <p className="text-gray-600 mb-4">Você está usando o plano gratuito do Fomi.</p>
                <Button onClick={() => window.location.href = '/plans'}>
                  Fazer Upgrade
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Histórico de Faturas */}
      {invoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard size={24} className="text-primary" />
                <CardTitle>Histórico de Faturas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Calendar size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">#{invoice.numero_fatura}</p>
                        <p className="text-sm text-gray-600">
                          {formatPeriod(invoice.period_start, invoice.period_end)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">
                          {new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: invoice.currency.toUpperCase() 
                          }).format(invoice.total / 100)}
                        </p>
                        <Badge 
                          className={invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {invoice.status === 'paid' ? 'Pago' : 'Pendente'}
                        </Badge>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(invoice.invoice_pdf, '_blank')}
                      >
                        <Download size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}