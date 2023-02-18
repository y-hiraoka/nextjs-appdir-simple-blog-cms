import { Comment } from "@/dto/comment";
import { format } from "date-fns";
import { FC } from "react";
import styles from "./PostComments.module.scss";

const fetchPostComments = async (postId: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_ORIGIN}/posts/${postId}/comments`,
    { cache: "no-store" }
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
            <li key={comment.id} className={styles.comment}>
              <p className={styles.commentSubmitter}>{comment.submitter}</p>
              <p className={styles.commentContent}>{comment.content}</p>
              <p className={styles.commentCreatedAt}>
                {format(new Date(comment.createdAt), "yyyy/MM/dd HH:mm")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>最初のコメントを書いてみましょう</p>
      )}
    </section>
  );
};
