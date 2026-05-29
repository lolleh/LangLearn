import { Link, useLocation } from "react-router-dom"

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/progress", label: "Progress" },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-sl-green">
          LangLearn
        </Link>
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium ${
                pathname === link.href
                  ? "text-sl-green underline underline-offset-4"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
