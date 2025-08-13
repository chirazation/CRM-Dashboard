import React from 'react';
import TopCards from '@/components/topbars';
import ChartAreaGradient from '@/components/chart';
import {ChartPieDonutText} from '@/components/chartpie';
import Status from '@/components/leadsatus';
export default function DashboardPage() {
  return (
<div className="mx-4 my-6">
  <TopCards />
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
    <section aria-label="Area Chart"
      className="lg:col-span-2 w-full max-w-full mx-auto lg:mx-0  bg-white border rounded-lg p-2 shadow-sm">
      <ChartAreaGradient />
    </section>
    <aside aria-label="Summary and Status"
      className="w-full max-w-full sm:max-w-[415px] mx-auto lg:mx-0 flex flex-col gap-6 mt-6 lg:mt-0 h-full">
      <div className="bg-white border rounded-lg p-4 shadow-sm flex-1 flex items-center justify-center">
        <ChartPieDonutText />
      </div>
      <div className="bg-white border rounded-lg p-4 shadow-sm ">
        <Status />
      </div>
    </aside>
  </div>
</div>


  )
}
