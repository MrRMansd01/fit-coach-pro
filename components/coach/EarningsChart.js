import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function EarningsChart({ programs }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <DollarSign className="w-6 h-6 text-green-600" />
          Earnings Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="text-5xl font-bold text-slate-900 mb-2">
            ${programs.reduce((sum, p) => sum + (p.coach_earnings || 0), 0).toFixed(2)}
          </div>
          <p className="text-slate-600">Total Earnings (After 15% Commission)</p>
        </div>
      </CardContent>
    </Card>
  );
}