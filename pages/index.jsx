import Sidebar from '../components/sidebar/Sidebar'
import Body from '../components/Body'
import Footer from '../components/player-footer/Footer'
import { getSession } from 'next-auth/react'
export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-black flex">
      <Sidebar></Sidebar>
      <Body></Body>
      <Footer></Footer>
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
