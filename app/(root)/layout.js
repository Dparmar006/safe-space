import Sidebar from '@/components/layouts/Sidebar'
import AuthProvider from '@/components/auth/AuthProvider'
import Chat from '@/components/chats/Chat'
import Header from '@/components/layouts/Header'
import { getServerSession } from 'next-auth'
import authOptions from '../../utils/auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Untold - Find your community, your way, with Untold.',
  description:
    "Experience a social media platform like no other, where your preferences and interests take center stage. With Untold, you're in control. Discover, connect, and share in an environment designed exclusively for you."
}

export default async function RootLayout ({ children }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/signin')
  }

  return (
    <main className={`min-h-screen h-full flex`}>
      <AuthProvider>
        <Sidebar />
        <section className='p-4 w-full max-h-screen overflow-y-auto'>
          <Header />
          <div className='pt-12'>{children}</div>
        </section>
        <Chat />
      </AuthProvider>
    </main>
  )
}
