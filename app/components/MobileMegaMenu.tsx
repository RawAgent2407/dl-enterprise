"use client";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Links } from "@/lib/constant";
import { SVGICONS } from "../static";

type Screen = "MAIN" | "CATEGORIES";

export default function MobileMegaMenu({
    open,
    onClose,
    megaMenuData,
}: {
    open: boolean;
    onClose: () => void;
    megaMenuData: any[];
}) {
    const [screen, setScreen] = useState<Screen>("MAIN");
    const [path, setPath] = useState("");

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    const MAIN_MENU_ITEMS = [
        { id: "home", label: "Home", href: Links.home },
        { id: "products", label: "Products", onClick: () => setScreen("CATEGORIES") },
        { id: "about", label: "About", href: Links.about },
        { id: "catalogue", label: "Catalogue", href: Links.catalogue, download: true },
        { id: "contact", label: "Contact", href: Links.contact },
    ];

    return (
        <div
            className={`md:hidden fixed top-[74px] inset-0 z-50 transition scrollbar-none
                ${open ? "visible" : "invisible"}
                ${open ? "bg-[#FFFFFE] backdrop-blur-sm" : "bg-transparent"}`}
        >
            <img
                src="/images/megamuneimage.png"
                alt="Mobile Menu Background"
                className="absolute top-[7%] sm:left-[50%] left-[60%] h-[80%] max-w-none my-auto w-auto object-cover opacity-100 z-100"
                style={{ boxShadow: "-40px 60px 80px rgba(0,0,0,0.12)" }}
            />
            <div className={`flex flex-col h-full w-full relative font-dm pt-14 pb-8 px-6`}>
                <div className={`flex flex-col h-[100%] w-full transition-transform duration-100 ${open ? "translate-x-0" : "translate-x-full"}`}>

                    {/* MAIN MENU */}
                    {screen === "MAIN" && (
                        <div className="flex flex-col relative text-[32px] leading-[40px] font-dm gap-6">
                            {MAIN_MENU_ITEMS.map(({ id, label, href, onClick, download }) => (
                                <MenuItem key={id} label={label} href={href} onClick={onClick} active={path === href} onClose={onClose} download={download} />
                            ))}
                        </div>
                    )}

                    {/* CATEGORIES */}
                    {screen === "CATEGORIES" && (
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 mb-6">
                                <button onClick={() => setScreen("MAIN")}><LuChevronLeft /></button>
                                <span className="text-sm font-semibold">PRODUCT CATEGORIES</span>
                            </div>
                            {megaMenuData.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/category/${cat.slug}`}
                                    className="flex items-center w-full py-2 text-base/6 cursor-pointer text-[#323232] font-semibold hover:text-brand-primary"
                                    onClick={onClose}
                                >
                                    <div className="w-[160px] text-inherit">{cat.title}</div>
                                    <LuChevronRight className="text-inherit" />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Social */}
                <div className="flex flex-col gap-4">
                    <div className="mt-auto flex gap-4">
                        <Link href={Links.instagram} target="_blank" rel="noopener noreferrer">
                            <SVGICONS.instagram scale={{ width: "24", height: "24" }} />
                        </Link>
                        <Link href={Links.facebook} target="_blank" rel="noopener noreferrer">
                            <SVGICONS.facebook scale={{ width: "24", height: "24" }} />
                        </Link>
                    </div>
                    <div className="mt-auto flex gap-4">
                        <Link href={Links.twitterX} target="_blank" rel="noopener noreferrer">
                            <SVGICONS.trwitterX scale={{ width: "24", height: "24" }} />
                        </Link>
                        <Link href={Links.linkdin} target="_blank" rel="noopener noreferrer">
                            <SVGICONS.linkdin scale={{ width: "24", height: "24" }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MenuItem = ({ label, href, onClick, onClose, active, download }: {
    label: string; href?: string; onClick?: () => void; active: boolean; onClose?: () => void; download?: boolean;
}) => {
    if (href) {
        return (
            <Link href={href} onClick={onClose} download={download} target={download ? "_blank" : undefined} className={`block text-inherit ${active ? "font-medium" : "text-text-muted/50"}`}>
                {label}
            </Link>
        );
    }
    return (
        <div onClick={onClick} className={`block text-inherit cursor-pointer ${active ? "font-medium" : "text-text-muted/50"}`}>
            {label}
        </div>
    );
};
