// components/Navbar.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DarkModeToggle } from "./DarkModeToggle";
import { Menu, X, Globe } from "lucide-react";

type NavbarData = Partial<{
  logo: string;
  home: string;
  services: string;
  case: string;
  process: string;
  about: string;
  contact: string;
  languages: Record<string, string>;
}>;

interface NavbarProps {
  locale: string;
  data?: NavbarData;
}

const supportedLocales = ["en", "tw", "jp"];

export default function Navbar({ locale, data }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const t = {
    logo: data?.logo ?? "DEVINCE STUDIO",
    home: data?.home ?? "HOME",
    services: data?.services ?? "SERVICES",
    case: data?.case ?? "CASE",
    process: data?.process ?? "PROCESS",
    about: data?.about ?? "ABOUT",
    contact: data?.contact ?? "CONTACT",
    languages: data?.languages ?? {
      en: "EN",
      tw: "TW",
      jp: "JP",
    },
  };

  const navLinks = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/services`, label: t.services },
    { href: `/${locale}/case`, label: t.case },
    { href: `/${locale}/process`, label: t.process },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 z-50 transition-colors">
      <span className="bg-teal-500/70 h-1 w-full block"></span>

      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="text-lg tracking-tight text-zinc-500 dark:text-zinc-300 font-light">
          {t.logo}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm text-zinc-400 font-light items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-teal-500/80 transition ${isActive(link.href) ? "text-teal-500/80 font-normal" : ""
                }`}
            >
              {link.label}
            </Link>
          ))}

          <DarkModeToggle />

          {/* 🌍 Language Dropdown */}
          <div className="relative ml-6">
            <button
              onClick={() => setOpen(!open)}
              className="px-3 py-1 border border-teal-400 rounded-full text-xs flex items-center gap-1 text-teal-500 hover:bg-teal-400 hover:text-white transition"
            >
              <span className="font-medium">{t.languages[locale]}</span><span>▾</span>
            </button>

            {open && (
              <div className="absolute mt-1 right-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg dark:shadow-zinc-950/40 rounded-lg text-xs overflow-hidden">
                {supportedLocales.map((lng) => (
                  <Link
                    key={lng}
                    href={`/${lng}`}
                    className={`block w-20 px-4 py-2 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition ${lng === locale ? "bg-teal-50 dark:bg-teal-900/20 font-semibold" : ""
                      }`}
                    onClick={() => setOpen(false)}
                  >
                    {t.languages[lng]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-500 dark:text-zinc-400"
            suppressHydrationWarning
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg transition ${isActive(link.href) ? "text-teal-500 font-medium" : "text-zinc-500 dark:text-zinc-400 font-light"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-gray-100 dark:bg-zinc-800 my-2"></div>

            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Globe size={14} /> LANGUAGE
              </p>
              <div className="flex gap-3">
                {supportedLocales.map((lng) => (
                  <Link
                    key={lng}
                    href={`/${lng}`}
                    className={`px-4 py-2 rounded-lg text-sm border transition ${lng === locale
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-gray-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-800"
                      }`}
                  >
                    {t.languages[lng]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
