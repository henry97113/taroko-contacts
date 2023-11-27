"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";

// const labelVariants = cva(
//   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
// );
import styles from "./Label.module.css";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...delegated }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={clsx(styles.label, className)}
    {...delegated}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
