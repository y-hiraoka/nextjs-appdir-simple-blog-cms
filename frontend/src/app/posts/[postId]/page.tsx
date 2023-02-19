import { PostDetail, PostListItem } from "@/dto/post";
import { FC, Suspense } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import styles from "./page.module.scss";
import "highlight.js/styles/atom-one-dark.css";
import { CommentForm } from "./CommentForm";
import { PostComments } from "./PostComments";

async function fetchPost(postId: string) {
  return await fetch(`${process.env.API_SERVER_ORIGIN}/posts/${postId}`, {
    next: { revalidate: 60 },
  }).then<PostDetail>((r) => r.json());
}

// @ts-expect-error
const PostsPage: FC<{ params: { postId: string } }> = async ({ params }) => {
  const post = await fetchPost(params.postId);
  const contentHTML = await marked(post.content, {
    async: true,
    highlight: (code, language) => hljs.highlight(code, { language }).value,
    langPrefix: "hljs language-",
  });

  return (
    <main>
      <h1>{post.title}</h1>
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      />
      <hr className={styles.rule} />
      <CommentForm postId={params.postId} />
      <hr className={styles.rule} />
      <Suspense fallback={<p>コメント読込中...</p>}>
        <PostComments postId={params.postId} />
      </Suspense>
    </main>
  );
};

export default PostsPage;

async function fetchPosts() {
  return await fetch(`${process.env.API_SERVER_ORIGIN}/posts`, {
    next: { revalidate: 60 },
  }).then<PostListItem[]>((r) => r.json());
}

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({ postId: post.id }));
}
