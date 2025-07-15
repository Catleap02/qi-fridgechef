import { Link } from "react-router-dom";
import { ChefHat, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto bg-white/50 backdrop-blur-sm border-orange-200">
          <CardContent className="p-8 text-center">
            <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Page not found
            </h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/recipes">
                  <ChefHat className="mr-2 h-4 w-4" />
                  Browse Recipes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
