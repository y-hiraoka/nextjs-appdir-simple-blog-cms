"use client";

import { Comment } from "@/dto/comment";
import { FC, useReducer } from "react";
import styles from "./PostComment.module.scss";

export const PostComment: FC<{ comment: Comment }> = ({ comment }) => {
  const [commentIsShown, showComment] = useReducer(() => true, false);

  return (
    <div className={styles.comment}>
      <p className={styles.commentSubmitter}>{comment.submitter}</p>
      {commentIsShown ? (
        <p className={styles.commentContent}>{comment.content}</p>
      ) : (
        <button type="button" onClick={showComment}>
          コメントを読む
        </button>
      )}
      <p className={styles.commentCreatedAt}>{comment.createdAt}</p>
    </div>
  );
};
