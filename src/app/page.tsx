import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(10, 59, 140, 0.7)",
        }}
      >
        <div className="container mx-auto px-6 md:px-12 py-12">
          <div className="max-w-3xl">
            <h2 className="text-white text-xl mb-4">Selamat Datang di Portal</h2>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Pos Pelaporan dan Pusat Informasi Penyandang Disabilitas
            </h1>
            <p className="text-white text-lg mb-8">
              Website inklusif yang mempermudah penyandang disabilitas dalam melaporkan tindakan kriminal secara online.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-full" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <Card className="bg-blue-800 border-none">
            <CardContent className="p-6">
              <h2 className="text-white text-5xl font-bold mb-2">100</h2>
              <p className="text-white">Happy Clients</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-800 border-none">
            <CardContent className="p-6">
              <h2 className="text-white text-5xl font-bold mb-2">150</h2>
              <p className="text-white">Case Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-800 border-none">
            <CardContent className="p-6">
              <h2 className="text-white text-5xl font-bold mb-2">200</h2>
              <p className="text-white">Case Closed</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-800 border-none">
            <CardContent className="p-6">
              <h2 className="text-white text-5xl font-bold mb-2">300</h2>
              <p className="text-white">Case Dismiss</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
