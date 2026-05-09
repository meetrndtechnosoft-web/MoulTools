import { MapPin, Phone, Mail, Send, Clock, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

export function Contact() {
  const { adminData, contactForms, addFormSubmission } = useAdmin();
  
  const activeForm = contactForms.find(f => f.id === adminData.contact.activeFormId) || contactForms[0];
  
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (label: string, value: string) => {
    setFormData(prev => ({ ...prev, [label]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    if (activeForm) {
      addFormSubmission({
        formId: activeForm.id,
        data: formData
      });
    }
    
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({});
  };

  return (
    <section id="contact" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            {adminData.contact.subtitle}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            {adminData.contact.title.split(' ').map((word, i, arr) => {
              if (i === arr.length - 1) return <span key={i} className="text-gradient">{word}</span>;
              return word + ' ';
            })}
          </h2>
          <p className="text-muted-foreground text-lg">
            {adminData.contact.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Office Address</h4>
                    <p className="text-muted-foreground text-sm whitespace-pre-line">
                      {adminData.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground text-sm">
                      {adminData.contactPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">
                      {adminData.contactEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Working Hours</h4>
                    <p className="text-muted-foreground text-sm whitespace-pre-line">
                      {adminData.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl border border-border shadow-xl">
              <h3 className="font-display text-2xl font-bold mb-6">Send us a Message</h3>
              
              {!activeForm ? (
                <p className="text-muted-foreground">No active form configured.</p>
              ) : (
                <div className="space-y-6 mb-6">
                  {activeForm.fields?.map(field => {
                    const id = `field-${field.id}`;
                    
                    let inputElement = null;
                    const commonClasses = "w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";
                    
                    if (field.type === 'textarea') {
                      inputElement = (
                        <textarea
                          id={id}
                          required={field.required}
                          rows={5}
                          value={formData[field.label] || ''}
                          onChange={(e) => handleInputChange(field.label, e.target.value)}
                          className={`${commonClasses} resize-none`}
                          placeholder={field.label}
                        />
                      );
                    } else if (field.type === 'select') {
                      const options = field.options ? field.options.split(',').map(o => o.trim()) : [];
                      inputElement = (
                        <select
                          id={id}
                          required={field.required}
                          value={formData[field.label] || ''}
                          onChange={(e) => handleInputChange(field.label, e.target.value)}
                          className={commonClasses}
                        >
                          <option value="">Select an option</option>
                          {options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      );
                    } else if (field.type === 'upload') {
                      inputElement = (
                        <div className="flex items-center gap-4">
                           <input
                            type="file"
                            id={id}
                            required={field.required}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // Normally upload file, for mockup we just store file name
                                handleInputChange(field.label, `File attached: ${file.name}`);
                              }
                            }}
                            className="hidden"
                          />
                          <label htmlFor={id} className={`${commonClasses} flex items-center justify-center cursor-pointer hover:bg-muted/50 gap-2 border-dashed border-2 py-6`}>
                            <Upload className="w-5 h-5 text-muted-foreground" />
                            <span className="text-muted-foreground">{formData[field.label] || "Click to upload a file"}</span>
                          </label>
                        </div>
                      );
                    } else {
                      let type = 'text';
                      if (field.type === 'email') type = 'email';
                      if (field.type === 'phone') type = 'tel';
                      if (field.type === 'number') type = 'number';
                      
                      inputElement = (
                        <input
                          type={type}
                          id={id}
                          required={field.required}
                          value={formData[field.label] || ''}
                          onChange={(e) => handleInputChange(field.label, e.target.value)}
                          className={commonClasses}
                          placeholder={field.label}
                        />
                      );
                    }
                    
                    return (
                      <div key={field.id}>
                        <label htmlFor={id} className="block text-sm font-medium mb-2">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {inputElement}
                      </div>
                    );
                  })}
                </div>
              )}

              {activeForm && (
                <button
                  type="submit"
                  className="w-full bg-gradient-accent text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                  data-testid="button-submit"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
