"use client";

import * as React from "react";
import { HTTPError } from "ky";
import { useSWRConfig } from "swr";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/AlertDialog";
import Button from "@/components/Button";
import { useToast } from "@/components/Toast";
import { deleteContact } from "@/helpers/contacts";

type DeleteContactProps = {
  contactId: number;
};

function DeleteContact({ contactId }: DeleteContactProps) {
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);

  async function handleClick() {
    try {
      await deleteContact(contactId);
      await mutate("/api/contacts");
      toast({
        title: "User deleted",
        description: `User has been deleted.`,
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        toast({
          variant: "destructive",
          title: "Failed to delete the contact.",
          description: error.message,
        });
      }
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            contact from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleClick}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteContact;
