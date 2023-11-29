import ky from "ky";
import { z } from "zod";

import { env } from "@/env";

type Response = {
  statusCode: string;
  message: string;
  data: unknown;
};

const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response?.body) {
          const errorResponse = (await response.json()) as Response;
          error.name = "ContactError";
          error.message = `${errorResponse.message} (${errorResponse.statusCode})`;
        }

        return error;
      },
    ],
  },
});

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
  const { data } = await api.get(`contacts`).json<Response>();
  return contactsSchema.parse(data);
}

const postContactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  job: z.string(),
  description: z.string(),
});

export async function postContact(contact: z.infer<typeof postContactSchema>) {
  const { data } = await api
    .post(`contacts`, {
      json: {
        contact,
      },
    })
    .json<Response>();
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
  const { data } = await api
    .patch(`contacts/${id}`, {
      json: { info: { ...delegated } },
    })
    .json<Response>();
  return contactSchema.parse(data);
}

export async function deleteContact(id: number) {
  const { data } = await api.delete(`contacts/${id}`).json<Response>();
  return contactSchema.parse(data);
}
