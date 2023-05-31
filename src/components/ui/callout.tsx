export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
      {children}
    </div>
  );
}
