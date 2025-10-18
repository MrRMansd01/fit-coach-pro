import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function TodaysWorkouts({ workouts, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
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
          <Clock className="w-6 h-6 text-blue-600" />
          Today's Workouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {workouts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 mb-4">No workouts scheduled for today</p>
            <Link to={createPageUrl("CoachMarketplace")}>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                Find a Coach
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {workouts.map((workout) => (
              <div 
                key={workout.id}
                className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{workout.name}</h3>
                    <p className="text-slate-600 text-sm">Day {workout.day_number}</p>
                  </div>
                  {workout.completed ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      Pending
                    </Badge>
                  )}
                </div>
                
                {workout.notes && (
                  <p className="text-sm text-slate-600 mb-3">{workout.notes}</p>
                )}
                
                <Link to={`${createPageUrl("WorkoutExecution")}?workout_id=${workout.id}`}>
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    disabled={workout.completed}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {workout.completed ? 'Completed' : 'Start Workout'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}