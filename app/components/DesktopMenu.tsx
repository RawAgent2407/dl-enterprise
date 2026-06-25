import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopMegaMenu from "./DesktopMegaMenu";
import { Links } from "@/lib/constant";

interface MegaMenuProps {
    megaMenuData: any[];
}

export default function DesktopMenu({ megaMenuData }: MegaMenuProps) {
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [path, setPath] = useState("");

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    useEffect(() => {
        if (isProductsOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup (important when navigating pages)
        return () => document.body.classList.remove("overflow-hidden");
    }, [isProductsOpen]);

    const MAIN_MENU_ITEMS = [
        { id: "home", label: "Home", href: Links.home },
        { id: "products", label: "Products", onClick: () => setIsProductsOpen((prev) => !prev), onClose: () => setIsProductsOpen(false) },
        { id: "categories", label: "Categories", href: Links.categories },
        { id: "catalogue", label: "Catalogue", href: Links.catalogue, download: true },
        { id: "about", label: "About", href: Links.about },
    ];

    return (
        <nav className='relative hidden md:flex items-center gap-6 lg:gap-10'>
            {MAIN_MENU_ITEMS.map(({ id, label, href, onClick, download, onClose }) => (
                <MenuItem
                    key={id}
                    label={label}
                    href={href}
                    onClick={onClick}
                    active={path === href || false}
                    onClose={onClose}
                    download={download}
                />
            ))}

            {/* PRODUCTS DROPDOWN */}
            {/* PRODUCTS MEGA MENU */}

            {/* MEGA MENU */}
            <DesktopMegaMenu isProductsOpen={isProductsOpen} setIsProductsOpen={setIsProductsOpen} megaMenuData={megaMenuData} />
            {/* OVERLAY */}
            {isProductsOpen && (<div
                onClick={() => setIsProductsOpen(false)}
                className={`fixed inset-0 z-40 top-20 bg-black bg-opacity-20 transition-opacity ${isProductsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />)}
        </nav >
    )
}

const MenuItem = ({
    label,
    href,
    onClick,
    onClose,
    active,
    download
}: {
    label: string;
    href?: string;
    onClick?: () => void;
    active: boolean;
    onClose?: () => void;
    download?: boolean;
}) => {
    if (href) {
        return (
            <Link href={href} onClick={onClose} 
            download={download} target={download ? "_blank" : undefined} 
            className={`block text-inherit ${active ? "font-medium " : "text-text-muted"}`}>
                {label}
            </Link>
        );
    }

    return (
        <div onClick={onClick} className={`block text-inherit cursor-pointer ${active ? "font-medium ": "text-text-muted"}`}>
            {label}
        </div>
    );
};
