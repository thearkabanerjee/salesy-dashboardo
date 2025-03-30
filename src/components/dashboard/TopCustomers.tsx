
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Customer {
  id: string;
  name: string;
  initials: string;
  spent: number;
  progress: number;
}

interface TopCustomersProps {
  data: Customer[];
}

const TopCustomers = ({ data }: TopCustomersProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Top Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((customer) => (
            <div key={customer.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {customer.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{customer.name}</p>
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
