"use client";

import { useRouter } from "next/navigation";
import { EditPostForm } from "@/components/EditPostForm";
import { PostDetail } from "@/dto/post";
import { FC, useCallback } from "react";
import styles from "./EditPostConnector.module.scss";

export const EditPostConnector: FC<{ post: PostDetail }> = ({ post }) => {
  const router = useRouter();

  return (
    <div>
      <EditPostForm
        defaultValues={{
          title: post.title,
          content: post.content,
          postTags: post.postTags.map((t) => t.tag),
          published: post.published,
        }}
        onSubmit={useCallback(
          async (values) => {
            await fetch(`/api/posts/${post.id}`, {
              method: "PUT",
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: values.title,
                content: values.content,
                tags: values.postTags,
                published: values.published,
              }),
            }).then((r) => r.json());

            router.push("/admin");
            router.refresh();
          },
          [post.id, router]
        )}
      />
      <button
        type="button"
        className={styles.deletePostButton}
        onClick={async () => {
          if (window.confirm("記事を削除しますか？")) {
            await fetch(`/api/posts/${post.id}`, {
              cache: "no-store",
              method: "DELETE",
            });
            router.push("/admin");
            router.refresh();
          }
        }}
      >
        記事を削除する
      </button>
    </div>
  );
};
