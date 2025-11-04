'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, Zap } from 'lucide-react'
import { trpc } from '@/lib/trpc'

const CREDIT_PACKS = [
  { credits: 500, price: 4.99, popular: false },
  { credits: 2000, price: 14.99, popular: true },
  { credits: 5000, price: 29.99, popular: false },
]

export default function Billing() {
  const { data: session, status } = useSession()
  const { data: credits } = trpc.billing.getCredits.useQuery(undefined, {
    enabled: !!session?.user,
  })

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold">Billing & Credits</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Balance */}
        <div className="mb-12 p-6 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
              <p className="text-4xl font-bold flex items-center gap-2">
                <Zap className="h-8 w-8 text-primary" />
                {credits?.credits || 0} credits
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">1 credit = $0.01</p>
              <p className="text-2xl font-semibold">${((credits?.credits || 0) * 0.01).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Credit Packs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Buy Credits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {CREDIT_PACKS.map((pack) => (
              <div
                key={pack.credits}
                className={`p-6 rounded-lg border transition-colors ${
                  pack.popular
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary'
                }`}
              >
                {pack.popular && (
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-3xl font-bold">{pack.credits}</p>
                  <p className="text-sm text-muted-foreground">credits</p>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold">${pack.price}</p>
                  <p className="text-xs text-muted-foreground">
                    ${(pack.price / pack.credits * 100).toFixed(2)} per 100 credits
                  </p>
                </div>
                <Button className="w-full" variant={pack.popular ? 'default' : 'outline'}>
                  Buy Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-muted/50">
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No transactions yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
