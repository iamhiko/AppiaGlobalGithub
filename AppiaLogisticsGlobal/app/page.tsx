import { Navbar } from "@/components/navbar"
import { WorldMap } from "@/components/world-map"
import { GlobalButtons } from "@/components/global-buttons"
import { Footer } from "@/components/footer"
import { ChatButton } from "@/components/chat-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="relative bg-white pt-16 px-4 pb-2 md:pt-8 md:px-8 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-0 md:mb-10">
          
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
