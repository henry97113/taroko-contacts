import * as React from "react";

import { type Contact as ContactType } from "@/helpers/contacts";

import styles from "./Contact.module.css";
import Button from "@/components/Button";
import Separator from "@/components/Separator";

import EditContact from "../EditContact";

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
          <DeleteButton />
        </div>
      </div>
      <Separator />
      <div className={styles.description}>
        <b>Description</b>: {contact.description}
      </div>
    </div>
  );
}

// function EditButton() {
//   function openEditContactDialog() {
//     console.log("Open edit contact dialog");
//   }

//   return (
//     <Button variant="outline" size="sm" onClick={openEditContactDialog}>
//       Edit
//     </Button>
//   );
// }

function DeleteButton() {
  function openDeleteContactDialog() {
    console.log("Open delete contact dialog");
  }

  return (
    <Button variant="destructive" size="sm" onClick={openDeleteContactDialog}>
      Delete
    </Button>
  );
}

export default Contact;
