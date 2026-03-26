// components/Navbar.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { DarkModeToggle } from "./DarkModeToggle";

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
  const pathname = usePathname();

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

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <span className="bg-teal-500/70 h-1 w-full block"></span>

      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-lg tracking-tight text-zinc-500 font-light">
          {t.logo}
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-zinc-400 font-light items-center">
          <Link
            href={`/${locale}`}
            className={`hover:text-teal-500/80 transition ${isActive(`/${locale}`) ? "text-teal-500/80 font-normal" : ""
              }`}
          >
            {t.home}
          </Link>

          <Link
            href={`/${locale}/services`}
            className={`hover:text-teal-500/80 transition ${isActive(`/${locale}/services`) ? "text-teal-500/80 font-normal" : ""
              }`}
          >
            {t.services}
          </Link>

          <Link
            href={`/${locale}/case`}
            className={`hover:text-teal-500/80 transition ${isActive(`/${locale}/case`) ? "text-teal-500/80 font-normal" : ""
              }`}
          >
            {t.case}
          </Link>


          <Link
            href={`/${locale}/process`}
            className={`hover:text-teal-500/80 transition ${isActive(`/${locale}/process`) ? "text-teal-500/80 font-normal" : ""
              }`}
          >
            {t.process}
          </Link>


          <Link
            href={`/${locale}/about`}
            className={`hover:text-teal-500/80 transition ${isActive(`/${locale}/about`) ? "text-teal-500/80 font-normal" : ""
              }`}
          >
            {t.about}
          </Link>


          <Link
            href={`/${locale}/contact`}
            className={`hover:text-teal-500/80 transition ${isActive(`/${locale}/contact`) ? "text-teal-500/80 font-normal" : ""
              }`}
          >
            {t.contact}
          </Link>

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
              <div className="absolute mt-1 bg-white border border-gray-200 shadow-lg rounded-lg text-xs overflow-hidden">
                {supportedLocales.map((lng) => (
                  <Link
                    key={lng}
                    href={`/${lng}`}
                    className={`block w-16 px-4 py-2 hover:bg-teal-100 transition ${lng === locale ? "bg-teal-50 font-semibold" : ""
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
      </div>
    </header>
  );
}
