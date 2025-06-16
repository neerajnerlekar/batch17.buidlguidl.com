import Image from "next/image";
import githubIcon from "@iconify-icons/tabler/brand-github";
import linkedinIcon from "@iconify-icons/tabler/brand-linkedin";
import telegramIcon from "@iconify-icons/tabler/brand-telegram";
import { Icon } from "@iconify/react";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const iconStyle = "w-8 h-8 transition-transform duration-300";

const anchorStyle = "text-2xl hover:scale-110 transition-transform duration-300 hover:drop-shadow-lg";

const icons = [
  {
    anchorUrl: "https://github.com/NejcRozman",
    icon: githubIcon,
    iconAlt: "Github",
  },
  {
    anchorUrl: "https://t.me/NRosca",
    icon: telegramIcon,
    iconAlt: "Telegram",
  },
  {
    anchorUrl: "https://www.linkedin.com/in/nejc-ro%C5%BEman-51567917b/",
    icon: linkedinIcon,
    iconAlt: "LinkedIn",
  },
];

const NejcBuilder: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 dark:bg-gray-800 dark:shadow-none">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg animate-fadeIn">
              <Image
                src="https://avatars.githubusercontent.com/u/26038365?v=4"
                alt="Nejc's Avatar"
                width={128}
                height={128}
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-5xl font-extrabold drop-shadow-lg animate-fadeIn delay-200">Hi, I&apos;m Nejc</h1>

            <div className="animate-fadeIn delay-400">
              <Address address="0xdaC6E56F86Fb6f18c4114C2E4f41901ab9803096" />
            </div>

            <p className="text-center text-lg max-w-xl break-words leading-relaxed text-gray-800 animate-fadeIn delay-600 dark:text-gray-300">
              I am a blockchain enthusiast and a researcher exploring the connections between mechatronics and
              blockchain technology. Hit me up if you want to chat about it!
            </p>

            <div className="flex space-x-8 mt-4 animate-fadeIn delay-800">
              {icons.map(({ anchorUrl, icon, iconAlt }) => (
                <a
                  href={anchorUrl}
                  key={iconAlt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={anchorStyle}
                  aria-label={iconAlt}
                >
                  <Icon icon={icon} className={iconStyle} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NejcBuilder;
