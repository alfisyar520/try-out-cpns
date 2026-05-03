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
  explanation?: string | null;
};

export type PublicQuestion = Omit<Question, "correctKey">;

export type SubmitAnswer = { questionId: string; chosen: OptionKey };

export type SubmitPayload = {
  answers: SubmitAnswer[];
  category?: string;
  variant?: number;
};

export type AttemptDetailBase = {
  questionId: string;
  chosen?: string;
  ok: boolean;
  correctKey?: string;
};

export type AttemptHistoryDetail = AttemptDetailBase & {
  questionText: string | null;
  explanation: string | null;
};

export type AttemptSummary = {
  id: string;
  category: string;
  variant: number;
  score: number;
  correct: number;
  total: number;
  createdAt: string;
  details: AttemptHistoryDetail[];
};
