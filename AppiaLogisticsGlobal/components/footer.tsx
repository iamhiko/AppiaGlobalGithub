import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const footerSections = [
    {
      title: "AppIA Global",
      links: [
        { name: "AppIA Express", href: "#" },
        { name: "Global Forwarding", href: "#" },
        { name: "Karayolu Parsiyel", href: "#" },
        { name: "AppIA Green", href: "#contact" },
        { name: "AppIA - IA Asistan", href: "#blog" },
        { name: "Terminal", href: "#blog" },
        { name: "Akademi", href: "#blog" },
      ],
    },
    {
      title: "AppIA Kobi",
      links: [
        { name: "Fullfilment", href: "#" },
        { name: "Kobi Mentor", href: "#" },   
      ],
    },
    
    {
      title: "İş Ortağımız Olun",
      links: [
        { name: "Aracı Kurum Hesabı", href: "#" },
        { name: "Affiliate/Ortaklık Programı", href: "#" },
        { name: "Adresler: DE-TR", href: "#" },
        { name: "Kargo Sözleşme Numaraları", href: "#" },

      ],
    },
  ]

  const companySection = {
    title: "Şirket",
    links: [
      { name: "Hakkımızda", href: "#" },
      { name: "AppIA News", href: "#" },
      { name: "Kariyer Başvuru Formu", href: "#" },
      { name: "İletişim", href: "#" },
      { name: "KVKK", href: "#" },
      { name: "Kullanıcı Sözleşmesi", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Top-Centered Logo */}
        <div className="md:hidden flex justify-start items-center mb-4">
          <Image
            src="/appiafooterlogo.png"
            alt="Appia Express Logo"
            width={96}
            height={96}
            className="w-28 h-14 object-contain"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-start">


          {/* Desktop Company Info */}
          <div className="hidden md:flex flex-col items-start gap-1 col-span-1">
            <div className="flex items-start gap-2 mb-0 -mt-8">
              <Image
                src="/appiafooterlogo.png"
                alt="Appia Express Logo"
                width={96}
                height={96}
                className="w-24 h-24 object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold -mt-6">
              İletişim Bilgilerimiz
            </h3>

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

            {/* App Store Badges - Desktop Only */}
            <div className="flex flex-col gap-4 mt-4">
              <a href="#" className="inline-block">
                <Image
                  src="/googleplay.png"
                  alt="Google Play Store"
                  width={120}
                  height={40}
                  className="h-14 w-auto border-1 border-gray-200 rounded"
                />
              </a>
              <a href="#" className="inline-block">
                <Image
                  src="/appstore.png"
                  alt="Apple App Store"
                  width={120}
                  height={40}
                  className="h-14 w-auto border-1 border-gray-200 rounded"
                />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-2 md:space-y-4">
              <h3 className="text-sm md:text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-1 md:space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-300 hover:text-primary transition-colors text-xs md:text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Add Company section under AppIA Kobi */}
              {section.title === "AppIA Kobi" && (
                <div className="mt-4 md:mt-6 space-y-2 md:space-y-4">
                  <h3 className="text-sm md:text-lg font-semibold">{companySection.title}</h3>
                  <ul className="space-y-1 md:space-y-2">
                    {companySection.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} className="text-gray-300 hover:text-primary transition-colors text-xs md:text-sm">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ))}

          {/* Mobile Contact Info - Right Side */}
          <div className="md:hidden flex flex-col items-start">
            <h3 className="text-sm font-semibold mb-2">
              İletişim Bilgilerimiz
            </h3>
            <div className="space-y-1">

              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-3 h-3 text-primary" />
                <span>+90 212 555 0123</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-3 h-3 text-primary" />
                <span>info@appiaexpress.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile App Store Badges */}
        <div className="md:hidden flex justify-center gap-4 mt-8 mb-6">
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

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Appia Express. Tüm hakları saklıdır.</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}