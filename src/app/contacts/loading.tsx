import Contact from "./_components/Contact";
import ContactListWrapper from "./_components/ContactListWrapper";

export default function ContactsLoading() {
  return (
    <ContactListWrapper>
      {MOCK_DATA.map((data) => (
        <Contact key={data.id} contact={data} isPlaceholder={true} />
      ))}
    </ContactListWrapper>
  );
}

const MOCK_DATA = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    job: "Engineer",
    description: "Software engineer with 5 years of experience",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Doe",
    job: "Doctor",
    description: "Pediatrician with 10 years of experience",
  },
  {
    id: 3,
    first_name: "Bob",
    last_name: "Smith",
    job: "Teacher",
    description: "High school math teacher with 7 years of experience",
  },
  {
    id: 4,
    first_name: "Alice",
    last_name: "Johnson",
    job: "Lawyer",
    description: "Corporate lawyer with 15 years of experience",
  },
  {
    id: 5,
    first_name: "Charlie",
    last_name: "Brown",
    job: "Chef",
    description: "Professional chef with 20 years of experience",
  },
  {
    id: 6,
    first_name: "Emily",
    last_name: "Davis",
    job: "Architect",
    description: "Architect with 12 years of experience",
  },
];
