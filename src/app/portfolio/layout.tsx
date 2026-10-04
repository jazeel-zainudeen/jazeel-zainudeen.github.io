export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
