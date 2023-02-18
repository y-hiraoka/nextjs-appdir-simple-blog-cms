import { PostListItem } from "@/dto/post";
import { format } from "date-fns";
import Link from "next/link";
import { FC } from "react";
import styles from "./PostsView.module.scss";

export const PostsView: FC<{ posts: PostListItem[] }> = ({ posts }) => {
  return (
    <ul className={styles.posts}>
      {posts.map((post) => (
        <li key={post.id}>
          <article>
            <Link href={`/posts/${post.id}`} className={styles.post}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <ul className={styles.postTags}>
                {post.postTags.map((t) => (
                  <li className={styles.postTag} key={t.id}>
                    {t.tag}
                  </li>
                ))}
              </ul>
              <p className={styles.postDatetime}>
                {post.updatedAt === post.createdAt
                  ? `投稿: ${format(
                      new Date(post.createdAt),
                      "yyyy/MM/dd HH:mm"
                    )}`
                  : `更新: ${format(
                      new Date(post.updatedAt),
                      "yyyy/MM/dd HH:mm"
                    )}`}
              </p>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
};

export const PostsSkeleton: FC = () => {
  return (
    <div className={styles.posts}>
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <div key={num} className={styles.post}>
          <div className={styles.postSkeletonTitle} />
          <div className={styles.postTags}>
            {[1, 2, 3].map((tag) => (
              <div key={tag} className={styles.postSkeletonTag} />
            ))}
          </div>
          <div className={styles.postSkeletonDatetime} />
        </div>
      ))}
    </div>
  );
};
