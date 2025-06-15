import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialMediaLinks() {
  return (
    <div className="flex space-x-6">
      <Button variant="ghost" size="icon" className="text-white hover:text-gray-300" asChild>
        <Link href="https://youtube.com">
          <Youtube size={24} />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="text-white hover:text-gray-300" asChild>
        <Link href="https://twitter.com">
          <Twitter size={24} />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="text-white hover:text-gray-300" asChild>
        <Link href="https://facebook.com">
          <Facebook size={24} />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="text-white hover:text-gray-300" asChild>
        <Link href="https://instagram.com">
          <Instagram size={24} />
        </Link>
      </Button>
    </div>
  )
}