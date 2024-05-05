import { IDiscussionCommentData } from "./IDiscussionCommentData";

export interface IDiscussionData {
  discussionContent: string;
  title: string;
  userId: number;
  username: string;
  problemId: string;
  startedAt: string;
  comments: IDiscussionCommentData[];
  showFullContent: boolean;
  showComments: boolean;
  discussionId: number;
}
