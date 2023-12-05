import { setupServer } from "msw/node";
import { handlers as contactsHandlers } from "./contacts";

export const server = setupServer(...contactsHandlers);

server.listen({ onUnhandledRequest: "warn" });
