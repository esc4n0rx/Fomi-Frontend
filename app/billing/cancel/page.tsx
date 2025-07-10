"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function BillingCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle size={40} className="text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pagamento Cancelado
            </h1>
            
            <p className="text-gray-600">
              Não se preocupe! Nenhuma cobrança foi realizada. Você pode tentar novamente quando quiser.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <HelpCircle size={16} className="text-blue-600" />
                <h3 className="font-semibold text-blue-900">Precisa de ajuda?</h3>
              </div>
              <p className="text-sm text-blue-700">
                Nossa equipe está aqui para esclarecer suas dúvidas sobre os planos e formas de pagamento.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/plans">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Escolher Plano Novamente
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  <ArrowLeft size={16} className="mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                Lembre-se: você sempre pode usar o plano gratuito
              </p>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Continuar com Plano Grátis
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}