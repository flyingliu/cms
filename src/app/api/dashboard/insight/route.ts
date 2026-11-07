import { NextResponse } from 'next/server'
import dashboardData from '@/data/dashboard_data.json'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body
    
    // Mock AI Insight - In production, this would call LLM API
    const mockInsight = {
      analysis: `Based on the data analysis, your brand's AI visibility shows strong performance with a score of ${dashboardData.summary.visibilityScore}/100. Key observations:\n\n• Positive sentiment across major platforms (ChatGPT, Claude, Perplexity)\n• Mention volume increased 27% over the past month\n• Recommendation rate is healthy at 27.4%\n• Gemini shows opportunity for improvement (neutral sentiment)\n\nThe upward trend in visibility score suggests effective brand positioning in AI-related conversations.`,
      recommendations: [
        'Increase engagement on Gemini platform to improve sentiment',
        'Leverage positive ChatGPT mentions for case studies',
        'Create more content around "AI Analytics" topic (high mention volume)',
        'Monitor competitor mentions in recommendations for benchmarking'
      ],
      generatedAt: new Date().toISOString()
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return NextResponse.json(
      {
        success: true,
        data: mockInsight
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate AI insight' },
      { status: 500 }
    )
  }
}
