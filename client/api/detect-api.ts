export interface DetectApiResponseSuccess {
  status: "SUCCESS";
  chefMessage: string;
  ingredients: string[];
}

export interface DetectApiResponseFailure {
  status: "FAILURE_INSUFFICIENT_INGREDIENTS";
  chefMessage: string;
}

export type DetectApiResponse =
  | DetectApiResponseSuccess
  | DetectApiResponseFailure;
