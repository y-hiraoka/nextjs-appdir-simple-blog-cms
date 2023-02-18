import { PostsSkeleton } from "@/components/PostsView";
import { FC } from "react";

const PostsLoading: FC = () => {
  return (
    <main>
      <PostsSkeleton />
    </main>
  );
};

export default PostsLoading;
