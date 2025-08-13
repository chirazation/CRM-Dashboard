// app/api/lead-sources/route.ts
import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// Sources par défaut
const DEFAULT_SOURCES = ['linkedin', 'website', 'email', 'referral', 'ads'] as const
type LeadSource = (typeof DEFAULT_SOURCES)[number]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const sourcesParam = searchParams.get('sources')
    
    const sources: LeadSource[] = sourcesParam
      ? (sourcesParam.split(',').map(s => s.trim().toLowerCase()) as LeadSource[])
      : [...DEFAULT_SOURCES]
    
    // Construction du filtre avec validation des dates
    const where: Prisma.LeadWhereInput = {}
    
    if (start || end) {
      where.createdAt = {}
      
      if (start) {
        const startDate = new Date(start)
        if (isNaN(startDate.getTime())) {
          return NextResponse.json({ error: 'Invalid start date format' }, { status: 400 })
        }
        where.createdAt.gte = startDate
      }
      
      if (end) {
        const endDate = new Date(end + 'T23:59:59.999Z')
        if (isNaN(endDate.getTime())) {
          return NextResponse.json({ error: 'Invalid end date format' }, { status: 400 })
        }
        where.createdAt.lte = endDate
      }
    }
    
    // Since source is a string, we need to handle case-insensitive matching
    // Option 1: Filter by sources with case-insensitive matching
    if (sources.length > 0) {
      where.OR = sources.map(source => ({
        source: {
          equals: source,
          mode: 'insensitive' as const
        }
      }))
    }
    
    // Get all leads and group them manually for better control over string matching
    const leads = await prisma.lead.findMany({
      select: { source: true },
      where
    })
    
    // Manual grouping with case-insensitive matching and normalization
    const sourceCount = new Map<string, number>()
    
    leads.forEach(lead => {
      if (lead.source) {
        const normalizedSource = lead.source.toLowerCase().trim()
        sourceCount.set(normalizedSource, (sourceCount.get(normalizedSource) || 0) + 1)
      }
    })
    
    // Create data array ensuring all requested sources are included (even with 0 count)
    const data = sources.map(src => ({
      source: src,
      leads: sourceCount.get(src) || 0,
    }))
    
    const total = data.reduce((acc, d) => acc + d.leads, 0)
    
    return NextResponse.json({ 
      success: true,
      total, 
      data
    })
    
  } catch (err) {
    console.error('GET /api/lead-sources error:', err)
    
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ 
        error: 'Database error occurred',
        code: err.code 
      }, { status: 500 })
    }
    
    if (err instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch lead sources',
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}