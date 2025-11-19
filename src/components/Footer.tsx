export default function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Your Name — Built with Next.js + Tailwind
      </div>
    </footer>
  );
}

