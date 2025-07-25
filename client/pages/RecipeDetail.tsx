import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  CheckCircle2,
  BookOpen,
  Heart,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileMenu from "@/components/MobileMenu";
import { DetailedRecipe } from "@/api/recipe-api";

export default function RecipeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get the recipe object passed from the Results page
  const recipe = location.state?.recipe as DetailedRecipe | undefined;

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
                  {" "}
                  <ChefHat className="h-6 w-6 text-white" />{" "}
                </div>
                <span className="font-bold text-xl text-gray-900">
                  {" "}
                  FridgeChef{" "}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {recipe.dishName}
                </h1>
                {/* Placeholder for image if available in the future */}
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500">Recipe Image</span>
                </div>
                <p className="text-gray-600">
                  A delicious {recipe.dishName.toLowerCase()} recipe made with
                  the ingredients from your fridge.
                </p>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction) => (
                    <div key={instruction.step} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {instruction.step}
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700">
                          {instruction.description}
                        </p>
                        {instruction.chefTip && (
                          <div className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-sm">
                            <span className="font-semibold text-yellow-800">
                              💡 Chef's Tip:
                            </span>
                            <p className="text-gray-600 inline ml-1">
                              {instruction.chefTip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Ingredients */}
          <div className="space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Ingredients from Your Fridge</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.requiredIngredients.fromFridge.map((ing, i) => (
                    <li
                      key={`fridge-${i}`}
                      className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-orange-100"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-gray-900">{ing}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Pantry Staples / Seasoning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.requiredIngredients.pantryStaples.map((ing, i) => (
                    <li
                      key={`pantry-${i}`}
                      className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-orange-100"
                    >
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <span className="font-medium text-gray-900">{ing}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
