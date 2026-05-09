import { useState } from "react";
import { useAdmin, BlogPost } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

export default function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);

  const handleCreateNew = () => {
    setCurrentPost({
      title: "",
      excerpt: "",
      content: "",
      author: "Admin",
      date: new Date().toISOString(),
      imageUrl: "",
      published: false
    });
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteBlogPost(id);
      toast({
        title: "Post Deleted",
        description: "The blog post has been removed.",
      });
    }
  };

  const handleSave = () => {
    if (!currentPost?.title || !currentPost?.content) {
      toast({
        title: "Validation Error",
        description: "Title and content are required.",
        variant: "destructive"
      });
      return;
    }

    if (currentPost.id) {
      updateBlogPost(currentPost.id, currentPost);
      toast({ title: "Post Updated", description: "Changes have been saved." });
    } else {
      addBlogPost(currentPost as Omit<BlogPost, 'id'>);
      toast({ title: "Post Created", description: "New blog post has been published." });
    }
    
    setIsEditing(false);
    setCurrentPost(null);
  };

  if (isEditing && currentPost) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-white">
            {currentPost.id ? "Edit Post" : "Create New Post"}
          </h1>
          <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5 mr-2" /> Cancel
          </Button>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-slate-300">Post Title</Label>
                <Input 
                  value={currentPost.title || ""} 
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                  className="bg-slate-950 border-slate-800 text-white font-medium text-lg"
                  placeholder="Enter a compelling title..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Author</Label>
                <Input 
                  value={currentPost.author || ""} 
                  onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={currentPost.published ? "default" : "outline"}
                    className={currentPost.published ? "bg-green-600 hover:bg-green-700 text-white" : "border-slate-700 text-slate-300"}
                    onClick={() => setCurrentPost({...currentPost, published: !currentPost.published})}
                  >
                    {currentPost.published ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                    {currentPost.published ? "Published" : "Draft Status"}
                  </Button>
                  <span className="text-sm text-slate-400 ml-2">
                    Toggle to make visible to public
                  </span>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-slate-300">Featured Image URL</Label>
                <div className="flex gap-4">
                  <Input 
                    value={currentPost.imageUrl || ""} 
                    onChange={(e) => setCurrentPost({...currentPost, imageUrl: e.target.value})}
                    className="bg-slate-950 border-slate-800 text-white flex-1"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {currentPost.imageUrl && (
                  <div className="mt-4 h-48 rounded-md overflow-hidden relative border border-slate-800">
                    <img 
                      src={currentPost.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-slate-300">Short Excerpt (Shows in blog list)</Label>
                <Textarea 
                  value={currentPost.excerpt || ""} 
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  className="bg-slate-950 border-slate-800 text-white h-20 resize-none"
                  placeholder="A brief summary of the article..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-slate-300">Full Content (Supports markdown/HTML markup in real app)</Label>
                <Textarea 
                  value={currentPost.content || ""} 
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  className="bg-slate-950 border-slate-800 text-white min-h-[300px]"
                  placeholder="Write your article content here..."
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-900/50 border-t border-slate-800 pt-6">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" /> Save Post
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Blog Manager</h1>
          <p className="text-slate-400">Create, edit, and manage company news and articles.</p>
        </div>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {blogPosts.length === 0 ? (
          <Card className="bg-slate-900 border-slate-800 border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-48 text-center text-slate-400">
              <FileText className="w-12 h-12 mb-4 text-slate-600" />
              <p>No blog posts found.</p>
              <Button variant="link" onClick={handleCreateNew} className="text-primary mt-2">
                Create your first post
              </Button>
            </CardContent>
          </Card>
        ) : (
          blogPosts.map((post) => (
            <Card key={post.id} className="bg-slate-900 border-slate-800 overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-800">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-xl font-display font-semibold text-white">{post.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.published ? 'bg-green-950 text-green-400' : 'bg-amber-950 text-amber-400'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="text-sm text-slate-500">
                    {format(new Date(post.date), "MMM d, yyyy")} • By {post.author}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-slate-700 bg-transparent text-slate-300 hover:text-white" onClick={() => handleEdit(post)}>
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-red-900/50 bg-transparent text-red-400 hover:bg-red-950 hover:text-red-300" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
