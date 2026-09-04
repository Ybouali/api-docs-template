import { Link, useLocation } from 'react-router-dom';
import {
    ChevronRight,
    ChevronLeft,
    Home,
    Key,
    Users,
    ShieldCheck,
    DollarSign,
    Store,
    Wrench,
    BookOpen,
    Settings,
    Globe,
    Code,
    FileText,
    Rocket,
    AlertCircle,
    Webhook,
    History,
    type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '../config/site';

const ICON_MAP: Record<string, LucideIcon> = {
    Home,
    Key,
    Users,
    ShieldCheck,
    DollarSign,
    Store,
    Wrench,
    BookOpen,
    Settings,
    Globe,
    Code,
    FileText,
    Rocket,
    AlertCircle,
    Webhook,
    History,
};

interface LeftSidebarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LeftSidebar({ isOpen, setIsOpen }: LeftSidebarProps) {
    const location = useLocation();

    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-white dark:bg-neutral-900
                  border-r border-neutral-200 dark:border-neutral-700
                  transition-all duration-300 z-50 overflow-y-auto
                  ${isOpen ? 'w-72' : 'w-16'} lg:w-72`}
            aria-label="Documentation"
        >
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="absolute -right-3 top-6 bg-white dark:bg-neutral-800
                   border border-neutral-300 dark:border-neutral-600
                   rounded-full p-1.5 shadow-md hover:bg-neutral-100
                   dark:hover:bg-neutral-700 transition-colors lg:hidden"
                aria-expanded={isOpen}
                aria-controls="sidebar-nav"
                aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>

            <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex items-center gap-3 min-h-[64px]">
                {siteConfig.company.logoUrl ? (
                    <img
                        src={siteConfig.company.logoUrl}
                        alt=""
                        className={`h-8 w-auto object-contain ${isOpen ? 'block' : 'hidden'} lg:block`}
                    />
                ) : null}
                <span
                    className={`font-bold text-xl text-brand-700 dark:text-brand-300 truncate ${
                        isOpen ? 'block' : 'hidden'
                    } lg:block`}
                >
                    {siteConfig.company.logoUrl ? siteConfig.company.name : siteConfig.api.name}
                </span>
                {!isOpen && (
                    <span className="font-bold text-xl text-brand-700 dark:text-brand-300 mx-auto lg:hidden">
                        {siteConfig.api.shortName}
                    </span>
                )}
            </div>

            <nav id="sidebar-nav" className="mt-4 px-3 pb-24" aria-label="Main">
                <ul className="space-y-1">
                    {siteConfig.nav.items.map((item) => {
                        const isActive =
                            item.href === '/'
                                ? location.pathname === '/'
                                : location.pathname === item.href ||
                                  location.pathname.startsWith(`${item.href}/`);
                        const IconComponent = ICON_MAP[item.icon] ?? Home;
                        return (
                            <li key={item.href}>
                                <Link
                                    to={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={!isOpen ? item.name : undefined}
                                    onClick={() => {
                                        if (window.matchMedia('(max-width: 1023px)').matches) {
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative
                                        ${!isOpen ? 'justify-center lg:justify-start' : ''}
                                        ${
                                            isActive
                                                ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 font-semibold'
                                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                        }`}
                                >
                                    <IconComponent
                                        size={22}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className="shrink-0"
                                        aria-hidden
                                    />
                                    <span
                                        className={`font-medium text-sm leading-none ${
                                            isOpen ? 'block' : 'hidden'
                                        } lg:block`}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div
                className={`absolute bottom-6 left-5 right-5 text-xs text-neutral-400 dark:text-neutral-500 text-center space-y-1 ${
                    isOpen ? 'block' : 'hidden'
                } lg:block`}
            >
                <div className="font-medium">v{siteConfig.api.version}</div>
                <div>{siteConfig.api.releaseDate}</div>
            </div>
        </aside>
    );
}
