"use client";

import * as React from "react";
import { clsx } from "clsx";
import { Redacted_Script } from "next/font/google";
import dynamic from "next/dynamic";

import { type Contact as ContactType } from "@/helpers/contacts";

import Separator from "@/components/Separator";

import styles from "./Contact.module.css";

const DeleteContact = dynamic(() => import("../DeleteContact"));
const EditContact = dynamic(() => import("../EditContact"));

const RedactedScript = Redacted_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type ContactProps = {
  contact: ContactType;
  isPlaceholder: boolean;
};

function Contact({ contact, isPlaceholder }: ContactProps) {
  const fullName = `${contact.first_name} ${contact.last_name}`.trim();

  return (
    <div
      className={clsx(
        styles.wrapper,
        isPlaceholder && RedactedScript.className,
      )}
    >
      <div className={styles.top}>
        <div className={styles["contact-info"]}>
          <div>
            <b>Name</b>: {fullName}
          </div>
          <div>
            <b>Job</b>: {contact.job}
          </div>
        </div>
        {!isPlaceholder && (
          <div className={styles.actions}>
            <EditContact contact={contact} />
            <DeleteContact contactId={contact.id} />
          </div>
        )}
      </div>
      <Separator />
      <div className={styles.description}>
        <b>Description</b>: {contact.description}
      </div>
    </div>
  );
}

export default Contact;
