import { motion } from 'framer-motion';
import { siteConfig } from '../../config/site';

function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-linear-to-br from-brand-900 via-brand-800 to-brand-950 text-white w-full py-10 px-8 rounded-3xl shadow-xl shadow-brand-900/20 border border-white/5"
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.3)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.15)_0%,transparent_50%)]" />
            </div>

            <div className="relative text-center z-10">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-3 bg-clip-text text-transparent bg-linear-to-r from-brand-200 via-white to-brand-100">
                    Authentication & Setup
                </h1>

                <p className="text-lg md:text-xl font-medium text-brand-100 opacity-90 max-w-2xl mx-auto italic">
                    Configure your{' '}
                    <span className="text-accent-400 font-bold">API access</span> to
                    start building with {siteConfig.projectName}
                </p>
            </div>
        </motion.header>
    );
}

export default Header;
