import { getContacts } from "@/helpers/contacts";

export default async function Contacts() {
  // will render the contacts in <ContactsList />
  const contacts = await getContacts();

  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id}>{contact.first_name}</div>
      ))}
    </div>
  );
}
