import { Container } from "@/components/Container";
import { PostDetail } from "@/dto/post";
import { FC } from "react";
import { EditPostConnector } from "./EditPostConnector";

const fetchPost = async (postId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_ORIGIN}/posts/${postId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("not Found");
  }

  return (await response.json()) as PostDetail;
};

// @ts-expect-error
const EditPostPage: FC<{
  params: { postId: string };
}> = async ({ params }) => {
  const post = await fetchPost(params.postId);
  return (
    <Container>
      <EditPostConnector post={post} />
    </Container>
  );
};

export default EditPostPage;
