import { NextResponse } from 'next/server'
import dashboardData from '@/data/dashboard_data.json'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        summary: dashboardData.summary,
        platforms: dashboardData.platforms,
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard summary' },
      { status: 500 }
    )
  }
}
