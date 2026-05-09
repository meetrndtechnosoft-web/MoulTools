import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Upload } from "lucide-react";

const ImageInput = ({ value, onChange, placeholder }: { value: string, onChange: (val: string) => void, placeholder?: string }) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <Input 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-950 border-slate-800 text-white flex-1"
          placeholder={placeholder}
        />
        <div className="relative">
          <Input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => onChange(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
          <Button type="button" variant="outline" className="border-slate-800 bg-slate-950 text-white whitespace-nowrap">
            <Upload className="w-4 h-4 mr-2" /> Upload
          </Button>
        </div>
      </div>
      {value && (
        <div className="mt-2 h-32 rounded-md overflow-hidden relative border border-slate-800 bg-slate-900 flex items-center justify-center">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-xs font-semibold px-2 py-1 bg-black/60 rounded text-white backdrop-blur-sm">PREVIEW</span>
          </div>
        </div>
      )}
    </div>
  );
};

const IconInput = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  return (
    <div className="flex gap-2 items-center">
      <Input 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-900 border-slate-800 text-white flex-1"
        placeholder="Lucide Name or SVG"
      />
      <div className="relative">
        <Input 
          type="file" 
          accept="image/*,.svg" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => onChange(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
        />
        <Button type="button" variant="outline" size="icon" className="border-slate-800 bg-slate-900 text-white h-10 w-10 shrink-0">
          <Upload className="w-4 h-4" />
        </Button>
      </div>
      <div className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded shrink-0 border border-slate-700 overflow-hidden">
        {(value.startsWith('data:') || value.startsWith('http')) ? (
          <img src={value} className="w-6 h-6 object-contain" alt="icon preview" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <span className="text-[10px] text-slate-400 font-mono overflow-hidden truncate px-1 text-center w-full">{value || 'None'}</span>
        )}
      </div>
    </div>
  );
};

