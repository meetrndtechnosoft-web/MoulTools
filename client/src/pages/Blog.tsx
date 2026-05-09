import { useAdmin } from "@/contexts/AdminContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";

export default function BlogList() {
  const { blogPosts } = useAdmin();
  const publishedPosts = blogPosts.filter(post => post.published);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Company <span className="text-primary">News & Insights</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Stay updated with the latest in precision engineering, manufacturing trends, and company announcements.
            </p>
          </div>

          {publishedPosts.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <a className="group h-full">
                    <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-primary/50 transition-colors h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        {post.imageUrl ? (
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                            <span className="text-slate-500">Moul Tool Systems</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                        </div>
                        <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-slate-400 line-clamp-3 mb-6 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-primary font-medium text-sm uppercase tracking-wider">
                          Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
