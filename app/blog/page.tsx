import React from "react"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Blog</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">
        Fique por dentro das novidades, dicas e conteúdos exclusivos do universo Fomi.
      </p>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <p className="text-gray-500 text-center">Artigos e novidades em breve.</p>
      </div>
    </div>
  )
} 