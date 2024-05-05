import { TestExample } from "@/pages/admin/AddProblem";

export interface IProblemDetails {
  name: string;
  description: string;
  difficulty: string;
  level: number;
  categories?: string[];
  examples: TestExample[];
}
