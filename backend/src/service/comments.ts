import { database } from "../database";

type GetCommentsParams = {
  postId: string;
};

export async function getComments(params: GetCommentsParams) {
  return await database.comment.findMany({
    where: { postId: params.postId },
  });
}

type CreateCommentParams = {
  submitter: string;
  content: string;
  postId: string;
};

export async function createComment(params: CreateCommentParams) {
  return await database.comment.create({
    data: {
      content: params.content,
      submitter: params.submitter,
      post: {
        connect: {
          id: params.postId,
        },
      },
    },
  });
}
