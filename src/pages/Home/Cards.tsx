import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, BookOpen, Code, ArrowRight } from 'lucide-react';
import Card from '../../components/Card';
import { siteConfig } from '../../config/site';

export default function Cards() {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <Card>
                    <div className="p-3 bg-brand-50 dark:bg-brand-900/30 rounded-xl w-fit mb-4">
                        <Rocket className="w-6 h-6 text-brand-600" aria-hidden />
                    </div>
                    <h2 className="text-xl font-bold text-brand-900 dark:text-neutral-100 mb-2">
                        Get started
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        New to {siteConfig.api.name}? Create a key and send your first request in minutes.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate('/getting-started')}
                        className="flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 group"
                    >
                        Setup guide
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Card>

                <Card>
                    <div className="p-3 bg-accent-50 dark:bg-accent-900/30 rounded-xl w-fit mb-4">
                        <BookOpen className="w-6 h-6 text-accent-500" aria-hidden />
                    </div>
                    <h2 className="text-xl font-bold text-brand-900 dark:text-neutral-100 mb-2">
                        Authentication
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        Bearer tokens, sandbox vs production, and how to keep keys out of source control.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate('/authentication')}
                        className="flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 group"
                    >
                        Read docs
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Card>

                <Card>
                    <div className="p-3 bg-success-600/10 rounded-xl w-fit mb-4">
                        <Code className="w-6 h-6 text-success-600" aria-hidden />
                    </div>
                    <h2 className="text-xl font-bold text-brand-900 dark:text-neutral-100 mb-2">
                        API reference
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        Methods, paths, parameters, and copy-paste examples for {siteConfig.endpointCount} sample endpoints.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate('/api-reference')}
                        className="flex items-center gap-2 text-success-600 font-medium hover:text-success-700 group"
                    >
                        Browse endpoints
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Card>
            </motion.div>
        </div>
    );
}
