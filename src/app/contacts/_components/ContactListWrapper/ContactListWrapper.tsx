import * as React from "react";

import Container from "@/components/Container";

import styles from "./ContactListWrapper.module.css";

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
        <div className={styles["contact-wrapper"]}>{children}</div>
      </div>
    </Container>
  );
}

export default ContactListWrapper;
