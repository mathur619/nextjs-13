import Link from 'next/link'
import { Suspense } from 'react'
import Loading from '../loading'
import TicketList from './TicketList'

export const metadata = {
  title: 'Tickets List | Dojo Helpdesk',
}

export default function Tickets() {
  return (
    <main>
      <nav className="flex justify-between ">
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
        <Link href="/tickets/create">
          <button className="btn-primary"> Create </button>
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  )
}
