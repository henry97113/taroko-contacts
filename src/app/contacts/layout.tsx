import Header from "./_components/Header";

export const metadata = {
  title: "My Contacts",
  description: "List all my contacts",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
