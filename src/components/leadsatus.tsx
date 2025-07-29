'use client';

import React, { useEffect, useState } from 'react';
import {
  MailPlus,
  PhoneCall,
  CheckCircle,
  Star
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'


export default function Status (){
  const [counts, setCounts] = useState({
    new: 0,
    contacted: 0,
    converted: 0,
    qualified: 0, // 👈 Nouveau champ
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/leadstats');
      const data = await res.json();
      setCounts(data);
    };
    fetchStats();
  }, []);
return(
<Card>
  <CardHeader>
    <CardTitle>Lead Status</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MailPlus className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">New</span>
      </div>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{counts.new}</span>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <PhoneCall className="w-4 h-4 text-yellow-600" />
        <span className="text-sm font-medium text-gray-700">Contacted</span>
      </div>
      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">{counts.contacted}</span>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-gray-700">Converted</span>
      </div>
      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">{counts.converted}</span>
    </div>
    <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="text-purple-600" size={18} />
            <span className="text-gray-800">Qualified</span>
          </div>
          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">
            {counts.qualified}
          </span>
        </div>
  </CardContent>
</Card>
)
}