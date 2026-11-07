'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Question } from '@/types'
import dashboardData from '@/data/dashboard_data.json'
import ReactECharts from 'echarts-for-react'
import { Sparkles, Filter } from 'lucide-react'

export default function DashboardPageStatic() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [selectedMentioned, setSelectedMentioned] = useState<string>('all')
  const [insight, setInsight] = useState<{ analysis: string; recommendations: string[] } | null>(null)

  // 客户端筛选（替代 API）
  const getFilteredQuestions = (): Question[] => {
    let questions = dashboardData.questions
    
    if (selectedPlatform !== 'all') {
      questions = questions.filter(q => q.platform === selectedPlatform)
    }
    
    if (selectedMentioned !== 'all') {
      const isMentioned = selectedMentioned === 'true'
      questions = questions.filter(q => q.mentioned === isMentioned)
    }
    
    return questions
  }

  const questions = getFilteredQuestions()

  const generateInsight = () => {
    // Mock AI Insight（客户端直接生成，替代 API）
    setInsight({
      analysis: `Based on the data analysis, your brand's AI visibility shows strong performance with a score of ${dashboardData.summary.visibilityScore}/100. Key observations:\n\n• Positive sentiment across major platforms (ChatGPT, Claude, Perplexity)\n• Mention volume increased 27% over the past month\n• Recommendation rate is healthy at 27.4%\n• Gemini shows opportunity for improvement (neutral sentiment)\n\nThe upward trend in visibility score suggests effective brand positioning in AI-related conversations.`,
      recommendations: [
        'Increase engagement on Gemini platform to improve sentiment',
        'Leverage positive ChatGPT mentions for case studies',
        'Create more content around "AI Analytics" topic (high mention volume)',
        'Monitor competitor mentions in recommendations for benchmarking'
      ]
    })
  }

  const platforms = ['all', ...Array.from(new Set(dashboardData.questions.map(q => q.platform)))]

  const trendChartOption = {
    title: { text: 'Visibility Score & Mentions Trend', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { data: ['Visibility Score', 'Mentions'], bottom: 0 },
    xAxis: { 
      type: 'category', 
      data: dashboardData.trend.map(t => t.date.slice(5))
    },
    yAxis: [
      { type: 'value', name: 'Score', min: 60, max: 90 },
      { type: 'value', name: 'Mentions', position: 'right' }
    ],
    series: [
      {
        name: 'Visibility Score',
        type: 'line',
        smooth: true,
        data: dashboardData.trend.map(t => t.visibilityScore),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Mentions',
        type: 'bar',
        yAxisIndex: 1,
        data: dashboardData.trend.map(t => t.mentions),
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  }

  const platformChartOption = {
    title: { text: 'Platform Performance Comparison', left: 'center' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['Visibility Score', 'Mentions', 'Recommendations'], bottom: 0 },
    xAxis: { type: 'category', data: dashboardData.platforms.map(p => p.name) },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Visibility Score',
        type: 'bar',
        data: dashboardData.platforms.map(p => p.visibilityScore),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Mentions',
        type: 'bar',
        data: dashboardData.platforms.map(p => p.mentions),
        itemStyle: { color: '#8b5cf6' }
      },
      {
        name: 'Recommendations',
        type: 'bar',
        data: dashboardData.platforms.map(p => p.recommendations),
        itemStyle: { color: '#10b981' }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">AI Visibility Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Brand performance across AI platforms
              </p>
            </div>
            <a href="/cms/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* GitHub Pages 提示 */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="container mx-auto px-4 py-2 text-sm text-yellow-800">
          ⚠️ 当前为静态演示版本（数据直接读取，非 API 调用）- 适合 GitHub Pages 部署
        </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Visibility Score</CardDescription>
              <CardTitle className="text-3xl">{dashboardData.summary.visibilityScore}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <span className="text-green-600">↑ 8.6%</span> vs last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Mentions</CardDescription>
              <CardTitle className="text-3xl">{dashboardData.summary.mentions.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <span className="text-green-600">↑ 27%</span> vs last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Recommendations</CardDescription>
              <CardTitle className="text-3xl">{dashboardData.summary.recommendations}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {((dashboardData.summary.recommendations / dashboardData.summary.mentions) * 100).toFixed(1)}% recommendation rate
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg Score</CardDescription>
              <CardTitle className="text-3xl">{dashboardData.summary.avgScore}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Across all platforms
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactECharts option={trendChartOption} style={{ height: '300px' }} />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Platform Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactECharts option={platformChartOption} style={{ height: '300px' }} />
            </CardContent>
          </Card>
        </div>

        {/* AI Insight */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  AI Insight
                </CardTitle>
                <CardDescription>Automated analysis and recommendations</CardDescription>
              </div>
              <button
                onClick={generateInsight}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Generate Analysis
              </button>
            </div>
          </CardHeader>
          {insight && (
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Analysis</h4>
                <p className="text-sm whitespace-pre-line">{insight.analysis}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {insight.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Questions Analysis */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Question Analysis
              </CardTitle>
              <CardDescription>Browse and filter AI platform questions</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Platforms</option>
                {platforms.slice(1).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <select
                value={selectedMentioned}
                onChange={(e) => setSelectedMentioned(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Mentions</option>
                <option value="true">Mentioned</option>
                <option value="false">Not Mentioned</option>
              </select>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                          {q.platform}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800">
                          {q.topic}
                        </span>
                        {q.mentioned && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                            Mentioned
                          </span>
                        )}
                        {q.recommended && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="font-medium">{q.question}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{q.answer}</p>
                      <div className="text-xs text-muted-foreground">
                        {q.citations.length} citation{q.citations.length !== 1 ? 's' : ''} •{' '}
                        {new Date(q.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
