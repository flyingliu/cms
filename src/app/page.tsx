import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            万悉科技 AI 全栈工程师笔试
          </h1>
          <p className="text-xl text-muted-foreground">
            AI Visibility Dashboard + AI Product Knowledge Center
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Project 1 Card */}
          <Link href="/dashboard" className="block">
            <div className="group relative p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="text-3xl">📊</div>
                <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                  Project 1: AI Visibility Dashboard
                </h2>
                <p className="text-muted-foreground">
                  品牌 AI 可见性数据分析看板，展示品牌在不同 AI 平台的表现、提及度、推荐情况
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 数据可视化（ECharts）</li>
                  <li>• 问题筛选与分析</li>
                  <li>• AI Insight 生成</li>
                  <li>• REST API 数据流</li>
                </ul>
              </div>
            </div>
          </Link>

          {/* Project 2 Card */}
          <Link href="/products" className="block">
            <div className="group relative p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="text-3xl">📚</div>
                <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                  Project 2: AI Product Knowledge Center
                </h2>
                <p className="text-muted-foreground">
                  品牌产品知识中心，SEO/GEO 优化，结构化数据，AI 问答
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 产品列表与详情</li>
                  <li>• SEO/JSON-LD 优化</li>
                  <li>• AskAI 问答</li>
                  <li>• CMS 后台管理</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>

        <div className="p-6 bg-muted/50 rounded-lg border">
          <h3 className="font-semibold mb-2">技术栈</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-background rounded-full border">Next.js 14</span>
            <span className="px-3 py-1 bg-background rounded-full border">TypeScript</span>
            <span className="px-3 py-1 bg-background rounded-full border">Tailwind CSS</span>
            <span className="px-3 py-1 bg-background rounded-full border">ECharts</span>
            <span className="px-3 py-1 bg-background rounded-full border">shadcn/ui</span>
          </div>
        </div>
      </div>
    </main>
  )
}
