import { ComponentProps, FC } from "react";
import styles from "./TextInput.module.scss";

export const TextInput: FC<ComponentProps<"input">> = (props) => {
  return <input {...props} className={styles.textInput} />;
};
