import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/theme-context';
import { 
  Paintbrush, 
  Monitor, 
  Layout,
  Moon, 
  Sun, 
  RefreshCw,
  Layers,
  Square,
  CircleOff,
  Circle,
  Type
} from 'lucide-react';

const SettingsWidget = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');

  const handleToggleMode = () => {
    // Explicitly set the theme mode to ensure correct toggling
    updateTheme({ mode: theme.mode === 'dark' ? 'light' : 'dark' });
  };

  const handleToggleStyle = () => {
    // Explicitly set the style to ensure correct toggling
    updateTheme({ style: theme.style === 'glass' ? 'solid' : 'glass' });
  };

  return (
    <div className="p-2 h-full overflow-hidden flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Paintbrush size={14} /> Appearance
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Monitor size={14} /> Display
          </TabsTrigger>
          <TabsTrigger value="widgets" className="flex items-center gap-2">
            <Layout size={14} /> Widgets
          </TabsTrigger>
        </TabsList>

        <div className="overflow-y-auto h-full pb-16">
          <TabsContent value="appearance" className="m-0 h-full">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {theme.mode === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                    <Label htmlFor="mode">Theme Mode</Label>
                  </div>
                  <Switch
                    id="mode"
                    checked={theme.mode === 'dark'}
                    onCheckedChange={handleToggleMode}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {theme.style === 'glass' ? <Layers size={16} /> : <Square size={16} />}
                    <Label htmlFor="style">Visual Style</Label>
                  </div>
                  <Switch
                    id="style"
                    checked={theme.style === 'glass'}
                    onCheckedChange={handleToggleStyle}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Toggle between glass and solid visual styles
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="blur">Blur Strength</Label>
                  <span className="text-xs text-muted-foreground">{theme.blurStrength}px</span>
                </div>
                <Slider
                  id="blur"
                  min={0}
                  max={20}
                  step={1}
                  value={[theme.blurStrength]}
                  onValueChange={(value) => updateTheme({ blurStrength: value[0] })}
                />
                <p className="text-xs text-muted-foreground">
                  Adjust the blur effect for glass elements
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CircleOff size={14} className="rotate-45" />
                    <Circle size={14} />
                    <Label htmlFor="radius">Border Radius</Label>
                  </div>
                  <span className="text-xs text-muted-foreground">{theme.borderRadius}px</span>
                </div>
                <Slider
                  id="radius"
                  min={0}
                  max={24}
                  step={1}
                  value={[theme.borderRadius]}
                  onValueChange={(value) => updateTheme({ borderRadius: value[0] })}
                />
                <p className="text-xs text-muted-foreground">
                  Adjust the corner roundness of widgets
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="transparency">Background Transparency</Label>
                  <span className="text-xs text-muted-foreground">{Math.round(theme.transparency * 100)}%</span>
                </div>
                <Slider
                  id="transparency"
                  min={0}
                  max={0.3}
                  step={0.01}
                  value={[theme.transparency]}
                  onValueChange={(value) => updateTheme({ transparency: value[0] })}
                />
                <p className="text-xs text-muted-foreground">
                  Adjust the transparency level of widget backgrounds
                </p>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetTheme}
                className="w-full mt-4 flex items-center gap-2 justify-center"
              >
                <RefreshCw size={14} /> Reset to Defaults
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="display" className="m-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Type size={16} />
                    <Label htmlFor="textSize">Text Size</Label>
                  </div>
                  <span className="text-xs text-muted-foreground">{theme.textSize.toFixed(1)}x</span>
                </div>
                <Slider
                  id="textSize"
                  min={0.8}
                  max={1.5}
                  step={0.1}
                  value={[theme.textSize]}
                  onValueChange={(value) => updateTheme({ textSize: value[0] })}
                />
                <p className="text-xs text-muted-foreground">
                  Adjust the size of text throughout the interface
                </p>
              </div>

              {/* Additional display settings could go here */}
            </div>
          </TabsContent>

          <TabsContent value="widgets" className="m-0">
            <div className="space-y-4">
              <p className="text-sm">
                Configure widget behavior and defaults
              </p>
              
              {/* Widget settings would go here */}
              <div className="text-xs text-muted-foreground">
                More widget configuration options coming soon!
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsWidget;
