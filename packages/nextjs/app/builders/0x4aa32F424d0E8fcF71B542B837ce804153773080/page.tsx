import Image from "next/image";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const imgSize = { width: 32, height: 32 };
const iconStyle =
  "transition-transform hover:scale-125 text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-400 flex items-center gap-1 text-lg";

const anchorStyle = "text-2xl hover:scale-110 transition-transform duration-300 hover:drop-shadow-lg";

const icons = [
  {
    anchorUrl: "https://github.com/mufasa-0420",
    anchorStyle,
    iconUrl: "https://api.iconify.design/tabler:brand-github.svg",
    iconAlt: "Github",
    iconStyle,
  },
  {
    anchorUrl: "https://t.me/bobbyliu0420",
    anchorStyle,
    iconUrl: "https://api.iconify.design/tabler:brand-telegram.svg",
    iconAlt: "Telegram",
    iconStyle,
  },
];

const PrincePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-7 md:flex-row md:gap-8">
      <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-xl">
        <Image
          src="https://avatars.githubusercontent.com/u/215039033?v=4"
          alt="Bobby's Avatar"
          width={256}
          height={256}
          className="object-cover border-4 border-blue-300 dark:border-pink-400 shadow-lg"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center md:items-start">
        <div className="max-w-2xl mx-auto rounded-2xl shadow-2xl p-10">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">Hi, I&apos;m Bobby!</h1>
            <div>
              <Address address="0x4aa32F424d0E8fcF71B542B837ce804153773080" />
            </div>
            <p className="text-center text-lg max-w-xl break-words leading-relaxed text-gr-800">
              I&apos;m passionate about blockchain and novel technologies. I&apos;m studying ZKPs. Hit me up if you want
              to chat about it!
            </p>
            <div className="flex space-x-8 mt-4">
              {icons.map(icon => (
                <a
                  href={icon.anchorUrl}
                  key={icon.iconAlt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={icon.anchorStyle}
                  aria-label={icon.iconAlt}
                >
                  <Image
                    src={icon.iconUrl}
                    alt={icon.iconAlt}
                    width={imgSize.width}
                    height={imgSize.height}
                    className={icon.iconStyle}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincePage;
