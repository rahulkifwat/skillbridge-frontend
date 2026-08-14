import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Skill Bridge",
  description: "Skill Bridge",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
