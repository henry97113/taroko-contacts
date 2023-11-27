"use client";

import * as React from "react";

import { type Contact } from "@/helpers/contacts";

import styles from "./ContactList.module.css";
import Container from "@/components/Container";

type ContactListProps = {
  contacts: Contact[];
};

function ContactList({ contacts }: ContactListProps) {
  return (
    <Container>
      <div className={styles.wrapper}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.apple}>
            {contact.first_name}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ContactList;
