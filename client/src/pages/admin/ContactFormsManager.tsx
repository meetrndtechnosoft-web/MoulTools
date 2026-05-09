import { useState } from "react";
import { useAdmin, FormField, FormFieldType } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, ChevronLeft, Save, List, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactFormsManager() {
  const { contactForms, formSubmissions, addContactForm, updateContactForm, deleteContactForm, deleteFormSubmission } = useAdmin();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'forms' | 'submissions'>('forms');
  const [editingFormId, setEditingFormId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    fromEmail: "",
    toEmail: "",
    cc: "",
    mode: "simple" as "simple" | "html",
    content: "",
    fields: [] as FormField[]
  });

  const handleAddNew = () => {
    setFormData({
      name: "New Form",
      fromEmail: "",
      toEmail: "",
      cc: "",
      mode: "simple",
      content: "",
      fields: []
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
        content: form.content,
        fields: form.fields || []
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
  
  const handleDeleteSubmission = (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      deleteFormSubmission(id);
      toast({ title: "Submission deleted" });
    }
  };

  const addField = () => {
    setFormData(prev => ({
      ...prev,
      fields: [
        ...prev.fields,
        { id: Date.now().toString(), label: "New Field", type: "text", required: false }
      ]
    }));
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    setFormData(prev => {
      const newFields = [...prev.fields];
      newFields[index] = { ...newFields[index], ...updates };
      return { ...prev, fields: newFields };
    });
  };

  const removeField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
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
            
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <Label className="text-slate-300 text-lg font-display">Form Fields</Label>
                <Button variant="outline" size="sm" onClick={addField} className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
                  <Plus className="w-4 h-4 mr-2" /> Add Field
                </Button>
              </div>
              
              <div className="space-y-4">
                {formData.fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800 items-start">
                    <div className="md:col-span-4 space-y-2">
                      <Label className="text-xs text-slate-500">Field Label</Label>
                      <Input 
                        value={field.label}
                        onChange={e => updateField(index, { label: e.target.value })}
                        className="bg-slate-900 border-slate-800 text-white"
                        placeholder="e.g. First Name"
                      />
                    </div>
                    <div className="md:col-span-3 space-y-2">
                      <Label className="text-xs text-slate-500">Field Type</Label>
                      <select
                        value={field.type}
                        onChange={e => updateField(index, { type: e.target.value as FormFieldType })}
                        className="w-full bg-slate-900 border border-slate-800 text-white rounded-md p-2 h-10 text-sm"
                      >
                        <option value="text">Text (Short)</option>
                        <option value="textarea">Text Area (Long)</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone/Telephone</option>
                        <option value="number">Number</option>
                        <option value="select">Select (Dropdown)</option>
                        <option value="upload">File Upload</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-xs text-slate-500">Required?</Label>
                      <div className="h-10 flex items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={field.required}
                            onChange={e => updateField(index, { required: e.target.checked })}
                            className="rounded border-slate-700 bg-slate-900"
                          />
                          <span className="text-sm text-slate-300">Yes</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      {field.type === 'select' && (
                        <>
                          <Label className="text-xs text-slate-500">Options</Label>
                          <Input 
                            value={field.options || ""}
                            onChange={e => updateField(index, { options: e.target.value })}
                            className="bg-slate-900 border-slate-800 text-white"
                            placeholder="Comma separated"
                          />
                        </>
                      )}
                    </div>

                    <div className="md:col-span-1 space-y-2 flex justify-end">
                      <Label className="text-xs text-transparent block">Actions</Label>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeField(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-950/30 h-10 w-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {formData.fields.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4 border border-dashed border-slate-800 rounded-lg">
                    No fields added yet. Add some fields to build your form.
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
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
                <p className="text-xs text-slate-500 mb-2">
                  You can use placeholders for form fields by wrapping them in double curly braces (e.g. {"{{"}First Name{"}}"}).
                </p>
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
      </div>
      
      <div className="flex space-x-2 border-b border-slate-800 mb-6">
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'forms' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('forms')}
        >
          <div className="flex items-center gap-2"><List className="w-4 h-4"/> Forms</div>
        </button>
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'submissions' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('submissions')}
        >
          <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Submissions</div>
        </button>
      </div>

      {activeTab === 'forms' && (
        <div className="space-y-4">
          <div className="flex justify-end">
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
                        <span>Fields: {form.fields?.length || 0}</span>
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
      )}
      
      {activeTab === 'submissions' && (
        <div className="grid gap-4">
          {formSubmissions.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800 border-dashed">
              <p className="text-slate-400">No submissions received yet.</p>
            </div>
          ) : (
            formSubmissions.map((sub) => {
              const formName = contactForms.find(f => f.id === sub.formId)?.name || 'Unknown Form';
              return (
                <Card key={sub.id} className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-3 border-b border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg mb-1">{formName}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {new Date(sub.date).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-red-300"
                        onClick={() => handleDeleteSubmission(sub.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {Object.entries(sub.data).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{key}</span>
                          <p className="text-slate-200 text-sm">{value as string}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  );
}