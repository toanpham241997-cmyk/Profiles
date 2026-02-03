import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Menu, User as UserIcon, LogOut, ChevronRight, Facebook, MessageSquare, Phone } from "lucide-react";
import { TechButton } from "./TechButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <ChevronRight className="w-4 h-4" />, onClick: () => setLocation("/") },
    { label: "Account Info", icon: <UserIcon className="w-4 h-4" />, onClick: () => setLocation("/profile") },
    { label: "Settings", icon: <ChevronRight className="w-4 h-4" />, onClick: () => setLocation("/profile") },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com/havanhuan", color: "hover:text-blue-500" },
    { icon: <MessageSquare className="w-5 h-5" />, href: "https://m.me/havanhuan", color: "hover:text-blue-400" },
    { icon: <Phone className="w-5 h-5" />, href: "https://zalo.me/havanhuan", color: "hover:text-cyan-500" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b-2 border-primary/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo Area - Click to open sidebar if logged in */}
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => user && setSidebarOpen(true)}
          >
            <div className="relative w-10 h-10 bg-primary clip-button flex items-center justify-center group-hover:bg-accent transition-colors">
              <span className="font-display font-bold text-white text-xl">H</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-none">Hà Văn Huấn</h1>
              <p className="font-tech text-xs text-muted-foreground uppercase tracking-widest">Fullstack Developer</p>
            </div>
          </div>

          {/* Navigation / User Area */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden md:inline font-tech text-sm text-muted-foreground">
                  Welcome, <span className="text-primary font-bold">{user.username}</span>
                </span>
                <TechButton variant="outline" size="sm" onClick={() => setSidebarOpen(true)} icon={<Menu className="w-4 h-4" />}>
                  Menu
                </TechButton>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <TechButton variant="ghost" size="sm">Login</TechButton>
                </Link>
                <Link href="/register">
                  <TechButton variant="primary" size="sm">Register</TechButton>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Decorative bottom border line with accent */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      </header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && user && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 left-0 h-full w-80 bg-background z-50 border-r-4 border-primary shadow-2xl overflow-y-auto"
            >
              <div className="p-8 flex flex-col min-h-full">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display text-primary font-black uppercase italic">System Menu</h2>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-muted rounded-full">
                    <ChevronRight className="w-6 h-6 rotate-180" />
                  </button>
                </div>

                <div className="bg-secondary/30 p-6 clip-tech-card mb-8 border border-primary/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/50 shadow-inner">
                      <UserIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{user.fullName || user.username}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase font-tech tracking-tighter">{user.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 font-tech text-xs">
                    <div className="flex justify-between border-b border-primary/5 pb-1">
                      <span className="text-muted-foreground uppercase">Identity</span>
                      <span>#{user.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-primary/5 pb-1">
                      <span className="text-muted-foreground uppercase">Status</span>
                      <span className="text-green-500 font-bold uppercase animate-pulse">Online</span>
                    </div>
                  </div>
                </div>

                <nav className="space-y-1 mb-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.onClick();
                        setSidebarOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-primary/10 border-l-4 border-transparent hover:border-primary transition-all font-display uppercase text-xs tracking-widest flex items-center justify-between group"
                    >
                      {item.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                      </span>
                    </button>
                  ))}
                </nav>

                <div className="mt-auto space-y-6">
                  <div className="flex justify-center gap-6 py-4 border-t border-primary/10">
                    {socialLinks.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("text-muted-foreground transition-all transform hover:scale-125", social.color)}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>

                  <TechButton 
                    variant="destructive" 
                    className="w-full" 
                    onClick={() => {
                      logout();
                      setSidebarOpen(false);
                    }}
                    icon={<LogOut className="w-4 h-4" />}
                  >
                    Disconnect
                  </TechButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
