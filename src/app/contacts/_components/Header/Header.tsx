import * as React from "react";
import Link from "next/link";

import AddContact from "../AddContact";

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link href="/contacts" className={styles["header-link"]}>
        <h1>My Contacts</h1>
      </Link>
      <AddContact />
    </header>
  );
}

export default Header;
