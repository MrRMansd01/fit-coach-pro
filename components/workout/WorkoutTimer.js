import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function WorkoutTimer({ startTime }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const diff = Math.floor((now - start) / 1000);
      setElapsed(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-none text-white">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center gap-3">
          <Clock className="w-6 h-6" />
          <div className="text-center">
            <p className="text-sm opacity-90 mb-1">Workout Duration</p>
            <p className="text-3xl font-bold">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}