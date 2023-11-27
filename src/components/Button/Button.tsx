import * as React from "react";
import { clsx } from "clsx";

import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", children, className, ...delegated },
  ref,
) {
  return (
    <button
      {...delegated}
      ref={ref}
      className={clsx(styles.button, styles[variant], styles[size], className)}
    >
      {children}
    </button>
  );
});

export default Button;
