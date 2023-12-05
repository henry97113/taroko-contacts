import { faker } from "@faker-js/faker";

export function createContact() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    job: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
  };
}
