
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

interface RevenueChartProps {
  data: {
    name: string;
    revenue: number;
    url?: string;
  }[];
  reportUrl?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <p className="font-medium">{label}</p>
        <p className="text-dashboard-blue font-semibold">${payload[0].value.toLocaleString()}</p>
        <p className="text-xs text-blue-500 mt-1">Click to view details</p>
      </div>
    );
  }
  return null;
};

const RevenueChart = ({ data, reportUrl }: RevenueChartProps) => {
  const handleBarClick = (data: any) => {
    const month = data.name;
    const url = data.url || `https://example.com/revenue/${month.toLowerCase()}`;
    window.open(url, '_blank');
    toast({
      title: `${month} Revenue`,
      description: `Viewing detailed revenue data for ${month}.`,
    });
  };

  const handleViewReport = () => {
    window.open(reportUrl || 'https://example.com/revenue-overview', '_blank');
    toast({
      title: "Revenue Report",
      description: "Opening the comprehensive revenue report.",
    });
  };

  return (
    <Card className="col-span-2 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Revenue Overview</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-blue-500 flex items-center gap-1"
            onClick={handleViewReport}
          >
            <span>View Report</span> 
            <ExternalLink size={12} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              className="cursor-pointer"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#888888' }} axisLine={false} tickLine={false} />
              <YAxis 
                tick={{ fill: '#888888' }} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                fill="#60A5FA" 
                radius={[4, 4, 0, 0]}
                barSize={40}
                onClick={handleBarClick}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
