"use client"

import { Button } from "@/components/ui/button"
import { Truck, Package, Ship, Users, Building2, Waves, Leaf, Newspaper, TruckIcon } from "lucide-react"

export function GlobalButtons() {
  const buttons = [
    {
      id: "express",
      label: "Express",
      icon: Truck,
      description: "Hızlı teslimat hizmeti",
      href: "#express",
    },
    {
      id: "fullfilment",
      label: "Fullfilment",
      icon: Package,
      description: "Depolama ve dağıtım",
      href: "#fullfilment",
    },
    {
      id: "forwarder",
      label: "Forwarder",
      icon: Ship,
      description: "Forwarding hizmetleri",
      href: "#forwarder",
    },
    {
      id: "ortaklik",
      label: "Ortaklık Programı",
      icon: Users,
      description: "İş ortağımız olun",
      href: "#ortaklik",
    },
    {
      id: "kobi",
      label: "KOBİ",
      icon: Building2,
      description: "KOBİ çözümleri",
      href: "#kobi",
    },
    {
      id: "deniz-parsiyel",
      label: "Deniz Yolu Parsiyel",
      icon: Waves,
      description: "Parsiyel deniz taşımacılığı",
      href: "#deniz-parsiyel",
    },
    {
      id: "green-co2",
      label: "GREEN CO2",
      icon: Leaf,
      description: "Çevre dostu lojistik",
      href: "#green-co2",
    },
    {
      id: "appia-news",
      label: "AppIA News",
      icon: Newspaper,
      description: "Haberler ve duyurular",
      href: "#appia-news",
    },
    {
      id: "karayolu-parsiyel",
      label: "Karayolu Parsiyel",
      icon: TruckIcon,
      description: "Parsiyel karayolu taşımacılığı",
      href: "/karayolu-parsiyel",
    },
  ]

  // Distinct metallic-inspired gradients for each button
  const metallicClasses = [
    // Dark metallic gray
    "bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 text-white border-zinc-600 hover:from-zinc-700 hover:via-zinc-600 hover:to-zinc-800",
    // Deep steel blue
    "bg-gradient-to-br from-blue-900 via-slate-800 to-blue-800 text-white border-blue-700 hover:from-blue-800 hover:via-slate-700 hover:to-blue-700",
    // Dark emerald
    "bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-800 text-white border-emerald-700 hover:from-emerald-800 hover:via-slate-700 hover:to-emerald-700",
    // Bronze/amber dark
    "bg-gradient-to-br from-amber-900 via-stone-800 to-amber-800 text-white border-amber-700 hover:from-amber-800 hover:via-stone-700 hover:to-amber-700",
    // Violet dark
    "bg-gradient-to-br from-violet-900 via-slate-800 to-violet-800 text-white border-violet-700 hover:from-violet-800 hover:via-slate-700 hover:to-violet-700",
    // Rose dark
    "bg-gradient-to-br from-rose-900 via-slate-800 to-rose-800 text-white border-rose-700 hover:from-rose-800 hover:via-slate-700 hover:to-rose-700",
    // Cyan dark
    "bg-gradient-to-br from-cyan-900 via-slate-800 to-cyan-800 text-white border-cyan-700 hover:from-cyan-800 hover:via-slate-700 hover:to-cyan-700",
    // Indigo dark
    "bg-gradient-to-br from-indigo-900 via-slate-800 to-indigo-800 text-white border-indigo-700 hover:from-indigo-800 hover:via-slate-700 hover:to-indigo-700",
    // Fuchsia dark
    "bg-gradient-to-br from-fuchsia-900 via-slate-800 to-fuchsia-800 text-white border-fuchsia-700 hover:from-fuchsia-800 hover:via-slate-700 hover:to-fuchsia-700",
  ]

  return (
    <div className="bg-gradient-to-b from-slate-100 via-slate-20 to-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">Hizmetlerimiz</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {buttons.map((button, index) => {
            const Icon = button.icon
            const colorClass = metallicClasses[index % metallicClasses.length]
            return (
              <Button
                key={button.id}
                variant="outline"
                size="lg"
                className={`relative overflow-hidden h-auto p-3 md:p-6 flex flex-col items-center space-y-2 md:space-y-3 transition-colors border shadow-sm group ${colorClass}`}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = button.href
                  }
                }}
              >
                {/* Metallic sheen overlay */}
                <span className="pointer-events-none absolute -inset-8 bg-gradient-to-r from-white/10 via-white/50 to-white/10 opacity-0 group-hover:opacity-30 transition-transform duration-700 ease-out -skew-x-12 -translate-x-full group-hover:translate-x-full" />

                <div className="p-2 md:p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors">
                  <Icon className="w-4 h-4 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm md:text-lg mb-1 text-white">{button.label}</div>
                  <div className="text-xs md:text-sm text-white/80">{button.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
