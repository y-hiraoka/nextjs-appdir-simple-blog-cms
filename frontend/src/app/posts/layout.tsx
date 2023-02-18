import { Container } from "@/components/Container";
import { PostTag } from "@/dto/tag";
import Link from "next/link";
import { FC } from "react";
import styles from "./layout.module.scss";

async function fetchTags() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_ORIGIN}/tags`, {
    next: { revalidate: 60 },
  }).then<PostTag[]>((r) => r.json());
}

// @ts-expect-error
const PostsLayout: FC<{ children: React.ReactNode }> = async ({ children }) => {
  const tags = await fetchTags();

  return (
    <Container>
      <div className={styles.layout}>
        <div className={styles.children}>{children}</div>
        <aside>
          <ul className={styles.tags}>
            {tags.map((t) => (
              <li key={t.tag}>
                <Link href={`/posts/tags/${t.tag}`} className={styles.tag}>
                  {t.tag}({t.count})
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Container>
  );
};

export default PostsLayout;
