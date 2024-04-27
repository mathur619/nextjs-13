import { NextResponse } from 'next/server'

// it's working dynamically without this declaration also, but it was not working for netninja
export const dynamic = 'force-dynamic'

export async function GET() {
  const res = await fetch('http://localhost:4000/tickets')
  const tickets = await res.json()

  return NextResponse.json(tickets, {
    status: 200,
  })
}
