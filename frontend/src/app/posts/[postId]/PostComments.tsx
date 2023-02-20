import { Comment } from "@/dto/comment";
import { format } from "date-fns";
import { FC } from "react";
import { PostComment } from "@/components/PostComment";
import styles from "./PostComments.module.scss";

const fetchPostComments = async (postId: string) => {
  return await fetch(
    `${process.env.API_SERVER_ORIGIN}/posts/${postId}/comments`
  ).then<Comment[]>((r) => r.json());
};

// @ts-expect-error
export const PostComments: FC<{ postId: string }> = async ({ postId }) => {
  const postComments = await fetchPostComments(postId);

  return (
    <section>
      <h3 className={styles.sectionTitle}>
        コメント{" "}
        <span className={styles.sectionTitleCount}>
          {postComments.length}件
        </span>
      </h3>
      {postComments.length > 0 ? (
        <ul className={styles.comments}>
          {postComments.map((comment) => (
            <li key={comment.id}>
              <PostComment
                comment={{
                  ...comment,
                  createdAt: format(
                    new Date(comment.createdAt),
                    "yyyy/MM/dd HH:mm"
                  ),
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>最初のコメントを書いてみましょう</p>
      )}
    </section>
  );
};
