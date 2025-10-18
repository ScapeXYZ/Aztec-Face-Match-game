export const metadata = {
  title: "Aztec Face Match",
  description: "A fun Aztec Team Squad face matching challenge!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
