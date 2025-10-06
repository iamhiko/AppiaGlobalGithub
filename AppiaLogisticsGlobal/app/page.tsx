import { Navbar } from "@/components/navbar"
import { WorldMap } from "@/components/world-map"
import { GlobalButtons } from "@/components/global-buttons"
import { Footer } from "@/components/footer"
import { ChatButton } from "@/components/chat-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="relative bg-slate-950 pt-14 px-4 py-2 md:p-8" style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-2 md:mb-20">
          
        </div>
        <WorldMap />
      </div>
    </div>
      <GlobalButtons />
      <Footer />
      <ChatButton />
    </main>
  )
}
