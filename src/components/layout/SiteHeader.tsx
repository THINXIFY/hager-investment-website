"use client";

import { AnimatePresence, LayoutGroup, motion, MotionConfig } from "motion/react";
import { SiteLink as Link } from "@/components/ui/SiteLink";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Wordmark } from "@/components/ui/Wordmark";
import { contactNavItem, primaryNav } from "@/config/site";
import { megaExpertise, megaFor, megaInvestments, type MegaKey } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/smooth-scroll";

import { MegaPanel } from "./MegaMenu";

const MENU_ID = "mobile-navigation";
const DESKTOP_QUERY = "(min-width: 64rem)";
const OPEN_DELAY = 90;
const CLOSE_DELAY = 100;
const EASE = [0.2, 0.7, 0.1, 1] as const;

const hashOf = (href: string) => href.slice(href.indexOf("#") + 1);
const pathOf = (href: string) => href.split("#")[0] || "/";
const panelId = (key: MegaKey) => (key === "investments" ? megaInvestments.id : megaExpertise.id);

function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className={cn("size-2.5 transition-transform duration-500 ease-premium", open && "rotate-180", className)} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey | null>(null);
  const [mobileGroup, setMobileGroup] = useState<MegaKey | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();
  /**
   * Page links are current on their own route and on every page beneath it (e.g. Investments on
   * all sector pages); anchor links while their section is in view.
   */
  const isCurrent = (href: string) =>
    href.includes("#")
      ? pathOf(href) === pathname && activeId === hashOf(href)
      : pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuOpenRef = useRef(menuOpen);
  const megaRef = useRef(mega);
  const timer = useRef<number | undefined>(undefined);
  /** When hover last opened a panel: a click on its toggle right after keeps it open instead of toggling. */
  const hoverOpenedAt = useRef(0);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);
  useEffect(() => {
    megaRef.current = mega;
  }, [mega]);

  /* ---------------------------------------------------------------- mega-panel */
  const clearTimer = () => window.clearTimeout(timer.current);
  const openMega = useCallback((key: MegaKey, delay = OPEN_DELAY) => {
    clearTimer();
    const open = () => {
      if (megaRef.current !== key) hoverOpenedAt.current = performance.now();
      setMega(key);
    };
    if (megaRef.current) open(); // already open: switch immediately
    else timer.current = window.setTimeout(open, delay);
  }, []);
  const closeMega = useCallback((delay = CLOSE_DELAY) => {
    clearTimer();
    if (delay === 0) setMega(null);
    else timer.current = window.setTimeout(() => setMega(null), delay);
  }, []);
  /** `at`: the click event timeStamp (same clock as performance.now()). */
  const toggleMega = (key: MegaKey, at: number) => {
    clearTimer();
    const justHovered = at - hoverOpenedAt.current < 500;
    setMega((m) => (m === key && !justHovered ? null : key));
  };

  // Close on navigation.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMega(null);
      setMobileGroup(null);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Escape closes and returns focus to the trigger; meaningful scrolling closes too.
  useEffect(() => {
    if (!mega) return;
    const startY = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const key = megaRef.current;
      setMega(null);
      if (key) headerRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="${panelId(key)}"]`)?.focus();
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 120) setMega(null);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mega]);

  useEffect(() => () => clearTimer(), []);

  const onTriggerKey = (key: MegaKey) => (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      clearTimer();
      setMega(key);
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(panelId(key))?.querySelector<HTMLElement>("a:not([tabindex='-1'])")?.focus()));
    }
  };

  /* Solid background after scrolling; hide while scrolling down. */
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!menuOpenRef.current && !megaRef.current) setHidden(y > lastY && y > window.innerHeight * 0.8);
      lastY = y;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* Highlight the section currently in view (re-bound per page; the previous route can
     stay in the DOM hidden, so only rendered sections are observed). */
  useEffect(() => {
    const sections = primaryNav
      .filter((item) => item.href.includes("#") && pathOf(item.href) === pathname)
      .map((item) => Array.from(document.querySelectorAll<HTMLElement>(`[id="${hashOf(item.href)}"]`)).find((el) => el.checkVisibility()))
      .filter((el): el is HTMLElement => el !== undefined);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  /* Menu side effects: scroll lock, inert background, Escape, desktop resize. */
  useEffect(() => {
    if (!menuOpen) return;

    const background = [document.getElementById("main"), document.getElementById("site-footer")];
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    background.forEach((el) => el?.setAttribute("inert", ""));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onViewport = (e: MediaQueryListEvent) => {
      if (e.matches) closeMenu();
    };

    document.addEventListener("keydown", onKey);
    mql.addEventListener("change", onViewport);
    const focusFrame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus());

    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
      background.forEach((el) => el?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onViewport);
      cancelAnimationFrame(focusFrame);
    };
  }, [menuOpen, closeMenu]);

  const menuItems = primaryNav;

  return (
    <MotionConfig reducedMotion="user">
      <header
        ref={headerRef}
        data-scrolled={scrolled || undefined}
        data-menu-open={menuOpen || undefined}
        data-mega-open={mega || undefined}
        onFocus={() => setHidden(false)}
        onMouseLeave={() => closeMega()}
        onBlur={(e) => {
          if (mega && !e.currentTarget.contains(e.relatedTarget as Node | null)) closeMega(0);
        }}
        className={cn(
          "site-header pointer-events-none fixed inset-x-0 top-0 z-50",
          "transition-[translate] duration-500 ease-premium",
          hidden && !menuOpen && !mega && "-translate-y-[130%]",
        )}
      >
        {/* Floating Obsidian capsule */}
        <div className="hdr-wrap container-site pointer-events-auto">
          <div className="hdr-capsule flex items-center justify-between gap-6 rounded-full pr-2 pl-6 lg:gap-4 lg:pr-2.5 lg:pl-6 xl:gap-6 xl:pl-7">
            <Wordmark />

            <nav aria-label="Primary" className="hidden lg:block">
              <LayoutGroup id="primary-nav">
                <ul className="hdr-nav flex items-center gap-0.5 rounded-full p-1">
                  {primaryNav.map((item) => {
                    const current = isCurrent(item.href);
                    const key = megaFor(item.href);
                    const open = key !== null && mega === key;
                    return (
                      <li
                        key={item.href}
                        className={cn("hdr-item relative flex items-center rounded-full", current && "is-current", open && "is-open")}
                        onMouseEnter={() => (key ? openMega(key) : closeMega(140))}
                      >
                        {current ? (
                          <motion.span layoutId="hdr-active" aria-hidden="true" className="absolute inset-0 rounded-full bg-platinum" transition={{ type: "spring", stiffness: 420, damping: 38 }} />
                        ) : null}
                        <Link
                          href={item.href}
                          aria-current={current ? "true" : undefined}
                          className={cn("hdr-link relative z-10 block rounded-full py-2 text-[0.8125rem] font-medium tracking-[0.01em]", key ? "pr-1 pl-2.5 xl:pr-1.5 xl:pl-4" : "px-2.5 xl:px-4")}
                        >
                          {item.label}
                        </Link>
                        {key ? (
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-controls={panelId(key)}
                            aria-label={`${open ? "Hide" : "Show"} ${item.label} menu`}
                            onClick={(e) => toggleMega(key, e.timeStamp)}
                            onKeyDown={onTriggerKey(key)}
                            className="hdr-toggle relative z-10 mr-1 grid size-6 place-items-center rounded-full xl:mr-1.5"
                          >
                            <Chevron open={open} />
                          </button>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </LayoutGroup>
            </nav>

            <div className="flex items-center gap-1.5" onMouseEnter={() => closeMega(140)}>
              <Link
                href={contactNavItem.href}
                aria-current={isCurrent(contactNavItem.href) ? "page" : undefined}
                className="hdr-cta group/cta inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-4 text-[0.8125rem] font-medium tracking-[0.01em] lg:pl-5"
              >
                <span className="max-sm:sr-only">{contactNavItem.label}</span>
                <span aria-hidden="true" className="hdr-cta-dot grid size-8 place-items-center rounded-full lg:size-9">
                  <ArrowRightIcon className="size-3.5 transition-transform duration-500 ease-premium group-hover/cta:-rotate-45" />
                </span>
              </Link>

              <button
                ref={toggleRef}
                type="button"
                className="hdr-burger relative size-11 rounded-full lg:hidden"
                aria-expanded={menuOpen}
                aria-controls={MENU_ID}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3.5 h-[1.5px] rounded-full bg-current transition-[top,transform] duration-450 ease-in-out-premium",
                    menuOpen ? "top-[21px] rotate-45" : "top-[18px]",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3.5 h-[1.5px] rounded-full bg-current transition-[top,transform] duration-450 ease-in-out-premium",
                    menuOpen ? "top-[21px] -rotate-45" : "top-[24px]",
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop mega-panel + dimmed backdrop */}
        <AnimatePresence>
          {mega ? (
            <motion.div
              key="mega-backdrop"
              aria-hidden="true"
              className="pointer-events-auto fixed inset-0 -z-10 hidden bg-obsidian/40 lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18, ease: EASE } }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={() => closeMega(0)}
              onMouseEnter={() => closeMega()}
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>{mega ? <MegaPanel key="mega-panel" which={mega} onNavigate={() => closeMega(0)} onMouseEnter={clearTimer} /> : null}</AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              key="menu"
              id={MENU_ID}
              ref={menuRef}
              data-lenis-prevent=""
              className="hdr-sheet tone-obsidian pointer-events-auto fixed inset-x-2.5 top-[calc(var(--header-h)+2px)] bottom-2.5 overflow-y-auto overscroll-contain rounded-[26px] bg-obsidian lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <nav aria-label="Mobile" className="container-site flex min-h-full flex-col gap-10 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
                <p className="text-eyebrow flex items-center gap-3 text-[0.625rem] text-silver">
                  <span aria-hidden="true" className="h-px w-6 bg-teal" />
                  Menu
                </p>
                <motion.ol
                  className="border-b border-(--line-soft)"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
                >
                  {menuItems.map((item, i) => {
                    const key = megaFor(item.href);
                    const expanded = key !== null && mobileGroup === key;
                    const subId = key ? `${panelId(key)}-mobile` : undefined;
                    return (
                      <motion.li
                        key={item.href}
                        className="border-t border-(--line-soft)"
                        variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        <div className="flex items-center gap-3">
                          <Link
                            href={item.href}
                            onClick={() => closeMenu()}
                            aria-current={isCurrent(item.href) ? "true" : undefined}
                            className={cn(
                              "flex flex-1 items-baseline gap-5 py-4 font-display text-[clamp(1.75rem,7.2vw,2.5rem)] leading-[1.1] font-normal tracking-[-0.025em] transition-colors",
                              isCurrent(item.href) ? "text-white" : "text-white/85 hover:text-white",
                            )}
                          >
                            <span className={cn("font-sans text-[0.6875rem] tracking-[0.12em] tabular-nums", isCurrent(item.href) ? "text-teal" : "text-(--fg-subtle)")}>{String(i + 1).padStart(2, "0")}</span>
                            {item.label}
                            {isCurrent(item.href) ? <span aria-hidden="true" className="ml-auto size-1.5 self-center rounded-full bg-teal" /> : null}
                          </Link>
                          {key ? (
                            <button
                              type="button"
                              aria-expanded={expanded}
                              aria-controls={subId}
                              aria-label={`${expanded ? "Hide" : "Show"} ${item.label} pages`}
                              onClick={() => setMobileGroup((g) => (g === key ? null : key))}
                              className={cn("grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-300", expanded ? "border-teal bg-teal/15" : "border-white/20 hover:border-white/50")}
                            >
                              <Chevron open={expanded} className="size-3" />
                            </button>
                          ) : null}
                        </div>
                        <AnimatePresence initial={false}>
                          {expanded && key ? (
                            <motion.div
                              key="sub"
                              id={subId}
                              className="overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: EASE }}
                            >
                              {key === "investments" ? (
                                <div className="grid gap-5 border-l border-teal/40 pt-1 pb-6 pl-5 ml-[0.4rem]">
                                  {megaInvestments.groups.map((g) => (
                                    <div key={g.id}>
                                      <p className="text-eyebrow mb-2 text-[0.625rem] text-silver">{g.name}</p>
                                      <ul className="grid grid-cols-1 gap-x-5 min-[380px]:grid-cols-2">
                                        {g.sectors.map((s) => (
                                          <li key={s.slug}>
                                            <Link href={s.href} onClick={() => closeMenu()} aria-current={pathname === s.href ? "page" : undefined} className="flex items-center gap-2 py-2 text-[0.9375rem] leading-[1.3] text-white/75 transition-colors aria-[current=page]:text-white hover:text-white">
                                              {s.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                  <Link href={megaInvestments.all.href} onClick={() => closeMenu()} className="text-[0.875rem] font-medium text-white underline decoration-white/30 underline-offset-4">
                                    {megaInvestments.all.label} →
                                  </Link>
                                </div>
                              ) : (
                                <ul className="grid border-l border-teal/40 pt-1 pb-6 pl-5 ml-[0.4rem]">
                                  {megaExpertise.items.map((s) => (
                                    <li key={s.slug}>
                                      <Link href={s.href} onClick={() => closeMenu()} aria-current={pathname === s.href ? "page" : undefined} className="flex items-center gap-2 py-2 text-[0.9375rem] leading-[1.3] text-white/75 transition-colors aria-[current=page]:text-white hover:text-white">
                                        {s.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </motion.ol>

                <motion.div
                  className="mt-auto grid gap-5 border-t border-(--line-soft) pt-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                >
                  <ButtonLink href={contactNavItem.href} variant="light" arrow onClick={() => closeMenu()} aria-current={isCurrent(contactNavItem.href) ? "page" : undefined} className="w-full rounded-full">
                    Contact HAGER INVESTMENT
                  </ButtonLink>
                  <p className="text-[0.6875rem] tracking-[0.18em] text-silver uppercase">
                    Luxembourg <span className="mx-1.5 text-teal">·</span> Since 1993 <span className="mx-1.5 text-teal">·</span> RCS B44483
                  </p>
                </motion.div>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
