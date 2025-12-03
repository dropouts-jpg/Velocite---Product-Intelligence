import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { FeedbackItem, InsightCluster } from '../types';
import { analyzeFeedbackClusters } from '../services/geminiService';
import { 
  BarChart3, 
  MessageSquare, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  RefreshCw,
  Search
} from 'lucide-react';

const MOCK_FEEDBACK: FeedbackItem[] = [
  { id: '1', user: 'alex@startup.com', content: 'The dashboard takes 5 seconds to load on mobile.', source: 'Intercom', timestamp: '2023-10-25', sentiment: 'negative' },
  { id: '2', user: 'sarah@bigcorp.co', content: 'Can we get an export to CSV feature?', source: 'Email', timestamp: '2023-10-26', sentiment: 'neutral' },
  { id: '3', user: 'mike@dev.io', content: 'Dark mode is broken on the settings page, text is black on black.', source: 'Twitter', timestamp: '2023-10-26', sentiment: 'negative' },
  { id: '4', user: 'jess@design.net', content: 'I really love the new collaborative editing mode!', source: 'SalesForce', timestamp: '2023-10-27', sentiment: 'positive' },
  { id: '5', user: 'cto@scale.ai', content: 'We need SSO before we can expand to the rest of the team.', source: 'Email', timestamp: '2023-10-27', sentiment: 'neutral' },
  { id: '6', user: 'anon@user.com', content: 'Mobile view is extremely laggy.', source: 'Intercom', timestamp: '2023-10-27', sentiment: 'negative' },
];

export const Dashboard: React.FC = () => {
  const [feedback] = useState<FeedbackItem[]>(MOCK_FEEDBACK);
  const [clusters, setClusters] = useState<InsightCluster[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate network delay for effect if mock is fast
    await new Promise(resolve => setTimeout(resolve, 800)); 
    const results = await analyzeFeedbackClusters(feedback);
    setClusters(results);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-textMain tracking-tight">Feedback Intelligence</h1>
          <p className="text-textMuted mt-1">Aggregated insights from {feedback.length} data points.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button className="px-4 py-2 text-sm font-medium text-textMuted hover:text-textMain transition-colors">
            Filter View
          </button>
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(94,106,210,0.3)]
              ${isAnalyzing ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed' : 'bg-primary hover:bg-primaryHover text-white'}
            `}
          >
            {isAnalyzing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 fill-white" />
            )}
            <span>{isAnalyzing ? 'Processing AI...' : 'Generate Insights'}</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-full">
            <MessageSquare className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-textMain">{feedback.length}</div>
            <div className="text-xs text-textMuted uppercase tracking-wider font-medium">New Items</div>
          </div>
        </Card>
        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-red-500/10 rounded-full">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-textMain">3</div>
            <div className="text-xs text-textMuted uppercase tracking-wider font-medium">Critical Issues</div>
          </div>
        </Card>
        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-textMain">92%</div>
            <div className="text-xs text-textMuted uppercase tracking-wider font-medium">Resolution Rate</div>
          </div>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Raw Feed */}
        <div className="lg:col-span-1 space-y-4">
           <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-textMuted uppercase tracking-wider">Incoming Feed</h3>
            <Search className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="space-y-3">
            {feedback.map((item) => (
              <Card key={item.id} className="p-4 group">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    item.sentiment === 'negative' ? 'border-red-500/20 text-red-400 bg-red-500/5' :
                    item.sentiment === 'positive' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' :
                    'border-zinc-700 text-zinc-400 bg-zinc-800/50'
                  }`}>
                    {item.source}
                  </span>
                  <span className="text-[10px] text-zinc-600">{item.timestamp}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-snug group-hover:text-zinc-100 transition-colors">"{item.content}"</p>
                <div className="mt-2 text-xs text-zinc-500 truncate">{item.user}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: AI Clusters */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium text-textMuted uppercase tracking-wider">AI Prioritized Clusters</h3>
          </div>

          {clusters.length === 0 && !isAnalyzing ? (
            <div className="border border-dashed border-zinc-800 rounded-xl h-96 flex flex-col items-center justify-center text-center p-8 bg-zinc-900/20">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-zinc-700" />
              </div>
              <h4 className="text-lg font-medium text-textMain mb-2">No Insights Generated Yet</h4>
              <p className="text-zinc-500 max-w-sm mb-6">Hit the generate button to have Gemini 2.5 analyze the feedback stream and identify patterns.</p>
              <button onClick={handleAnalyze} className="text-primary hover:text-primaryHover text-sm font-medium">Analyze Now &rarr;</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {clusters.map((cluster) => (
                <Card key={cluster.id} className="border-l-2 border-l-primary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded border border-zinc-700">Create Issue</button>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-medium text-textMain">{cluster.title}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          cluster.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                          cluster.severity === 'high' ? 'bg-orange-500/10 text-orange-400' :
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          {cluster.severity}
                        </span>
                      </div>
                      <p className="text-sm text-textMuted max-w-xl">{cluster.description}</p>
                    </div>
                    <div className="text-right">
                       <div className="text-2xl font-bold text-textMain">{cluster.impactScore}</div>
                       <div className="text-[10px] text-textMuted uppercase">Impact Score</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-xs text-indigo-300">
                      <BarChart3 className="w-3 h-3" />
                      <span>Action: {cluster.suggestedAction}</span>
                    </div>
                    <div className="flex -space-x-2">
                       {/* Mock avatars for users affected */}
                       {[...Array(3)].map((_, i) => (
                         <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[8px] text-zinc-500">
                           U{i+1}
                         </div>
                       ))}
                       <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[8px] text-zinc-500">
                         +{cluster.relatedFeedbackIds.length}
                       </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};