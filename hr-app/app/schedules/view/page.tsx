"use client";

import Link from "next/link";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CalendarDays, Users } from "lucide-react";

type Schedule = {
  id: string;
  name: string;
  code: string;
  type: string;
  timezone: string;
  location: string;
  department: string;
  role: string;
  startTime: string;
  endTime: string;
  breakMinutes: string;
  graceMinutes: string;
  minHours: string;
  maxHours: string;
  overtimePolicy: string;
  color: string;
  days: string[];
  effectiveFrom: string;
  effectiveTo: string;
  notes: string;
};

type Employee = {
  id: string;
  fullName: string;
  employeeCode: string;
};

type Assignment = {
  id: string;
  scheduleId: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  note: string;
};

const getMonthDates = (year: number, month: number) => {
  const dates: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

export default function ScheduleViewPage() {
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get("id");
  const [schedule, setSchedule] = React.useState<Schedule | null>(null);
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [assignments, setAssignments] = React.useState<Assignment[]>([]);
  const [currentMonth, setCurrentMonth] = React.useState(() => new Date());

  React.useEffect(() => {
    try {
      const storedSchedules = localStorage.getItem("hr_schedules");
      const parsedSchedules = storedSchedules ? JSON.parse(storedSchedules) : [];
      const found = parsedSchedules.find((item: Schedule) => item.id === scheduleId) || null;
      setSchedule(found);
    } catch {
      setSchedule(null);
    }

    try {
      const storedEmployees = localStorage.getItem("hr_employees");
      const parsedEmployees = storedEmployees ? JSON.parse(storedEmployees) : [];
      setEmployees(
        Array.isArray(parsedEmployees)
          ? parsedEmployees.map((item) => ({
              id: item.id,
              fullName: item.fullName || "",
              employeeCode: item.employeeCode || "",
            }))
          : []
      );
    } catch {
      setEmployees([]);
    }

    try {
      const storedAssignments = localStorage.getItem("hr_schedule_assignments");
      const parsedAssignments = storedAssignments ? JSON.parse(storedAssignments) : [];
      setAssignments(Array.isArray(parsedAssignments) ? parsedAssignments : []);
    } catch {
      setAssignments([]);
    }
  }, [scheduleId]);

  const monthDates = React.useMemo(() => {
    return getMonthDates(currentMonth.getFullYear(), currentMonth.getMonth());
  }, [currentMonth]);

  const monthLabel = currentMonth.toLocaleString("en-US", { month: "long", year: "numeric" });

  const previousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const assignmentMap = React.useMemo(() => {
    const map = new Map<string, Assignment[]>();
    assignments
      .filter((assignment) => assignment.scheduleId === scheduleId)
      .forEach((assignment) => {
        const key = assignment.employeeId;
        const list = map.get(key) || [];
        list.push(assignment);
        map.set(key, list);
      });
    return map;
  }, [assignments, scheduleId]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Schedule dashboard</p>
            <h1 className="text-2xl font-semibold">{schedule?.name || "Schedule"}</h1>
            <p className="text-sm text-slate-500">Employee monthly roster for {monthLabel}.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/schedules"
              className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Back to schedules
            </Link>
            <button
              onClick={previousMonth}
              className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Previous
            </button>
            <button
              onClick={nextMonth}
              className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Next
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                {monthLabel}
              </div>
              <div className="text-xs text-slate-500">{monthDates.length} days</div>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="min-w-[920px] w-full table-fixed border-collapse text-left text-xs">
                <thead>
                  <tr className="text-slate-400">
                    <th className="sticky left-0 z-10 bg-white px-3 py-2">Employee</th>
                    {monthDates.map((date) => (
                      <th key={date.toISOString()} className="px-3 py-2 text-center">
                        {date.getDate()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50">
                      <td className="sticky left-0 z-10 bg-white px-3 py-3">
                        <div className="text-xs font-semibold text-slate-800">{employee.fullName}</div>
                        <div className="text-[11px] text-slate-400">{employee.employeeCode || "-"}</div>
                      </td>
                      {monthDates.map((date) => {
                        const dateKey = date.toISOString().slice(0, 10);
                        const entries = assignmentMap.get(employee.id) || [];
                        const match = entries.find((entry) => entry.date.startsWith(dateKey));
                        return (
                          <td key={`${employee.id}-${dateKey}`} className="px-3 py-3 text-center">
                            {match ? (
                              <span
                                className="inline-flex min-w-[48px] justify-center rounded-md px-2 py-1 text-[11px] font-semibold"
                                style={{ backgroundColor: schedule?.color || "#111827", color: "#fff" }}
                              >
                                {match.startTime} - {match.endTime}
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-300">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Users className="h-4 w-4 text-slate-400" />
                Schedule overview
              </div>
              <div className="mt-3 space-y-2 text-xs text-slate-500">
                <p>Code: {schedule?.code || "-"}</p>
                <p>Type: {schedule?.type || "-"}</p>
                <p>Time: {schedule?.startTime || "-"} - {schedule?.endTime || "-"}</p>
                <p>Timezone: {schedule?.timezone || "-"}</p>
                <p>Location: {schedule?.location || "-"}</p>
                <p>Department: {schedule?.department || "-"}</p>
                <p>Role: {schedule?.role || "-"}</p>
                <p>Break: {schedule?.breakMinutes || "-"} min</p>
                <p>Grace: {schedule?.graceMinutes || "-"} min</p>
                <p>Overtime: {schedule?.overtimePolicy || "-"}</p>
                <p>Effective: {schedule?.effectiveFrom || "-"} → {schedule?.effectiveTo || "-"}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Assignment summary</p>
              <p className="mt-2 text-xs text-slate-500">Assignments this month: {assignments.filter((item) => item.scheduleId === scheduleId).length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
