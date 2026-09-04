import { motion, type Variants } from 'framer-motion';
import { siteConfig } from '../../config/site';

export default function Header() {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            } as const,
        },
    } satisfies Variants;

    const badgeVariants = {
        hover: {
            scale: 1.05,
            borderColor: 'rgba(255,255,255,0.6)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        } as const,
    } satisfies Variants;

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden bg-linear-to-br from-brand-900 via-brand-800 to-brand-950 text-white w-full py-10 px-8 rounded-3xl shadow-xl shadow-brand-900/20"
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.5)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.2)_0%,transparent_50%)]" />
            </div>

            <div className="relative z-10 text-center">
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 
                     bg-clip-text text-transparent bg-linear-to-r from-brand-200 via-white to-brand-100"
                >
                    Explore {siteConfig.projectName}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl font-medium text-brand-100 mb-8 opacity-90 max-w-2xl mx-auto"
                >
                    {siteConfig.company.description}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <motion.div
                        variants={badgeVariants}
                        whileHover="hover"
                        className="px-6 py-3 bg-brand-800/40 backdrop-blur-md rounded-full border border-brand-400/30 cursor-default"
                    >
                        <span className="text-brand-100">
                            {siteConfig.endpointCount} endpoints
                        </span>
                    </motion.div>

                    <motion.div
                        variants={badgeVariants}
                        whileHover="hover"
                        className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 cursor-default"
                    >
                        <span className="text-white/90">v{siteConfig.version}</span>
                    </motion.div>

                    <motion.div
                        variants={badgeVariants}
                        whileHover="hover"
                        className="px-6 py-3 bg-accent-800/40 backdrop-blur-md rounded-full border border-accent-400/30 cursor-default"
                    >
                        <span className="text-accent-100">{siteConfig.releaseDate}</span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.header>
    );
}
