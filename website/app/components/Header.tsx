import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link className="logo" to="/">
        Kidogo.
      </Link>
      <nav className="flex gap-6 md:gap-8">
        <a
          className="text-gray-400 hover:text-white"
          href="https://github.com/thomascullen/kidogo"
        >
          Documentation
        </a>
      </nav>
    </header>
  );
}
