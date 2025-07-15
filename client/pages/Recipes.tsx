import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Users,
  Star,
  Search,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "@/components/MobileMenu";

interface Recipe {
  id: string;
  name: string;
  image: string;
  cookTime: string;
  difficulty: string;
  servings: number;
  rating: number;
  ingredients: string[];
  calories: number;
  category: string;
  tags: string[];
}

export default function Recipes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const recipes: Recipe[] = [
    {
      id: "1",
      name: "Chicken Tomato Stir Fry",
      image: "/placeholder.svg",
      cookTime: "25 min",
      difficulty: "Easy",
      servings: 2,
      rating: 4.8,
      ingredients: ["Chicken Breast", "Tomato", "Onion", "Garlic"],
      calories: 320,
      category: "Main Course",
      tags: ["High Protein", "Low Calorie"],
    },
    {
      id: "2",
      name: "Vegetable Chicken Stew",
      image: "/placeholder.svg",
      cookTime: "40 min",
      difficulty: "Medium",
      servings: 4,
      rating: 4.6,
      ingredients: ["Chicken Breast", "Carrot", "Onion", "Tomato"],
      calories: 280,
      category: "Main Course",
      tags: ["Healthy", "Hearty"],
    },
    {
      id: "3",
      name: "Simple Chicken Salad",
      image: "/placeholder.svg",
      cookTime: "15 min",
      difficulty: "Easy",
      servings: 1,
      rating: 4.7,
      ingredients: ["Chicken Breast", "Tomato", "Onion"],
      calories: 240,
      category: "Salad",
      tags: ["Diet", "Quick"],
    },
    {
      id: "4",
      name: "Garlic Fried Rice",
      image: "/placeholder.svg",
      cookTime: "20 min",
      difficulty: "Easy",
      servings: 2,
      rating: 4.5,
      ingredients: ["Rice", "Garlic", "Onion", "Egg"],
      calories: 380,
      category: "Main Course",
      tags: ["Quick", "Filling"],
    },
    {
      id: "5",
      name: "Carrot Soup",
      image: "/placeholder.svg",
      cookTime: "30 min",
      difficulty: "Medium",
      servings: 3,
      rating: 4.4,
      ingredients: ["Carrot", "Onion", "Garlic", "Milk"],
      calories: 180,
      category: "Soup",
      tags: ["Vegan", "Nutritious"],
    },
    {
      id: "6",
      name: "Tomato Pasta",
      image: "/placeholder.svg",
      cookTime: "25 min",
      difficulty: "Medium",
      servings: 2,
      rating: 4.9,
      ingredients: ["Pasta", "Tomato", "Garlic", "Basil"],
      calories: 420,
      category: "Main Course",
      tags: ["Italian", "Classic"],
    },
  ];

  const categories = ["all", "Main Course", "Salad", "Soup", "Dessert"];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || recipe.category === selectedCategory;
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
                <ArrowLeft className="h-4 w-4" />
                Home
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
            All Recipes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of recipes
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-orange-200"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto">
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
                      {category === "all" ? "All" : category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-black/50 text-white border-none">
                      {recipe.calories} kcal
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {recipe.name}
                  </h3>

                  {/* Recipe Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.servings}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {recipe.rating}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-orange-100 text-orange-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Ingredients Preview */}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Ingredients: </span>
                    {recipe.ingredients.slice(0, 3).join(", ")}
                    {recipe.ingredients.length > 3 && "..."}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-orange-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Discover new ingredients!
              </h2>
              <p className="text-gray-600 mb-6">
                Take a photo of your fridge to get personalized recipe
                suggestions
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Link to="/">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Start New Analysis
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
