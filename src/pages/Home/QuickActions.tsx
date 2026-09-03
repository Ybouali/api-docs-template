import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Action {
    name: string;
    screen: string;
    /** Tailwind bg color class */
    colorClass: string;
    focusClass: string;
}

const ACTIONS: Action[] = [
    {
        name: 'Register Customer',
        screen: 'customer',
        colorClass: 'bg-brand-600 hover:bg-brand-700',
        focusClass: 'focus:ring-brand-300',
    },
    {
        name: 'Test Transfer',
        screen: 'operations',
        colorClass: 'bg-accent-500 hover:bg-accent-700',
        focusClass: 'focus:ring-accent-300',
    },
    {
        name: 'Setup Auth',
        screen: 'setup',
        colorClass: 'bg-success-600 hover:bg-success-700',
        focusClass: 'focus:ring-success',
    },
    {
        name: 'View History',
        screen: 'operations',
        colorClass: 'bg-brand-600 hover:bg-brand-700',
        focusClass: 'focus:ring-brand-300',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.14, delayChildren: 0.2 },
    },
};

const item = {
    hidden: { y: 32, opacity: 0, scale: 0.96 },
    show: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 140, damping: 17 },
    },
} as const;

function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-start w-full">
            <motion.h2
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-3xl font-bold text-brand-900 dark:text-neutral-100 mb-8 tracking-tight"
            >
                Quick Actions
            </motion.h2>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-4 w-full gap-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {ACTIONS.map((action) => (
                    <motion.button
                        key={action.name}
                        variants={item}
                        whileHover={{ scale: 1.04, y: -4, boxShadow: 'var(--shadow-card-hover)' }}
                        whileTap={{ scale: 0.975, y: 1 }}
                        onClick={() => navigate(`/${action.screen}`)}
                        className={`
                            relative flex-1 px-6 py-4 rounded-xl font-semibold text-base md:text-lg text-white
                            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                            overflow-hidden shadow-(--shadow-card) hover:shadow-(--shadow-card-hover)
                            ${action.colorClass} ${action.focusClass}
                        `}
                    >
                        <span className="absolute inset-0 bg-linear-to-r from-white/12 via-transparent to-white/5 opacity-0 hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                        <span className="relative z-10 block text-left">{action.name}</span>
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}

export default QuickActions;
