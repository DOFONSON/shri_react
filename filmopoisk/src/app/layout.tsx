import Link from "next/link"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <header>
    <Link href={'/main'}>main</Link> <br />
    <Link href={'/film'}>film</Link> <br />
    <Link href={'/'}>home</Link>
          
        </header>
        {children}
      </body>
    </html>
  );
}
