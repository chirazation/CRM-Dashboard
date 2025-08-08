'use client';
import React,{useState,useEffect} from 'react'
import { Icon } from '@iconify/react';
const TopCards =() =>{
      const [counts, setCounts] = useState({
        totalLeads: 0,
        companyCount: 0,
      });
    
      useEffect(() => {
        const fetchStats = async () => {
          const res = await fetch('/api/topbars');
          const data = await res.json();
          setCounts(data);
        };
        fetchStats();
      }, []);
    return( 
        <div className="grid lg:grid-cols-3 gap-4 mb-4 mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ">
            <div className='flex w-full pb-4 gap-2.5'>
                <Icon icon="lucide:building" className="w-6 h-6 text-green-700 bg-green-200 p-1 rounded-lg"></Icon>
                <span className='text-lg font-medium text-gray-600 mb-1 '>Number of companies</span>
            </div>
            <div className="text-xl font-bold text-gray-900 mt-2 ml-8 ">{counts.companyCount}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
             <div className='flex w-full pb-4 gap-2.5'>
                <Icon icon="lucide:users" className="w-6 h-6 text-blue-800 bg-blue-200 p-1 rounded-lg"></Icon>
                <span className='text-lg font-medium text-gray-600 mb-1 '>Number of contacts</span>   
            </div>
            <div className="text-xl font-bold text-gray-900 mt-2 ml-8 group-hover:text-white">{counts.totalLeads}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
             <div className='flex w-full pb-4 gap-2.5'>
                <Icon icon="lucide:briefcase" className="w-6 h-6 text-red-700 bg-red-200 p-1 rounded-lg"></Icon>
                <span className='text-lg font-medium text-gray-600 mb-1  '>Total deals in pipeline</span>
            </div>
            <div className="text-xl font-bold text-gray-900 mt-2 ml-8 ">{counts.totalLeads}</div>
        </div>
</div>
    )}
export default TopCards;