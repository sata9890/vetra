'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, Search } from 'lucide-react'
import { trpc } from '@/lib/trpc'

export default function Explore() {
  const { data: session, status } = useSession()
  const { data: posts, isLoading } = trpc.posts.list.useQuery({
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
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-2xl font-bold text-primary mb-4">Vetra</div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts, projects, people..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Post */}
        <div className="mb-8 p-4 rounded-lg border border-border bg-card">
          <div className="flex gap-4">
            <div className="flex-1">
              <textarea
                placeholder="Share your thoughts, ideas, or ask for help..."
                className="w-full p-3 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <div className="mt-3 flex justify-end">
                <Button>Post</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading posts...</div>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="p-4 rounded-lg border border-border bg-card hover:border-primary transition-colors">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{post.user.name || post.user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-foreground mb-3">{post.content}</p>
                    <div className="flex gap-4 text-muted-foreground">
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">0</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No posts yet. Be the first to share!</p>
              <Button>Create Post</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
