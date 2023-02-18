import { Container } from "@/components/Container";
import { FC } from "react";
import { CreatePostConnector } from "./CreatePostConnector";

const NewPostPage: FC = () => {
  return (
    <Container>
      <CreatePostConnector />
    </Container>
  );
};

export default NewPostPage;
