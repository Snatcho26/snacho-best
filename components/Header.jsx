'use client';
export default function Header() {
  return (
    <header className="w-full p-4 flex justify-between items-center">
      <img src="/logo.png" alt="Snatcho" className="h-10" />
      <nav>
        <a href="https://instagram.com/snatchoindia" target="_blank" rel="noreferrer" className="text-sm">Instagram</a>
      </nav>
    </header>
  );
}
