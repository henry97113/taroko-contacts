import * as React from "react";

import { type Contact as ContactType } from "@/helpers/contacts";

import Separator from "@/components/Separator";

import DeleteContact from "../DeleteContact";
import EditContact from "../EditContact";
import styles from "./Contact.module.css";

type ContactProps = {
  contact: ContactType;
};

function Contact({ contact }: ContactProps) {
  const fullName = `${contact.first_name} ${contact.last_name}`.trim();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles["contact-info"]}>
          <div>
            <b>Name</b>: {fullName}
          </div>
          <div>
            <b>Job</b>: {contact.job}
          </div>
        </div>
        <div className={styles.actions}>
          <EditContact contact={contact} />
          <DeleteContact contactId={contact.id} />
        </div>
      </div>
      <Separator />
      <div className={styles.description}>
        <b>Description</b>: {contact.description}
      </div>
    </div>
  );
}

export default Contact;
