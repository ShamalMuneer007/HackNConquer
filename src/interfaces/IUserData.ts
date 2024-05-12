export default interface IUserData {
  userId: number;
  username: string;
  playerRank: number;
  profileImage: string;
  email: string;
  level: number;
  xp: number;
  premium: boolean;
  role: string;
  currentMaxXp: number;
  clanId: number | null;
  friends: IUserData[];
}
