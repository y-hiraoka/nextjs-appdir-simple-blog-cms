import { FC } from "react";
import styles from "./Footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://chot-inc.com/" target="_blank" rel="noreferrer">
        <small className={styles.companyName}>chot Inc.</small>
      </a>
    </footer>
  );
};
