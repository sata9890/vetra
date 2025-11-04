'use client'

import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, Briefcase, MessageSquare, TrendingUp, Shield, Zap } from 'lucide-react'

export default function Home() {
  const { data: session } = useSession()

  if (session?.user) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">Vetra</div>
            <div className="flex gap-4">
              <Link href="/explore">
                <Button variant="ghost">Explore</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="text-3xl font-bold text-primary">Vetra</div>
          <Button onClick={() => signIn()}>Sign In</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Where ideas become real—together.</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join a vetted community of professionals. Collaborate on projects, share ideas, and build something amazing.
          </p>
          <Button size="lg" onClick={() => signIn()}>
            Get Started
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Vetra?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Community</h3>
              <p className="text-muted-foreground">All members are vetted to ensure quality and trust.</p>
            </div>

            <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <Briefcase className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Project Collaboration</h3>
              <p className="text-muted-foreground">Find collaborators and build projects together.</p>
            </div>

            <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Network</h3>
              <p className="text-muted-foreground">Connect with professionals in your field.</p>
            </div>

            <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Messaging</h3>
              <p className="text-muted-foreground">Chat with team members and collaborate seamlessly.</p>
            </div>

            <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Build Reputation</h3>
              <p className="text-muted-foreground">Earn endorsements and grow your trust score.</p>
            </div>

            <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Simple Payments</h3>
              <p className="text-muted-foreground">Pay and get paid with credits and invoices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join?</h2>
          <p className="text-lg mb-8 opacity-90">Start collaborating with vetted professionals today.</p>
          <Button size="lg" variant="secondary" onClick={() => signIn()}>
            Sign In Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-400">
          <p>&copy; 2024 Vetra. Where ideas become real—together.</p>
        </div>
      </footer>
    </div>
  )
}
