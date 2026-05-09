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
    return saved ? JSON.parse(saved) : defaultAdminData;
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
