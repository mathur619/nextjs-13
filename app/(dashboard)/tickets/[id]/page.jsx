import React from 'react'
import { notFound } from 'next/navigation'

export const dynamicParams = true
// true by default: if the params are not defined while building, then also it allows them and tries to fetch the data
// in this case, let's say for ids "1" to "3" pages were build during build as they these ids were returned by the "generateStaticParams" fnc,
// but if some other id lets say "4" comes in, next will still try to fetch the data and try to render it

const getTicket = async (id) => {
  // imitate delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const res = await fetch('http://localhost:4000/tickets/' + id, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    notFound()
  }

  return res.json()
}

export async function generateMetadata({ params }) {
  const ticket = await getTicket(params.id)

  return {
    title: `${ticket.title} | Dojo Helpdesk`,
  }
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets')
  const tickets = await res.json()

  return tickets.map((ticket) => ({ id: ticket.id }))
}

export default async function Ticket({ params }) {
  const ticket = await getTicket(params.id)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
