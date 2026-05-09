import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, ChevronLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactFormsManager() {
  const { contactForms, addContactForm, updateContactForm, deleteContactForm } = useAdmin();
  const { toast } = useToast();
  
  const [editingFormId, setEditingFormId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    fromEmail: "",
    toEmail: "",
    cc: "",
    mode: "simple" as "simple" | "html",
    content: ""
  });

  const handleAddNew = () => {
    setFormData({
      name: "New Form",
      fromEmail: "",
      toEmail: "",
      cc: "",
      mode: "simple",
      content: ""
    });
    setEditingFormId("new");
  };

  const handleEdit = (id: string) => {
    const form = contactForms.find(f => f.id === id);
    if (form) {
      setFormData({
        name: form.name,
        fromEmail: form.fromEmail,
        toEmail: form.toEmail,
        cc: form.cc,
        mode: form.mode,
        content: form.content
      });
      setEditingFormId(id);
    }
  };

  const handleSave = () => {
    if (editingFormId === "new") {
      addContactForm(formData);
      toast({ title: "Form created successfully" });
    } else if (editingFormId) {
      updateContactForm(editingFormId, formData);
      toast({ title: "Form updated successfully" });
    }
    setEditingFormId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this form?")) {
      deleteContactForm(id);
      toast({ title: "Form deleted" });
    }
  };

  if (editingFormId) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setEditingFormId(null)}
          className="text-slate-400 hover:text-white -ml-2"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Forms
        </Button>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">
              {editingFormId === "new" ? "Create New Form" : "Edit Form"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-300">Form Name</Label>
              <Input 
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-slate-950 border-slate-800 text-white"
                placeholder="e.g. Inquiry Form"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">From Email</Label>
                <Input 
                  value={formData.fromEmail}
                  onChange={e => setFormData(prev => ({ ...prev, fromEmail: e.target.value }))}
                  className="bg-slate-950 border-slate-800 text-white"
                  placeholder="noreply@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">To Email</Label>
                <Input 
                  value={formData.toEmail}
                  onChange={e => setFormData(prev => ({ ...prev, toEmail: e.target.value }))}
                  className="bg-slate-950 border-slate-800 text-white"
                  placeholder="info@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Cc (Optional)</Label>
              <Input 
                value={formData.cc}
                onChange={e => setFormData(prev => ({ ...prev, cc: e.target.value }))}
                className="bg-slate-950 border-slate-800 text-white"
                placeholder="sales@example.com, support@example.com"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <Label className="text-slate-300">Email Content Mode</Label>
                <div className="flex p-1 bg-slate-950 rounded-lg border border-slate-800">
                  <button
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${formData.mode === 'simple' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                    onClick={() => setFormData(prev => ({ ...prev, mode: 'simple' }))}
                  >
                    Simple
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${formData.mode === 'html' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                    onClick={() => setFormData(prev => ({ ...prev, mode: 'html' }))}
                  >
                    HTML
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">
                  {formData.mode === 'html' ? 'HTML Code' : 'Text Content'}
                </Label>
                <Textarea 
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-slate-950 border-slate-800 text-white min-h-[200px] font-mono"
                  placeholder={formData.mode === 'html' ? "<h1>Hello</h1>" : "Type your message here..."}
                />
              </div>

              {formData.mode === 'html' && formData.content && (
                <div className="space-y-2">
                  <Label className="text-slate-300">Live Preview</Label>
                  <div 
                    className="p-4 bg-white text-black rounded-lg min-h-[100px] border border-slate-200 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-slate-900/50 border-t border-slate-800 pt-6 flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" /> Save Form
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Contact Forms</h1>
          <p className="text-slate-400">Manage all your contact forms and email templates.</p>
        </div>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="w-4 h-4" /> Add New Form
        </Button>
      </div>

      <div className="grid gap-4">
        {contactForms.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800 border-dashed">
            <p className="text-slate-400">No contact forms created yet.</p>
          </div>
        ) : (
          contactForms.map((form) => (
            <Card key={form.id} className="bg-slate-900 border-slate-800">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-white text-lg">{form.name}</h3>
                  <div className="text-sm text-slate-400 flex gap-4 mt-1">
                    <span>From: {form.fromEmail || 'N/A'}</span>
                    <span>To: {form.toEmail || 'N/A'}</span>
                    <span>Mode: {form.mode.toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                    onClick={() => handleEdit(form.id)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-red-300"
                    onClick={() => handleDelete(form.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
