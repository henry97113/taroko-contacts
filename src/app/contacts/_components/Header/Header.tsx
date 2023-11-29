import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const AddContact = dynamic(() => import("../AddContact"), { ssr: false });

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles["header-link"]}>
        <h1>My Contacts</h1>
      </Link>
      <AddContact />
    </header>
  );
}

export default Header;
