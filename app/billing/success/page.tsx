"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BillingSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Marcar que o plano foi escolhido
    localStorage.setItem('has_chosen_plan', 'true');
    
    // Auto-redirect após 10 segundos
    const timeout = setTimeout(() => {
      router.push('/dashboard');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
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
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pagamento Confirmado!
            </h1>
            
            <p className="text-gray-600">
              Sua assinatura foi ativada com sucesso. Agora você tem acesso a todos os recursos do seu plano.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-1">O que acontece agora?</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Acesso imediato aos recursos premium</li>
                <li>• Recibo enviado por email</li>
                <li>• Suporte prioritário ativado</li>
              </ul>
            </div>

            <Link href="/dashboard">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Ir para o Dashboard
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>

            <p className="text-sm text-gray-500">
              Redirecionando automaticamente em 10 segundos...
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}