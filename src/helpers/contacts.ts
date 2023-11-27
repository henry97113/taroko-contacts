import { z } from "zod";

import { delay } from "@/utils";

const Contact = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  job: z.string(),
  description: z.string(),
});

export type Contact = z.infer<typeof Contact>;

export const contactsData: Contact[] = [
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
  await delay(3000);
  return contactsData;
}
