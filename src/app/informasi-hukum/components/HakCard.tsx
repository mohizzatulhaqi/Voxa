import {
  Book,
  Accessibility,
  Briefcase,
  Hospital,
  Scale,
  Users,
} from "lucide-react";
import { FlipCard } from "./FlipCard";

const rightsData = [
  {
    title: "Hak Pendidikan",
    icon: Book,
    description:
      "Hak untuk mendapatkan pendidikan yang inklusif dan berkualitas di semua jenjang pendidikan tanpa diskriminasi.",
  },
  {
    title: "Hak Aksesibilitas",
    icon: Accessibility,
    description:
      "Hak untuk mendapatkan akses yang sama terhadap fasilitas publik, transportasi, informasi, dan komunikasi.",
  },
  {
    title: "Hak Pekerjaan",
    icon: Briefcase,
    description:
      "Hak untuk memperoleh pekerjaan yang layak tanpa diskriminasi dan mendapatkan perlindungan di tempat kerja.",
  },
  {
    title: "Hak Pelayanan Kesehatan",
    icon: Hospital,
    description:
      "Hak untuk mendapatkan pelayanan kesehatan yang komprehensif dan aksesibel sesuai kebutuhan.",
  },
  {
    title: "Hak Perlindungan Hukum",
    icon: Scale,
    description:
      "Hak untuk mendapatkan perlindungan hukum yang setara dan akses terhadap keadilan.",
  },
  {
    title: "Hak Berpartisipasi dalam Sosial dan Politik",
    icon: Users,
    description:
      "Hak untuk berpartisipasi penuh dalam kehidupan politik dan publik, termasuk hak memilih dan dipilih.",
  },
];

export const HakCard = () => {
  return (
    <div className="mb-16">
      <h2 className="text-white text-2xl font-bold mb-8">
        Hak - Hak Penyandang Disabilitas
      </h2>

      <div className="grid grid-cols-3 gap-x-6 gap-y-16">
        {rightsData.map((right, index) => (
          <div key={index} className="flex flex-col items-center">
            <FlipCard icon={right.icon} description={right.description} />
            <h3 className="text-white text-2xl font-medium text-center mt-4">
              {right.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};