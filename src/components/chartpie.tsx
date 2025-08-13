"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Chart config for ShadCN styling
const chartConfig: ChartConfig = {
  visitors: { label: "Leads" },
  linkedin: { label: "LinkedIn", color: "var(--chart-1)" },
  website: { label: "Website",  color: "var(--chart-2)" },
  email: { label: "Email",      color: "var(--chart-3)" },
  referral: { label: "Referral", color: "var(--chart-4)" },
  ads: { label: "Ads",          color: "var(--chart-5)" },
}


type LeadSource = 'linkedin' | 'website' | 'email' | 'referral' | 'ads'
type LeadData = { source: LeadSource; leads: number }

export function ChartPieDonutText() {
  const [chartData, setChartData] = React.useState<LeadData[]>([])
  const [totalLeads, setTotalLeads] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch("/api/leadsource") 
        const json: { total: number; data: LeadData[] } = await res.json()

        // Fill missing sources with 0
        const allSources: LeadSource[] = ['linkedin', 'website', 'email', 'referral', 'ads']
        const normalized = allSources.map(s => {
          const found = json.data.find(d => d.source === s)
          return { source: s, leads: found?.leads ?? 0 }
        })

        setChartData(normalized)
        setTotalLeads(json.total)
      } catch (err) {
        console.error(err)
        setChartData([])
        setTotalLeads(0)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Lead Sources</CardTitle>
        <CardDescription>March - August 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.map(d => ({ ...d, fill: `var(--chart-${['linkedin','website','email','referral','ads'].indexOf(d.source)+1})` }))}
              dataKey="leads"
              nameKey="source"
              innerRadius={60}
              strokeWidth={5}
              isAnimationActive
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {loading ? '...' : totalLeads.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total leads
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing lead sources for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
