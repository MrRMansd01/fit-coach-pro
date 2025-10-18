import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Award, Zap } from "lucide-react";

export default function ProgressOverview() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <TrendingUp className="w-6 h-6 text-green-600" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900 mb-2">Keep Going!</h3>
          <p className="text-slate-600 text-sm">Complete workouts to track your progress</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Workout Streak</p>
                <p className="text-sm text-slate-600">Keep it up!</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">0</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}