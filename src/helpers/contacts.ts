import ky from "ky";
import { z } from "zod";

import { env } from "@/env";
import { delay } from "@/utils";

const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;

const contactSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  job: z.string(),
  description: z.string(),
});

const contactsSchema = contactSchema.array();

export type Contact = z.infer<typeof contactSchema>;

export async function getContacts() {
  await delay(2000);
  const { data } = await ky
    .get(`${baseUrl}/contacts`)
    .json<{ data: unknown }>();
  return contactsSchema.parse(data);
}

const postContactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  job: z.string(),
  description: z.string(),
});

export async function postContact(contact: z.infer<typeof postContactSchema>) {
  const { data } = await ky
    .post(`${baseUrl}/contacts`, {
      json: {
        contact,
      },
    })
    .json<{ data: unknown }>();
  return contactSchema.parse(data);
}

const patchContactSchema = z.object({
  id: z.number(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  job: z.string().optional(),
  description: z.string().optional(),
});

export async function patchContact(
  payload: z.infer<typeof patchContactSchema>,
) {
  const { id, ...delegated } = payload;
  const { data } = await ky
    .patch(`${baseUrl}/contacts/${id}`, {
      json: { info: { ...delegated } },
    })
    .json<{ data: unknown }>();
  return contactSchema.parse(data);
}

export async function deleteContact(id: number) {
  const { data } = await ky
    .delete(`${baseUrl}/contacts/${id}`)
    .json<{ data: unknown }>();
  return contactSchema.parse(data);
}
