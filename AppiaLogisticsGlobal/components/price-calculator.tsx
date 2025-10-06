"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

interface CargoItem {
  id: string
  country: string
  deliveryMethod: string
  width: string
  height: string
  depth: string
  weight: string
}

function Box2D({ width, height, depth }: { width: number; height: number; depth: number }) {
  const svgWidth = 300
  const svgHeight = 200

  // Maksimum boyutları hesapla
  const maxDimension = Math.max(width, height, depth)

  // Container'a sığması için dinamik scale hesapla
  const maxAllowedSize = Math.min(svgWidth * 0.6, svgHeight * 0.6) // Container'ın %60'ı
  const dynamicScale = maxDimension > 0 ? Math.min(maxAllowedSize / maxDimension, 3) : 2

  const minSize = 20

  const scaleX = Math.max(width * dynamicScale, minSize) // En (width) - horizontal
  const scaleY = Math.max(depth * dynamicScale, minSize) // Yükseklik (depth) - vertical (front face)
  const scaleZ = Math.max(height * dynamicScale, minSize) // Boy (height) - depth perspective

  // Kutuyu SVG içinde ortalamak ve yukarı taşımak için merkez hesaplaması
  const centerX = svgWidth / 2
  const centerY = svgHeight / 2

  // İzometrik Ofset (Boy / height)
  const offsetX = scaleZ * 0.3
  const offsetY = -scaleZ * 0.3

  // Kutuyu merkeze göre tekrar ayarlama
  const boxBottomY = centerY + scaleY / 2 + 10
  const boxCenterX = centerX - offsetX / 2

  // Ön yüz noktaları
  const frontBottomLeft = { x: boxCenterX - scaleX / 2, y: boxBottomY }
  const frontBottomRight = { x: boxCenterX + scaleX / 2, y: boxBottomY }
  const frontTopLeft = { x: frontBottomLeft.x, y: frontBottomLeft.y - scaleY }
  const frontTopRight = { x: frontBottomRight.x, y: frontBottomRight.y - scaleY }

  // Arka yüz noktaları (izometrik ofset)
  const backTopLeft = { x: frontTopLeft.x + offsetX, y: frontTopLeft.y + offsetY }
  const backTopRight = { x: frontTopRight.x + offsetX, y: frontTopRight.y + offsetY }
  const backBottomRight = { x: frontBottomRight.x + offsetX, y: frontBottomRight.y + offsetY }

  const frontMiddleTop = { x: (frontTopLeft.x + frontTopRight.x) / 2, y: (frontTopLeft.y + frontTopRight.y) / 2 }
  const frontMiddleBottom = {
    x: (frontBottomLeft.x + frontBottomRight.x) / 2,
    y: (frontBottomLeft.y + frontBottomRight.y) / 2,
  }
  const backMiddleTop = { x: (backTopLeft.x + backTopRight.x) / 2, y: (backTopLeft.y + backTopRight.y) / 2 }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #6366f1 1px, transparent 1px),
            linear-gradient(to bottom, #6366f1 1px, transparent 1px)
          `,
          backgroundSize: "15px 15px",
        }}
      />

      <svg width={svgWidth} height={svgHeight} className="relative z-10">
        <defs>
          <linearGradient id="frontGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#c7d2fe" />
          </linearGradient>
          <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
          </filter>
        </defs>

        <path
          d={`M ${frontTopRight.x} ${frontTopRight.y} 
              L ${backTopRight.x} ${backTopRight.y} 
              L ${backBottomRight.x} ${backBottomRight.y} 
              L ${frontBottomRight.x} ${frontBottomRight.y} Z`}
          fill="url(#rightGradient)"
          stroke="#4f46e5"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        <path
          d={`M ${frontTopLeft.x} ${frontTopLeft.y} 
              L ${backTopLeft.x} ${backTopLeft.y} 
              L ${backTopRight.x} ${backTopRight.y} 
              L ${frontTopRight.x} ${frontTopRight.y} Z`}
          fill="url(#topGradient)"
          stroke="#4f46e5"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        <path
          d={`M ${frontTopLeft.x} ${frontTopLeft.y} 
              L ${frontTopRight.x} ${frontTopRight.y} 
              L ${frontBottomRight.x} ${frontBottomRight.y} 
              L ${frontBottomLeft.x} ${frontBottomLeft.y} Z`}
          fill="url(#frontGradient)"
          stroke="#4f46e5"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        <line
          x1={frontMiddleTop.x}
          y1={frontMiddleTop.y}
          x2={frontMiddleBottom.x}
          y2={frontMiddleBottom.y}
          stroke="#4f46e5"
          strokeWidth="1.5"
          strokeDasharray="3,2"
          opacity="0.7"
        />

        <line
          x1={frontMiddleTop.x}
          y1={frontMiddleTop.y}
          x2={backMiddleTop.x}
          y2={backMiddleTop.y}
          stroke="#4f46e5"
          strokeWidth="1.5"
          strokeDasharray="3,2"
          opacity="0.7"
        />

        {/* En (Width) label - Alt ön kenarın ortası */}
        <g>
          <circle
            cx={(frontBottomLeft.x + frontBottomRight.x) / 2}
            cy={frontBottomLeft.y + 15}
            r="12"
            fill="#4f46e5"
            filter="url(#shadow)"
          />
          <text
            x={(frontBottomLeft.x + frontBottomRight.x) / 2}
            y={frontBottomLeft.y + 15}
            style={{
              fontSize: "11px",
              fontWeight: "600",
              fill: "white",
              textAnchor: "middle",
              dominantBaseline: "middle",
            }}
          >
            {width}
          </text>
        </g>

        {/* Yükseklik (Depth) label - Sol ön kenarın ortası */}
        <g>
          <circle
            cx={frontTopLeft.x - 15}
            cy={(frontTopLeft.y + frontBottomLeft.y) / 2}
            r="12"
            fill="#7c3aed"
            filter="url(#shadow)"
          />
          <text
            x={frontTopLeft.x - 15}
            y={(frontTopLeft.y + frontBottomLeft.y) / 2}
            style={{
              fontSize: "11px",
              fontWeight: "600",
              fill: "white",
              textAnchor: "middle",
              dominantBaseline: "middle",
            }}
          >
            {depth}
          </text>
        </g>

        {/* Boy (Height) label - Sağ üst köşegen kenarın ortası */}
        <g>
          <circle
            cx={(frontTopRight.x + backTopRight.x) / 2 + 10}
            cy={(frontTopRight.y + backTopRight.y) / 2 - 10}
            r="12"
            fill="#059669"
            filter="url(#shadow)"
          />
          <text
            x={(frontTopRight.x + backTopRight.x) / 2 + 10}
            y={(frontTopRight.y + backTopRight.y) / 2 - 10}
            style={{
              fontSize: "11px",
              fontWeight: "600",
              fill: "white",
              textAnchor: "middle",
              dominantBaseline: "middle",
            }}
          >
            {height}
          </text>
        </g>
      </svg>
    </div>
  )
}

function Scene2D({ width, height, depth }: { width: number; height: number; depth: number }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border">
      <Box2D width={width} height={height} depth={depth} />
    </div>
  )
}

export function PriceCalculator() {
  const [cargoItems, setCargoItems] = useState<CargoItem[]>([
    {
      id: "1",
      country: "",
      deliveryMethod: "",
      width: "",
      height: "",
      depth: "",
      weight: "",
    },
  ])

  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  const [errorsByItem, setErrorsByItem] = useState<Record<string, Partial<Record<keyof CargoItem, boolean>>>>({})

  const countries = [
    { value: "tr", label: "Türkiye" },
    { value: "us", label: "Amerika Birleşik Devletleri" },
    { value: "de", label: "Almanya" },
    { value: "fr", label: "Fransa" },
    { value: "gb", label: "İngiltere" },
    { value: "it", label: "İtalya" },
    { value: "es", label: "İspanya" },
    { value: "nl", label: "Hollanda" },
    { value: "ae", label: "Birleşik Arap Emirlikleri" },
    { value: "sa", label: "Suudi Arabistan" },
  ]

  const deliveryMethods = [
    { value: "minivan-express", label: "Minivan Express" },
    { value: "karayolu", label: "Karayolu" },
  ]

  const addCargoItem = () => {
    const newItem: CargoItem = {
      id: Date.now().toString(),
      country: "",
      deliveryMethod: "",
      width: "",
      height: "",
      depth: "",
      weight: "",
    }
    setCargoItems([...cargoItems, newItem])
  }

  const removeCargoItem = (id: string) => {
    if (cargoItems.length > 1) {
      setCargoItems(cargoItems.filter((item) => item.id !== id))
    }
  }

  const updateCargoItem = (id: string, field: keyof CargoItem, value: string) => {
    setCargoItems(cargoItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const MAX_VALUE = 200
  const handleBoundedChange = (id: string, field: keyof CargoItem) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      updateCargoItem(id, field, value)
      setErrorsByItem((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), [field]: false } }))
      return
    }
    const numeric = Number(value)
    if (!Number.isNaN(numeric) && numeric <= MAX_VALUE) {
      updateCargoItem(id, field, value)
      setErrorsByItem((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), [field]: false } }))
    } else {
      // Değeri değiştirmeden sadece uyarı bayrağını aç
      setErrorsByItem((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), [field]: true } }))
    }
  }

  const calculatePrice = () => {
    // Fiyat hesaplama fonksiyonu kaldırıldı
    // Sadece pencere açılacak
    setCalculatedPrice(0)
  }

  const isFormValid = cargoItems.every((item) => item.country && item.deliveryMethod && item.weight && item.width && item.height && item.depth)

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Kargo Fiyat Hesaplama</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6" style={{ scrollbarGutter: 'stable' }}>
        {cargoItems.map((item, index) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Kargo #{index + 1}</h3>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCargoItem}
                  className="h-8 w-8 p-0 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {cargoItems.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCargoItem(item.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`country-${item.id}`}>Ülke Seçiniz</Label>
                    <Select value={item.country} onValueChange={(value) => updateCargoItem(item.id, "country", value)}>
                      <SelectTrigger id={`country-${item.id}`} className="w-full">
                        <SelectValue placeholder="Ülke" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-[9999]" position="popper" sideOffset={4}>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`deliveryMethod-${item.id}`}>Teslimat Şekli</Label>
                    <Select value={item.deliveryMethod} onValueChange={(value) => updateCargoItem(item.id, "deliveryMethod", value)}>
                      <SelectTrigger id={`deliveryMethod-${item.id}`} className="w-full">
                        <SelectValue placeholder="Teslimat Şekli" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-[9999]" position="popper" sideOffset={4}>
                        {deliveryMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor={`width-${item.id}`}>En (cm)</Label>
                   <Input
                       id={`width-${item.id}`}
                       type="number"
                       placeholder="En giriniz. (cm)"
                       className="placeholder:text-xs placeholder:text-gray-400 placeholder:opacity-60 border border-gray-300 focus:border-gray-600"
                       value={item.width}
                      onChange={handleBoundedChange(item.id, "width")}
                     />
                     <div className="min-h-5">
                       {errorsByItem[item.id]?.width && (
                         <p className="text-xs text-red-600 mt-1">200'den büyük en için lütfen iletişime geçin.</p>
                       )}
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor={`height-${item.id}`}>Boy (cm)</Label>
                   <Input
                       id={`height-${item.id}`}
                       type="number"
                       placeholder="Boy giriniz. (cm)"
                       className="placeholder:text-xs placeholder:text-gray-400 placeholder:opacity-60 border border-gray-300 focus:border-gray-600"
                       value={item.height}
                      onChange={handleBoundedChange(item.id, "height")}
                     />
                    <div className="min-h-5">
                      {errorsByItem[item.id]?.height && (
                        <p className="text-xs text-red-600 mt-1">200'den büyük boy için lütfen iletişime geçin.</p>
                      )}
                    </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor={`depth-${item.id}`}>Yükseklik (cm)</Label>
                   <Input
                       id={`depth-${item.id}`}
                       type="number"
                       placeholder="Yükseklik giriniz. (cm)"
                       className="placeholder:text-xs placeholder:text-gray-400 placeholder:opacity-60 border border-gray-300 focus:border-gray-600"
                       value={item.depth}
                      onChange={handleBoundedChange(item.id, "depth")}
                     />
                     <div className="min-h-5">
                       {errorsByItem[item.id]?.depth && (
                         <p className="text-xs text-red-600 mt-1">200'den büyük yükseklik için lütfen iletişime geçin.</p>
                       )}
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor={`weight-${item.id}`}>Ağırlık (kg)</Label>
                   <Input
                       id={`weight-${item.id}`}
                       type="number"
                       placeholder="Ağırlık giriniz. (kg)"
                       className="placeholder:text-xs placeholder:text-gray-400 placeholder:opacity-60 border border-gray-300 focus:border-gray-600"
                       value={item.weight}
                      onChange={handleBoundedChange(item.id, "weight")}
                     />
                    <div className="min-h-5">
                      {errorsByItem[item.id]?.weight && (
                        <p className="text-xs text-red-600 mt-1">200'den büyük ağırlık için lütfen iletişime geçin.</p>
                      )}
                    </div>
                   </div>
                 </div>
              </div>

              <div className="space-y-2">
                <Label>3D Görünüm</Label>
                <div className="h-64 border rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                  {item.width && item.height && item.depth ? (
                    <Scene2D
                      width={Number.parseFloat(item.width) || 1}
                      height={Number.parseFloat(item.height) || 1}
                      depth={Number.parseFloat(item.depth) || 1}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📦</div>
                        <p>Ölçüleri görmek için boyutları girin</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button onClick={calculatePrice} className="w-full" disabled={!isFormValid}>
          Toplam Fiyat Hesapla
        </Button>

        {calculatedPrice !== null && (
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">Fiyat Hesaplama</p>
            <p className="text-sm text-muted-foreground mt-2">
              Fiyat bilgisi için lütfen iletişime geçin.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
