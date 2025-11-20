export default function Footer() {
  return (
    <footer className="py-8 border-t bg-brand-navy_blue">
      <div className="container mx-auto px-6 text-center text-sm text-brand-white">
        © {new Date().getFullYear()} Ethan Sie
      </div>
    </footer>
  );
}

