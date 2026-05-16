import { useState } from "react";
import { useAdmin, DynamicPage } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, ChevronLeft, Save, Layout, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const PAGE_LAYOUTS = [
  {
    id: 'standard',
    name: 'Standard Page',
    description: 'A traditional layout with a hero banner and mixed text/image sections.',
    image: 'https://images.unsplash.com/photo-1507238692062-5a04ce4bef11?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gallery',
    name: 'Gallery Page',
    description: 'Focuses on visual content, perfect for portfolios or project showcases.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'feature',
    name: 'Feature Page',
    description: 'Icon-heavy layout for listing services, features, or capabilities.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop'
  }
];

// Helper to generate lorem ipsum based on field type
const generateLorem = (type: string) => {
  if (type === 'title') return "Sample Section Title";
  if (type === 'content') return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  if (type === 'image') return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop";
  if (type === 'icon') return "Box";
  return "Lorem ipsum";
};

// Component for uploading or inputting images
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
            <ImageIcon className="w-4 h-4 mr-2" /> Upload
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
        </div>
      )}
    </div>
  );
};

export default function DynamicPagesManager() {
  const { dynamicPages, addDynamicPage, updateDynamicPage, deleteDynamicPage } = useAdmin();
  const { toast } = useToast();
  
  const [viewState, setViewState] = useState<'list' | 'select-layout' | 'edit'>('list');
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<DynamicPage, 'id'>>({
    title: "",
    slug: "",
    layout: "standard",
    heroImage: "",
    content: "",
    sections: [],
    published: false
  });

  const handleStartNew = () => {
    setViewState('select-layout');
  };

  const handleSelectLayout = (layoutId: 'standard' | 'gallery' | 'feature') => {
    setFormData({
      title: "New Page",
      slug: "new-page",
      layout: layoutId,
      heroImage: "",
      content: "",
      sections: [],
      published: false
    });
    setEditingPageId("new");
    setViewState('edit');
  };

  const handleEdit = (id: string) => {
    const page = dynamicPages.find(p => p.id === id);
    if (page) {
      setFormData({
        title: page.title,
        slug: page.slug,
        layout: page.layout,
        heroImage: page.heroImage,
        content: page.content,
        sections: page.sections || [],
        published: page.published
      });
      setEditingPageId(id);
      setViewState('edit');
    }
  };

  const addSection = (type: 'text' | 'image' | 'icon-list') => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        { 
          id: Date.now().toString(), 
          type, 
          title: "", 
          content: "",
          image: type === 'image' ? "" : undefined,
          items: type === 'icon-list' ? [] : undefined
        }
      ]
    }));
  };

  const updateSection = (index: number, updates: any) => {
    setFormData(prev => {
      const newSections = [...prev.sections];
      newSections[index] = { ...newSections[index], ...updates };
      return { ...prev, sections: newSections };
    });
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const applyLoremIpsum = () => {
    setFormData(prev => {
      const newSections = prev.sections.map(sec => {
        const title = sec.title || generateLorem('title');
        const content = sec.content || generateLorem('content');
        let image = sec.image;
        if (sec.type === 'image' && !image) image = generateLorem('image');
        
        let items = sec.items;
        if (sec.type === 'icon-list' && (!items || items.length === 0)) {
          items = [
            { id: '1', title: generateLorem('title'), desc: generateLorem('content'), icon: generateLorem('icon') },
            { id: '2', title: generateLorem('title'), desc: generateLorem('content'), icon: generateLorem('icon') },
            { id: '3', title: generateLorem('title'), desc: generateLorem('content'), icon: generateLorem('icon') },
          ];
        }

        return { ...sec, title, content, image, items };
      });

      return {
        ...prev,
        title: prev.title || "Sample Page Title",
        slug: prev.slug || "sample-page",
        heroImage: prev.heroImage || generateLorem('image'),
        content: prev.content || generateLorem('content'),
        sections: newSections.length > 0 ? newSections : [
          { id: '1', type: 'text', title: generateLorem('title'), content: generateLorem('content') }
        ]
      };
    });
    toast({ title: "Lorem Ipsum applied to empty fields" });
  };

  const handleSave = () => {
    let finalData = { ...formData };
    
    // Check if the page is completely empty (no title, no content, no sections or empty sections)
    const isEmpty = !finalData.title && !finalData.content && 
                    (finalData.sections.length === 0 || finalData.sections.every(s => !s.title && !s.content));

    if (isEmpty) {
      // Apply Lorem Ipsum automatically
      finalData.title = "Sample Page Title";
      finalData.content = generateLorem('content');
      finalData.heroImage = generateLorem('image');
      
      if (finalData.sections.length === 0) {
        finalData.sections = [
          { id: Date.now().toString(), type: 'text', title: generateLorem('title'), content: generateLorem('content') }
        ];
      } else {
        finalData.sections = finalData.sections.map(sec => {
          const title = sec.title || generateLorem('title');
          const content = sec.content || generateLorem('content');
          let image = sec.image;
          if (sec.type === 'image' && !image) image = generateLorem('image');
          
          let items = sec.items;
          if (sec.type === 'icon-list' && (!items || items.length === 0)) {
            items = [
              { id: '1', title: generateLorem('title'), desc: generateLorem('content'), icon: generateLorem('icon') },
              { id: '2', title: generateLorem('title'), desc: generateLorem('content'), icon: generateLorem('icon') },
              { id: '3', title: generateLorem('title'), desc: generateLorem('content'), icon: generateLorem('icon') },
            ];
          }
          return { ...sec, title, content, image, items };
        });
      }
    }

    // Generate a slug if empty
    if (!finalData.slug && finalData.title) {
      finalData.slug = finalData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (editingPageId === "new") {
      addDynamicPage(finalData);
      toast({ title: isEmpty ? "Saved with Lorem Ipsum" : "Page created successfully" });
    } else if (editingPageId) {
      updateDynamicPage(editingPageId, finalData);
      toast({ title: isEmpty ? "Saved with Lorem Ipsum" : "Page updated successfully" });
    }
    setViewState('list');
    setEditingPageId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this page?")) {
      deleteDynamicPage(id);
      toast({ title: "Page deleted" });
    }
  };

  if (viewState === 'select-layout') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => setViewState('list')}
              className="text-slate-400 hover:text-white -ml-2 mb-2"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-3xl font-display font-bold text-white">Choose a Layout</h1>
            <p className="text-slate-400 mt-2">Select a starting template for your new page.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAGE_LAYOUTS.map((layout) => (
            <Card 
              key={layout.id} 
              className="bg-slate-900 border-slate-800 hover:border-primary/50 transition-all cursor-pointer overflow-hidden group"
              onClick={() => handleSelectLayout(layout.id as any)}
            >
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={layout.image} 
                  alt={layout.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-white text-xl mb-2">{layout.name}</h3>
                <p className="text-slate-400 text-sm">{layout.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (viewState === 'edit') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => setViewState('list')}
            className="text-slate-400 hover:text-white -ml-2"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Pages
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={applyLoremIpsum} className="border-slate-700 bg-slate-800 text-white">
              Fill Empty with Lorem Ipsum
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" /> Save Page
            </Button>
          </div>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex justify-between items-center">
              <span>{editingPageId === "new" ? "Create Page" : "Edit Page"}</span>
              <span className="text-sm font-normal px-2 py-1 bg-primary/20 text-primary rounded">
                Layout: {PAGE_LAYOUTS.find(l => l.id === formData.layout)?.name || formData.layout}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Page Title</Label>
                <Input 
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-950 border-slate-800 text-white"
                  placeholder="e.g. Our History"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">URL Slug</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-800 bg-slate-900 text-slate-400 text-sm">
                    /pages/
                  </span>
                  <Input 
                    value={formData.slug}
                    onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="bg-slate-950 border-slate-800 text-white rounded-l-none"
                    placeholder="our-history"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Hero Banner Image</Label>
              <ImageInput 
                value={formData.heroImage}
                onChange={val => setFormData(prev => ({ ...prev, heroImage: val }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Main Content / Introduction</Label>
              <Textarea 
                value={formData.content}
                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="bg-slate-950 border-slate-800 text-white min-h-[120px]"
                placeholder="Write the introduction for this page..."
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="published"
                  checked={formData.published}
                  onChange={e => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="rounded border-slate-800 bg-slate-950"
                />
                <Label htmlFor="published" className="text-slate-300">Publish this page (make it visible)</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Sections */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-display font-bold text-white">Page Sections</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => addSection('text')} className="border-slate-800 bg-slate-900 text-white">
                <Plus className="w-4 h-4 mr-1" /> Text
              </Button>
              <Button variant="outline" size="sm" onClick={() => addSection('image')} className="border-slate-800 bg-slate-900 text-white">
                <Plus className="w-4 h-4 mr-1" /> Image + Text
              </Button>
              <Button variant="outline" size="sm" onClick={() => addSection('icon-list')} className="border-slate-800 bg-slate-900 text-white">
                <Plus className="w-4 h-4 mr-1" /> Features List
              </Button>
            </div>
          </div>

          {formData.sections.map((section, index) => (
            <Card key={section.id} className="bg-slate-900 border-slate-800 relative group">
              <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 border border-slate-700">
                {index + 1}
              </div>
              <div className="absolute right-4 top-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeSection(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-2 mb-2 items-center text-sm text-primary font-medium">
                  {section.type === 'text' && <FileText className="w-4 h-4" />}
                  {section.type === 'image' && <ImageIcon className="w-4 h-4" />}
                  {section.type === 'icon-list' && <Layout className="w-4 h-4" />}
                  <span className="uppercase tracking-wider">
                    {section.type === 'image' ? 'Image & Text Section' : 
                     section.type === 'icon-list' ? 'Features List Section' : 'Text Section'}
                  </span>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Section Title</Label>
                  <Input 
                    value={section.title}
                    onChange={e => updateSection(index, { title: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                {section.type === 'image' && (
                  <div className="space-y-2">
                    <Label className="text-slate-300">Section Image</Label>
                    <ImageInput 
                      value={section.image || ""}
                      onChange={val => updateSection(index, { image: val })}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-slate-300">Section Content</Label>
                  <Textarea 
                    value={section.content}
                    onChange={e => updateSection(index, { content: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
                  />
                </div>

                {section.type === 'icon-list' && (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex justify-between items-center">
                      <Label className="text-slate-300">List Items</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 text-xs border-slate-700 bg-slate-800"
                        onClick={() => {
                          const newItems = [...(section.items || [])];
                          newItems.push({ id: Date.now().toString(), title: "", desc: "", icon: "Box" });
                          updateSection(index, { items: newItems });
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" /> Add Item
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {section.items?.map((item, itemIdx) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-950 p-3 rounded border border-slate-800 relative">
                          <div className="md:col-span-3 space-y-1">
                            <Label className="text-[10px] text-slate-500 uppercase tracking-wider">Icon</Label>
                            <Input 
                              value={item.icon}
                              onChange={e => {
                                const newItems = [...(section.items || [])];
                                newItems[itemIdx].icon = e.target.value;
                                updateSection(index, { items: newItems });
                              }}
                              className="bg-slate-900 border-slate-800 text-white h-8 text-sm"
                            />
                          </div>
                          <div className="md:col-span-3 space-y-1">
                            <Label className="text-[10px] text-slate-500 uppercase tracking-wider">Title</Label>
                            <Input 
                              value={item.title}
                              onChange={e => {
                                const newItems = [...(section.items || [])];
                                newItems[itemIdx].title = e.target.value;
                                updateSection(index, { items: newItems });
                              }}
                              className="bg-slate-900 border-slate-800 text-white h-8 text-sm"
                            />
                          </div>
                          <div className="md:col-span-5 space-y-1">
                            <Label className="text-[10px] text-slate-500 uppercase tracking-wider">Description</Label>
                            <Input 
                              value={item.desc}
                              onChange={e => {
                                const newItems = [...(section.items || [])];
                                newItems[itemIdx].desc = e.target.value;
                                updateSection(index, { items: newItems });
                              }}
                              className="bg-slate-900 border-slate-800 text-white h-8 text-sm"
                            />
                          </div>
                          <div className="md:col-span-1 flex items-end pb-1 justify-end">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 w-6 p-0 text-slate-500 hover:text-red-400"
                              onClick={() => {
                                const newItems = [...(section.items || [])];
                                newItems.splice(itemIdx, 1);
                                updateSection(index, { items: newItems });
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {(!section.items || section.items.length === 0) && (
                        <p className="text-xs text-slate-500 italic">No items added yet.</p>
                      )}
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          ))}
          
          {formData.sections.length === 0 && (
            <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800 border-dashed">
              <p className="text-slate-400 mb-2">No sections added to this page yet.</p>
              <p className="text-sm text-slate-500">Add sections using the buttons above to build your page structure.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Custom Pages</h1>
          <p className="text-slate-400">Create and manage dynamic pages with custom layouts.</p>
        </div>
        <Button onClick={handleStartNew} className="gap-2">
          <Plus className="w-4 h-4" /> Create Page
        </Button>
      </div>

      <div className="grid gap-4">
        {dynamicPages.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-lg border border-slate-800 border-dashed">
            <Layout className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">No custom pages</h3>
            <p className="text-slate-400 mb-6">Create your first custom page using our layout templates.</p>
            <Button onClick={handleStartNew}>Create a Page</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dynamicPages.map((page) => (
              <Card key={page.id} className="bg-slate-900 border-slate-800 flex flex-col">
                {page.heroImage ? (
                  <div className="h-32 w-full overflow-hidden">
                    <img src={page.heroImage} alt={page.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-32 w-full bg-slate-800 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-600" />
                  </div>
                )}
                
                <CardContent className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display font-bold text-white text-lg line-clamp-1" title={page.title}>{page.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${page.published ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {page.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 font-mono truncate">/pages/{page.slug}</p>
                  
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>Layout: {page.layout}</span>
                    <span>Sections: {page.sections?.length || 0}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 border-t border-slate-800 flex justify-between bg-slate-950/50">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700 h-8 text-xs"
                      onClick={() => handleEdit(page.id)}
                    >
                      <Edit2 className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 h-8 w-8"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {page.published && (
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10" asChild>
                      <Link href={`/pages/${page.slug}`}>
                        <a target="_blank" className="flex items-center"><ExternalLink className="w-3 h-3 mr-1"/> View</a>
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}