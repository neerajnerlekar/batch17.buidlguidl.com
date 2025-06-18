import Image from "next/image";
import { Address } from "../../../components/scaffold-eth/Address/Address";
import type { NextPage } from "next";

const otomdeeBuilderPage: NextPage = () => {
  return (
    <main className="max-w-xl mx-auto p-8">
      <section className="flex flex-col items-center gap-4">
        {/* Avatar */}
        <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
          <Image
            src="/0x645b4605dC74e8eFF38d3FD26C3cabA853ABbF61/0x645b4605dC74e8eFF38d3FD26C3cabA853ABbF61_avatar.jpeg"
            alt="Avatar"
            className="rounded-full object-cover"
            width={192}
            height={192}
          />
        </div>
        <h1 className="text-3xl font-bold">otomdee</h1>
        {/* Address */}
        <Address address="0x645b4605dC74e8eFF38d3FD26C3cabA853ABbF61" />
        {/* Bio */}
        <p className="mt-4 text-center text-gray-900 dark:text-gray-100">
          Hi, I&apos;m Daniel, a full-stack developer with a foundation in JavaScript based stacks. I&apos;ve been
          interested in web3 development for a while now and decided to start out my journey with BuidlGuidl&apos;s
          SpeedRunEthereum. I enjoy the challenge of building complete applications from start to finish and I look
          forward to leveraging my skills by contributing to interesting and innovative decentralized applications.
        </p>
        {/* Social Links */}
        <div className="flex gap-4 mt-6">
          <a
            href="https://x.com/0x_Money"
            className="hover:underline flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/0x645b4605dC74e8eFF38d3FD26C3cabA853ABbF61/icons8-x.svg" alt="X icon" width={20} height={20} />
            Twitter
          </a>
          <a
            href="https://github.com/otomdee"
            className="hover:underline flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/0x645b4605dC74e8eFF38d3FD26C3cabA853ABbF61/icons8-github.svg"
              alt="X icon"
              width={20}
              height={20}
            />
            GitHub
          </a>
          <a
            href="https://telegram.me/Ox_Money"
            className="hover:underline flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/0x645b4605dC74e8eFF38d3FD26C3cabA853ABbF61/icons8-telegram.svg"
              alt="X icon"
              width={20}
              height={20}
            />
            Telegram
          </a>
        </div>
      </section>
    </main>
  );
};

export default otomdeeBuilderPage;
