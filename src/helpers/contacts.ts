import ky from "ky";
import { z } from "zod";

import { env } from "@/env";

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

export const contactsData: z.infer<typeof contactsSchema> = [
  {
    id: 1,
    first_name: "Luke",
    last_name: "Skywalker",
    job: "Jedi knight",
    description: "Son of Anakin Skywalker",
  },
  {
    id: 2,
    first_name: "Obi-Wan",
    last_name: "Kenobi",
    job: "Jedi master",
    description: "Old Ben was trained by Qui-Gon Jinn",
  },
  {
    id: 3,
    first_name: "Han",
    last_name: "Solo",
    job: "Smuggler",
    description: "Partnered with a famous Wookie",
  },
  {
    id: 4,
    first_name: "Leia",
    last_name: "Organa",
    job: "Princess",
    description: "Luke's secret twin sister",
  },
  {
    id: 5,
    first_name: "Darth",
    last_name: "Vader",
    job: "Sith lord",
    description: "I am your father!",
  },
];

export async function getContacts() {
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
