import Image from "next/image";
import Link from "next/link";

/**
 * The footer. Contact lives here and only here — the canon retires it as a
 * route and permits it in the footer. Hairline over boxes; one column of
 * identity, one of directions, the small print underneath.
 */
export function Footer() {
  return (
    <footer className="mt-(--spacing-band) border-t rule">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Image
              src="/images/lion-mark.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-6 font-display text-h3 text-primary">Sovereign Identity</p>
            <p className="mt-2 max-w-xs text-small text-secondary">
              Identity architecture for founders and leaders.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              { href: "/work-with-me#book", label: "Contact" },
              { href: "/legal/privacy", label: "Privacy" },
              { href: "/legal/terms", label: "Terms" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="label inline-flex min-h-11 items-center text-secondary transition-colors duration-(--duration-fast) hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 border-t rule pt-8 text-small text-secondary">
          &copy; {new Date().getFullYear()} Express Your Lifestyle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
