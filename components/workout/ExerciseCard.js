import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, PlayCircle, Clock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ExerciseCard({ 
  exercise, 
  index, 
  isWorkoutStarted, 
  isCompleted,
  onComplete,
  userId,
  workoutId 
}) {
  const queryClient = useQueryClient();
  const [setData, setSetData] = useState(
    Array(exercise.sets).fill(null).map((_, i) => ({
      set_number: i + 1,
      actual_reps: exercise.reps,
      actual_weight: 0
    }))
  );
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(3);

  const logPerformanceMutation = useMutation({
    mutationFn: async () => {
      await base44.entities.PerformanceLog.create({
        exercise_id: exercise.id,
        workout_id: workoutId,
        client_id: userId,
        time_in: new Date().toISOString(),
        time_out: new Date().toISOString(),
        set_data: setData,
        client_notes: notes,
        difficulty_rating: rating
      });
    },
    onSuccess: () => {
      onComplete();
    },
  });

  const handleSetChange = (setIndex, field, value) => {
    const newSetData = [...setData];
    newSetData[setIndex][field] = Number(value);
    setSetData(newSetData);
  };

  const handleLogExercise = () => {
    logPerformanceMutation.mutate();
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${
      isCompleted ? 'bg-green-50 border-green-200' : 'bg-white/80 backdrop-blur-sm border-slate-200/60'
    } shadow-md`}>
      <CardHeader className={`${
        isCompleted ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-slate-700 to-slate-800'
      } text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              {exercise.name}
            </CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span>{exercise.sets} sets</span>
              <span>•</span>
              <span>{exercise.reps} reps</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {exercise.rest_time}s rest
              </span>
            </div>
          </div>
          {isCompleted && (
            <CheckCircle2 className="w-8 h-8" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        {exercise.notes && (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-700">{exercise.notes}</p>
          </div>
        )}

        {exercise.media_url && (
          <div className="mb-4">
            <a 
              href={exercise.media_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <PlayCircle className="w-5 h-5" />
              View instructional video
            </a>
          </div>
        )}

        {isWorkoutStarted && !isCompleted && (
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="font-semibold text-slate-900">Log Your Performance:</p>
              {setData.map((set, setIndex) => (
                <div key={setIndex} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700 w-16">Set {set.set_number}</span>
                  <Input
                    type="number"
                    placeholder="Reps"
                    value={set.actual_reps}
                    onChange={(e) => handleSetChange(setIndex, 'actual_reps', e.target.value)}
                    className="w-24"
                  />
                  <Input
                    type="number"
                    placeholder="Weight"
                    value={set.actual_weight}
                    onChange={(e) => handleSetChange(setIndex, 'actual_weight', e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-slate-600">lbs</span>
                </div>
              ))}
            </div>

            <Textarea
              placeholder="How did it feel? Any notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-white"
            />

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">Difficulty:</span>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    rating >= value 
                      ? 'bg-orange-500 border-orange-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-400 hover:border-orange-300'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            <Button
              onClick={handleLogExercise}
              disabled={logPerformanceMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {logPerformanceMutation.isPending ? 'Logging...' : 'Complete Exercise'}
            </Button>
          </div>
        )}

        {isCompleted && (
          <div className="text-center py-4">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-700">Exercise Completed!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}