import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MobileMenu from "@/components/MobileMenu";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = {
    id: "1",
    name: "Chicken Tomato Stir Fry",
    image: "/placeholder.svg",
    cookTime: "25 min",
    prepTime: "15 min",
    difficulty: "Easy",
    servings: 2,
    rating: 4.8,
    reviews: 127,
    calories: 320,
    category: "Main Course",
    tags: ["High Protein", "Low Calorie", "Healthy"],
    description:
      "A healthy and delicious stir fry made with fresh tomatoes and tender chicken breast. High in protein and low in calories, perfect for a healthy meal.",
    ingredients: [
      { name: "Chicken Breast", amount: "300g", calories: 165 },
      { name: "Tomato", amount: "2 medium", calories: 36 },
      { name: "Onion", amount: "1/2 piece", calories: 20 },
      { name: "Garlic", amount: "3 cloves", calories: 12 },
      { name: "Olive Oil", amount: "1 tbsp", calories: 119 },
      { name: "Salt", amount: "to taste", calories: 0 },
      { name: "Pepper", amount: "to taste", calories: 0 },
      { name: "Basil", amount: "for garnish", calories: 1 },
    ],
    instructions: [
      {
        step: 1,
        title: "Prepare ingredients",
        description:
          "Cut chicken breast into bite-sized pieces, slice tomatoes into wedges, julienne the onion, and thinly slice garlic.",
        time: "5 min",
      },
      {
        step: 2,
        title: "Cook chicken",
        description:
          "Heat olive oil in a pan over medium heat. Cook chicken pieces until golden brown on the outside, about 5-7 minutes.",
        time: "7 min",
      },
      {
        step: 3,
        title: "Add vegetables",
        description:
          "Add garlic and onion to the pan and stir-fry for 1-2 minutes until fragrant. Then add tomatoes and stir-fry together.",
        time: "3 min",
      },
      {
        step: 4,
        title: "Season",
        description:
          "Season with salt and pepper to taste. Continue cooking for 2-3 more minutes until tomatoes are softened.",
        time: "3 min",
      },
      {
        step: 5,
        title: "Finish and serve",
        description:
          "Turn off heat and garnish with fresh basil. Serve immediately.",
        time: "1 min",
      },
    ],
    nutrition: {
      calories: 320,
      protein: 45,
      carbs: 12,
      fat: 10,
      fiber: 3,
      sodium: 380,
    },
    tips: [
      "Don't overcook the chicken to keep it tender and juicy.",
      "Cook tomatoes just until tender to maintain their texture.",
      "You can substitute basil with parsley or rosemary.",
    ],
  };

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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardContent className="p-0">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-orange-100 text-orange-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {recipe.name}
                  </h1>
                  <p className="text-gray-600 mb-6">{recipe.description}</p>

                  {/* Recipe Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-gray-900">
                        {recipe.cookTime}
                      </div>
                      <div className="text-sm text-gray-600">Cook Time</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-gray-900">
                        {recipe.servings}
                      </div>
                      <div className="text-sm text-gray-600">Servings</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Star className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-gray-900">
                        {recipe.rating}
                      </div>
                      <div className="text-sm text-gray-600">
                        {recipe.reviews} reviews
                      </div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="font-semibold text-gray-900 text-lg">
                        {recipe.calories}
                      </div>
                      <div className="text-sm text-gray-600">kcal</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Ingredients (serves {recipe.servings})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-orange-100"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-gray-900">
                          {ingredient.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {ingredient.amount}
                        </div>
                        <div className="text-sm text-gray-600">
                          {ingredient.calories} kcal
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                          {instruction.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {instruction.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {instruction.time}
                          </Badge>
                        </div>
                        <p className="text-gray-600">
                          {instruction.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Cooking Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                      <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-yellow-800">
                          💡
                        </span>
                      </div>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nutrition Facts */}
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Nutrition Facts</CardTitle>
                <p className="text-sm text-gray-600">Per serving</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Calories</span>
                    <span className="font-semibold">
                      {recipe.nutrition.calories} kcal
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Protein</span>
                    <span className="font-semibold">
                      {recipe.nutrition.protein}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Carbs</span>
                    <span className="font-semibold">
                      {recipe.nutrition.carbs}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fat</span>
                    <span className="font-semibold">
                      {recipe.nutrition.fat}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fiber</span>
                    <span className="font-semibold">
                      {recipe.nutrition.fiber}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sodium</span>
                    <span className="font-semibold">
                      {recipe.nutrition.sodium}mg
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Recipes */}
            <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle>Similar Recipes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Vegetable Chicken Stew",
                      time: "40 min",
                      rating: 4.6,
                    },
                    {
                      name: "Simple Chicken Salad",
                      time: "15 min",
                      rating: 4.7,
                    },
                    {
                      name: "Grilled Chicken Breast",
                      time: "20 min",
                      rating: 4.5,
                    },
                  ].map((relatedRecipe, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-orange-100 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <img
                        src="/placeholder.svg"
                        alt={relatedRecipe.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {relatedRecipe.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          {relatedRecipe.time}
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {relatedRecipe.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
