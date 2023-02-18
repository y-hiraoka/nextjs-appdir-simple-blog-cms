"use client";

import { useRouter } from "next/navigation";
import { EditPostForm } from "@/components/EditPostForm";
import { FC, useCallback } from "react";

export const CreatePostConnector: FC = () => {
  const router = useRouter();

  return (
    <EditPostForm
      defaultValues={{
        title: "",
        content: "",
        postTags: [],
        published: false,
      }}
      onSubmit={useCallback(
        async (values) => {
          await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_ORIGIN}/posts`, {
            method: "POST",
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
        [router]
      )}
    />
  );
};
