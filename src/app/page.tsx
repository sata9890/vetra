'use client'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-4xl font-bold text-primary">Vetra</h1>
          <p className="text-muted-foreground mt-2">Where ideas become real—together.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Vetra</h2>
          <p className="text-muted-foreground mb-8">
            A vetted community platform for collaboration and innovation.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
              Get Started
            </button>
            <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
