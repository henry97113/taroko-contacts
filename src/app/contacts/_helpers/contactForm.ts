import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(50, {
      message: "First name must be at most 50 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(50, {
      message: "Last name must be at most 50 characters.",
    }),
  job: z.string().min(1, {
    message: "Job field is required.",
  }),
  description: z.string(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export function useContactForm(defaultValues?: ContactForm) {
  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      job: defaultValues?.job ?? "",
      description: defaultValues?.description ?? "",
    },
  });

  return { contactForm };
}
