"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { type SortDirection } from "../../_helpers/sortDir";
import Contact from "../Contact";
import ContactListWrapper from "../ContactListWrapper";
import styles from "./ContactList.module.css";
import Button from "@/components/Button";
import Container from "@/components/Container";
import VisuallyHidden from "@/components/VisuallyHidden";
import { getContacts, type Contact as ContactType } from "@/helpers/contacts";

type ContactListProps = {
  initialData: ContactType[];
  sortDir: SortDirection;
};

function ContactList({ initialData, sortDir }: ContactListProps) {
  const { data: contacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    initialData,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

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
    <ContactListWrapper
      actionButton={
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
      }
    >
      {sortedContacts.map((contact) => (
        <Contact key={contact.id} contact={contact} isPlaceholder={false} />
      ))}
    </ContactListWrapper>
  );
}

export default ContactList;
