"use client"

import { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count.toLocaleString("tr-TR")}</span>
}

export function WorldMap() {
  const [tooltipContent, setTooltipContent] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const deliveredOrders = 1247856
  const ordersInTransit = 34521

  return (
    <div className="flex flex-col lg:flex-row gap-3 w-full">
      {/* World Map Section - Left Side */}
      <div className="flex-1 lg:flex-[1.5] bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-2 shadow-2xl overflow-hidden world-map-section">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 140,
            center: [0, 0],
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                    const { name } = geo.properties
                    setTooltipContent(name)
                    setPosition({ x: e.clientX, y: e.clientY })
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("")
                  }}
                  style={{
                    default: {
                      fill: "#334155",
                      stroke: "#1e293b",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: "#3b82f6",
                      stroke: "#1e293b",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#2563eb",
                      stroke: "#1e293b",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>

        {tooltipContent && (
          <div
            className="fixed z-50 bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm font-medium pointer-events-none border border-slate-700"
            style={{
              left: `${position.x + 10}px`,
              top: `${position.y + 10}px`,
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>

      {/* Statistics Section - Right Side */}
      <div className="flex-1 space-y-2 stats-section">
        {/* Delivered Orders Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-4 shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
          <div className="flex justify-end mb-4">
 
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Teslim Edilen Siparişler</h3>
            <div className="text-3xl font-bold text-white tabular-nums">
              <AnimatedCounter value={deliveredOrders} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-emerald-400">↑ 12.5%</span>
              <span className="text-slate-500">son 30 gün</span>
            </div>

          </div>

        </div>

        {/* Orders in Transit Card */}
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-4 shadow-xl hover:shadow-amber-500/10 transition-all duration-300">

          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              Hareket Halindeki Siparişler
            </h3>
            <div className="text-3xl font-bold text-white tabular-nums">
              <AnimatedCounter value={ordersInTransit} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-amber-400">↑ 8.3%</span>
              <span className="text-slate-500">son 24 saat</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

