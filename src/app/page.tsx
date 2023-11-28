import Link from "next/link";

import Container from "@/components/Container";

import styles from "./index.module.css";

export const metadata = {
  title: "Home",
  description: "This is the homepage",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Home() {
  return (
    <main>
      <Container>
        <div className={styles.Wrapper}>
          <Link href="/contacts" prefetch={true}>
            Go to contacts page
          </Link>
        </div>
      </Container>
    </main>
  );
}
