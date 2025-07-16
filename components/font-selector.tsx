"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Type, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

const AVAILABLE_FONTS = [
  { value: 'Arial', label: 'Arial', preview: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica', preview: 'Helvetica' },
  { value: 'Georgia', label: 'Georgia', preview: 'Georgia' },
  { value: 'Times', label: 'Times', preview: 'Times' },
  { value: 'Verdana', label: 'Verdana', preview: 'Verdana' },
  { value: 'Roboto', label: 'Roboto', preview: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans', preview: 'Open Sans' },
  { value: 'Lato', label: 'Lato', preview: 'Lato' },
];

export const FontSelector = ({
  value,
  onChange,
  label,
  description,
  disabled = false,
  className = ""
}: FontSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentFont = AVAILABLE_FONTS.find(font => font.value === value) || AVAILABLE_FONTS[0];

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium">{label}</Label>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      
      <div className="space-y-2">
        {/* Font Preview */}
        <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <Type className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Preview</span>
          </div>
          <div
            className="text-lg font-medium"
            style={{ fontFamily: currentFont.value }}
          >
            {currentFont.preview}
          </div>
          <div
            className="text-sm text-gray-600 mt-1"
            style={{ fontFamily: currentFont.value }}
          >
            Esta é uma amostra de texto com a fonte {currentFont.label}
          </div>
        </div>

        {/* Font Selector */}
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma fonte" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_FONTS.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: font.value }}>
                    {font.label}
                  </span>
                  {value === font.value && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Quick Font Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_FONTS.slice(0, 4).map((font) => (
            <motion.button
              key={font.value}
              className={`p-2 text-sm border rounded-md transition-all ${
                value === font.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onChange(font.value)}
              disabled={disabled}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="font-medium"
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}; 