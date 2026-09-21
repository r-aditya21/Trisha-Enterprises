"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { SITE, NAV_LINKS } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanAnimate } from "@/hooks/use-can-animate";

gsap.registerPlugin(ScrollTrigger);

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 top-20 z-[998] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Background Overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-primary/95 backdrop-blur-lg"
          />

          {/* Menu Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Links */}
            <nav
              className="flex flex-col gap-2 px-margin-mobile mt-6 flex-1 overflow-y-auto pb-10"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={`${link.label}-${link.href}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/10 py-2"
                >
                  {/* Parent Link */}
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 text-2xl font-semibold text-white"
                  >
                    {link.label}
                  </Link>

                  {/* Mobile Dropdown Sub-links (Visible by default) */}
                  {"children" in link && link.children && (
                    <div className="mt-2 ml-4 flex flex-col gap-1 pl-2 border-l border-white/20">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block py-2.5 text-lg font-medium text-white/80 hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Bottom CTA */}
              <div className="mt-8 pt-6 border-t border-white/20 flex flex-col gap-4">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 text-white py-3"
                  onClick={onClose}
                >
                  <Phone className="h-5 w-5" />
                  <span>Call us</span>
                </a>

                <Button asChild className="w-full min-h-12 text-base">
                  <Link href="/contact" onClick={onClose}>
                    Get Free Quote
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const canAnimate = useCanAnimate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // GSAP-powered navbar shrink on scroll
  useGSAP(
    () => {
      if (!canAnimate || !headerRef.current) return;

      const header = headerRef.current;
      const logo = logoRef.current;

      // Shrink header height on scroll
      ScrollTrigger.create({
        start: "top -20",
        end: "max",
        onUpdate: (self) => {
          const shrunk = self.scroll() > 20;
          gsap.to(header, {
            height: shrunk ? 64 : 80,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (logo) {
            gsap.to(logo, {
              scale: shrunk ? 0.85 : 1,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        },
      });
    },
    { scope: headerRef, dependencies: [canAnimate] }
  );

  return (
    <>
      {/* Top Bar */}
      <div className="bg-zinc-900 text-zinc-200 text-xs py-2 px-margin-mobile md:px-margin-desktop flex items-center justify-center sm:justify-between relative z-40">
        {/* Email */}
        <div className="hidden sm:block truncate max-w-[220px] md:max-w-none">
          {SITE.email}
        </div>

        {/* Welcome */}
        <div className="text-[#ccff00] font-medium tracking-wider text-[10px] sm:text-xs text-center">
          Welcome to {SITE.name}
        </div>

        {/* Socials - Hidden on Mobile */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faFacebookF} className="w-3.5 h-3.5" />
          </a>

          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Header */}
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-[1000] isolate w-full h-20 px-margin-mobile md:px-margin-desktop flex items-center justify-between transition-[background-color,box-shadow] duration-500",
          scrolled
            ? "bg-white shadow-md md:bg-white/90 md:backdrop-blur-xl md:[-webkit-backdrop-filter:blur(24px)]"
            : "bg-white shadow-sm md:bg-white/80 md:backdrop-blur-md md:[-webkit-backdrop-filter:blur(12px)]"
        )}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3"
            aria-label={`${SITE.name} homepage`}
          >
            <div
              ref={logoRef}
              className="relative h-14 w-14 md:h-16 md:w-16 rounded-full bg-zinc-200 overflow-hidden shrink-0 origin-center"
            >
              <Image
                src={IMAGES.logo}
                alt={`${SITE.name} logo`}
                fill
                className="object-contain"
                sizes="64px"
              />
            </div>

            <span className="font-headline text-headline-md font-bold text-primary leading-tight">
              {SITE.name}
            </span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <div
              key={`${link.label}-${link.href}`}
              className="relative group"
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 text-label-md text-on-surface-variant hover:text-secondary transition-colors"
              >
                {link.label}

                {"children" in link && link.children && (
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </Link>

              {"children" in link && link.children && (
                <div className="absolute top-full left-0 mt-3 w-64 rounded-2xl bg-white shadow-2xl border border-zinc-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 p-3">
                  <div className="flex flex-col gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="px-4 py-3 rounded-xl hover:bg-zinc-100 transition-colors text-sm font-medium"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={`tel:${SITE.phone}`}
            className="hidden sm:flex text-primary hover:opacity-80 transition-opacity p-2"
            aria-label={`Call ${SITE.phone}`}
          >
            <Phone className="h-5 w-5" />
          </a>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Contact Us</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-primary touch-manipulation"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}