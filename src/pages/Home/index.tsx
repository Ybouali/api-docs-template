import Cards from './Cards';
import Header from './Header';
import QuickActions from './QuickActions';
import { MetaTags } from '../../components/MetaTags';
import { siteConfig } from '../../config/site';

export default function Home() {
    return (
        <>
            <MetaTags
                title={siteConfig.api.name}
                description={siteConfig.company.description}
            />
            <div className="flex flex-col items-center gap-8 w-full max-w-7xl mx-auto pb-12">
                <Header />
                <Cards />
                <QuickActions />
            </div>
        </>
    );
}
