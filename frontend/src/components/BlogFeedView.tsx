import RssParser from "rss-parser";
import { FC } from "react";
import Image from "next/image";
import styles from "./BlogFeedView.module.scss";

const fetchFeed = async (feedURL: string) => {
  const data = await fetch(feedURL, { next: { revalidate: 60 } }).then((res) =>
    res.text()
  );
  const parser = new RssParser();
  const feed = await parser.parseString(data);
  return feed.items.slice(0, 3).map((item) => ({
    thumnail: item.enclosure?.url,
    title: item.title,
    url: item.link,
  }));
};

//@ts-expect-error
export const BlogFeedView: FC<{ feedName: string }> = async ({ feedName }) => {
  const feed = await fetchFeed(feedName);

  return (
    <div className={styles.feed}>
      {feed.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className={styles.feedItem}
        >
          <div className={styles.feedItemThumbnail}>
            {item.thumnail && (
              <Image
                alt={item.title ?? "post thumbnail"}
                src={item.thumnail}
                fill
              />
            )}
          </div>
          <p className={styles.feedItemTitle}>{item.title}</p>
        </a>
      ))}
    </div>
  );
};

export const BlogFeedViewSkeleton: FC = () => {
  return (
    <div className={styles.feed}>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.skeletonRoot}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonTitle} />
        </div>
      ))}
    </div>
  );
};
