import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function ContentEditor() {
  const { adminData, updateAdminData } = useAdmin();
  const { toast } = useToast();
  const [formData, setFormData] = useState(adminData);

  const handleChange = (section: string, field: string, value: string) => {
    if (section === 'hero') {
      setFormData(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    updateAdminData(formData);
    toast({
      title: "Settings Saved",
      description: "Website content has been successfully updated.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Content Manager</h1>
        <p className="text-slate-400">Manage text content, backgrounds, and links across your website.</p>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Hero Section</CardTitle>
          <CardDescription className="text-slate-400">
            The main banner displayed at the top of the home page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Background Image URL</Label>
            <Input 
              value={formData.hero.backgroundImage} 
              onChange={(e) => handleChange('hero', 'backgroundImage', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
              placeholder="https://example.com/image.jpg"
            />
            {formData.hero.backgroundImage && (
              <div className="mt-2 h-32 rounded-md overflow-hidden relative border border-slate-800">
                <img 
                  src={formData.hero.backgroundImage} 
                  alt="Hero Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="text-xs font-semibold px-2 py-1 bg-black/60 rounded text-white backdrop-blur-sm">PREVIEW</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Heading</Label>
            <Input 
              value={formData.hero.title} 
              onChange={(e) => handleChange('hero', 'title', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Subtitle / Description</Label>
            <Textarea 
              value={formData.hero.subtitle} 
              onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Primary Button Text</Label>
              <Input 
                value={formData.hero.buttonText} 
                onChange={(e) => handleChange('hero', 'buttonText', e.target.value)}
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Button Link</Label>
              <Input 
                value={formData.hero.buttonLink} 
                onChange={(e) => handleChange('hero', 'buttonLink', e.target.value)}
                className="bg-slate-950 border-slate-800 text-white"
                placeholder="/about or #contact"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Contact Information</CardTitle>
          <CardDescription className="text-slate-400">
            Global contact details used in the footer and contact sections.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Support Email</Label>
              <Input 
                value={formData.contactEmail} 
                onChange={(e) => handleChange('global', 'contactEmail', e.target.value)}
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Phone Number</Label>
              <Input 
                value={formData.contactPhone} 
                onChange={(e) => handleChange('global', 'contactPhone', e.target.value)}
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-900/50 border-t border-slate-800 pt-6">
          <Button onClick={handleSave} className="w-full md:w-auto gap-2">
            <Save className="w-4 h-4" /> Save All Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
