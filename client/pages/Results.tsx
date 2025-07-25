import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChefHat,
  Zap,
  Clock,
  Star,
  ExternalLink,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "@/components/MobileMenu";
import { Progress } from "@/components/ui/progress";
import {
  RecipeApiResponse,
  RecipeRecommendation,
  DetailedRecipe,
} from "@/api/recipe-api";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirmedIngredients, imageUrl } =
    (location.state as {
      confirmedIngredients: string[];
      imageUrl: string;
    }) || {};

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<
    RecipeRecommendation[]
  >([]);
  const [detailedRecipes, setDetailedRecipes] = useState<DetailedRecipe[]>([]);
  const [chefMessage, setChefMessage] = useState("");

  useEffect(() => {
    const generateRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: confirmedIngredients }),
        });
        const result: RecipeApiResponse = await response.json();
        if (!response.ok) {
          throw new Error(
            (result as any).chefMessage || "Failed to generate recipes.",
          );
        }

        if (result.status === "SUCCESS") {
          setRecommendations(result.recipeRecommendations);
          setDetailedRecipes(result.detailedRecipes);
          setChefMessage(result.chefMessage);
        } else {
          setError(result.chefMessage);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    generateRecipes();
  }, [confirmedIngredients, navigate]);

  const handleRecipeClick = (dishName: string) => {
    const recipeDetail = detailedRecipes.find((r) => r.dishName === dishName);
    if (recipeDetail) {
      navigate(`/recipe/${encodeURIComponent(dishName)}`, {
        state: { recipe: recipeDetail },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
            <CardContent className="p-12">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <ChefHat className="h-10 w-10 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Generating recipe suggestions...
              </h2>
              <p className="text-gray-600 mb-6">
                Creating personalized recipes based on your ingredients.
              </p>
              <Progress value={75} className="w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center p-8">
          <Card className="bg-white/50 backdrop-blur-sm border-orange-200 p-8">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">{error}</h2>
            <p className="text-gray-600 mb-6">
              Please try again with different ingredients.
            </p>
            <Button onClick={() => navigate("/")}>Go Back to Start</Button>
          </Card>
        </div>
      </div>
    );
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
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Recipe Suggestions
          </h1>
          <p className="text-gray-600">{chefMessage}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recipe) => (
            <Card
              key={recipe.dishName}
              className="bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleRecipeClick(recipe.dishName)}
            >
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {recipe.dishName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  {recipe.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    {recipe.estimatedTimeMin} min
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    Difficulty: {recipe.difficulty}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            <Zap className="mr-2 h-5 w-5" />
            Analyze New Ingredients
          </Button>
        </div>
      </div>
    </div>
  );
}
