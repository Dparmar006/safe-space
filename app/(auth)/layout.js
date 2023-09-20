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
  if (session) {
    redirect('/')
  }

  return <div className='p-4 flex items-center h-full'>{children}</div>
}
