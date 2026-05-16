import { useState } from "react";
import { useAdmin, FooterColumn, NavigationItem } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as LucideIcons from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const availableIcons = Object.keys(LucideIcons).filter(key => typeof (LucideIcons as any)[key] === 'function' && key !== 'createLucideIcon');

function SortableLinkItem({ item, onRemove, onUpdate, pages }: { 
  item: NavigationItem, 
  onRemove: () => void, 
  onUpdate: (item: NavigationItem) => void,
  pages: any[]
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg mt-2">
      <div {...attributes} {...listeners} className="cursor-move text-slate-500 hover:text-slate-300">
        <GripVertical className="w-4 h-4" />
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <Input 
          value={item.label} 
          onChange={(e) => onUpdate({ ...item, label: e.target.value })}
          className="bg-slate-950 border-slate-800 text-white h-8 text-sm"
          placeholder="Link Label"
        />
        
        <div className="flex items-center gap-2">
          {item.isPage ? (
            <select
              value={item.pageSlug || ''}
              onChange={(e) => {
                const page = pages.find(p => p.slug === e.target.value);
                onUpdate({ 
                  ...item, 
                  pageSlug: e.target.value, 
                  href: `/pages/${e.target.value}`,
                  label: item.label || page?.title || ''
                });
              }}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-md p-1.5 text-sm h-8"
            >
              <option value="">Select Page</option>
              {pages.map((p) => (
                <option key={p.id} value={p.slug}>{p.title}</option>
              ))}
            </select>
          ) : (
            <Input 
              value={item.href} 
              onChange={(e) => onUpdate({ ...item, href: e.target.value })}
              className="bg-slate-950 border-slate-800 text-white h-8 text-sm"
              placeholder="URL or /#section"
            />
          )}
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onUpdate({ ...item, isPage: !item.isPage, href: !item.isPage ? '' : '/#' })}
            className="text-xs h-8 whitespace-nowrap bg-slate-800"
          >
            {item.isPage ? 'Set Custom URL' : 'Link to Page'}
          </Button>
        </div>
      </div>
      
      <Button variant="ghost" size="icon" onClick={onRemove} className="text-red-400 hover:text-red-300 hover:bg-red-950/30 shrink-0 h-8 w-8">
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
}


export default function FooterManager() {
  const { adminData, updateAdminData, dynamicPages } = useAdmin();
  const { toast } = useToast();
  
  const [footer, setFooter] = useState(adminData.footer);

  const handleSave = () => {
    updateAdminData({ footer });
    toast({ title: "Footer settings updated" });
  };

  const addColumn = () => {
    const newCol: FooterColumn = {
      id: Date.now().toString(),
      title: 'New Column',
      links: []
    };
    setFooter({ ...footer, columns: [...footer.columns, newCol] });
  };

  const removeColumn = (id: string) => {
    setFooter({ ...footer, columns: footer.columns.filter(c => c.id !== id) });
  };

  const updateColumn = (id: string, updates: Partial<FooterColumn>) => {
    setFooter({
      ...footer,
      columns: footer.columns.map(c => c.id === id ? { ...c, ...updates } : c)
    });
  };

  const addLink = (colId: string) => {
    const newLink: NavigationItem = {
      id: Date.now().toString(),
      label: 'New Link',
      href: '/#',
      isPage: false
    };
    
    setFooter({
      ...footer,
      columns: footer.columns.map(c => 
        c.id === colId ? { ...c, links: [...c.links, newLink] } : c
      )
    });
  };

  const updateLink = (colId: string, link: NavigationItem) => {
    setFooter({
      ...footer,
      columns: footer.columns.map(c => 
        c.id === colId ? { ...c, links: c.links.map(l => l.id === link.id ? link : l) } : c
      )
    });
  };

  const removeLink = (colId: string, linkId: string) => {
    setFooter({
      ...footer,
      columns: footer.columns.map(c => 
        c.id === colId ? { ...c, links: c.links.filter(l => l.id !== linkId) } : c
      )
    });
  };

  const addSocial = () => {
    const newSocial = {
      id: Date.now().toString(),
      icon: 'Link',
      href: '#',
      label: 'Website'
    };
    setFooter({ ...footer, socialLinks: [...footer.socialLinks, newSocial] });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Footer Settings</h1>
          <p className="text-slate-400 mt-1">Manage footer content, columns, and social links</p>
        </div>
        <Button onClick={handleSave} className="gap-2 shrink-0">
          <Save className="w-4 h-4" /> Save Footer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-950 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Company Description</Label>
              <Textarea 
                value={footer.description} 
                onChange={(e) => setFooter({ ...footer, description: e.target.value })}
                className="bg-slate-900 border-slate-800 text-white min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Copyright Text</Label>
              <Input 
                value={footer.copyright} 
                onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                className="bg-slate-900 border-slate-800 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Social Links</CardTitle>
              <Button size="sm" variant="outline" onClick={addSocial} className="h-8">
                <Plus className="w-3 h-3 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {footer.socialLinks.map((social) => (
              <div key={social.id} className="flex gap-2 items-center">
                <select
                  value={social.icon}
                  onChange={(e) => {
                    const newLinks = footer.socialLinks.map(s => s.id === social.id ? { ...s, icon: e.target.value } : s);
                    setFooter({ ...footer, socialLinks: newLinks });
                  }}
                  className="w-32 bg-slate-900 border border-slate-800 text-white rounded-md p-2 text-sm"
                >
                  {availableIcons.slice(0, 100).map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <Input
                  value={social.href}
                  onChange={(e) => {
                    const newLinks = footer.socialLinks.map(s => s.id === social.id ? { ...s, href: e.target.value } : s);
                    setFooter({ ...footer, socialLinks: newLinks });
                  }}
                  placeholder="URL"
                  className="bg-slate-900 border-slate-800 text-white h-9"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-red-400 hover:text-red-300 h-9 w-9 shrink-0"
                  onClick={() => setFooter({ ...footer, socialLinks: footer.socialLinks.filter(s => s.id !== social.id) })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-950 border-slate-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Footer Columns</CardTitle>
              <CardDescription className="text-slate-400">Manage link columns in the footer</CardDescription>
            </div>
            <Button onClick={addColumn} variant="outline" className="border-slate-700 bg-slate-900">
              <Plus className="w-4 h-4 mr-2" /> Add Column
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {footer.columns.map((column) => (
              <div key={column.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <Input
                    value={column.title}
                    onChange={(e) => updateColumn(column.id, { title: e.target.value })}
                    className="bg-slate-950 border-slate-700 text-white font-bold w-2/3"
                    placeholder="Column Title"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeColumn(column.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-1 mb-4">
                  {column.links.map((link) => (
                    <SortableLinkItem 
                      key={link.id} 
                      item={link} 
                      onRemove={() => removeLink(column.id, link.id)}
                      onUpdate={(l) => updateLink(column.id, l)}
                      pages={dynamicPages}
                    />
                  ))}
                </div>
                
                <Button size="sm" variant="outline" onClick={() => addLink(column.id)} className="w-full border-dashed border-slate-700 bg-transparent text-slate-400">
                  <Plus className="w-3 h-3 mr-1" /> Add Link
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}