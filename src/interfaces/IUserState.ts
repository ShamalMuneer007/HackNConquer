import IUserData from "./IUserData";
import IUserSolvedProblems from "./IUserSolvedProblems";

export default interface IUserState {
  loading: boolean;
  user: IUserData | null;
  message: any;
  error: any;
  solvedProblems: IUserSolvedProblems | null;
}
