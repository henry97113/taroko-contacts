import * as React from "react";

import styles from "./ContactListWrapper.module.css";
import Container from "@/components/Container";

type ContactListWrapperProps = {
  actionButton?: React.ReactNode;
  children: React.ReactNode;
};

function ContactListWrapper({
  actionButton,
  children,
}: ContactListWrapperProps) {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Contacts</h2>
          {actionButton}
        </div>
        <ul className={styles["contact-wrapper"]}>{children}</ul>
      </div>
    </Container>
  );
}

export default ContactListWrapper;
