"use client";

import { FC, FormEventHandler, useId, useState } from "react";
import styles from "./EditPostForm.module.scss";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";

type InputValues = {
  title: string;
  content: string;
  postTags: string[];
  published: boolean;
};

type EditPostFormProps = {
  defaultValues: InputValues;
  onSubmit: (values: InputValues) => void;
};

export const EditPostForm: FC<EditPostFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const formId = useId();
  const [title, setTitle] = useState(defaultValues.title);
  const [content, setContent] = useState(defaultValues.content);
  const [tags, setTags] = useState(defaultValues.postTags.join(", "));
  const [published, setPublished] = useState(defaultValues.published);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const postTags = Array.from(
      new Set(
        tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
    );

    onSubmit({ title, content, postTags, published });
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.saveOperation}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span>公開する</span>
        </label>
        <button type="submit" className={styles.submitButton}>
          保存
        </button>
      </div>
      <div>
        <label htmlFor={formId + "title"} className={styles.formLabel}>
          タイトル
        </label>
        <TextInput
          id={formId + "title"}
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={formId + "tags"} className={styles.formLabel}>
          タグ(カンマ区切り)
        </label>
        <TextInput
          id={formId + "tags"}
          required
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={formId + "content"} className={styles.formLabel}>
          本文(Markdown)
        </label>
        <TextArea
          id={formId + "content"}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ minHeight: "300px" }}
        />
      </div>
    </form>
  );
};
