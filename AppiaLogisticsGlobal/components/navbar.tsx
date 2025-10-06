"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, UserCircle, Globe, ChevronDown, Phone, Mail } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("TR")
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const menuItems: { name: string; href: string }[] = []

  const languages = [
    { code: "TR", name: "Türkçe", flag: "🇹🇷" },
    { code: "EN", name: "English", flag: "🇺🇸" }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Desktop Logo */}
          <div className="hidden md:block flex-shrink-0">
            <div className="flex flex-col items-start justify-center">
              <Link
                href="/"
                aria-label="Go to homepage"
                className="p-0 m-0 bg-transparent border-0 cursor-pointer"
              >
                <Image
                  src="/appialogo.png"
                  alt="Appia Express Logo"
                  width={150}
                  height={100}
                  className="w-36 h-auto object-contain"
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center w-full relative">
            {/* Left Side - Hamburger Menu and Language Selector */}
            <div className="flex items-center space-x-0">
              {/* Hamburger Menu */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
              </Button>

              {/* Language Selector for Mobile */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {languages.find(lang => lang.code === selectedLanguage)?.code}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setSelectedLanguage(language.code)
                          setIsLanguageOpen(false)
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                          selectedLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <div>
                          <div className="font-medium text-sm">{language.name}</div>
                          <div className="text-xs text-gray-500">{language.code}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Logo - Absolute Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link
                href="/"
                aria-label="Go to homepage"
                className="p-0 m-0 bg-transparent border-0 cursor-pointer"
              >
                <Image
                  src="/appialogo.png"
                  alt="Appia Express Logo"
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* MyAPPIA Button - Right */}
            <div className="ml-auto">
              <button
                type="button"
                onClick={() => (window.location.href = "https://app.appiaexpress.com")}
                className="group relative inline-flex items-center rounded-full p-2 text-white bg-gradient-to-r from-red-700 via-rose-600 to-red-700 shadow-sm shadow-red-300 hover:shadow-red-400 hover:scale-[1.06] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                aria-label="MyAPPIA"
              >
                <span className="absolute inset-0 rounded-full opacity-30 blur-lg bg-gradient-to-r from-red-500 to-rose-500 -z-10"></span>
                <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                  <span className="absolute -inset-y-2 -left-1/2 w-1/2 bg-gradient-to-r from-white/10 via-white/60 to-white/10 blur-md transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                </span>
                <UserCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveItem(item.name)}
                  className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                    activeItem === item.name ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 ml-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-6 h-6 text-gray-600" />
                <span className="text-base font-medium text-gray-700">
                  {languages.find(lang => lang.code === selectedLanguage)?.code}
                </span>
                <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language.code)
                        setIsLanguageOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        selectedLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{language.flag}</span>
                      <div>
                        <div className="font-medium">{language.name}</div>
                        <div className="text-sm text-gray-500">{language.code}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Button 
              size="default" 
              className="relative group rounded-full px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-red-700 via-rose-600 to-red-700 shadow-sm shadow-red-300 hover:shadow-red-400 hover:scale-[1.04] transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={() => (window.location.href = "https://app.appiaexpress.com")}
            >
              <span className="absolute inset-0 rounded-full opacity-30 blur-lg bg-gradient-to-r from-red-500 to-rose-500 -z-10"></span>
              <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute -inset-y-3 -left-1/2 w-1/2 bg-gradient-to-r from-white/10 via-white/70 to-white/10 blur-md transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              </span>
              <UserCircle className="mr-2 h-5 w-5" />
              <span>MyAPPIA</span>
            </Button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 bg-white border-b border-border shadow-lg z-40">
          <div className="px-4 py-4 space-y-4">
            {/* Contact Info from Footer */}
            <div>
              <h3 className="text-sm font-semibold mb-2">İletişim Bilgilerimiz</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+90 212 555 0123</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>info@appiaexpress.com</span>
                </div>
              </div>
            </div>

            {/* Store Badges from Footer */}
            <div className="flex justify-center gap-4 pt-2">
              <a href="#" className="inline-block">
                <Image
                  src="/googleplay.png"
                  alt="Google Play Store"
                  width={120}
                  height={40}
                  className="h-12 w-auto border-1 border-gray-200 rounded"
                />
              </a>
              <a href="#" className="inline-block">
                <Image
                  src="/appstore.png"
                  alt="Apple App Store"
                  width={120}
                  height={40}
                  className="h-12 w-auto border-1 border-gray-200 rounded"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
