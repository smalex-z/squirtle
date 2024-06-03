export const metadata = {
  title: "SQUIRTLE",
  description: "Enhancement of the university transportation experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
        <body>{children}</body>
    </html>

  )
}