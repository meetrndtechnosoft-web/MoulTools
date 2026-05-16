import { useState } from "react";
import { useAdmin, NavigationItem } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical, Save, FilePlus2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableNavItem({ item, onRemove, onUpdate, pages }: { 
  item: NavigationItem, 
  onRemove: () => void, 
  onUpdate: (item: NavigationItem) => void,
  pages: any[]
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-lg">
      <div {...attributes} {...listeners} className="cursor-move text-slate-500 hover:text-slate-300">
        <GripVertical className="w-5 h-5" />
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-3">
          <Input 
            value={item.label} 
            onChange={(e) => onUpdate({ ...item, label: e.target.value })}
            className="bg-slate-950 border-slate-800 text-white"
            placeholder="Label"
          />
        </div>
        
        <div className="md:col-span-2 flex items-center gap-2">
          <Switch 
            checked={item.isPage} 
            onCheckedChange={(checked) => onUpdate({ ...item, isPage: checked, href: checked ? '' : '/#' })}
          />
          <span className="text-sm text-slate-400">{item.isPage ? 'Dynamic Page' : 'Custom Link'}</span>
        </div>
        
        <div className="md:col-span-7">
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
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-md p-2"
            >
              <option value="">Select a Dynamic Page</option>
              {pages.map((p) => (
                <option key={p.id} value={p.slug}>{p.title} (/pages/{p.slug})</option>
              ))}
            </select>
          ) : (
            <Input 
              value={item.href} 
              onChange={(e) => onUpdate({ ...item, href: e.target.value })}
              className="bg-slate-950 border-slate-800 text-white"
              placeholder="e.g. /#about or https://example.com"
            />
          )}
        </div>
      </div>
      
      <Button variant="ghost" size="icon" onClick={onRemove} className="text-red-400 hover:text-red-300 hover:bg-red-950/30 shrink-0">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function NavigationManager() {
  const { adminData, updateAdminData, dynamicPages } = useAdmin();
  const { toast } = useToast();
  
  const [items, setItems] = useState<NavigationItem[]>(adminData.navigation || []);
  const [headerStyle, setHeaderStyle] = useState(adminData.headerStyle || {
    normalBgColor: 'transparent',
    stickyBgColor: 'rgba(2, 6, 23, 0.95)',
    textColor: 'rgba(148, 163, 184, 1)',
    hoverTextColor: 'rgba(248, 250, 252, 1)'
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddItem = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      label: 'New Link',
      href: '/#',
      isPage: false
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (updatedItem: NavigationItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    updateAdminData({ navigation: items, headerStyle });
    toast({ title: "Navigation updated successfully" });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Navigation Menu</h1>
          <p className="text-slate-400 mt-1">Manage header navigation links and order</p>
        </div>
        <Button onClick={handleSave} className="gap-2 shrink-0">
          <Save className="w-4 h-4" /> Save Navigation
        </Button>
      </div>

      <Card className="bg-slate-950 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Header Styling</CardTitle>
          <CardDescription className="text-slate-400">
            Customize the colors of the navigation menu.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Normal Background Color</Label>
              <Input 
                value={headerStyle.normalBgColor} 
                onChange={(e) => setHeaderStyle({ ...headerStyle, normalBgColor: e.target.value })}
                className="bg-slate-900 border-slate-800 text-white"
                placeholder="e.g. transparent or #000000"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Sticky Background Color</Label>
              <Input 
                value={headerStyle.stickyBgColor} 
                onChange={(e) => setHeaderStyle({ ...headerStyle, stickyBgColor: e.target.value })}
                className="bg-slate-900 border-slate-800 text-white"
                placeholder="e.g. rgba(2, 6, 23, 0.95)"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Text Color</Label>
              <Input 
                value={headerStyle.textColor} 
                onChange={(e) => setHeaderStyle({ ...headerStyle, textColor: e.target.value })}
                className="bg-slate-900 border-slate-800 text-white"
                placeholder="e.g. #ffffff or rgba(148, 163, 184, 1)"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Hover Text Color</Label>
              <Input 
                value={headerStyle.hoverTextColor} 
                onChange={(e) => setHeaderStyle({ ...headerStyle, hoverTextColor: e.target.value })}
                className="bg-slate-900 border-slate-800 text-white"
                placeholder="e.g. #3b82f6"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-950 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Menu Items</CardTitle>
          <CardDescription className="text-slate-400">
            Drag and drop to reorder. You can link to sections (e.g. /#about) or select your custom pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {items.map((item) => (
                  <SortableNavItem 
                    key={item.id} 
                    item={item} 
                    onRemove={() => handleRemoveItem(item.id)}
                    onUpdate={handleUpdateItem}
                    pages={dynamicPages}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          
          <Button variant="outline" onClick={handleAddItem} className="w-full mt-4 border-dashed border-slate-700 hover:border-slate-500 bg-slate-900 text-slate-300">
            <Plus className="w-4 h-4 mr-2" /> Add Menu Item
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}