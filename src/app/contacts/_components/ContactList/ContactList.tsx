"use client";

import * as React from "react";
import { ArrowDownAZ } from "lucide-react";

import { type Contact as ContactType } from "@/helpers/contacts";
import Button from "@/components/Button";
import Container from "@/components/Container";

import styles from "./ContactList.module.css";
import Contact from "../Contact";

type ContactListProps = {
  contacts: ContactType[];
};

function ContactList({ contacts }: ContactListProps) {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Contacts</h2>
          <Button size="icon">
            <ArrowDownAZ />
          </Button>
        </div>
        <div className={styles["contact-wrapper"]}>
          {contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default ContactList;
