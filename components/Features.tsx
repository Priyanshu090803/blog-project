import { BookOpen, Shield, Zap } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function Features(){
    return(
         <section className="py-20 bg-white dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Everything you need
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-yellow-500" />}
              title="Blazing Fast"
              description="Built on Next.js 15 for incredible performance and SEO."
            />
            <FeatureCard
              icon={<BookOpen className="text-blue-500" />}
              title="Rich Content"
              description="Support for Markdown and beautiful typography."
            />
            <FeatureCard
              icon={<Shield className="text-green-500" />}
              title="Secure & Scalable"
              description="Powered by PostgreSQL and tRPC for end-to-end type safety."
            />
          </div>
        </div>
      </section>

    )
}