export default interface IUserSolvedProblems {
  difficulty: string;
  problemName: string;
  acceptanceRate: number;
  solvedAt: string;
  solutionCode: string;
  problemLevel: number;
  categories: string[];
  problemId: string;
  problemNo: number;
  bestMemory: number;
  bestRuntime: number;
  languageId: number;
}
