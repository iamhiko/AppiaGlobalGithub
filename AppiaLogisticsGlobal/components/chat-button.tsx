"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Burada mesaj gönderme işlemi yapılacak
      console.log("Mesaj gönderildi:", message)
      setMessage("")
    }
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-border overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-4">
            <h3 className="font-semibold">Canlı Destek</h3>
            <p className="text-sm opacity-90">Size nasıl yardımcı olabiliriz?</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 h-64 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">
                  Merhaba! Appia Express'e hoş geldiniz. Size nasıl yardımcı olabilirim?
                </p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Mesajınızı yazın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
