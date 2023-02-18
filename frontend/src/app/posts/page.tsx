import { PostsView } from "@/components/PostsView";
import { PostListItem } from "@/dto/post";
import { FC } from "react";

async function fetchPosts() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_ORIGIN}/posts`, {
    next: { revalidate: 60 },
  }).then<PostListItem[]>((r) => r.json());
}

// @ts-expect-error
const PostsPage: FC = async () => {
  const posts = await fetchPosts();

  return (
    <main>
      <PostsView posts={posts} />
    </main>
  );
};

export default PostsPage;
