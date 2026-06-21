import MatrixBackground from "@/components/MatrixBackground";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MatrixBackground />
        {children}
      </body>
    </html>
  );
}
