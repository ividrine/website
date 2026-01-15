import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webring",
};

export default function Webring() {
  return (
    <main className="w-full mx-auto max-w-3xl py-12 px-12">
      <h1 className="text-center">Webring</h1>
      <p className="indent-6">
        I have added this site to a Webring that some friends started. You can
        check out their sites below:
      </p>
      <ul className="list-disc list-inside">
        <li>
          <Link href="https://lanekatris.com/webring">Lane Katris</Link>
        </li>
        <li>
          <Link href="https://levibutcher.com/webring">Levi Butcher</Link>
        </li>
      </ul>
    </main>
  );
}
