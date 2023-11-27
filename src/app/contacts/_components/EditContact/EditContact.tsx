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
import { useToast } from "@/components/Toast";
import Button from "@/components/Button";
import { type Contact } from "@/helpers/contacts";

import { type ContactForm as ContactFormType } from "../../_helpers/contactForm";
import ContactForm from "../ContactForm";
import styles from "./EditContact.module.css";

type EditContactProps = {
  contact: Contact;
};

function EditContact({ contact }: EditContactProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const formId = "edit-contact-form";

  const transformedContact = {
    firstName: contact.first_name,
    lastName: contact.last_name,
    job: contact.job,
    description: contact.description,
  };

  function handleSubmit(values: ContactFormType) {
    const fullName = `${values.firstName} ${values.lastName}`.trim();

    console.log(values);
    toast({
      title: "User Edited",
      description: `Changes to ${fullName} have been saved!`,
    });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className={styles["add-contact-dialog"]}>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            Edit contact here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          contact={transformedContact}
          formId={formId}
          handleSubmit={handleSubmit}
        />
        <DialogFooter>
          <Button type="submit" form={formId}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditContact;
