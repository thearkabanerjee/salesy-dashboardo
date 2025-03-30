
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Sale {
  id: string;
  customer: string;
  amount: number;
  product: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
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
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <CardTitle>Recent Sales</CardTitle>
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
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.customer}</TableCell>
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
