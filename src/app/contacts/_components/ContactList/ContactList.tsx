"use client";

import * as React from "react";

import { type Contact as ContactType } from "@/helpers/contacts";

import styles from "./ContactList.module.css";
import Container from "@/components/Container";
import Contact from "../Contact";

type ContactListProps = {
  contacts: ContactType[];
};

function ContactList({ contacts }: ContactListProps) {
  return (
    <Container>
      <div className={styles.wrapper}>
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
    </Container>
  );
}

export default ContactList;
