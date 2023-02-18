import { BlogFeedView, BlogFeedViewSkeleton } from "@/components/BlogFeedView";
import { Suspense } from "react";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.mission}>
        テクノロジーを
        <br />
        やさしく届ける
      </p>
      <p className={styles.missionDescription}>
        ソフトウェアのデザインと開発を通じて
        <br />
        よりよい社会の実現へ貢献します
      </p>
      <div className={styles.blogs}>
        <section className={styles.blog}>
          <h2 className={styles.blogTitle}>エンジニアブログ</h2>
          <Suspense fallback={<BlogFeedViewSkeleton />}>
            <BlogFeedView feedName="https://zenn.dev/p/chot/feed" />
          </Suspense>
        </section>
        <section className={styles.blog}>
          <h2 className={styles.blogTitle}>すてぃんのブログ</h2>
          <Suspense fallback={<BlogFeedViewSkeleton />}>
            <BlogFeedView feedName="https://zenn.dev/stin/feed" />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
