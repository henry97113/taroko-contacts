"use client";

import * as React from "react";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getContacts, type Contact as ContactType } from "@/helpers/contacts";
import Button from "@/components/Button";
import Container from "@/components/Container";
import VisuallyHidden from "@/components/VisuallyHidden";

import Contact from "../Contact";
import styles from "./ContactList.module.css";
import ContactListWrapper from "../ContactListWrapper";
import { type SortDirection } from "../../_helpers/sortDir";

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
