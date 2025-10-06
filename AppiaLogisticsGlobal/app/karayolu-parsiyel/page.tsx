import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PriceCalculator } from "@/components/price-calculator"

export default function KarayoluParsiyelPage() {
  return (
    <main className="min-h-screen bg-white" style={{ scrollbarGutter: 'stable' }}>
      <Navbar />
      <div className="pt-14">
        {/* Hero Section */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-6">
              Karayolu Parsiyel Taşımacılığı
            </h1>
            <div className="space-y-4 text-lg md:text-l text-gray-700 leading-relaxed">
              <p>
                <strong>AppIA</strong> ile Avrupa karayolu ve minivan express taşımacılığında şeffaf fiyat, 
                zamanında teslimat ve kesintisiz takip hizmetini bir arada sunuyoruz.
              </p>
              <p>
                Gelişmiş dijital sistemlerimiz ve profesyonel lojistik altyapımız sayesinde 
                gönderileriniz ilk andan teslimata kadar kontrol altında, güvenle ve zamanında ulaştırıyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Price Calculator Section */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <PriceCalculator />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
