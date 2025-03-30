
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

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
}

const TopCustomers = ({ data }: TopCustomersProps) => {
  const handleCustomerClick = (customer: Customer) => {
    if (customer.url) {
      window.open(customer.url, '_blank');
      toast({
        title: "Customer Profile",
        description: `Viewing detailed profile for ${customer.name}`,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Top Customers</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-blue-500 flex items-center gap-1"
            onClick={() => window.open('https://example.com/all-customers', '_blank')}
          >
            <span>View All</span> 
            <ExternalLink size={12} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((customer) => (
            <div 
              key={customer.id} 
              className={`flex items-center justify-between ${customer.url ? "cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" : ""}`}
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
                    {customer.url && <ExternalLink size={12} className="text-blue-500" />}
                  </p>
                  <p className="text-sm text-muted-foreground">${customer.spent.toLocaleString()}</p>
                </div>
              </div>
              <div className="w-[120px]">
                <Progress value={customer.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCustomers;
