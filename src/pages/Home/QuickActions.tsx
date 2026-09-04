import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteConfig } from '../../config/site';

const ACTIONS = [
    { name: 'Getting Started', href: '/getting-started', colorClass: 'bg-brand-600 hover:bg-brand-700' },
    { name: 'Authentication', href: '/authentication', colorClass: 'bg-accent-500 hover:bg-accent-700' },
    { name: 'API Reference', href: '/api-reference', colorClass: 'bg-success-600 hover:bg-success-700' },
    { name: 'Guides', href: '/guides', colorClass: 'bg-brand-600 hover:bg-brand-700' },
];

export default function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-start w-full">
            <motion.h2
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-brand-900 dark:text-neutral-100 mb-8 tracking-tight"
            >
                Quick links
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-4">
                {ACTIONS.map((action) => (
                    <motion.button
                        key={action.name}
                        type="button"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(action.href)}
                        className={`px-6 py-4 rounded-xl font-semibold text-white shadow-card ${action.colorClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400`}
                    >
                        {action.name}
                    </motion.button>
                ))}
            </div>
            <p className="mt-4 text-sm text-neutral-500">
                {siteConfig.company.name} · {siteConfig.api.endpointCount} sample endpoints
            </p>
        </div>
    );
}
