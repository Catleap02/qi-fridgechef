import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChefHat, Home, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Recipes", href: "/recipes" },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-gradient-to-b from-orange-50 to-yellow-50"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              FridgeChef
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span className="font-medium text-gray-900">{item.label}</span>
              </Link>
            ))}
            <hr className="border-orange-200" />
            <Button variant="outline" className="justify-start gap-3">
              <User className="h-5 w-5" />
              Sign In
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
