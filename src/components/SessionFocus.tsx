import React, { useState } from 'react';

const SessionFocus: React.FC = () => {
   const [sessionType, setSessionType] = useState<string | null>(null);
   const [numMovements, setNumMovements] = useState<number>(0);
   const [movements, setMovements] = useState<string[]>([]);
   const exerciseOptions = [
      "Squat", "Deadlift", "Bench Press", "Overhead Press", 
      "Power Clean", "Dips", "Pull Ups", "Bent Rows", "Curls"
   ];

   const handleNumMovementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      setNumMovements(value > 0 ? value : 0);
      setMovements(Array(value).fill(''));
   };

   const handleMovementChange = (index: number, value: string) => {
      const updatedMovements = [...movements];
      updatedMovements[index] = value;
      setMovements(updatedMovements);
   };

   return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-md">
         {!sessionType && (
            <div>
               <h1 className="text-2xl font-bold mb-4">What is the focus for this session?</h1>
               <div className="flex gap-4">
                  <button 
                     onClick={() => setSessionType('Lift')}
                     className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
                  >
                     Lift
                  </button>
                  <button 
                     onClick={() => setSessionType('Recovery')}
                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                     Recovery
                  </button>
                  <button 
                     onClick={() => setSessionType('Educate')}
                     className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  >
                     Educate
                  </button>
               </div>
            </div>
         )}

         {sessionType === 'Lift' && (
            <div className="mt-6">
               <h2 className="text-xl font-semibold mb-4">Plan Your Lifting Routine</h2>
               <label htmlFor="numMovements" className="block text-lg mb-2">Number of Movements:</label>
               <input 
                  type="number" 
                  id="numMovements" 
                  value={numMovements} 
                  onChange={handleNumMovementsChange}
                  className="border border-gray-300 p-2 rounded w-20 mb-4"
               />
               {numMovements > 0 && (
                  <div>
                     {Array.from({ length: numMovements }, (_, index) => (
                        <div key={index} className="mb-4">
                           <label className="block text-md mb-1">Movement {index + 1}:</label>
                           <select 
                              value={movements[index] || ''}
                              onChange={(e) => handleMovementChange(index, e.target.value)}
                              className="border border-gray-300 p-2 rounded w-full"
                           >
                              <option value="">Select an exercise</option>
                              {exerciseOptions.map((exercise, i) => (
                                 <option key={i} value={exercise}>{exercise}</option>
                              ))}
                           </select>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default SessionFocus;