export default function ContentEditor() {
  const { adminData, updateAdminData } = useAdmin();
  const { toast } = useToast();
  const [formData, setFormData] = useState(adminData);

  const handleChange = (section: string, field: string, value: string) => {
    if (['hero', 'about', 'services', 'products', 'quality', 'contact'].includes(section)) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev as any)[section],
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

  const handleArrayChange = (section: string, arrayField: string, index: number, field: string, value: string) => {
    setFormData(prev => {
      const array = [...(prev as any)[section][arrayField]];
      array[index] = { ...array[index], [field]: value };
      return {
        ...prev,
        [section]: {
          ...(prev as any)[section],
          [arrayField]: array
        }
      };
    });
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
            <Label className="text-slate-300">Background Image</Label>
            <ImageInput 
              value={formData.hero.backgroundImage}
              onChange={(val) => handleChange('hero', 'backgroundImage', val)}
              placeholder="https://example.com/image.jpg"
            />
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
          <CardTitle className="text-white">About Section</CardTitle>
          <CardDescription className="text-slate-400">
            Company information and vision/mission statements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Small Subtitle</Label>
            <Input 
              value={formData.about?.subtitle || ''} 
              onChange={(e) => handleChange('about', 'subtitle', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Main Heading</Label>
            <Input 
              value={formData.about?.title || ''} 
              onChange={(e) => handleChange('about', 'title', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Main Description</Label>
            <Textarea 
              value={formData.about?.description || ''} 
              onChange={(e) => handleChange('about', 'description', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Our Vision</Label>
            <Textarea 
              value={formData.about?.vision || ''} 
              onChange={(e) => handleChange('about', 'vision', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Our Mission</Label>
            <Textarea 
              value={formData.about?.mission || ''} 
              onChange={(e) => handleChange('about', 'mission', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[80px]"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <Label className="text-slate-300 text-lg font-display">Key Strengths</Label>
            {formData.about?.strengths?.map((strength, index) => (
              <div key={strength.id} className="flex gap-2">
                <Input 
                  value={strength.text} 
                  onChange={(e) => handleArrayChange('about', 'strengths', index, 'text', e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white flex-1"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <Label className="text-slate-300 text-lg font-display">Statistics</Label>
            {formData.about?.stats?.map((stat, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="space-y-1">
                  <Label className="text-xs text-slate-500">Value (e.g. 500+)</Label>
                  <Input 
                    value={stat.value} 
                    onChange={(e) => handleArrayChange('about', 'stats', index, 'value', e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-slate-500">Label</Label>
                  <Input 
                    value={stat.label} 
                    onChange={(e) => handleArrayChange('about', 'stats', index, 'label', e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-slate-500">Lucide Icon Name or Upload SVG</Label>
                  <IconInput 
                    value={stat.iconName} 
                    onChange={(val) => handleArrayChange('about', 'stats', index, 'iconName', val)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Services Section</CardTitle>
          <CardDescription className="text-slate-400">
            Headings and description for the Services section.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Small Subtitle</Label>
            <Input 
              value={formData.services?.subtitle || ''} 
              onChange={(e) => handleChange('services', 'subtitle', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Main Heading</Label>
            <Input 
              value={formData.services?.title || ''} 
              onChange={(e) => handleChange('services', 'title', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Description</Label>
            <Textarea 
              value={formData.services?.description || ''} 
              onChange={(e) => handleChange('services', 'description', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[80px]"
            />
          </div>
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <Label className="text-slate-300 text-lg font-display">Services</Label>
            {formData.services?.items?.map((service, index) => (
              <div key={service.id} className="space-y-4 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Service Title</Label>
                    <Input 
                      value={service.title} 
                      onChange={(e) => handleArrayChange('services', 'items', index, 'title', e.target.value)}
                      className="bg-slate-900 border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Icon Name or Upload SVG</Label>
                    <IconInput 
                      value={service.iconName} 
                      onChange={(val) => handleArrayChange('services', 'items', index, 'iconName', val)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500">Description</Label>
                  <Textarea 
                    value={service.description} 
                    onChange={(e) => handleArrayChange('services', 'items', index, 'description', e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500">Features</Label>
                  {service.features.map((feature, featureIndex) => (
                    <Input 
                      key={feature.id}
                      value={feature.text} 
                      onChange={(e) => {
                        const newFeatures = [...service.features];
                        newFeatures[featureIndex] = { ...newFeatures[featureIndex], text: e.target.value };
                        handleArrayChange('services', 'items', index, 'features', newFeatures as any);
                      }}
                      className="bg-slate-900 border-slate-800 text-white mb-2"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Products Section</CardTitle>
          <CardDescription className="text-slate-400">
            Headings and description for the Products section.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Small Subtitle</Label>
            <Input 
              value={formData.products?.subtitle || ''} 
              onChange={(e) => handleChange('products', 'subtitle', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Main Heading</Label>
            <Input 
              value={formData.products?.title || ''} 
              onChange={(e) => handleChange('products', 'title', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Description</Label>
            <Textarea 
              value={formData.products?.description || ''} 
              onChange={(e) => handleChange('products', 'description', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[80px]"
            />
          </div>
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <Label className="text-slate-300 text-lg font-display">Product Categories</Label>
            {formData.products?.categories?.map((category, index) => (
              <div key={index} className="space-y-4 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Category Title</Label>
                    <Input 
                      value={category.title} 
                      onChange={(e) => handleArrayChange('products', 'categories', index, 'title', e.target.value)}
                      className="bg-slate-900 border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Icon Name or Upload SVG</Label>
                    <IconInput 
                      value={category.iconName} 
                      onChange={(val) => handleArrayChange('products', 'categories', index, 'iconName', val)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Quality Section</CardTitle>
          <CardDescription className="text-slate-400">
            Headings and description for the Quality section.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Small Subtitle</Label>
            <Input 
              value={formData.quality?.subtitle || ''} 
              onChange={(e) => handleChange('quality', 'subtitle', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Main Heading</Label>
            <Input 
              value={formData.quality?.title || ''} 
              onChange={(e) => handleChange('quality', 'title', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Description</Label>
            <Textarea 
              value={formData.quality?.description || ''} 
              onChange={(e) => handleChange('quality', 'description', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Quality Image</Label>
            <ImageInput 
              value={formData.quality?.image || ''} 
              onChange={(val) => handleChange('quality', 'image', val)}
            />
          </div>
          
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <Label className="text-slate-300 text-lg font-display">Quality Features</Label>
            {formData.quality?.features?.map((feature, index) => (
              <div key={index} className="space-y-4 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Feature Title</Label>
                    <Input 
                      value={feature.title} 
                      onChange={(e) => handleArrayChange('quality', 'features', index, 'title', e.target.value)}
                      className="bg-slate-900 border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Icon Name or Upload SVG</Label>
                    <IconInput 
                      value={feature.iconName} 
                      onChange={(val) => handleArrayChange('quality', 'features', index, 'iconName', val)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500">Description</Label>
                  <Textarea 
                    value={feature.description} 
                    onChange={(e) => handleArrayChange('quality', 'features', index, 'description', e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white min-h-[60px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Contact & Footer Information</CardTitle>
          <CardDescription className="text-slate-400">
            Headings, description, and global contact details used in the contact section and footer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Contact Section Subtitle</Label>
            <Input 
              value={formData.contact?.subtitle || ''} 
              onChange={(e) => handleChange('contact', 'subtitle', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Contact Section Main Heading</Label>
            <Input 
              value={formData.contact?.title || ''} 
              onChange={(e) => handleChange('contact', 'title', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Contact Section Description</Label>
            <Textarea 
              value={formData.contact?.description || ''} 
              onChange={(e) => handleChange('contact', 'description', e.target.value)}
              className="bg-slate-950 border-slate-800 text-white min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800">
            <div className="space-y-2">
              <Label className="text-slate-300">Office Address</Label>
              <Textarea 
                value={formData.contact?.address || ''} 
                onChange={(e) => handleChange('contact', 'address', e.target.value)}
                className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Working Hours</Label>
              <Textarea 
                value={formData.contact?.workingHours || ''} 
                onChange={(e) => handleChange('contact', 'workingHours', e.target.value)}
                className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2 col-span-1 md:col-span-2 pt-4 border-t border-slate-800">
              <Label className="text-slate-300 text-lg font-display">Active Contact Form</Label>
              <p className="text-sm text-slate-400 mb-2">Select the form to display on the home page.</p>
              <select
                value={formData.contact?.activeFormId || ''}
                onChange={(e) => handleChange('contact', 'activeFormId', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-md p-2"
              >
                <option value="">Select a Form</option>
                {adminData.contactForms?.map((form: any) => (
                  <option key={form.id} value={form.id}>
                    {form.name}
                  </option>
                ))}
              </select>
            </div>
            
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
