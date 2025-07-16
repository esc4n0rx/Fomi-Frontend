"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

const PRESET_COLORS = [
  // Reds
  '#FF0000', '#FF4444', '#FF6666', '#FF8888', '#FFAAAA',
  // Oranges
  '#FF6B35', '#FF8C42', '#FFA500', '#FFB347', '#FFC107',
  // Yellows
  '#FFD700', '#FFEB3B', '#FFF176', '#FFF59D', '#FFF9C4',
  // Greens
  '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9',
  // Blues
  '#2196F3', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB',
  // Purples
  '#9C27B0', '#BA68C8', '#CE93D8', '#E1BEE7', '#F3E5F5',
  // Pinks
  '#E91E63', '#F06292', '#F48FB1', '#F8BBD9', '#FCE4EC',
  // Grays
  '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
];

export const ColorPicker = ({
  value,
  onChange,
  label,
  description,
  disabled = false,
  className = ""
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setInputValue(color);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleInputBlur = () => {
    // Reset to valid value if invalid
    if (!/^#[0-9A-F]{6}$/i.test(inputValue)) {
      setInputValue(value);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium">{label}</Label>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      
      <div className="flex gap-2">
        {/* Color Preview */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-10 p-0 border-2 hover:border-primary/50 transition-colors"
              disabled={disabled}
              style={{ borderColor: value }}
            >
              <div
                className="w-full h-full rounded-sm"
                style={{ backgroundColor: value }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="font-medium">Selecionar Cor</span>
              </div>
              
              {/* Preset Colors Grid */}
              <div className="grid grid-cols-5 gap-2">
                {PRESET_COLORS.map((color) => (
                  <motion.button
                    key={color}
                    className={`w-8 h-8 rounded-md border-2 transition-all hover:scale-110 ${
                      value === color ? 'border-gray-800' : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {value === color && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <Check className="h-4 w-4 text-white drop-shadow-lg" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Custom Color Input */}
              <div className="space-y-2">
                <Label className="text-sm">Cor personalizada</Label>
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="#FF6B35"
                    className="flex-1"
                    maxLength={7}
                  />
                  <div
                    className="w-10 h-10 rounded border border-gray-300"
                    style={{ backgroundColor: inputValue }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Digite um código hex válido (ex: #FF6B35)
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Color Input */}
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="#FF6B35"
          className="flex-1"
          maxLength={7}
          disabled={disabled}
        />
      </div>
    </div>
  );
}; 