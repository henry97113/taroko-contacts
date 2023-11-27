import { getContacts } from "@/helpers/contacts";
import ContactList from "./_components/ContactList";

export const dynamic = "force-dynamic";

export default async function Contacts() {
  const contacts = await getContacts();

  return <ContactList initialData={contacts} />;
}
