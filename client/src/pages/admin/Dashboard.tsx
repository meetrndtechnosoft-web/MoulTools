import { useState } from "react";
import { useLocation, Link, Route, Switch } from "wouter";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Settings, FileText, LayoutTemplate, LogOut, Image as ImageIcon, Home } from "lucide-react";

// Sub-pages
import ContentEditor from "./ContentEditor";
import BlogManager from "./BlogManager";

export default function AdminDashboard() {
  const { isAdmin, logout } = useAdmin();
  const [location, setLocation] = useLocation();

  if (!isAdmin) {
    setLocation("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/admin");
  };

  const navItems = [
    { name: "Content Settings", path: "/admin/dashboard", icon: LayoutTemplate },
    { name: "Blog Posts", path: "/admin/blog", icon: FileText },
  ];

  return (
    <div className="h-screen bg-slate-950 flex flex-col md:flex-row text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 h-full">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-display font-bold flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Moul Admin
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.name} href={item.path}>
                <a className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary/20 text-primary font-medium" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}>
                  <Icon className="w-5 h-5" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent border-slate-700 hover:bg-slate-800 p-0" asChild>
            <Link href="/">
              <a target="_blank" className="flex items-center gap-2 w-full px-4 py-2"><Home className="w-4 h-4" /> View Site</a>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-red-950/30"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-950 p-6 md:p-8">
        <Switch>
          <Route path="/admin/dashboard" component={ContentEditor} />
          <Route path="/admin/blog" component={BlogManager} />
        </Switch>
      </main>
    </div>
  );
}
