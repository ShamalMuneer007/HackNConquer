export default interface IUserData {
  userId: number;
  username: string;
  playerRank: number;
  profileImage: string;
  email: string;
  level: number;
  xp: number;
  isPremium: boolean;
  role: string;
  currentMaxXp: number;
  friends: IUserData[];
}