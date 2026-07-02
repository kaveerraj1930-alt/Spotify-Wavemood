import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import PreviewPlayer from './PreviewPlayer'

function Layout() {
  return (
    <div className="min-h-screen bg-spotify-black">
      <Sidebar />
      <main className="md:ml-64 pb-24">
        <TopBar />
        <Outlet />
      </main>
      <PreviewPlayer />
    </div>
  )
}

export default Layout
