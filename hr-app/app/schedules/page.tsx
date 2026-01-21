"use client";

import Link from "next/link";
import * as React from "react";
import { CalendarClock, CheckCircle2 } from "lucide-react";

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

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SchedulesPage() {
  const [schedules, setSchedules] = React.useState<Schedule[]>([]);
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [assignments, setAssignments] = React.useState<Assignment[]>([]);
  const [workLocations, setWorkLocations] = React.useState<Array<{ id: string; name: string }>>([]);
  const [departments, setDepartments] = React.useState<Array<{ id: string; name: string }>>([]);
  const [roles, setRoles] = React.useState<Array<{ id: string; title: string }>>([]);

  const [selectedScheduleId, setSelectedScheduleId] = React.useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState("");
  const [assignDate, setAssignDate] = React.useState("");
  const [assignEndDate, setAssignEndDate] = React.useState("");
  const [assignStartTime, setAssignStartTime] = React.useState("");
  const [assignEndTime, setAssignEndTime] = React.useState("");
  const [assignNote, setAssignNote] = React.useState("");
  const [employeeSearch, setEmployeeSearch] = React.useState("");
  const [selectedEmployees, setSelectedEmployees] = React.useState<string[]>([]);

  const createId = React.useCallback(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }, []);

  React.useEffect(() => {
    try {
      const storedSchedules = localStorage.getItem("hr_schedules");
      const storedAssignments = localStorage.getItem("hr_schedule_assignments");
      setSchedules(storedSchedules ? JSON.parse(storedSchedules) : []);
      setAssignments(storedAssignments ? JSON.parse(storedAssignments) : []);
    } catch {
      setSchedules([]);
      setAssignments([]);
    }
    try {
      const storedEmployees = localStorage.getItem("hr_employees");
      const parsed = storedEmployees ? JSON.parse(storedEmployees) : [];
      setEmployees(
        Array.isArray(parsed)
          ? parsed.map((item) => ({
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
      const storedLocations = localStorage.getItem("hr_work_locations");
      const storedDepartments = localStorage.getItem("hr_departments");
      const storedRoles = localStorage.getItem("hr_employee_roles");
      setWorkLocations(storedLocations ? JSON.parse(storedLocations) : []);
      setDepartments(storedDepartments ? JSON.parse(storedDepartments) : []);
      setRoles(storedRoles ? JSON.parse(storedRoles) : []);
    } catch {
      setWorkLocations([]);
      setDepartments([]);
      setRoles([]);
    }
  }, []);

  React.useEffect(() => {
    const handleFocus = () => {
      try {
        const storedSchedules = localStorage.getItem("hr_schedules");
        setSchedules(storedSchedules ? JSON.parse(storedSchedules) : []);
      } catch {
        setSchedules([]);
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("hr_schedules", JSON.stringify(schedules));
    } catch {
      // ignore
    }
  }, [schedules]);

  React.useEffect(() => {
    try {
      localStorage.setItem("hr_schedule_assignments", JSON.stringify(assignments));
    } catch {
      // ignore
    }
  }, [assignments]);


  const addAssignment = () => {
    const schedule = schedules.find((item) => item.id === selectedScheduleId);
    if (!schedule) return;
    const targetEmployees = selectedEmployees.length > 0 ? selectedEmployees : selectedEmployeeId ? [selectedEmployeeId] : [];
    if (!assignDate || targetEmployees.length === 0) return;
    const finalStart = assignStartTime || schedule.startTime;
    const finalEnd = assignEndTime || schedule.endTime;
    const endDate = assignEndDate || assignDate;
    const newAssignments = targetEmployees.map((employeeId) => ({
      id: createId(),
      scheduleId: schedule.id,
      employeeId,
      date: `${assignDate}${endDate !== assignDate ? ` → ${endDate}` : ""}`,
      startTime: finalStart,
      endTime: finalEnd,
      note: assignNote.trim(),
    }));
    setAssignments((prev) => [...newAssignments, ...prev]);
    setAssignDate("");
    setAssignEndDate("");
    setAssignStartTime("");
    setAssignEndTime("");
    setAssignNote("");
    setSelectedEmployeeId("");
    setSelectedEmployees([]);
  };

  const filteredEmployees = employees.filter((employee) => {
    if (!employeeSearch.trim()) return true;
    const haystack = `${employee.employeeCode} ${employee.fullName}`.toLowerCase();
    return haystack.includes(employeeSearch.trim().toLowerCase());
  });

  const toggleEmployee = (id: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Schedules</p>
            <h1 className="text-2xl font-semibold">Schedule builder & assignments</h1>
            <p className="text-sm text-slate-500">Create custom schedules and assign employees in one click.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/hr"
              className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Back to HR Dashboard
            </Link>
            <Link
              href="/schedules/create"
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Create schedule
            </Link>
            <Link
              href="/employees/teams"
              className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Employee list
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Schedules</p>
                <CalendarClock className="h-5 w-5 text-slate-400" />
              </div>
              {schedules.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                  No schedules yet.
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {schedules.map((schedule) => (
                    <Link
                      key={schedule.id}
                      href={`/schedules/view?id=${schedule.id}`}
                      className="block rounded-xl border border-slate-200 px-4 py-3 text-sm transition hover:border-slate-300"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{schedule.name}</p>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                          {schedule.type}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {schedule.startTime} - {schedule.endTime} · Break {schedule.breakMinutes} min · Grace {schedule.graceMinutes} min
                      </p>
                      <p className="text-xs text-slate-500">
                        {schedule.location || "Location"} · {schedule.department || "Department"} · {schedule.role || "Role"}
                      </p>
                      <p className="text-xs text-slate-500">{schedule.days.join(", ") || "No days"}</p>
                      <p className="text-xs text-slate-500">{schedule.timezone} · {schedule.code}</p>
                      {schedule.effectiveFrom || schedule.effectiveTo ? (
                        <p className="text-xs text-slate-500">
                          Effective: {schedule.effectiveFrom || "-"} → {schedule.effectiveTo || "-"}
                        </p>
                      ) : null}
                      {schedule.notes ? (
                        <p className="text-xs text-slate-400">{schedule.notes}</p>
                      ) : null}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">One-click assignment</p>
                  <p className="text-xs text-slate-500">Assign a schedule to any employee for any date/time.</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-slate-400" />
              </div>

              <div className="mt-6 space-y-3">
                <select
                  value={selectedScheduleId}
                  onChange={(event) => setSelectedScheduleId(event.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                >
                  <option value="">Select schedule</option>
                  {schedules.map((schedule) => (
                    <option key={schedule.id} value={schedule.id}>
                      {schedule.name}
                    </option>
                  ))}
                </select>

                <input
                  value={employeeSearch}
                  onChange={(event) => setEmployeeSearch(event.target.value)}
                  placeholder="Search employees"
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                />

                <select
                  value={selectedEmployeeId}
                  onChange={(event) => setSelectedEmployeeId(event.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                >
                  <option value="">Select employee</option>
                  {filteredEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.employeeCode ? `${employee.employeeCode} · ` : ""}{employee.fullName}
                    </option>
                  ))}
                </select>

                <div className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">Quick multi-assign</p>
                  <div className="mt-2 grid max-h-32 gap-2 overflow-y-auto">
                    {filteredEmployees.map((employee) => (
                      <label key={employee.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => toggleEmployee(employee.id)}
                        />
                        <span>{employee.employeeCode ? `${employee.employeeCode} · ` : ""}{employee.fullName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <input
                  type="date"
                  value={assignDate}
                  onChange={(event) => setAssignDate(event.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                />

                <input
                  type="date"
                  value={assignEndDate}
                  onChange={(event) => setAssignEndDate(event.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="time"
                    value={assignStartTime}
                    onChange={(event) => setAssignStartTime(event.target.value)}
                    className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                  />
                  <input
                    type="time"
                    value={assignEndTime}
                    onChange={(event) => setAssignEndTime(event.target.value)}
                    className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </div>

                <input
                  value={assignNote}
                  onChange={(event) => setAssignNote(event.target.value)}
                  placeholder="Assignment note"
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                />

                <button
                  onClick={addAssignment}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Assign schedule
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold">Recent assignments</p>
              {assignments.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                  No assignments yet.
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm">
                  {assignments.map((assignment) => {
                    const schedule = schedules.find((item) => item.id === assignment.scheduleId);
                    const employee = employees.find((item) => item.id === assignment.employeeId);
                    return (
                      <div key={assignment.id} className="rounded-xl border border-slate-200 px-4 py-3">
                        <p className="font-semibold text-slate-900">{schedule?.name || "Schedule"}</p>
                        <p className="text-xs text-slate-500">
                          {employee?.fullName || "Employee"} · {assignment.date}
                        </p>
                        <p className="text-xs text-slate-500">
                          {assignment.startTime} - {assignment.endTime}
                        </p>
                        {assignment.note ? (
                          <p className="text-xs text-slate-400">{assignment.note}</p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
