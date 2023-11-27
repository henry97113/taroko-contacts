import * as React from "react";
import { Loader2 } from "lucide-react";

import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <Loader2 size={52} color="teal" className={styles.spinner} />
    </div>
  );
}

export default LoadingSpinner;
