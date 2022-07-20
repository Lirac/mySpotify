import Sidebar from '../components/sidebar/Sidebar'
import Body from '../components/Body'
import Footer from '../components/player-footer/Footer'
import { getSession } from 'next-auth/react'
export default function Home() {
  return (
    <main className="h-screen overflow-hidden flex">
      <Sidebar></Sidebar>
      <Body></Body>
      <Footer></Footer>
    </main>

  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
    if(!session){
        return {
            redirect:{
                destination: '/login',
                permanent: false,
            }
        }
    }

  return {
    props: {
      session,
    },
  }
}
