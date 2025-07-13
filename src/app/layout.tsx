import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CineFlix - Jogo de Compatibilidade Cinematográfica",
  description: "Descubra o quão compatíveis são seus gostos cinematográficos! Teste sua compatibilidade com filmes e receba recomendações personalizadas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
