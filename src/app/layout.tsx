import "./globals.css";
import Nav from "../components/Nav";

export const metadata = {
  title: "My Portfolio",
  description: "Portfolio built with Next.js + Tailwind"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 container mx-auto px-6 py-10">{children}</main>
          <footer className="mt-12 py-8 border-t">
            <div className="container mx-auto px-6 text-center text-sm text-gray-600">
              © {new Date().getFullYear()} Your Name
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
