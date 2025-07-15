import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChefHat,
  Zap,
  Clock,
  Users,
  Star,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import MobileMenu from "@/components/MobileMenu";

interface DetectedIngredient {
  name: string;
  confidence: number;
  calories: number;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

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
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageFile, imageUrl } = location.state || {};
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [ingredients, setIngredients] = useState<DetectedIngredient[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!imageFile || !imageUrl) {
      navigate("/");
      return;
    }

    // Simulate AI analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setIngredients([
        {
          name: "Tomato",
          confidence: 98,
          calories: 18,
          nutrients: { protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
        },
        {
          name: "Onion",
          confidence: 95,
          calories: 40,
          nutrients: { protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
        },
        {
          name: "Garlic",
          confidence: 92,
          calories: 149,
          nutrients: { protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1 },
        },
        {
          name: "Carrot",
          confidence: 89,
          calories: 41,
          nutrients: { protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8 },
        },
        {
          name: "Chicken Breast",
          confidence: 87,
          calories: 165,
          nutrients: { protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
        },
      ]);

      setRecommendedRecipes([
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
        },
      ]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [imageFile, imageUrl, navigate]);

  const totalCalories = ingredients.reduce(
    (sum, ingredient) => sum + ingredient.calories,
    0,
  );

  if (!imageFile || !imageUrl) {
    return null;
  }

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
                Back
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
        {isAnalyzing ? (
          /* Loading State */
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardContent className="p-12">
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-10 w-10 text-primary animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Analyzing ingredients...
                </h2>
                <p className="text-gray-600 mb-6">
                  Please wait while we identify your ingredients.
                </p>
                <Progress value={75} className="w-full" />
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Ingredients */}
            <div className="lg:col-span-2 space-y-6">
              {/* Uploaded Image */}
              <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={imageUrl}
                    alt="Analyzed fridge contents"
                    className="w-full max-h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="text-center">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {ingredients.length} ingredients detected
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Detected Ingredients */}
              <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle>Detected Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-orange-100"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {ingredient.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {ingredient.confidence}% confidence
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>Protein: {ingredient.nutrients.protein}g</div>
                            <div>Carbs: {ingredient.nutrients.carbs}g</div>
                            <div>Fat: {ingredient.nutrients.fat}g</div>
                            <div>Fiber: {ingredient.nutrients.fiber}g</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {ingredient.calories}
                          </div>
                          <div className="text-xs text-gray-500">kcal</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary and Recipes */}
            <div className="space-y-6">
              {/* Nutrition Summary */}
              <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="text-center">
                    Nutrition Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {totalCalories}
                    </div>
                    <div className="text-gray-600">Total Calories (kcal)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-900">
                        {ingredients
                          .reduce((sum, ing) => sum + ing.nutrients.protein, 0)
                          .toFixed(1)}
                        g
                      </div>
                      <div className="text-blue-600">Protein</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-semibold text-yellow-900">
                        {ingredients
                          .reduce((sum, ing) => sum + ing.nutrients.carbs, 0)
                          .toFixed(1)}
                        g
                      </div>
                      <div className="text-yellow-600">Carbs</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-semibold text-red-900">
                        {ingredients
                          .reduce((sum, ing) => sum + ing.nutrients.fat, 0)
                          .toFixed(1)}
                        g
                      </div>
                      <div className="text-red-600">Fat</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-900">
                        {ingredients
                          .reduce((sum, ing) => sum + ing.nutrients.fiber, 0)
                          .toFixed(1)}
                        g
                      </div>
                      <div className="text-green-600">Fiber</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Recipes */}
              <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-primary" />
                    Recipe Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendedRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="p-4 bg-white/70 rounded-lg border border-orange-100 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                      >
                        <div className="flex gap-3">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {recipe.name}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {recipe.cookTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {recipe.servings} servings
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {recipe.rating}
                              </div>
                            </div>
                            <div className="text-xs font-semibold text-primary">
                              {recipe.calories} kcal
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-4" variant="outline">
                    <Link to="/recipes">View All Recipes</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
