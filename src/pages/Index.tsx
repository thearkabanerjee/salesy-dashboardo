
import React, { useState } from 'react';
import { ChartBar, ChartPie, Filter, Calendar, Search, ExternalLink } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import SalesDistributionChart from '@/components/dashboard/SalesDistributionChart';
import SalesTable from '@/components/dashboard/SalesTable';
import TopCustomers from '@/components/dashboard/TopCustomers';
import FilterBar from '@/components/dashboard/FilterBar';
import { toast } from "@/components/ui/use-toast";

// Mock data
const revenueData = [
  { name: 'Jan', revenue: 35000 },
  { name: 'Feb', revenue: 28000 },
  { name: 'Mar', revenue: 42000 },
  { name: 'Apr', revenue: 38000 },
  { name: 'May', revenue: 45000 },
  { name: 'Jun', revenue: 53000 },
  { name: 'Jul', revenue: 49000 },
  { name: 'Aug', revenue: 62000 },
];

const distributionData = [
  { name: 'Electronics', value: 45000, color: '#60A5FA', url: 'https://example.com/electronics' },
  { name: 'Clothing', value: 32000, color: '#34D399', url: 'https://example.com/clothing' },
  { name: 'Accessories', value: 18000, color: '#A78BFA', url: 'https://example.com/accessories' },
  { name: 'Furniture', value: 25000, color: '#F87171', url: 'https://example.com/furniture' },
];

const recentSales = [
  { id: '1', customer: 'John Smith', product: 'Premium Headphones', amount: 299, status: 'completed' as const, date: '2023-09-10', url: 'https://example.com/sales/1' },
  { id: '2', customer: 'Emily Johnson', product: 'Wireless Keyboard', amount: 129, status: 'pending' as const, date: '2023-09-09', url: 'https://example.com/sales/2' },
  { id: '3', customer: 'Michael Brown', product: 'Smart Watch', amount: 449, status: 'completed' as const, date: '2023-09-09', url: 'https://example.com/sales/3' },
  { id: '4', customer: 'Sarah Davis', product: 'Laptop Stand', amount: 79, status: 'failed' as const, date: '2023-09-08', url: 'https://example.com/sales/4' },
  { id: '5', customer: 'Robert Wilson', product: 'External SSD', amount: 199, status: 'completed' as const, date: '2023-09-08', url: 'https://example.com/sales/5' },
];

const topCustomers = [
  { id: '1', name: 'John Smith', initials: 'JS', spent: 12850, progress: 85, url: 'https://example.com/customers/john-smith' },
  { id: '2', name: 'Emily Johnson', initials: 'EJ', spent: 9340, progress: 62, url: 'https://example.com/customers/emily-johnson' },
  { id: '3', name: 'Michael Brown', initials: 'MB', spent: 7920, progress: 53, url: 'https://example.com/customers/michael-brown' },
  { id: '4', name: 'Sarah Davis', initials: 'SD', spent: 6750, progress: 45, url: 'https://example.com/customers/sarah-davis' },
];

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const handleCardClick = (title: string, url: string) => {
    window.open(url, '_blank');
    toast({
      title: `Viewing ${title}`,
      description: `Navigating to detailed ${title.toLowerCase()} information.`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sales Dashboard</h1>
        <p className="text-muted-foreground">Track your sales performance and revenue insights</p>
      </div>

      <FilterBar
        date={date}
        setDate={setDate}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$352,000" 
          change={12.5} 
          icon={<ChartBar size={24} className="text-dashboard-blue" />}
          iconColor="bg-blue-100"
          onClick={() => handleCardClick("Revenue Analytics", "https://example.com/revenue")}
        />
        <StatCard 
          title="Total Sales" 
          value="8,642" 
          change={8.2} 
          icon={<ChartBar size={24} className="text-dashboard-green" />}
          iconColor="bg-green-100"
          onClick={() => handleCardClick("Sales Data", "https://example.com/sales")}
        />
        <StatCard 
          title="Average Order" 
          value="$412" 
          change={-3.8} 
          icon={<ChartPie size={24} className="text-dashboard-purple" />}
          iconColor="bg-purple-100"
          onClick={() => handleCardClick("Order Analytics", "https://example.com/orders")}
        />
        <StatCard 
          title="Conversion Rate" 
          value="24.8%" 
          change={5.3} 
          icon={<Filter size={24} className="text-dashboard-orange" />}
          iconColor="bg-orange-100"
          onClick={() => handleCardClick("Conversion Metrics", "https://example.com/conversions")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RevenueChart data={revenueData} />
        <SalesDistributionChart data={distributionData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SalesTable data={recentSales} />
        <TopCustomers data={topCustomers} />
      </div>
    </div>
  );
};

export default Dashboard;
