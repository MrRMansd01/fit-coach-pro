import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivePrograms({ programs, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(2).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calendar className="w-6 h-6 text-blue-600" />
          My Programs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {programs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-600">No active programs yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {programs.map((program) => (
              <div 
                key={program.id}
                className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-slate-900">{program.name}</h3>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    Active
                  </Badge>
                </div>
                
                <p className="text-slate-600 text-sm mb-3">{program.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(program.start_date), 'MMM d')} - {format(new Date(program.end_date), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}