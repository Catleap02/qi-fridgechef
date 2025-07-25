import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChefHat,
  Zap,
  Plus,
  X,
  Edit2,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import MobileMenu from "@/components/MobileMenu";
import { DetectApiResponse } from "@/api/detect-api";

// 프런트엔드에서 사용할 재료 객체 타입
interface Ingredient {
  id: string;
  name: string;
}

export default function IngredientConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageFile, imageUrl } = location.state || {};

  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [chefMessage, setChefMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    const analyze = async () => {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const response = await fetch("/api/fridges/analyze", {
          method: "POST",
          body: formData,
        });
        const result: DetectApiResponse = await response.json();
        if (!response.ok) {
          throw new Error(result.chefMessage || "Failed to analyze image.");
        }
        setChefMessage(result.chefMessage);
        if (result.status === "SUCCESS") {
          const ingredientsWithIds = result.ingredients.map((name) => ({
            id: crypto.randomUUID(),
            name: name,
          }));
          setIngredients(ingredientsWithIds);
        } else {
          setIngredients([]);
        }
      } catch (err: any) {
        setError(err.message || "Error analyzing image.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    analyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const removeIngredient = (idToRemove: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== idToRemove));
  };

  const startEditing = (ingredient: Ingredient) => {
    setEditingId(ingredient.id);
    setEditValue(ingredient.name);
  };

  const saveEdit = () => {
    if (editingId && editValue.trim()) {
      setIngredients(
        ingredients.map((ing) =>
          ing.id === editingId ? { ...ing, name: editValue.trim() } : ing,
        ),
      );
    }
    setEditingId(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      const newIng: Ingredient = {
        id: crypto.randomUUID(),
        name: newIngredient.trim(),
      };
      setIngredients([...ingredients, newIng]);
      setNewIngredient("");
    }
  };

  const proceedToRecipes = () => {
    if (ingredients.length === 0) {
      alert("At least one ingredient is required to get recipe suggestions.");
      return;
    }
    const confirmedIngredientNames = ingredients.map((ing) => ing.name);
    navigate("/results", {
      state: {
        confirmedIngredients: confirmedIngredientNames,
        imageUrl: imageUrl,
      },
    });
  };

  if (!imageFile && !imageUrl) {
    if (!isAnalyzing) navigate("/");
    return null;
  }

  if (error) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Occurred</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <Button onClick={() => navigate("/")}>Go Back to Start</Button>
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
                onClick={() => navigate("/")}
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
                  {" "}
                  Detecting ingredients...{" "}
                </h2>
                <p className="text-gray-600 mb-6">
                  {" "}
                  {chefMessage ||
                    "AI is analyzing your fridge photo to identify ingredients."}{" "}
                </p>
                <Progress value={75} className="w-full" />
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Confirmation Interface */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Confirm Your Ingredients
              </h1>
              <p className="text-gray-600">
                {chefMessage}
                Review the detected ingredients and make any necessary changes
                before getting recipe suggestions.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Image */}
              <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  {" "}
                  <CardTitle className="flex items-center gap-2">
                    {" "}
                    <Zap className="h-5 w-5 text-primary" /> Your Fridge
                    Photo{" "}
                  </CardTitle>{" "}
                </CardHeader>
                <CardContent>
                  {" "}
                  <img
                    src={imageUrl}
                    alt="Your fridge contents"
                    className="w-full rounded-lg shadow-lg"
                  />{" "}
                </CardContent>
              </Card>

              {/* Right Column - Ingredients */}
              <div className="space-y-6">
                {/* Detected Ingredients Card */}
                <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
                  <CardHeader>
                    {" "}
                    <CardTitle>
                      {" "}
                      Detected Ingredients ({ingredients.length}){" "}
                    </CardTitle>{" "}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ingredients.map((ingredient) => (
                        <div
                          key={ingredient.id}
                          className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-orange-100"
                        >
                          {editingId === ingredient.id ? (
                            <>
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="flex-1"
                                onKeyPress={(e) =>
                                  e.key === "Enter" && saveEdit()
                                }
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={saveEdit}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                {" "}
                                <Check className="h-4 w-4" />{" "}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEdit}
                              >
                                {" "}
                                <X className="h-4 w-4" />{" "}
                              </Button>
                            </>
                          ) : (
                            <>
                              <div className="flex-1">
                                {" "}
                                <span className="font-medium text-gray-900">
                                  {" "}
                                  {ingredient.name}{" "}
                                </span>{" "}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEditing(ingredient)}
                              >
                                {" "}
                                <Edit2 className="h-4 w-4" />{" "}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeIngredient(ingredient.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                {" "}
                                <X className="h-4 w-4" />{" "}
                              </Button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Add New Ingredient Card */}
                <Card className="bg-white/50 backdrop-blur-sm border-orange-200">
                  <CardHeader>
                    {" "}
                    <CardTitle className="text-base">
                      {" "}
                      Add Missing Ingredient{" "}
                    </CardTitle>{" "}
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter ingredient name..."
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                        className="flex-1"
                      />
                      <Button
                        onClick={addIngredient}
                        disabled={!newIngredient.trim()}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {" "}
                        <Plus className="h-4 w-4" />{" "}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button
                    onClick={proceedToRecipes}
                    disabled={ingredients.length === 0}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Confirm & Get Recipe Suggestions
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full"
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
