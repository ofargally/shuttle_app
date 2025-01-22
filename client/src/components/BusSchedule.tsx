import React, { useEffect, useState } from "react";

interface TimeTable {
  headers: string[];
  rows: (string | null)[][];
  stops: Stop[];
}

interface Stop {
  name: string;
  latitude: number;
  longitude: number;
}

const BusSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<TimeTable | null>(null);

  useEffect(() => {
    fetch("/api/bus-schedule")
      .then((response) => response.json())
      .then((data) => setSchedule(data.timeTable))
      .catch((err) => console.error(err));
  }, []);

  if (!schedule) return <div>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          {schedule.headers.map((stop, index) => (
            <th key={index}>{stop}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {schedule.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((time, colIndex) => (
              <td key={colIndex}>{time || "-"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BusSchedule;
