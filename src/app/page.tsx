import SessionFocus from "@/components/SessionFocus";
import WorkOutForm from "../components/WorkOutForm";

export const metadata = {
  title: "Workout Tracker",
  description: "Track your workouts efficiently",
};

export default function Home() {
  return (
    <main>
      <title className="text-4xl font-bold text-orange-500">Workout Tracker</title>
      <SessionFocus />
      <WorkOutForm />
    </main>
  );
}
