import {
  MailPlus,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

import React from 'react';
export default function Status (){
return(
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
)
}