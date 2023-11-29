import Container from "@/components/Container";
import Contact from "./_components/Contact";

import styles from "./_components/ContactList/ContactList.module.css";
import Button from "@/components/Button";

export default function ContactsLoading() {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Contacts</h2>
          <Button
            size="icon"
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              pointerEvents: "none",
            }}
          ></Button>
        </div>
        <div className={styles["contact-wrapper"]}>
          {MOCK_DATA.map((data) => (
            <Contact key={data.id} contact={data} isPlaceholder={true} />
          ))}
        </div>
      </div>
    </Container>
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
