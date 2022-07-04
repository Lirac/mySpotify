import Sidebar from '../components/sidebar/Sidebar'
import Body from '../components/Body'
const Index = () => {
  return (
    <main className="h-screen overflow-hidden bg-black flex">
      <Sidebar></Sidebar>
      <Body></Body>
    </main>
  )
}

export default Index
