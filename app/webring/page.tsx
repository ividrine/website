import Link from "next/link";

export default function WebRing() {
  return (
    <main className="w-full mx-auto max-w-3xl py-12 px-12">
      <h1 className="text-center">Webring</h1>
      <p className="indent-6">
        Together with some friends and colleagues, we are bringing back old
        school{" "}
        <Link target="_blank" href="https://en.wikipedia.org/wiki/Webring">
          Webrings
        </Link>
        . You can check out their cool sites below:
      </p>
      <ul className="list-disc list-inside">
        <li>
          <Link href="https://lanekatris.com">https://lanekatris.com</Link>
        </li>
        <li>
          <Link href="https://levibutcher.com">https://levibutcher.com</Link>
        </li>
      </ul>
    </main>
  );
}
