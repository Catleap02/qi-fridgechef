// 레시피 추천 목록의 각 항목 타입
export interface RecipeRecommendation {
  dishName: string;
  description: string;
  estimatedTimeMin: number;
  difficulty: string;
}

// 상세 레시피의 단계별 설명 타입
export interface InstructionStep {
  step: number;
  description: string;
  chefTip?: string;
}

// 상세 레시피의 필요 재료 타입
export interface RequiredIngredients {
  fromFridge: string[];
  pantryStaples: string[];
}

// 상세 레시피 전체 타입
export interface DetailedRecipe {
  dishName: string;
  requiredIngredients: RequiredIngredients;
  instructions: InstructionStep[];
}

// API 성공 응답 타입
export interface RecipeApiResponseSuccess {
  status: "SUCCESS";
  chefMessage: string;
  recipeRecommendations: RecipeRecommendation[];
  detailedRecipes: DetailedRecipe[];
}

// API 실패 응답 타입
export interface RecipeApiResponseFailure {
  status: "FAILURE_INSUFFICIENT_INGREDIENTS";
  chefMessage: string;
}

// API 응답 통합 타입
export type RecipeApiResponse =
  | RecipeApiResponseSuccess
  | RecipeApiResponseFailure;
