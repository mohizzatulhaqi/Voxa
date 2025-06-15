"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

    let label = segment.replace(/-/g, " ");

    switch (segment) {
      case "laporan-kejadian":
        label = "Laporan Kejadian";
        break;
      case "informasi-hukum":
        label = "Informasi Hukum";
        break;
      case "tentang-kami":
        label = "Tentang Kami";
        break;
      case "riwayat":
        label = "Riwayat";
        break;
      case "login":
        label = "Login";
        break;
      case "detail":
        label = "Detail";
        break;
      default:
        label = label
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    }

    return {
      href,
      label,
      isLast: index === pathSegments.length - 1,
    };
  });

  return (
    <div className="flex justify-end mb-4">
      <nav className="text-white flex items-center text-sm">
        <Link href="/" className="hover:text-amber-400 font-medium">
          Home
        </Link>

        {breadcrumbItems.map((item) => (
          <div key={item.href} className="flex items-center">
            <ChevronRight size={16} className="mx-2 text-gray-300" />
            {item.isLast ? (
              <span className="text-amber-400 font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-amber-400">
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
