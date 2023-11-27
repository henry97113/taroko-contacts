"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import Button from "@/components/Button";

import { type ContactForm as ContactFormType } from "../../_helpers/contactForm";
import ContactForm from "../ContactForm";
import styles from "./AddContact.module.css";

export function AddContact() {
  const [isOpen, setIsOpen] = React.useState(false);
  const formId = "add-contact-form";

  function handleSubmit(values: ContactFormType) {
    console.log(values);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Contact</Button>
      </DialogTrigger>
      <DialogContent className={styles["add-contact-dialog"]}>
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Add a new contact here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ContactForm formId={formId} handleSubmit={handleSubmit} />
        <DialogFooter>
          <Button type="submit" form={formId}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddContact;
