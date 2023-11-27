"use client";

import * as React from "react";

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

type DeleteContactProps = {
  contactId: number;
};

function DeleteContact({ contactId }: DeleteContactProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);

  async function deleteContact() {
    console.log(`Deleting contact: ${contactId}`);
    toast({
      variant: "destructive",
      description: `User has been deleted.`,
    });
    setIsOpen(false);
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
          <Button variant="destructive" onClick={deleteContact}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteContact;
