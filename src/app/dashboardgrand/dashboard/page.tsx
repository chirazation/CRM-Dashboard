import React from 'react';
import TopCards from '@/components/topbars';
import {ChartAreaGradient} from '@/components/chart';
import {ChartPieDonutText} from '@/components/chartpie';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import {
  MailPlus,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';
export default function DashboardPage() {
  return (
  <div className='ml-5 mr-5'> 
    <TopCards/>
    <div className="grid lg:grid-cols-3 gap-4">
       <div className="col-span-2 ">
          <ChartAreaGradient/>
       </div>
       <div className="col-span-1 w-full sm:w-[415px] max-h-full">
        <ChartPieDonutText/>
        <div className="bg-white w-full border mt-4 rounded-lg h-45 sm:w-[415px] ">
    <Card>
  <CardHeader>
    <CardTitle>Lead Status</CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MailPlus className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">New</span>
      </div>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">34</span>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <PhoneCall className="w-4 h-4 text-yellow-600" />
        <span className="text-sm font-medium text-gray-700">Contacted</span>
      </div>
      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">21</span>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-gray-700">Converted</span>
      </div>
      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">14</span>
    </div>
  </CardContent>
</Card>

        </div>
        <div>

        </div>
       </div>
     </div>
  </div>
  )
}
