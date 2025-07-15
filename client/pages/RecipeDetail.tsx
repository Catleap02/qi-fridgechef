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

  // Mock recipe data - in a real app, you'd fetch this based on the ID
  const recipe = {
    id: "1",
    name: "닭가슴살 토마토 볶음",
    image: "/placeholder.svg",
    cookTime: "25분",
    prepTime: "15분",
    difficulty: "쉬움",
    servings: 2,
    rating: 4.8,
    reviews: 127,
    calories: 320,
    category: "메인요리",
    tags: ["고단백", "저칼로리", "건강식"],
    description:
      "신선한 토마토와 부드러운 닭가슴살로 만드는 건강하고 맛있는 볶음 요리입니다. 단백질이 풍부하면서도 칼로리가 낮아 다이어트 중에도 안심하고 드실 수 있습니다.",
    ingredients: [
      { name: "닭가슴살", amount: "300g", calories: 165 },
      { name: "토마토", amount: "2개 (중간 크기)", calories: 36 },
      { name: "양파", amount: "1/2개", calories: 20 },
      { name: "마늘", amount: "3쪽", calories: 12 },
      { name: "올리브오일", amount: "1큰술", calories: 119 },
      { name: "소금", amount: "약간", calories: 0 },
      { name: "후추", amount: "약간", calories: 0 },
      { name: "바질", amount: "장식용", calories: 1 },
    ],
    instructions: [
      {
        step: 1,
        title: "재료 준비하기",
        description:
          "닭가슴살은 한입 크기로 자르고, 토마토는 쐐기 모양으로, 양파는 채 썰어주세요. 마���은 얇게 슬라이스합니다.",
        time: "5분",
      },
      {
        step: 2,
        title: "닭가슴살 볶기",
        description:
          "팬에 올리브오일을 두르고 중간 불에서 닭가슴살을 볶아주세요. 겉면이 노릇해질 때까지 약 5-7분간 볶습니다.",
        time: "7분",
      },
      {
        step: 3,
        title: "야채 볶기",
        description:
          "닭가슴살이 익으면 마늘과 양파를 넣고 1-2분간 볶아 향을 낸 후, 토마토를 넣고 함께 볶아주세요.",
        time: "3분",
      },
      {
        step: 4,
        title: "양념하기",
        description:
          "소금과 후추로 간을 맞추고, 토마토가 부드러워질 때까지 2-3분 더 볶아주세요.",
        time: "3분",
      },
      {
        step: 5,
        title: "마무리",
        description:
          "불을 끄고 신선한 바질을 올려 장식한 후 바로 서빙해주세요.",
        time: "1분",
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
      "닭가슴살이 퍽퍽해지지 않도록 너무 오래 볶지 마세요.",
      "토마토는 너무 익지 않게 적당히 볶아야 식감이 좋습니다.",
      "바질 대신 파슬리나 로즈마리를 사용해도 좋습니다.",
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
                돌아가기
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
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                저장
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                공유
              </Button>
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
                      <div className="text-sm text-gray-600">조리시간</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-gray-900">
                        {recipe.servings}인분
                      </div>
                      <div className="text-sm text-gray-600">인분</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Star className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-gray-900">
                        {recipe.rating}
                      </div>
                      <div className="text-sm text-gray-600">
                        {recipe.reviews}개 리뷰
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
                <CardTitle>재료 ({recipe.servings}인분 기준)</CardTitle>
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
                <CardTitle>조리 과정</CardTitle>
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
                <CardTitle>요리 팁</CardTitle>
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
                <CardTitle>영양 정보</CardTitle>
                <p className="text-sm text-gray-600">1인분 기준</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">칼로리</span>
                    <span className="font-semibold">
                      {recipe.nutrition.calories} kcal
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">단백질</span>
                    <span className="font-semibold">
                      {recipe.nutrition.protein}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">탄수화물</span>
                    <span className="font-semibold">
                      {recipe.nutrition.carbs}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">지방</span>
                    <span className="font-semibold">
                      {recipe.nutrition.fat}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">섬유질</span>
                    <span className="font-semibold">
                      {recipe.nutrition.fiber}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">나트륨</span>
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
                <CardTitle>비슷한 레시피</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "채소 닭고기 스튜", time: "40분", rating: 4.6 },
                    { name: "간단한 치킨 샐러드", time: "15분", rating: 4.7 },
                    { name: "닭가슴살 그릴", time: "20분", rating: 4.5 },
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
