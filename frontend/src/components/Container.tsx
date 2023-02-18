import { FC, ReactNode } from "react";
import styles from "./Container.module.scss";

export const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
