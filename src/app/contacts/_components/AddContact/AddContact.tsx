"use client";

import * as React from "react";

import Button from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";

import styles from "./AddContact.module.css";

export function AddContact() {
  return (
    <Dialog>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => {
                console.log("asdf");
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddContact;
