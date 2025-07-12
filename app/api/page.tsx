import React from "react"

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">API</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">
        Em breve, documentação e exemplos para integrar com a API do Fomi.
      </p>
      {/* Conteúdo futuro */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <p className="text-gray-500 text-center">Documentação da API em construção.</p>
      </div>
    </div>
  )
} 