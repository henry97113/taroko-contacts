import { clsx } from "clsx";
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import styles from "./Separator.module.css";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...delegated },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={clsx(styles.separator, styles[orientation], className)}
      {...delegated}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export default Separator;
