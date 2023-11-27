"use client";

import * as React from "react";
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
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: `Something went wrong. Please try again later.`,
      });
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
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
