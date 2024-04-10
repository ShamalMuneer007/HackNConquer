import IUserData from "./IUserData";

export default interface IUserState {
  loading: boolean;
  user: IUserData | null;
  message: any;
  error: any;
}
