import Image from "next/image";
import Link from "next/link";

const legalAidInstitutions = [
  {
    name: "Komnas HAM",
    image: "/images/komnasHAM.png",
    url: "https://www.komnasham.go.id",
  },
  {
    name: "LPSK",
    image: "/images/LPSK.png",
    url: "https://www.lpsk.go.id",
  },
  {
    name: "Kemensos RI",
    image: "/images/Kemensos.png",
    url: "https://www.kemensos.go.id",
  },
  {
    name: "PSHK",
    image: "/images/PSHK.png",
    url: "https://www.pshk.or.id",
  },
];

export const LembagaBantuanHukum = () => {
  return (
    <div className="pb-16">
      <h2 className="text-white text-2xl font-bold mb-12">
        Lembaga Bantuan Hukum
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {" "}
        {legalAidInstitutions.map((institution, index) => (
          <Link
            href={institution.url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <div className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center mb-2 p-1 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={institution.image}
                alt={institution.name}
                width={160}
                height={160}
                className="rounded-full object-contain"
              />
            </div>
            <h3 className="text-white text-sm md:text-base text-center font-medium group-hover:text-blue-200 transition-colors">
              {institution.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};
