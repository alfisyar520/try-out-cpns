export type QuestionCategory = "twk" | "tiu" | "tkp";

export type OptionKey = "A" | "B" | "C" | "D";

export type QuestionOption = {
  key: OptionKey;
  text: string;
};

export type Question = {
  id: string;
  category: QuestionCategory;
  text: string;
  options: QuestionOption[];
  correctKey: OptionKey;
};

export type PublicQuestion = Omit<Question, "correctKey">;

export type SubmitAnswer = { questionId: string; chosen: OptionKey };

export type SubmitPayload = {
  answers: SubmitAnswer[];
  category?: string;
  variant?: number;
};
