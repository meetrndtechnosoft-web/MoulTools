import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our admin data
export interface Stat {
  value: string;
  label: string;
  iconName: string;
}

export interface Strength {
  id: string;
  text: string;
}

export interface ServiceFeature {
  id: string;
  text: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: ServiceFeature[];
}

export interface Product {
  name: string;
  application: string;
}

export interface ProductCategory {
  title: string;
  iconName: string;
  color: string;
  bgColor: string;
  products: Product[];
}

export interface QualityFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isPage: boolean;
  pageSlug?: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: NavigationItem[];
}

export interface FooterData {
  description: string;
  socialLinks: { id: string; icon: string; href: string; label: string }[];
  columns: FooterColumn[];
  copyright: string;
}

export interface AdminData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    buttonText: string;
    buttonLink: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    vision: string;
    mission: string;
    stats: Stat[];
    strengths: Strength[];
  };
  services: {
    title: string;
    subtitle: string;
    description: string;
    items: Service[];
  };
  products: {
    title: string;
    subtitle: string;
    description: string;
    categories: ProductCategory[];
  };
  quality: {
    title: string;
    subtitle: string;
    description: string;
    features: QualityFeature[];
    image: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    address: string;
    workingHours: string;
    activeFormId: string;
  };
  contactEmail: string;
  contactPhone: string;
  navigation: NavigationItem[];
  footer: FooterData;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
  published: boolean;
}

export type FormFieldType = 'text' | 'email' | 'phone' | 'textarea' | 'number' | 'select' | 'upload';

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options?: string; // For select
}

export interface ContactForm {
  id: string;
  name: string;
  fromEmail: string;
  toEmail: string;
  cc: string;
  mode: 'simple' | 'html';
  content: string;
  fields: FormField[];
}

export interface FormSubmission {
  id: string;
  formId: string;
  date: string;
  data: Record<string, string>;
}

export interface DynamicPage {
  id: string;
  title: string;
  slug: string;
  layout: 'standard' | 'gallery' | 'feature';
  heroImage: string;
  content: string;
  sections: {
    id: string;
    type: 'text' | 'image' | 'icon-list';
    title: string;
    content: string;
    image?: string;
    items?: { id: string; title: string; desc: string; icon: string }[];
  }[];
  published: boolean;
}

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  adminData: AdminData;
  updateAdminData: (data: Partial<AdminData>) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  contactForms: ContactForm[];
  addContactForm: (form: Omit<ContactForm, 'id'>) => void;
  updateContactForm: (id: string, form: Partial<ContactForm>) => void;
  deleteContactForm: (id: string) => void;
  formSubmissions: FormSubmission[];
  addFormSubmission: (submission: Omit<FormSubmission, 'id' | 'date'>) => void;
  deleteFormSubmission: (id: string) => void;
  dynamicPages: DynamicPage[];
  addDynamicPage: (page: Omit<DynamicPage, 'id'>) => void;
  updateDynamicPage: (id: string, page: Partial<DynamicPage>) => void;
  deleteDynamicPage: (id: string) => void;
}

