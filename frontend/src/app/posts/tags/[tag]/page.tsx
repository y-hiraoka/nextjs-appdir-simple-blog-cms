import { PostsView } from "@/components/PostsView";
import { PostListItem } from "@/dto/post";
import { FC } from "react";

async function fetchPostsByTag(tag: string) {
  return await fetch(
    `${
      process.env.NEXT_PUBLIC_API_SERVER_ORIGIN
    }/posts?tag=${encodeURIComponent(tag)}`,
    {
      next: { revalidate: 60 },
    }
  ).then<PostListItem[]>((r) => r.json());
}

// @ts-expect-error
const PostsPage: FC<{ params: { tag: string } }> = async ({ params }) => {
  const posts = await fetchPostsByTag(params.tag);
  return (
    <main>
      <PostsView posts={posts} />
    </main>
  );
};

export default PostsPage;
