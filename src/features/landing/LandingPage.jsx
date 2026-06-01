import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Palette, Eye, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
const features = [
    {
        icon: Sparkles,
        title: 'AI Generation',
        description: 'Upload your resume and let AI craft a polished portfolio in seconds.',
    },
    {
        icon: Palette,
        title: 'Full Customization',
        description: 'Edit content, colors, typography, and layout with a powerful visual editor.',
    },
    {
        icon: Eye,
        title: 'Live Preview',
        description: 'Switch between desktop, tablet, and mobile views instantly.',
    },
    {
        icon: Globe,
        title: 'One-Click Publish',
        description: 'Share your portfolio with a unique URL and SEO-ready metadata.',
    },
];
export function LandingPage() {
    return (<div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4"/>
            </div>
            <span className="text-lg font-semibold">PortfolioForge</span>
          </div>
          <Link to="/wizard">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              AI Personal Website Builder
            </p>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Build your personal website in minutes.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Upload your resume, enrich with GitHub, and let AI generate a modern portfolio.
              Customize every detail and publish with one click.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/wizard">
                <Button size="lg" className="gap-2 px-8">
                  Generate Website
                  <ArrowRight className="h-4 w-4"/>
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="border-t border-border bg-muted/30 py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5"/>
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>))}
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to stand out?</h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of professionals who built their portfolio with PortfolioForge.
            </p>
            <Link to="/wizard" className="mt-8 inline-block">
              <Button size="lg">Generate Website</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PortfolioForge. Built with AI.
      </footer>
    </div>);
}
