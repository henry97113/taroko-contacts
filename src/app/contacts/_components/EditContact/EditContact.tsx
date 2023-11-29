"use client";

import * as React from "react";
import { HTTPError } from "ky";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
import { patchContact, type Contact } from "@/helpers/contacts";

import { type ContactForm as ContactFormType } from "../../_helpers/contactForm";
import ContactForm from "../ContactForm";
import styles from "./EditContact.module.css";

type EditContactProps = {
  contact: Contact;
};

function EditContact({ contact }: EditContactProps) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: patchContact,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const formId = "edit-contact-form";

  const transformedContact = {
    firstName: contact.first_name,
    lastName: contact.last_name,
    job: contact.job,
    description: contact.description,
  };

  async function handleSubmit(values: ContactFormType) {
    const fullName = `${values.firstName} ${values.lastName}`.trim();

    const payload = {
      id: contact.id,
      first_name: values.firstName,
      last_name: values.lastName,
      job: values.job,
      description: values.description,
    };

    try {
      await mutateAsync(payload);
      toast({
        title: "User Edited",
        description: `Changes to ${fullName} have been saved!`,
      });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof HTTPError) {
        toast({
          variant: "destructive",
          title: "Failed to update the contact.",
          description: error.message,
        });
      }
    }
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
          <Button type="submit" form={formId} disabled={isPending}>
            {isPending && (
              <Loader2
                className="animate-spin"
                style={{ marginRight: "0.5rem" }}
              />
            )}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditContact;
