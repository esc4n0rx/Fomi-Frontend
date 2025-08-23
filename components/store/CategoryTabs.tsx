"use client"

import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Category {
  id: string;
  nome: string;
}

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  storeColors: {
    fundo: string;
    texto: string;
  };
}

export default function CategoryTabs({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  storeColors
}: CategoryTabsProps) {

  const activeStyle = {
    backgroundColor: storeColors.texto,
    color: storeColors.fundo,
  };

  return (
    <div className="sticky top-0 bg-white z-20 py-2 shadow-sm mb-6">
      <div className="container mx-auto">
        <Tabs defaultValue="all" onValueChange={(value) => onSelectCategory(value === 'all' ? null : value)}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <TabsTrigger value="all" style={!selectedCategory ? activeStyle : {}}>
              Todos
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                style={selectedCategory === category.id ? activeStyle : {}}
              >
                {category.nome}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
