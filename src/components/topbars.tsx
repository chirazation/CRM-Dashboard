'use client';
import React from 'react'
import { Icon } from '@iconify/react';
const TopCards =() =>{
    return( 
        <div className="grid lg:grid-cols-3 gap-4 mb-4 mt-4">
        <div className="bg-white flex flex-col justify-between w-full border p-4 rounded-lg group hover:bg-[#0a1f44] shadow ">
            <div className='flex w-full pb-4 gap-2.5'>
                <Icon icon="lucide:building" className="w-6 h-6 text-green-700 bg-green-200 p-1 rounded-lg"></Icon>
                <span className='text-l font-bold text-gray-900  group-hover:text-white'>Number of companies</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2 ml-8 group-hover:text-white">30</div>
        </div>
        <div className="bg-white flex flex-col justify-between w-full border p-4 rounded-lg group hover:bg-[#0a1f44] shadow">
             <div className='flex w-full pb-4 gap-2.5'>
                <Icon icon="lucide:users" className="w-6 h-6 text-blue-800 bg-blue-200 p-1 rounded-lg"></Icon>
                <span className='text-l font-bold text-gray-900  group-hover:text-white'>Number of contacts</span>   
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2 ml-8 group-hover:text-white">40</div>
        </div>
        <div className="bg-white flex flex-col justify-between w-full border p-4 rounded-lg group hover:bg-[#0a1f44] shadow">
             <div className='flex w-full pb-4 gap-2.5'>
                <Icon icon="lucide:briefcase" className="w-6 h-6 text-red-700 bg-red-200 p-1 rounded-lg"></Icon>
                <span className='text-l font-bold text-gray-900 group-hover:text-white '>Total deals in pipeline</span>
            </div>
            <div className="text-xl font-bold text-gray-900 mt-2 ml-8 group-hover:text-white">288</div>
        </div>
</div>
    )}
export default TopCards;