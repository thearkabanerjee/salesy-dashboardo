
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  iconColor?: string;
  onClick?: () => void;
}

const StatCard = ({ title, value, change, icon, iconColor = "bg-blue-100", onClick }: StatCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200", 
        onClick && "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
      )}
      onClick={onClick}
    >
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
          <div className="flex flex-col items-end">
            <div className={cn("p-4 rounded-full", iconColor)}>
              {icon}
            </div>
            {onClick && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="mt-2 text-xs text-blue-500 flex items-center gap-1">
                      <span>View details</span>
                      <ExternalLink size={12} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Click to see detailed analytics</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
