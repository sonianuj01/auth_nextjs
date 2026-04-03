import Link from "next/link"

export default function Home() {
  return (
    <>
    <div>
      <h1>Welcome to an Authentication application built in nextjs </h1>
      <Link href='/login'>Visit to login page</Link>
    </div>
    </>
  )
}
