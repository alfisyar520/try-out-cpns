import type { QuestionCategory } from "@/lib/types";

export type CategoryInfo = {
  id: QuestionCategory;
  title: string;
  subtitle: string;
  description: string;
};

export const CATEGORY_LIST: CategoryInfo[] = [
  {
    id: "twk",
    title: "TWK",
    subtitle: "Wawasan Kebangsaan",
    description: "Pancasila, UUD 1945, NKRI, sejarah nasional.",
  },
  {
    id: "tiu",
    title: "TIU",
    subtitle: "Intelegensi Umum",
    description: "Logika, numerasi, deret, sinonim & antonim.",
  },
  {
    id: "tkp",
    title: "TKP",
    subtitle: "Karakteristik Pribadi",
    description: "Situasi layanan & etika aparatur sipil.",
  },
];
