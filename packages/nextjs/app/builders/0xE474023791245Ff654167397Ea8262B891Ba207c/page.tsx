import Link from "next/link";
import { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const CypherpunkPage: NextPage = () => (
  <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-200 font-mono px-4 py-10">
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">🕶️ neeraj27.eth Portfolio</h1>

      {/* Core Values */}
      <section className="bg-gray-100 dark:bg-zinc-900 rounded-2xl shadow-md p-6 transition-all">
        <h2 className="text-2xl font-semibold mb-4">🧠 Core Values</h2>
        <ul className="space-y-2 list-inside list-disc">
          <li>End-to-end encryption is non-negotiable</li>
          <li>Code is law — transparency is freedom</li>
          <li>Self-sovereignty and zk-primitives are the future</li>
        </ul>
      </section>

      {/* Projects */}
      <section className="bg-gray-100 dark:bg-zinc-900 rounded-2xl shadow-md p-6 transition-all">
        <h2 className="text-2xl font-semibold mb-4">📦 Projects</h2>

        <Link
          href="https://ethglobal.com/showcase/urban-odyssey-d0vor"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-200 dark:bg-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-600 px-4 py-3 rounded-lg transition-colors"
        >
          🕵️‍♂️ urban odyssey → ZK Email using proof of email
        </Link>

        <Link
          href="https://ethglobal.com/showcase/discova-e3jc2"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-200 dark:bg-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-600 px-4 py-3 rounded-lg transition-colors mt-3"
        >
          🧰 discova → NFT metadata tagging to improve visibility of NFTs
        </Link>
      </section>

      {/* Identity */}
      <section className="bg-gray-100 dark:bg-zinc-900 rounded-2xl shadow-md p-6 transition-all text-center">
        <h2 className="text-2xl font-semibold mb-2">👤 Identity</h2>
        <div className="flex justify-center">
          <Address address="0xE474023791245Ff654167397Ea8262B891Ba207c" />
        </div>
      </section>
    </div>
  </main>
);

export default CypherpunkPage;
