import { NextResponse } from 'next/server'
import dashboardData from '@/data/dashboard_data.json'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const platform = searchParams.get('platform')
    const mentioned = searchParams.get('mentioned')
    
    let questions = dashboardData.questions
    
    // Apply filters
    if (platform) {
      questions = questions.filter(q => q.platform === platform)
    }
    
    if (mentioned !== null && mentioned !== undefined) {
      const isMentioned = mentioned === 'true'
      questions = questions.filter(q => q.mentioned === isMentioned)
    }
    
    return NextResponse.json(
      {
        success: true,
        data: questions,
        total: questions.length
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
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}
