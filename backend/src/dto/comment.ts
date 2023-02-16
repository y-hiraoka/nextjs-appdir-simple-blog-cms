import z from "zod";

export const commentsResponse = z.array(
  z.object({
    id: z.string(),
    content: z.string(),
    postId: z.string(),
    submitter: z.string(),
    createdAt: z.date(),
  })
);

export const createCommentRequest = z.object({
  submitter: z.string({ invalid_type_error: "Comment submitter is required." }),
  content: z.string({ invalid_type_error: "Comment content is required." }),
});

export const createCommentResponse = z.object({
  id: z.string(),
  content: z.string(),
  postId: z.string(),
  submitter: z.string(),
  createdAt: z.date(),
});
