export type PostListItem = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  postTags: {
    id: string;
    tag: string;
  }[];
};

export type PostDetail = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  postTags: {
    id: string;
    tag: string;
  }[];
  updatedAt: string;
  createdAt: string;
};
