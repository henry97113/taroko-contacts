import { getContacts } from "@/helpers/contacts";
import ContactList from "./_components/ContactList";

export default async function Contacts() {
  const contacts = await getContacts();

  return <ContactList contacts={contacts} />;
}
