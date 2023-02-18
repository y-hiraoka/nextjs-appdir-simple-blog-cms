import Link from "next/link";
import { FC } from "react";
import { Container } from "./Container";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.contents}>
          <h1>
            <Link className={styles.companyLogo} href="/">
              chot Inc.
            </Link>
          </h1>
          <nav className={styles.navigation}>
            <Link className={styles.navigationLink} href="/admin">
              管理
            </Link>
            <Link className={styles.navigationLink} href="/posts">
              記事一覧
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};
