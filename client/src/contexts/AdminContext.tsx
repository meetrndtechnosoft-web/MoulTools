import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our admin data
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
  };
  services: {
    title: string;
    subtitle: string;
    description: string;
  };
  products: {
    title: string;
    subtitle: string;
    description: string;
  };
  quality: {
    title: string;
    subtitle: string;
    description: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    address: string;
    workingHours: string;
  };
  contactEmail: string;
  contactPhone: string;
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
    mission: "To deliver innovative, high-quality tools that empower our clients to manufacture with excellence."
  },
  services: {
    title: "Services & Capabilities",
    subtitle: "Our Services",
    description: "Comprehensive mould design, precision machining, and engineering services tailored to your manufacturing requirements."
  },
  products: {
    title: "Complete Product Range",
    subtitle: "Our Products",
    description: "From prototype moulds to high-volume production tooling, we offer comprehensive solutions for all your manufacturing needs."
  },
  quality: {
    title: "Committed to Excellence",
    subtitle: "Quality Assurance",
    description: "Quality is at the heart of everything we do. Every component undergoes dimensional inspection, assembly validation, and trial runs to ensure it meets the highest standards."
  },
  contact: {
    title: "Contact Us",
    subtitle: "Get In Touch",
    description: "Ready to discuss your tooling requirements? Get in touch with our team and let's bring your project to life.",
    address: "MOUL TOOL SYSTEMS\nBALAJI INDUSTRIAL PARK,\nSY.NO-210/2(OLD Sy. No.121/1), PLOT No. 2,\nMORAI VILLAGE, VAPI,\nDISTRICT- VALSAD, GUJARAT 396191",
    workingHours: "Monday - Saturday\n9:00 AM - 6:00 PM IST"
  },
  contactEmail: "info@moultoolsystems.com",
  contactPhone: "+91 123 456 7890"
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

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('moul_admin_data', JSON.stringify(adminData));
  }, [adminData]);

  useEffect(() => {
    localStorage.setItem('moul_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

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
      deleteBlogPost
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
