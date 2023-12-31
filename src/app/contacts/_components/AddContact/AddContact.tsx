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

import { type ContactForm as ContactFormType } from "../../_helpers/contactForm";
import ContactForm from "../ContactForm";
import styles from "./AddContact.module.css";
import { postContact } from "@/helpers/contacts";

export function AddContact() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postContact,
    mutationKey: ["addContact"],
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const formId = "add-contact-form";

  async function handleSubmit(values: ContactFormType) {
    const fullName = `${values.firstName} ${values.lastName}`.trim();

    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      job: values.job,
      description: values.description,
    };

    try {
      await mutateAsync(payload);
      toast({
        title: "New user added",
        description: `${fullName} has been added to your contacts!`,
      });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof HTTPError) {
        toast({
          variant: "destructive",
          title: "Failed to create a new contact.",
          description: error.message,
        });
      }
    }
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

export default AddContact;