const defaultAdminData: AdminData = {
  hero: {
    title: "Precision Mould & Die Manufacturing",
    subtitle: "Setting the standard in high-quality injection moulds, tooling, and engineering services.",
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Explore Our Capabilities",
    buttonLink: "#products"
  },
  about: {
    title: "We Are Moul Tool Systems",
    subtitle: "About Us",
    description: "Founded with a vision to bring precision and reliability to the tooling industry, Moul Tool Systems has steadily grown into a trusted name in mould manufacturing. From humble beginnings, we have expanded our infrastructure, team, and technology to serve clients across multiple sectors.",
    vision: "To be a globally recognized partner for precision tooling and mould solutions.",
    mission: "To deliver innovative, high-quality tools that empower our clients to manufacture with excellence.",
    stats: [
      { value: '500+', label: 'Moulds Delivered', iconName: 'Award' },
      { value: '98%', label: 'On-Time Delivery', iconName: 'Clock' },
      { value: 'OEM', label: 'Tier-1 Partners', iconName: 'Target' },
      { value: '25+', label: 'Years Experience', iconName: 'Users' },
    ],
    strengths: [
      { id: '1', text: 'Advanced CAD/CAM design expertise' },
      { id: '2', text: 'Experienced technical team' },
      { id: '3', text: 'In-house Wirecut, VMC, and EDM setup' },
      { id: '4', text: 'Proven process control and documentation' },
      { id: '5', text: 'Quick turnaround and reliable after-sales support' },
    ]
  },
  services: {
    title: "Services & Capabilities",
    subtitle: "Our Services",
    description: "Comprehensive mould design, precision machining, and engineering services tailored to your manufacturing requirements.",
    items: [
      {
        id: '1',
        title: 'Mould Design',
        description: '3D modelling, product feasibility, and tool design using advanced CAD software. We transform your concepts into precise, manufacturable designs.',
        iconName: 'PenTool',
        features: [
          { id: '1', text: '3D CAD/CAM Design' },
          { id: '2', text: 'Product Feasibility' },
          { id: '3', text: 'Tool Engineering' }
        ],
      },
      {
        id: '2',
        title: 'Precision Machining',
        description: 'High-accuracy component manufacturing using CNC, VMC, EDM and Wirecut machines for exceptional quality and tight tolerances.',
        iconName: 'Cog',
        features: [
          { id: '1', text: 'CNC Machining' },
          { id: '2', text: 'VMC Operations' },
          { id: '3', text: 'EDM & Wirecut' }
        ],
      },
      {
        id: '3',
        title: 'Maintenance & Repairs',
        description: 'Mould rework, maintenance, and refurbishment services for extending tool life and ensuring consistent production quality.',
        iconName: 'Wrench',
        features: [
          { id: '1', text: 'Mould Rework' },
          { id: '2', text: 'Refurbishment' },
          { id: '3', text: 'Preventive Maintenance' }
        ],
      },
      {
        id: '4',
        title: 'Prototyping',
        description: 'Rapid tooling and trial moulds to validate design and functionality before committing to full production.',
        iconName: 'Lightbulb',
        features: [
          { id: '1', text: 'Rapid Tooling' },
          { id: '2', text: 'Trial Moulds' },
          { id: '3', text: 'Design Validation' }
        ],
      }
    ]
  },
  products: {
    title: "Complete Product Range",
    subtitle: "Our Products",
    description: "From prototype moulds to high-volume production tooling, we offer comprehensive solutions for all your manufacturing needs.",
    categories: [
      {
        iconName: 'Box',
        title: 'Injection Moulds',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        products: [
          { name: 'Hand Injection Mould', application: 'Prototype & Sampling' },
          { name: 'Single Cavity Prototype Mould', application: 'Product Development' },
          { name: 'Multi Cavity Cold Runner Mould', application: 'General Production' },
          { name: 'Hot Runner Mould (Semi/Fully Hot)', application: 'High Volume Production' },
          { name: 'Valve Gate Type Mould', application: 'Pharma & Precision Components' },
          { name: 'Unscrewing Mould', application: 'Threaded Parts, Caps, Closures' },
          { name: 'In-Mould Closing Mould', application: 'Pharma & Consumer Closures' },
          { name: 'Overmoulding / Insert Mould', application: 'Metal + Plastic Components' },
          { name: 'Thin Wall Mould', application: 'Packaging, Disposable Containers' },
          { name: 'Micro Precision Mould', application: 'Medical, Electronics Components' },
        ],
      },
      {
        iconName: 'Settings',
        title: 'Precision Tooling & Components',
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        products: [
          { name: 'Core & Cavity Inserts', application: 'Custom Mould Parts' },
          { name: 'Electrode Manufacturing', application: 'EDM Applications' },
          { name: 'Mould Base Manufacturing', application: 'Injection & Die Mould Base' },
          { name: 'Ejector Pins / Sleeves / Lifters', application: 'Toolroom Components' },
          { name: 'Custom Fixtures', application: 'Assembly & Testing Fixtures' },
        ],
      },
      {
        iconName: 'Cpu',
        title: 'Engineering Services',
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        products: [
          { name: '3D CAD Design & Modelling', application: 'Design & Product Development' },
          { name: 'CAM Programming', application: 'Machining & Simulation' },
          { name: 'Prototype Trials & Testing', application: 'Trial & Validation' },
          { name: 'Mould Maintenance & Refurbishment', application: 'After-Sales Service' },
        ],
      },
    ]
  },
  quality: {
    title: "Committed to Excellence",
    subtitle: "Quality Assurance",
    description: "Quality is at the heart of everything we do. Every component undergoes dimensional inspection, assembly validation, and trial runs to ensure it meets the highest standards.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    features: [
      {
        iconName: 'CheckCircle',
        title: 'Dimensional Inspection',
        description: 'Every component undergoes rigorous dimensional checks using precision measuring instruments.',
      },
      {
        iconName: 'FileCheck',
        title: 'Assembly Validation',
        description: 'Complete assembly validation to ensure perfect fit and function before delivery.',
      },
      {
        iconName: 'Award',
        title: 'Trial Runs',
        description: 'Comprehensive trial runs to verify mould performance and product quality.',
      },
      {
        iconName: 'Shield',
        title: 'ISO Standards',
        description: 'Adherence to ISO-quality processes and client-specific quality benchmarks.',
      },
    ]
  },
  contact: {
    title: "Contact Us",
    subtitle: "Get In Touch",
    description: "Ready to discuss your tooling requirements? Get in touch with our team and let's bring your project to life.",
    address: "MOUL TOOL SYSTEMS\nBALAJI INDUSTRIAL PARK,\nSY.NO-210/2(OLD Sy. No.121/1), PLOT No. 2,\nMORAI VILLAGE, VAPI,\nDISTRICT- VALSAD, GUJARAT 396191",
    workingHours: "Monday - Saturday\n9:00 AM - 6:00 PM IST",
    activeFormId: "1"
  },
  contactEmail: "info@moultoolsystems.com",
  contactPhone: "+91 123 456 7890",
  navigation: [
    { id: 'n1', label: 'Home', href: '/#home', isPage: false },
    { id: 'n2', label: 'About', href: '/#about', isPage: false },
    { id: 'n3', label: 'Services', href: '/#services', isPage: false },
    { id: 'n4', label: 'Products', href: '/#products', isPage: false },
    { id: 'n5', label: 'Quality', href: '/#quality', isPage: false },
    { id: 'n6', label: 'Blog', href: '/blog', isPage: false },
    { id: 'n7', label: 'Contact', href: '/#contact', isPage: false },
  ],
  footer: {
    description: "Precision engineering company specializing in mould and die design, manufacturing, and component machining. Delivering world-class tooling solutions since establishment.",
    socialLinks: [
      { id: 's1', icon: 'Linkedin', href: '#', label: 'LinkedIn' },
      { id: 's2', icon: 'Twitter', href: '#', label: 'Twitter' },
      { id: 's3', icon: 'Facebook', href: '#', label: 'Facebook' },
    ],
    columns: [
      {
        id: 'c1',
        title: 'Company',
        links: [
          { id: 'cl1', label: 'About Us', href: '/#about', isPage: false },
          { id: 'cl2', label: 'Our Team', href: '/#about', isPage: false },
          { id: 'cl3', label: 'Blog', href: '/blog', isPage: false },
          { id: 'cl4', label: 'Careers', href: '/#contact', isPage: false },
          { id: 'cl5', label: 'Quality', href: '/#quality', isPage: false },
        ]
      },
      {
        id: 'c2',
        title: 'Services',
        links: [
          { id: 'cl6', label: 'Mould Design', href: '/#services', isPage: false },
          { id: 'cl7', label: 'Precision Machining', href: '/#services', isPage: false },
          { id: 'cl8', label: 'Maintenance', href: '/#services', isPage: false },
          { id: 'cl9', label: 'Prototyping', href: '/#services', isPage: false },
        ]
      },
      {
        id: 'c3',
        title: 'Industries',
        links: [
          { id: 'cl10', label: 'Medical', href: '/#products', isPage: false },
          { id: 'cl11', label: 'Healthcare & Pharma', href: '/#products', isPage: false },
          { id: 'cl12', label: 'Consumer Goods', href: '/#products', isPage: false },
          { id: 'cl13', label: 'Electronics', href: '/#products', isPage: false },
        ]
      }
    ],
    copyright: "© 2024 Moul Tool Systems. All rights reserved."
  }
};

