import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type User } from "@shared/schema";
import { useUser, useUpdateUser } from "@/hooks/use-auth";
import { TechButton } from "@/components/TechButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { User as UserIcon, Mail, Phone, Facebook, MessageSquare, Link as LinkIcon } from "lucide-react";

export default function Profile() {
  const { data: user } = useUser();
  const updateProfile = useUpdateUser();

  const form = useForm({
    resolver: zodResolver(insertUserSchema.partial()),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      facebookUrl: user?.facebookUrl || "",
      zaloUrl: user?.zaloUrl || "",
    },
  });

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="clip-tech-card border-2 border-primary shadow-2xl bg-card">
          <CardHeader className="bg-primary/10 border-b-2 border-primary/20 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20">
                <UserIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-display font-black uppercase tracking-tighter">Edit Account</CardTitle>
                <p className="text-muted-foreground font-tech text-xs uppercase tracking-widest">Update your digital identity</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => updateProfile.mutate(data))} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-tech text-xs uppercase tracking-wider flex items-center gap-2">
                          <UserIcon className="w-3 h-3" /> Full Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-secondary/30 border-primary/20 focus:border-primary transition-all rounded-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-tech text-xs uppercase tracking-wider flex items-center gap-2">
                          <Mail className="w-3 h-3" /> Email
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="bg-secondary/30 border-primary/20 focus:border-primary transition-all rounded-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-tech text-xs uppercase tracking-wider flex items-center gap-2">
                          <Phone className="w-3 h-3" /> Phone
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-secondary/30 border-primary/20 focus:border-primary transition-all rounded-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-tech text-xs uppercase tracking-wider flex items-center gap-2">
                        Bio / Introduction
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-secondary/30 border-primary/20 focus:border-primary transition-all rounded-none min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4 pt-4 border-t border-primary/10">
                  <h3 className="font-display font-bold text-sm uppercase text-primary">Social Links</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="facebookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-tech text-xs uppercase tracking-wider flex items-center gap-2">
                            <Facebook className="w-3 h-3" /> Facebook URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://facebook.com/..." className="bg-secondary/30 border-primary/20 focus:border-primary transition-all rounded-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zaloUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-tech text-xs uppercase tracking-wider flex items-center gap-2">
                            <LinkIcon className="w-3 h-3" /> Zalo URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://zalo.me/..." className="bg-secondary/30 border-primary/20 focus:border-primary transition-all rounded-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <TechButton
                  type="submit"
                  className="w-full mt-8"
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? "Updating..." : "Save Profile Changes"}
                </TechButton>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
