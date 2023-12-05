import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { type RequestHandler } from "msw";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api";

export function createContact() {
  return {
    id: faker.number.int(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    job: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
  };
}

export const handlers: RequestHandler[] = [
  http.get(`${API_BASE_URL}/contacts`, () => {
    return HttpResponse.json([]);
  }),
];
