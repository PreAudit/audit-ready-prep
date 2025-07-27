import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Home, BookOpen, Mail, FolderOpen } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/learn-more", label: "Learn More", icon: BookOpen },
    { path: "/portfolio", label: "Portfolio", icon: FolderOpen },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-2 left-2 z-50 h-8 w-8 rounded-full border-2 backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-200"
        >
          <Menu className="h-3 w-3" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pb-8">
        <DrawerHeader>
          <DrawerTitle className="text-center">Navigation</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start h-12 text-left"
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}