'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Briefcase, Users } from 'lucide-react'
import { trpc } from '@/lib/trpc'

export default function Projects() {
  const { data: session, status } = useSession()
  const { data: projects, isLoading } = trpc.projects.list.useQuery({
    limit: 20,
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
          <Link href="/projects/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-8">
          <Button variant="default" size="sm">All</Button>
          <Button variant="outline" size="sm">Open</Button>
          <Button variant="outline" size="sm">In Progress</Button>
          <Button variant="outline" size="sm">Completed</Button>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading projects...</div>
        ) : projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold line-clamp-2">{project.title}</h3>
                    <Briefcase className="h-5 w-5 text-primary opacity-50 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {project.status}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {project.members.length}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No projects yet.</p>
            <Link href="/projects/new">
              <Button>Create First Project</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
