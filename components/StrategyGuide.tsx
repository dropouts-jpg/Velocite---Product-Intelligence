import React from 'react';
import { Card } from './ui/Card';
import { Database, TrendingUp, Layers, Twitter, Linkedin } from 'lucide-react';

export const StrategyGuide: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12 animate-fade-in pb-20">
      
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-textMain tracking-tight">Technical & Growth Strategy</h1>
        <p className="text-textMuted text-lg">Blueprint for the MVP launch and scaling.</p>
      </div>

      {/* Architecture Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-medium text-textMain">Architecture: Supabase Schema</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-medium text-indigo-400 mb-3">public.users</h3>
            <pre className="text-xs text-textMuted font-mono overflow-x-auto bg-black/30 p-4 rounded border border-white/5">
{`id: uuid (PK)
email: text (unique)
full_name: text
avatar_url: text
created_at: timestamp
subscription_tier: enum ('free', 'pro', 'enterprise')`}
            </pre>
          </Card>
          <Card>
            <h3 className="text-lg font-medium text-indigo-400 mb-3">public.feedback_items</h3>
            <pre className="text-xs text-textMuted font-mono overflow-x-auto bg-black/30 p-4 rounded border border-white/5">
{`id: uuid (PK)
project_id: uuid (FK -> projects.id)
content: text
source: varchar (e.g., 'Twitter', 'Email')
sentiment_score: float
embedding: vector(1536) -- For semantic search
created_at: timestamp`}
            </pre>
          </Card>
          <Card>
            <h3 className="text-lg font-medium text-indigo-400 mb-3">public.insight_clusters</h3>
            <pre className="text-xs text-textMuted font-mono overflow-x-auto bg-black/30 p-4 rounded border border-white/5">
{`id: uuid (PK)
title: text
summary: text
ai_generated: boolean
status: enum ('new', 'reviewing', 'archived')
impact_score: integer
created_at: timestamp`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Growth Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
          <h2 className="text-xl font-medium text-textMain">Viral Growth Hooks</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <div className="flex items-center space-x-2 mb-3">
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">The "Pain Agitation" Hook</span>
            </div>
            <p className="text-sm text-textMain italic mb-4">
              "Stop manually tagging 500+ user tickets. It’s 2024."
            </p>
            <p className="text-xs text-textMuted leading-relaxed">
              We just built an AI that clusters your chaotic Intercom feed into actionable Jira tickets in 30 seconds. I'm opening 50 beta spots. Drop a '⚡️' below if you want your weekends back. #SaaS #AI #ProductManagement
            </p>
          </Card>

          <Card className="border-l-4 border-l-blue-700">
             <div className="flex items-center space-x-2 mb-3">
              <Linkedin className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">The "Build in Public" Hook</span>
            </div>
            <p className="text-sm text-textMain italic mb-4">
              "How we processed 10k feedback items for $4.20."
            </p>
            <p className="text-xs text-textMuted leading-relaxed">
              Most PMs guess what to build next. We built a pipeline using Supabase Vectors + Gemini 2.5 Flash to scientifically rank feature requests by revenue impact. Here is the exact architecture 👇 [Link]. Steal this workflow.
            </p>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
             <div className="flex items-center space-x-2 mb-3">
              <Layers className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">The "Outcome" Hook</span>
            </div>
            <p className="text-sm text-textMain italic mb-4">
              "Your churn isn't a mystery. It's hidden in your support tickets."
            </p>
            <p className="text-xs text-textMuted leading-relaxed">
              Velocite uncovers the 'Silent Killers'—the small bugs that annoy users until they leave—that never make it to your roadmap. We found 3 critical UX flaws in our own app using this. See what your users are actually saying.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};