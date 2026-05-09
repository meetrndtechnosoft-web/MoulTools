import { useState } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const { login, isAdmin } = useAdmin();
  const [, setLocation] = useLocation();
  const [error, setError] = useState("");

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Redirect if already logged in
  if (isAdmin) {
    setLocation("/admin/dashboard");
    return null;
  }

  const onSubmit = (data: LoginForm) => {
    const success = login(data.username, data.password);
    if (success) {
      setLocation("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Settings className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-display font-bold text-white">Admin Access</CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access the Moul Tool Systems admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" className="bg-slate-950 border-slate-800 text-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" className="bg-slate-950 border-slate-800 text-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && (
                <div className="p-3 bg-red-950/50 border border-red-900 rounded-md text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
              
              <Button type="submit" className="w-full mt-6">
                Login to Dashboard
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
