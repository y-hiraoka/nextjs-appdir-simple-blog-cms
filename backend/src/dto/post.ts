import z from "zod";

export const postsResponse = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    published: z.boolean(),
    postTags: z.array(
      z.object({
        id: z.string(),
        tag: z.string(),
      })
    ),
  })
);

export const postDetailResponse = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
  postTags: z.array(
    z.object({
      id: z.string(),
      tag: z.string(),
    })
  ),
  updatedAt: z.date(),
  createdAt: z.date(),
});

export const createPostRequest = z.object({
  title: z.string({ required_error: "Post title is required." }),
  content: z.string({ required_error: "Post content is required." }),
  tags: z.array(z.string()),
  published: z.optional(z.boolean()),
});

export const updatePostRequest = z.object({
  title: z.optional(z.string()),
  content: z.optional(z.string()),
  tags: z.optional(z.array(z.string())),
  published: z.optional(z.boolean()),
});
