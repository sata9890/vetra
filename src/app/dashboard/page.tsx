'use client'

import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, Briefcase, MessageSquare, TrendingUp, Plus, LogOut } from 'lucide-react'
import { trpc } from '@/lib/trpc'

export default function Dashboard() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Vetra</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.name || session.user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {session.user.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">
            Manage your profile, projects, and collaborate with the community.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Credits</p>
                <p className="text-3xl font-bold">{credits?.credits || 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary opacity-20" />
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projects</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <Briefcase className="h-8 w-8 text-primary opacity-20" />
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary opacity-20" />
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trust Score</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-20" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Link href="/projects/new">
            <Button className="w-full gap-2" size="lg">
              <Plus className="h-5 w-5" />
              Create Project
            </Button>
          </Link>

          <Link href="/explore">
            <Button variant="outline" className="w-full gap-2" size="lg">
              <Briefcase className="h-5 w-5" />
              Explore Projects
            </Button>
          </Link>

          <Link href="/messages">
            <Button variant="outline" className="w-full gap-2" size="lg">
              <MessageSquare className="h-5 w-5" />
              Messages
            </Button>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground text-center py-8">
            No recent activity. Start by creating a project or exploring the community!
          </p>
        </div>
      </main>
    </div>
  )
}
