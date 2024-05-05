export interface IDiscussionCommentData {
  comment: string;
  problemId: string;
  userId: number | undefined;
  discussionId: number;
  username: string | undefined;
}
