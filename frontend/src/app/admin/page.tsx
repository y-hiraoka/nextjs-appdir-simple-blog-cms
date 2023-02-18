import { PostListItem } from "@/dto/post";
import { FC } from "react";
import { format } from "date-fns";
import Link from "next/link";
import styles from "./page.module.scss";

const fetchPostsIncludeDrafts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_ORIGIN}/posts?includeDraft=1`,
    { cache: "no-store" }
  );

  return (await response.json()) as PostListItem[];
};

// @ts-expect-error
const PostsPage: FC = async () => {
  const posts = await fetchPostsIncludeDrafts();

  return (
    <main className={styles.main}>
      <Link className={styles.addNewPost} href="/admin/new">
        新規作成
      </Link>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.post}>
            <span
              className={styles.postPublished}
              data-is-published={post.published}
            >
              {post.published ? "公開中" : "非公開"}
            </span>
            <Link className={styles.postTitle} href={`/admin/${post.id}`}>
              {post.title}
            </Link>
            <p className={styles.postCreatedAt}>
              投稿日時:{" "}
              {format(new Date(post.createdAt), "yyyy/MM/dd HH:mm:ss")}
            </p>
            <p className={styles.postUpdatedAt}>
              最終更新:{" "}
              {format(new Date(post.updatedAt), "yyyy/MM/dd HH:mm:ss")}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PostsPage;
