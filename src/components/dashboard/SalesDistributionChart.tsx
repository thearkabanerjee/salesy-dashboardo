
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

interface SalesDistributionChartProps {
  data: {
    name: string;
    value: number;
    color: string;
    url?: string;
  }[];
  reportUrl?: string;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SalesDistributionChart = ({ data, reportUrl }: SalesDistributionChartProps) => {
  const handleCategoryClick = (entry: any, index: number) => {
    const item = data[index];
    if (item) {
      window.open(item.url || `https://example.com/category/${item.name.toLowerCase()}`, '_blank');
      toast({
        title: `${item.name} Category Selected`,
        description: `Viewing detailed sales data for ${item.name}.`,
      });
    }
  };

  const handleViewAll = () => {
    window.open(reportUrl || 'https://example.com/distribution', '_blank');
    toast({
      title: "Distribution Report",
      description: "Opening the complete sales distribution report.",
    });
  };

  const renderCustomizedLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-2">
        {payload.map((entry: any, index: number) => (
          <li 
            key={`item-${index}`} 
            className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => handleCategoryClick(entry, index)}
          >
            <div 
              style={{ 
                backgroundColor: entry.color,
                width: 10,
                height: 10,
                borderRadius: '50%'
              }} 
            />
            <span>{entry.value}</span>
            <ExternalLink size={12} className="text-blue-500" />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Sales Distribution</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-blue-500 flex items-center gap-1"
            onClick={handleViewAll}
          >
            <span>View All</span> 
            <ExternalLink size={12} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                onClick={handleCategoryClick}
                className="cursor-pointer"
                activeIndex={[]}
                activeShape={(props) => {
                  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
                  return (
                    <g>
                      <path
                        d={{...props}.arc}
                        fill={fill}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    </g>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                align="center"
                layout="horizontal"
                iconType="circle"
                content={renderCustomizedLegend}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesDistributionChart;
