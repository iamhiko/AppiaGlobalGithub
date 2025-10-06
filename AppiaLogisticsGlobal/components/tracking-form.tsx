"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CheckCircle } from "lucide-react"

export function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTracking = async () => {
    if (!trackingNumber.trim()) return

    setIsLoading(true)

    // Simulated tracking result
    setTimeout(() => {
      setTrackingResult({
        trackingNumber: trackingNumber,
        status: "Teslim Edildi",
        currentLocation: "İstanbul, Türkiye",
        estimatedDelivery: "Teslim edildi",
        timeline: [
          { status: "Gönderi Alındı", location: "Ankara", date: "2024-01-15 09:00", completed: true },
          { status: "Transfer Merkezinde", location: "Ankara Transfer", date: "2024-01-15 14:30", completed: true },
          { status: "Yolda", location: "İstanbul'a Gidiyor", date: "2024-01-16 08:00", completed: true },
          { status: "Dağıtım Merkezinde", location: "İstanbul Dağıtım", date: "2024-01-16 16:00", completed: true },
          { status: "Teslim Edildi", location: "İstanbul", date: "2024-01-17 11:30", completed: true },
        ],
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Gönderinizi Takip Edin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="tracking">Gönderi Numarası</Label>
            <Input
              id="tracking"
              placeholder="Gönderi numaranızı girin (örn: APG123456789)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button onClick={handleTracking} disabled={!trackingNumber.trim() || isLoading} className="mt-6">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {trackingResult && (
          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Gönderi No: {trackingResult.trackingNumber}</p>
                  <p className="text-sm text-muted-foreground">Durum: {trackingResult.status}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Gönderi Geçmişi</h3>
              {trackingResult.timeline.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1 ${item.completed ? "bg-primary" : "bg-muted"}`} />
                  <div className="flex-1">
                    <p className="font-medium">{item.status}</p>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
