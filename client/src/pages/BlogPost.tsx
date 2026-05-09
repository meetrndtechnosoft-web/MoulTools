import { useAdmin } from "@/contexts/AdminContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const { id } = useParams();
  const { blogPosts } = useAdmin();
  
  const post = blogPosts.find(p => p.id === id && p.published);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        {/* Post Header with Image */}
        <div className="w-full h-[40vh] md:h-[60vh] relative">
          {post.imageUrl ? (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-end pb-12">
            <div className="max-w-4xl mx-auto px-4 w-full">
              <Link href="/blog">
                <a className="inline-flex items-center text-primary hover:text-white transition-colors mb-6 text-sm font-medium">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
                </a>
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:font-display prose-headings:text-white prose-a:text-primary">
            {/* In a real app we'd parse markdown here, but for mockup we render text with basic line breaks */}
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-800">
            <h3 className="text-xl font-display font-bold text-white mb-6">Share this article</h3>
            <div className="flex gap-4">
              <Button variant="outline" className="border-slate-800 text-slate-300 hover:text-white">Twitter</Button>
              <Button variant="outline" className="border-slate-800 text-slate-300 hover:text-white">LinkedIn</Button>
              <Button variant="outline" className="border-slate-800 text-slate-300 hover:text-white">Facebook</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
