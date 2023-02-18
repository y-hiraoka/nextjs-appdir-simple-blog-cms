import { ComponentProps, FC } from "react";
import styles from "./TextArea.module.scss";

export const TextArea: FC<ComponentProps<"textarea">> = (props) => {
  return <textarea {...props} className={styles.textarea} />;
};
