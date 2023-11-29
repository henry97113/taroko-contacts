import { getContacts } from "@/helpers/contacts";
import ContactList from "./_components/ContactList";
import { getSortDir } from "./_helpers/sortDir";

export const dynamic = "force-dynamic";

export default async function Contacts({
  searchParams,
}: {
  searchParams?: { sort: string | string[] };
}) {
  const sortDir = getSortDir(searchParams);

  const contacts = await getContacts();

  return <ContactList initialData={contacts} sortDir={sortDir} />;
}
