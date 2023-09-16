import { NextResponse } from 'next/server'

export async function GET () {
  return NextResponse.json(
    {
      message: 'All the posts here',
      data: null
    },
    {
      status: 200
    }
  )
}