const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Precision Injection Moulding",
    excerpt: "Discover how advanced CNC machining is revolutionizing the production of high-tolerance moulds.",
    content: "Content goes here...",
    date: new Date().toISOString(),
    author: "Admin",
    imageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop",
    published: true
  }
];

const defaultContactForms: ContactForm[] = [
  {
    id: "1",
    name: "General Inquiry",
    fromEmail: "noreply@moultoolsystems.com",
    toEmail: "info@moultoolsystems.com",
    cc: "",
    mode: "simple",
    content: "New inquiry received from website.",
    fields: [
      { id: "f1", label: "Full Name", type: "text", required: true },
      { id: "f2", label: "Email Address", type: "email", required: true },
      { id: "f3", label: "Phone Number", type: "phone", required: false },
      { id: "f4", label: "Message", type: "textarea", required: true }
    ]
  }
];

const defaultFormSubmissions: FormSubmission[] = [
  {
    id: "1",
    formId: "1",
    date: new Date().toISOString(),
    data: {
      "Full Name": "John Doe",
      "Email Address": "john@example.com",
      "Phone Number": "+1 234 567 890",
      "Message": "I am interested in your precision injection moulding services. Can we arrange a call?"
    }
  }
];

const defaultDynamicPages: DynamicPage[] = [];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Load data from localStorage
  const [adminData, setAdminData] = useState<AdminData>(() => {
    const saved = localStorage.getItem('moul_admin_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge with defaultAdminData to ensure all sections exist
        return {
          ...defaultAdminData,
          ...parsed,
          hero: { ...defaultAdminData.hero, ...parsed.hero },
          about: { ...defaultAdminData.about, ...parsed.about },
          services: { ...defaultAdminData.services, ...parsed.services },
          products: { ...defaultAdminData.products, ...parsed.products },
          quality: { ...defaultAdminData.quality, ...parsed.quality },
          contact: { ...defaultAdminData.contact, ...parsed.contact },
        };
      } catch (e) {
        return defaultAdminData;
      }
    }
    return defaultAdminData;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('moul_blog_posts');
    return saved ? JSON.parse(saved) : defaultBlogPosts;
  });

  const [contactForms, setContactForms] = useState<ContactForm[]>(() => {
    const saved = localStorage.getItem('moul_contact_forms');
    return saved ? JSON.parse(saved) : defaultContactForms;
  });

  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>(() => {
    const saved = localStorage.getItem('moul_form_submissions');
    return saved ? JSON.parse(saved) : defaultFormSubmissions;
  });

  const [dynamicPages, setDynamicPages] = useState<DynamicPage[]>(() => {
    const saved = localStorage.getItem('moul_dynamic_pages');
    return saved ? JSON.parse(saved) : defaultDynamicPages;
  });

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('moul_admin_data', JSON.stringify(adminData));
  }, [adminData]);

  useEffect(() => {
    localStorage.setItem('moul_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('moul_contact_forms', JSON.stringify(contactForms));
  }, [contactForms]);

  useEffect(() => {
    localStorage.setItem('moul_form_submissions', JSON.stringify(formSubmissions));
  }, [formSubmissions]);

  useEffect(() => {
    localStorage.setItem('moul_dynamic_pages', JSON.stringify(dynamicPages));
  }, [dynamicPages]);

  // Auth logic
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('moul_admin_logged_in') === 'true';
    setIsAdmin(loggedIn);
  }, []);

  const login = (username: string, password: string) => {
    if (username === 'Admin' && password === 'admin@1234') {
      setIsAdmin(true);
      sessionStorage.setItem('moul_admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('moul_admin_logged_in');
  };

  const updateAdminData = (data: Partial<AdminData>) => {
    setAdminData(prev => ({ ...prev, ...data }));
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now().toString() };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...post } : p));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const addContactForm = (form: Omit<ContactForm, 'id'>) => {
    const newForm = { ...form, id: Date.now().toString() };
    setContactForms(prev => [newForm, ...prev]);
  };

  const updateContactForm = (id: string, form: Partial<ContactForm>) => {
    setContactForms(prev => prev.map(f => f.id === id ? { ...f, ...form } : f));
  };

  const deleteContactForm = (id: string) => {
    setContactForms(prev => prev.filter(f => f.id !== id));
  };

  const addFormSubmission = (submission: Omit<FormSubmission, 'id' | 'date'>) => {
    const newSubmission = { 
      ...submission, 
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setFormSubmissions(prev => [newSubmission, ...prev]);
  };

  const deleteFormSubmission = (id: string) => {
    setFormSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const addDynamicPage = (page: Omit<DynamicPage, 'id'>) => {
    const newPage = { ...page, id: Date.now().toString() };
    setDynamicPages(prev => [newPage, ...prev]);
  };

  const updateDynamicPage = (id: string, page: Partial<DynamicPage>) => {
    setDynamicPages(prev => prev.map(p => p.id === id ? { ...p, ...page } : p));
  };

  const deleteDynamicPage = (id: string) => {
    setDynamicPages(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      login,
      logout,
      adminData,
      updateAdminData,
      blogPosts,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      contactForms,
      addContactForm,
      updateContactForm,
      deleteContactForm,
      formSubmissions,
      addFormSubmission,
      deleteFormSubmission,
      dynamicPages,
      addDynamicPage,
      updateDynamicPage,
      deleteDynamicPage
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
