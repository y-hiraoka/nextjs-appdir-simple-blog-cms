import { database } from "../database";

type GetPostsParams = {
  tag: string | undefined;
  includeDraft: boolean;
};

export async function getPosts(params: GetPostsParams) {
  return await database.post.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      published: true,
      postTags: true,
    },
    orderBy: { createdAt: "desc" },
    where: {
      published: params.includeDraft ? undefined : true,
      postTags: params.tag ? { some: { tag: params.tag } } : undefined,
    },
  });
}

type GetPostParams = {
  id: string;
};

export async function getPost(params: GetPostParams) {
  return await database.post.findUnique({
    where: { id: params.id },
    include: { postTags: true },
  });
}

type CreatePostParams = {
  title: string;
  content: string;
  tags: string[];
  published?: boolean;
};

export async function createPost(params: CreatePostParams) {
  const created = await database.post.create({
    data: {
      title: params.title,
      content: params.content,
      postTags: {
        createMany: { data: params.tags.map((tag) => ({ tag })) },
      },
      published: params.published,
    },
    include: { postTags: true },
  });

  return created;
}

type UpdatePostParams = {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
};

export async function updatePost(params: UpdatePostParams) {
  const updated = await database.post.update({
    where: { id: params.id },
    data: {
      title: params.title,
      content: params.content,
      published: params.published,
      postTags: params.tags
        ? {
            deleteMany: { postId: params.id },
            createMany: { data: params.tags.map((tag) => ({ tag })) },
          }
        : undefined,
    },
    include: { postTags: true },
  });

  return updated;
}

type DeletePostParams = {
  id: string;
};

export async function deletePost(params: DeletePostParams) {
  return await database.post.delete({
    where: { id: params.id },
    include: { postTags: true },
  });
}
