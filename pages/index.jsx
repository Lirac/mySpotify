import Sidebar from '../components/sidebar/Sidebar'
import Body from '../components/Body'
import { getSession } from 'next-auth/react'
export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-black flex">
      <Sidebar></Sidebar>
      <Body></Body>
    </main>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
