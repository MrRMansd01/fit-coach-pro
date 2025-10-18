import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MarketplaceFilters({ 
  searchQuery, 
  setSearchQuery, 
  specialtyFilter, 
  setSpecialtyFilter,
  sortBy,
  setSortBy 
}) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search coaches or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 focus:border-blue-500 transition-colors"
            />
          </div>

          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="bg-white border-slate-200">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <SelectValue placeholder="All Specialties" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="Weight Loss">Weight Loss</SelectItem>
              <SelectItem value="Muscle Building">Muscle Building</SelectItem>
              <SelectItem value="Strength Training">Strength Training</SelectItem>
              <SelectItem value="HIIT">HIIT</SelectItem>
              <SelectItem value="Yoga">Yoga</SelectItem>
              <SelectItem value="CrossFit">CrossFit</SelectItem>
              <SelectItem value="Athletic Performance">Athletic Performance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-white border-slate-200">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}