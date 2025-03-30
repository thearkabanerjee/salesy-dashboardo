
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

interface Sale {
  id: string;
  customer: string;
  amount: number;
  product: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  url?: string;
}

interface SalesTableProps {
  data: Sale[];
}

const statusColorMap = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};

const SalesTable = ({ data }: SalesTableProps) => {
  const handleRowClick = (sale: Sale) => {
    if (sale.url) {
      window.open(sale.url, '_blank');
      toast({
        title: "Sale Details",
        description: `Viewing details for sale #${sale.id} - ${sale.product}`,
      });
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Recent Sales</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-blue-500 flex items-center gap-1"
            onClick={() => window.open('https://example.com/all-sales', '_blank')}
          >
            <span>View All</span> 
            <ExternalLink size={12} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((sale) => (
              <TableRow 
                key={sale.id} 
                className={sale.url ? "cursor-pointer hover:bg-gray-50" : ""}
                onClick={() => handleRowClick(sale)}
              >
                <TableCell className="font-medium flex items-center gap-1">
                  {sale.customer}
                  {sale.url && <ExternalLink size={12} className="text-blue-500" />}
                </TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>${sale.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColorMap[sale.status]}>
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{sale.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SalesTable;
