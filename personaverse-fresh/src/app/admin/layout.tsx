export const metadata = {
  title: "Admin Dashboard | PersonaVerse",
  description: "Admin dashboard for PersonaVerse platform management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
