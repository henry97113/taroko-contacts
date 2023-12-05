import { test as base } from "@playwright/test";
import { server } from "./mocks";

const test = base.extend({});

test.beforeAll(() => {
  // Start the interception.
  server.listen();
});

test.afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers();
});

test.afterAll(() => {
  // Disable request interception and clean up.
  server.close();
});

export { test };
