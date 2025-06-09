import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section dengan background gambar */}
      <div
        className="relative h-[70vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30, 58, 138, 0.3), rgba(30, 58, 138, 0.3)),
            url('/images/buku.png')
          `,

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        
        <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-white text-xl mb-4 font-medium">Selamat Datang di Portal</h2>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Pos Pelaporan dan Pusat Informasi Penyandang Disabilitas
            </h1>
            <p className="text-white text-lg mb-8 leading-relaxed max-w-3xl">
              Website inklusif yang mempermudah penyandang disabilitas dalam melaporkan tindakan kriminal secara online.
            </p>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-full text-lg"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-900 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <Card className="bg-blue-800 border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-white text-6xl font-bold mb-3">100</h2>
                <p className="text-white text-lg font-medium">Happy Clients</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-800 border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-white text-6xl font-bold mb-3">150</h2>
                <p className="text-white text-lg font-medium">Case Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-800 border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-white text-6xl font-bold mb-3">200</h2>
                <p className="text-white text-lg font-medium">Case Closed</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-800 border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-white text-6xl font-bold mb-3">300</h2>
                <p className="text-white text-lg font-medium">Case Dismiss</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
