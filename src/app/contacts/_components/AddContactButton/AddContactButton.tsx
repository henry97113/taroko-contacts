"use client";

import * as React from "react";

import Button from "@/components/Button";

function AddContactButton() {
  function openAddContactDialog() {
    console.log("Open Add Contact Dialog");
  }

  return <Button onClick={openAddContactDialog}>Add Contact</Button>;
}

export default AddContactButton;
