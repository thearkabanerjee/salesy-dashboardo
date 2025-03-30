
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Customer {
  id: string;
  name: string;
  initials: string;
  spent: number;
  progress: number;
  url?: string;
}

interface TopCustomersProps {
  data: Customer[];
  viewAllUrl?: string;
}

const TopCustomers = ({ data, viewAllUrl }: TopCustomersProps) => {
  const handleCustomerClick = (customer: Customer) => {
    window.open(customer.url || `https://example.com/customers/${customer.id}`, '_blank');
    toast({
      title: "Customer Profile",
      description: `Viewing detailed profile for ${customer.name}`,
    });
  };

  const handleViewAll = () => {
    window.open(viewAllUrl || 'https://example.com/all-customers', '_blank');
    toast({
      title: "All Customers",
      description: "Viewing the complete customer database.",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Top Customers</span>
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
        <div className="space-y-6">
          {data.map((customer) => (
            <TooltipProvider key={customer.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleCustomerClick(customer)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {customer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium flex items-center gap-1">
                          {customer.name}
                          <ExternalLink size={12} className="text-blue-500" />
                        </p>
                        <p className="text-sm text-muted-foreground">${customer.spent.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="w-[120px]">
                      <Progress value={customer.progress} className="h-2" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to view customer profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCustomers;
