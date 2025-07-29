import React from 'react';
import TopCards from '@/components/topbars';
import {ChartAreaGradient} from '@/components/chart';
import {ChartPieDonutText} from '@/components/chartpie';
import Status from '@/components/leadsatus';
export default function DashboardPage() {
  return (
  <div className='ml-5 mr-5'> 
    <TopCards/>
    <div className="grid lg:grid-cols-3 gap-4">
       <div className="col-span-2 h-full ">
          <ChartAreaGradient/>
       </div>
       <div className="col-span-1 w-full sm:w-[415px] max-h-full">
        <ChartPieDonutText/>
        <div className="bg-white w-full border mt-4 rounded-lg  sm:w-[415px] h-30 ">
            <Status/>
        </div>
        <div>
        </div>
       </div>
     </div>
  </div>
  )
}
