"use client";

import { FC, FormEventHandler, useId, useState } from "react";
import { TextArea } from "@/components/TextArea";
import { TextInput } from "@/components/TextInput";
import { useRouter } from "next/navigation";
import styles from "./CommentForm.module.scss";

export const CommentForm: FC<{ postId: string }> = ({ postId }) => {
  const formId = useId();
  const router = useRouter();

  const [submitter, setSubmitter] = useState("");
  const [content, setContent] = useState("");

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ submitter, content }),
    }).then((r) => r.json());
    setSubmitter("");
    setContent("");
    router.refresh();
  };

  return (
    <section>
      <h3 className={styles.formTitle}>コメントを書く</h3>
      <form className={styles.form} id={formId} onSubmit={onSubmit}>
        <div>
          <label className={styles.formLabel} htmlFor={formId + "submitter"}>
            おなまえ
          </label>
          <TextInput
            id={formId + "submitter"}
            required
            placeholder="田中太郎"
            value={submitter}
            onChange={(e) => setSubmitter(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor={formId + "content"}>
            内容
          </label>
          <TextArea
            id={formId + "content"}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ minHeight: "160px", resize: "none" }}
          />
        </div>
        <div className={styles.submit}>
          <button type="submit" className={styles.submitButton}>
            送信する
          </button>
        </div>
      </form>
    </section>
  );
};
