"use client";

import React, { useState } from "react";
import Timer from "@/components/Timer";

interface FormState {
  workingWeight: number;
}

interface WarmUpSet {
  weight: number;
  addPerSide: number;
  reps: number;
  description: string;
}

interface WorkingSet {
  setNumber: number;
  reps: number;
  weight: number;
}

const WorkoutForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ workingWeight: 0 });
  const [warmUpSets, setWarmUpSets] = useState<WarmUpSet[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState<number | null>(null);
  const [workingSets, setWorkingSets] = useState<WorkingSet[]>([]);
  const [currentReps, setCurrentReps] = useState<number>(5);
  const [isWorkingSetStarted, setIsWorkingSetStarted] = useState(false);
  const [plannedSets, setPlannedSets] = useState<number>(3); // Default planned sets

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: Number(e.target.value),
    });
  };

  const calculateWarmUpSets = (goalWeight: number): WarmUpSet[] => {
    const barWeight = 45;
    const warmUpPercentages = [
      { percent: 0.5, reps: 6 },
      { percent: 0.75, reps: 3 },
      { percent: 0.9, reps: 1 },
    ];

    return warmUpPercentages.map((step) => {
      const weight = Math.round(goalWeight * step.percent);
      const addPerSide = (weight - barWeight) / 2;
      return {
        weight,
        addPerSide,
        reps: step.reps,
        description: `Add ${addPerSide} lbs to each side of the bar, do ${step.reps} reps at ${weight} lbs.`,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const warmUps = calculateWarmUpSets(formState.workingWeight);
    setWarmUpSets(warmUps);
    setCurrentSetIndex(0); // Start from the first set
    setIsWorkingSetStarted(false);
  };

  const handleStartWorkingSets = () => {
    setIsWorkingSetStarted(true); // Start tracking working sets
  };

  const handleLogWorkingSet = () => {
    const newSet: WorkingSet = {
      setNumber: workingSets.length + 1,
      reps: currentReps,
      weight: formState.workingWeight,
    };
    setWorkingSets([...workingSets, newSet]);
    setCurrentReps(5); // Reset reps for next set
  };

  const handleCompleteSet = () => {
    if (currentSetIndex !== null && currentSetIndex < warmUpSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      setCurrentSetIndex(null); // End warm-up session
    }
  };

  const remainingWeightToAdd = () => {
    const finalWarmUpWeight =
      warmUpSets.length > 0 ? warmUpSets[warmUpSets.length - 1].weight : 0;
    return (formState.workingWeight - finalWarmUpWeight) / 2;
  };

  const setsRemainingMessage = () => {
    const setsCompleted = workingSets.length;
    const setsLeft = plannedSets - setsCompleted;

    if (setsLeft > 0)
      return `${setsLeft} more set${
        setsLeft > 1 ? "s" : ""
      } to go! Keep going!`;
    return "Great job! You’ve completed your planned sets. Any additional sets are Bonus Sets!";
  };

  return (
    <div>
      {/* Sticky Stopwatch and Rest Timer */}
      <div className="sticky top-0 bg-white p-4 shadow-md z-10">
        <Timer />
      </div>

      {/* Working Weight Input - Show only if working sets haven't started */}
      {!isWorkingSetStarted && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="workingWeight" className="text-lg font-medium text-center mt-3">
            Working Weight
          </label>
          <input
            type="number"
            id="workingWeight"
            name="workingWeight"
            value={formState.workingWeight}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-gray-800 py-2 px-4 rounded hover:bg-orange-600 transition-colors"
          >
            Calculate Warm-up
          </button>
        </form>
      )}

      {/* Default Prompt Message */}
      {!isWorkingSetStarted && warmUpSets.length === 0 && (
        <div className="mt-4 text-center">
          <p className="text-lg text-gray-700">
            Please enter your working weight to calculate warm-up sets.
          </p>
        </div>
      )}

      {/* Display the current warm-up set */}
      {warmUpSets.length > 0 &&
        currentSetIndex !== null &&
        currentSetIndex < warmUpSets.length && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">
              Warm-Up Set {currentSetIndex + 1}
            </h2>
            <p className="mt-2">{warmUpSets[currentSetIndex].description}</p>
            <button
              onClick={handleCompleteSet}
              className="mt-4 bg-green-500 text-gray-800 py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Complete Set
            </button>
          </div>
        )}

      {/* Final Warm-Up Message with Planned Sets Input */}
      {!isWorkingSetStarted &&
        warmUpSets.length > 0 &&
        currentSetIndex === null && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">
              You're ready for your working set!
            </h2>
            <p>
              Add {remainingWeightToAdd()} lbs to each side of the bar to reach{" "}
              {formState.workingWeight} lbs.
            </p>
            <label
              htmlFor="plannedSets"
              className="mt-4 block text-lg font-medium"
            >
              How many sets do you plan to do?
            </label>
            <input
              type="number"
              id="plannedSets"
              value={plannedSets}
              onChange={(e) => setPlannedSets(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded w-20 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleStartWorkingSets}
              className="mt-4 bg-blue-500 text-gray-800 py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Let's Lift!
            </button>
          </div>
        )}

      {/* Working Set Logging */}
      {isWorkingSetStarted && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Log Your Working Sets</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="reps" className="mt-2 block">
              Reps
            </label>
            <input
              type="number"
              id="reps"
              value={currentReps}
              onChange={(e) => setCurrentReps(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded w-14 focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={handleLogWorkingSet}
              className="bg-orange-500 text-gray-800 py-2 px-4 rounded hover:bg-orange-600 transition-colors"
            >
              Log Set
            </button>
          </div>

          {/* Display logged working sets */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Working Sets</h3>
            <ul className="list-disc list-inside">
              {workingSets.map((set, index) => (
                <li
                  key={set.setNumber}
                  className={
                    index + 1 > plannedSets ? "text-blue-500 font-semibold" : ""
                  }
                >
                  Set {set.setNumber}: {set.reps} reps at {set.weight} lbs -{" "}
                  {index + 1 > plannedSets ? "Bonus Set!" : "Complete!"}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-gray-700">{setsRemainingMessage()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutForm;
