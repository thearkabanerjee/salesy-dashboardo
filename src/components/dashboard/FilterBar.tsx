
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DateRangeFilter from './DateRangeFilter';

interface FilterBarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  category: string;
  setCategory: (category: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

const FilterBar = ({ date, setDate, category, setCategory, search, setSearch }: FilterBarProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-muted-foreground" />
          <span className="font-medium">Filters:</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <DateRangeFilter date={date} setDate={setDate} />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative w-full md:w-auto max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products, customers..."
          className="pl-9 w-full md:w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterBar;
