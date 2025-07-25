import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Search,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "@/components/MobileMenu";
import { DetailedRecipe, RecipeRecommendation } from "@/api/recipe-api";

// A combined type for displaying recipe cards and navigating with full details
interface DisplayRecipe extends RecipeRecommendation, DetailedRecipe {
  image: string; // For the card image
  category: string; // For filtering
  tags: string[]; // For display
}

export default function Recipes() {
  const navigate = useNavigate();

  // State for data, loading, and error handling
  const [allRecipes, setAllRecipes] = useState<DisplayRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/recipes/");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes. Please try again later.");
        }
        const data: { recipes: DisplayRecipe[] } = await response.json();
        setAllRecipes(data.recipes);

        // Dynamically create category list from fetched data
        const uniqueCategories = [
          "All",
          ...new Set(data.recipes.map((r) => r.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleRecipeClick = (recipe: DisplayRecipe) => {
    // Navigate to detail page with the full recipe object
    // RecipeDetail component expects an object with the shape of DetailedRecipe
    navigate(`/recipe/${encodeURIComponent(recipe.dishName)}`, {
      state: { recipe },
    });
  };

  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesSearch = recipe.dishName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <header className="border-b border-orange-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Home
              </Button>
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-xl">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900">
                  FridgeChef
                </span>
              </div>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore All Recipes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of delicious recipes.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-orange-200"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-gray-600">Loading recipes...</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-4 text-xl font-semibold text-red-700">
              Failed to load recipes
            </h3>
            <p className="mt-2 text-gray-600">{error}</p>
          </div>
        )}

        {/* Recipe Grid */}
        {!isLoading && !error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card
                  key={recipe.dishName}
                  className="bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.dishName}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors truncate">
                        {recipe.dishName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 h-10 overflow-hidden">
                        {recipe.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {recipe.estimatedTimeMin} min
                        </div>
                        <Badge
                          variant={
                            recipe.difficulty === "하"
                              ? "secondary"
                              : recipe.difficulty === "중"
                                ? "outline"
                                : "destructive"
                          }
                          className={
                            recipe.difficulty === "하"
                              ? "bg-green-100 text-green-800"
                              : recipe.difficulty === "중"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {recipe.difficulty === "하"
                            ? "Easy"
                            : recipe.difficulty === "중"
                              ? "Medium"
                              : "Hard"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {recipe.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State for Filters */}
            {filteredRecipes.length === 0 && allRecipes.length > 0 && (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  No recipes found
                </h3>
                <p className="mt-2 text-gray-600">
                  Try adjusting your search or filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
