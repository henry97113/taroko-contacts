"use client";

import * as React from "react";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

import { getContacts, type Contact as ContactType } from "@/helpers/contacts";
import Button from "@/components/Button";
import Container from "@/components/Container";
import VisuallyHidden from "@/components/VisuallyHidden";

import Contact from "../Contact";
import styles from "./ContactList.module.css";

type SortDirection = "asc" | "desc";

type ContactListProps = {
  initialData: ContactType[];
};

function ContactList({ initialData }: ContactListProps) {
  const { data: contacts } = useSWR("/api/contacts", getContacts, {
    fallbackData: initialData,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const sortDir = (searchParams.get("sort") ?? "asc") as SortDirection;

  const sortedContacts = React.useMemo(
    () =>
      [...contacts].sort((a, b) => {
        if (sortDir === "asc") {
          return a.last_name.localeCompare(b.last_name);
        }
        return b.last_name.localeCompare(a.last_name);
      }),
    [contacts, sortDir],
  );

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  if (contacts.length === 0) {
    return (
      <Container>
        <div className={styles.wrapper}>
          <p className={styles["no-result"]}>No contacts found</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Contacts</h2>
          <Button
            size="icon"
            title="Sort by last name"
            onClick={() => {
              const nextDir = sortDir === "asc" ? "desc" : "asc";
              // <pathname>?sort=asc
              router.push(pathname + "?" + createQueryString("sort", nextDir));
            }}
          >
            {sortDir === "asc" ? <ArrowDownAZ /> : <ArrowDownZA />}
            <VisuallyHidden>Sort by last name</VisuallyHidden>
          </Button>
        </div>
        <div className={styles["contact-wrapper"]}>
          {sortedContacts.map((contact) => (
            <Contact key={contact.id} contact={contact} isPlaceholder={false} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default ContactList;
