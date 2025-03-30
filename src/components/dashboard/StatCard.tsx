
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  iconColor?: string;
}

const StatCard = ({ title, value, change, icon, iconColor = "bg-blue-100" }: StatCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <div className="flex items-center text-green-600">
                  <ArrowUp size={16} />
                  <span className="text-sm font-medium ml-1">{Math.abs(change)}%</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <ArrowDown size={16} />
                  <span className="text-sm font-medium ml-1">{Math.abs(change)}%</span>
                </div>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs last month</span>
            </div>
          </div>
          <div className={cn("p-4 rounded-full", iconColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
