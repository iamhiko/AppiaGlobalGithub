"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
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

  const [rotation, setRotation] = useState([0, -60, 0])
  const [isDragging, setIsDragging] = useState(false)
  const [lastPos, setLastPos] = useState([0, 0])

  const deliveredOrders = 1247856
  const ordersInTransit = 34521

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setLastPos([e.clientX, e.clientY])
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const dx = e.clientX - lastPos[0]
    const dy = e.clientY - lastPos[1]

    setRotation((prev) => [
      prev[0] + dx * 0.5, // Yatay hareket → boylam
      Math.max(Math.min(prev[1] - dy * 0.5, 90), -90), // Dikey hareket → enlem sınırları
      0,
    ])
    setLastPos([e.clientX, e.clientY])
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return
    setIsDragging(true)
    const touch = e.touches[0]
    setLastPos([touch.clientX, touch.clientY])
  }

  const handleTouchEnd = () => setIsDragging(false)
  const handleTouchCancel = () => setIsDragging(false)

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return
    // Prevent page from scrolling while rotating the globe
    e.preventDefault()
    const touch = e.touches[0]
    const dx = touch.clientX - lastPos[0]
    const dy = touch.clientY - lastPos[1]

    setRotation((prev) => [
      prev[0] + dx * 0.5,
      Math.max(Math.min(prev[1] - dy * 0.5, 90), -90),
      0,
    ])
    setLastPos([touch.clientX, touch.clientY])
  }

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-visible">
      <div className="flex flex-col min-h-[515px] lg:flex-row w-full overflow-visible">
        {/* World Map Section - Left Side */}
        <div
          className="flex-1 lg:flex-[3.5] p-2 world-map-section touch-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none", overscrollBehavior: "contain" }}
        >
          <ComposableMap
            projection="geoOrthographic"
            projectionConfig={{
              scale: 290,
              rotate: rotation,
              center: [0, 0],
            }}
            style={{
              width: "100%",
              height: "100%",
              overflow: "visible",
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
                    onMouseLeave={() => setTooltipContent("")}
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
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
            >
              {tooltipContent}
            </div>
          )}
        </div>

        {/* Statistics Section - Right Side */}
        <div className="flex-1 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-800/50">
          {/* Delivered Orders Card */}
          <div className="p-6 flex-1">
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Teslim Edilen Siparişler
              </h3>
              <div className="text-3xl font-bold text-white tabular-nums">
                <AnimatedCounter value={deliveredOrders} />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-emerald-400">↑ 12.5%</span>
                <span className="text-slate-500">son 30 gün</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/50" />

          {/* Orders in Transit Card */}
          <div className="p-6 flex-1">
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
    </div>
  )
}
