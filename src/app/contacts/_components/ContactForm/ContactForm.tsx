"use client";

import * as React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

import {
  useContactForm,
  type ContactForm as ContactFormType,
} from "../../_helpers/contactForm";
import styles from "./ContactForm.module.css";

type ContactFormProps = {
  contact?: ContactFormType;
  formId: string;
  handleSubmit: (values: ContactFormType) => void;
};

function ContactForm({ contact, formId, handleSubmit }: ContactFormProps) {
  const { contactForm } = useContactForm(contact);

  function onSubmit(values: ContactFormType) {
    handleSubmit(values);
  }

  return (
    <Form {...contactForm}>
      <form onSubmit={contactForm.handleSubmit(onSubmit)} id={formId}>
        <div className={styles.wrapper}>
          <FormField
            control={contactForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={contactForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={contactForm.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job</FormLabel>
                <FormControl>
                  <Input placeholder="Job Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={contactForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description About This Contact"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

export default ContactForm;
