export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="mx-auto max-w-prose px-4 py-6 lg:px-6">{children}</div>
    </div>
  );
}
