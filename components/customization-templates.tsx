"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Palette, Sparkles, Check, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomizationTemplate, StoreCustomization } from '@/types/store';

interface CustomizationTemplatesProps {
  templates: CustomizationTemplate[];
  onApplyTemplate: (templateId: string) => Promise<void>;
  onPreviewTemplate: (customization: StoreCustomization) => void;
  loading: boolean;
  hasPermission: boolean;
  upgradeMessage?: string;
}

export const CustomizationTemplates = ({
  templates,
  onApplyTemplate,
  onPreviewTemplate,
  loading,
  hasPermission,
  upgradeMessage
}: CustomizationTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<CustomizationTemplate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApplyTemplate = async (template: CustomizationTemplate) => {
    if (!hasPermission) {
      return;
    }
    
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  const confirmApplyTemplate = async () => {
    if (!selectedTemplate) return;
    
    await onApplyTemplate(selectedTemplate.id);
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handlePreviewTemplate = (template: CustomizationTemplate) => {
    onPreviewTemplate(template.customization);
  };

  if (!hasPermission) {
    return (
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Templates de Design
            <Badge variant="secondary" className="ml-auto">
              Plano Superior
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Templates não disponíveis
            </h3>
            <p className="text-gray-600 mb-4">
              {upgradeMessage || "Faça upgrade do seu plano para acessar templates de design"}
            </p>
            <Button variant="outline" disabled>
              Faça Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (templates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Templates de Design
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum template disponível
            </h3>
            <p className="text-gray-600">
              Os templates serão carregados em breve.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Templates de Design
          </CardTitle>
          <p className="text-sm text-gray-600">
            Escolha um template pronto e personalize sua loja instantaneamente
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="cursor-pointer transition-all hover:shadow-lg">
                  <CardContent className="p-4">
                    {/* Template Preview */}
                    <div className="relative mb-4">
                      <div 
                        className="w-full h-24 rounded-lg border-2 border-gray-200 overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${template.customization.cor_primaria}, ${template.customization.cor_secundaria})`
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-2xl font-bold mb-1">🎨</div>
                            <div 
                              className="text-xs font-medium"
                              style={{ fontFamily: template.customization.fonte_titulo }}
                            >
                              {template.name}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Color Palette */}
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: template.customization.cor_primaria }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: template.customization.cor_secundaria }}
                        />
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="space-y-2">
                      <h3 
                        className="font-semibold text-sm"
                        style={{ fontFamily: template.customization.fonte_titulo }}
                      >
                        {template.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {template.description}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handlePreviewTemplate(template)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleApplyTemplate(template)}
                          disabled={loading}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aplicar Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedTemplate && (
              <>
                <div className="text-center">
                  <div 
                    className="w-full h-20 rounded-lg mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${selectedTemplate.customization.cor_primaria}, ${selectedTemplate.customization.cor_secundaria})`
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold mb-1">🎨</div>
                        <div 
                          className="text-sm font-medium"
                          style={{ fontFamily: selectedTemplate.customization.fonte_titulo }}
                        >
                          {selectedTemplate.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{selectedTemplate.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedTemplate.description}
                  </p>
                  
                  <div className="text-left space-y-2">
                    <p className="text-sm">
                      <strong>Este template irá:</strong>
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Alterar as cores da sua loja</li>
                      <li>• Modificar as fontes</li>
                      <li>• Manter suas imagens atuais</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={confirmApplyTemplate}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Aplicando...' : 'Aplicar Template'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}; 