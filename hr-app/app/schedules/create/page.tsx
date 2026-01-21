"use client";

import Link from "next/link";
import * as React from "react";
import { CalendarClock, Info, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

export default function CreateSchedulePage() {
  const router = useRouter();
  const [workLocations, setWorkLocations] = React.useState<Array<{ id: string; name: string }>>([]);
  const [departments, setDepartments] = React.useState<Array<{ id: string; name: string }>>([]);
  const [roles, setRoles] = React.useState<Array<{ id: string; title: string }>>([]);

  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [type, setType] = React.useState("Fixed");
  const [timezone, setTimezone] = React.useState("Asia/Kuwait");
  const [location, setLocation] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [role, setRole] = React.useState("");
  const [startTime, setStartTime] = React.useState("09:00");
  const [endTime, setEndTime] = React.useState("18:00");
  const [breakMinutes, setBreakMinutes] = React.useState("60");
  const [graceMinutes, setGraceMinutes] = React.useState("10");
  const [minHours, setMinHours] = React.useState("8");
  const [maxHours, setMaxHours] = React.useState("9");
  const [overtimePolicy, setOvertimePolicy] = React.useState("None");
  const [color, setColor] = React.useState("#111827");
  const [notes, setNotes] = React.useState("");
  const [days, setDays] = React.useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [effectiveFrom, setEffectiveFrom] = React.useState("");
  const [effectiveTo, setEffectiveTo] = React.useState("");
  const [savedSchedules, setSavedSchedules] = React.useState<Schedule[]>([]);

  const createId = React.useCallback(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }, []);

  React.useEffect(() => {
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

    try {
      const storedSchedules = localStorage.getItem("hr_schedules");
      const parsed = storedSchedules ? JSON.parse(storedSchedules) : [];
      setSavedSchedules(Array.isArray(parsed) ? parsed : []);
    } catch {
      setSavedSchedules([]);
    }
  }, []);

  const toggleDay = (day: string) => {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const addSchedule = () => {
    if (!name.trim()) return;
    const newSchedule: Schedule = {
      id: createId(),
      name: name.trim(),
      code: code.trim() || `SCH-${Math.floor(Math.random() * 9000 + 1000)}`,
      type,
      timezone,
      location,
      department,
      role,
      startTime,
      endTime,
      breakMinutes,
      graceMinutes,
      minHours,
      maxHours,
      overtimePolicy,
      color,
      days,
      effectiveFrom,
      effectiveTo,
      notes: notes.trim(),
    };

    try {
      const stored = localStorage.getItem("hr_schedules");
      const parsed = stored ? JSON.parse(stored) : [];
      const updated = [newSchedule, ...parsed];
      localStorage.setItem("hr_schedules", JSON.stringify(updated));
      setSavedSchedules(updated);
    } catch {
      // ignore
    }

    setName("");
    setCode("");
    setType("Fixed");
    setTimezone("Asia/Kuwait");
    setLocation("");
    setDepartment("");
    setRole("");
    setStartTime("09:00");
    setEndTime("18:00");
    setBreakMinutes("60");
    setGraceMinutes("10");
    setMinHours("8");
    setMaxHours("9");
    setOvertimePolicy("None");
    setColor("#111827");
    setNotes("");
    setDays(["Mon", "Tue", "Wed", "Thu", "Fri"]);
    setEffectiveFrom("");
    setEffectiveTo("");
    // Keep user on this page and show saved list below
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Schedules</p>
            <h1 className="text-2xl font-semibold">Create schedule</h1>
            <p className="text-sm text-slate-500">Build shifts, break rules, and effective periods.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/schedules"
              className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Back to schedules
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Schedule details</p>
              <p className="text-xs text-slate-500">All fields are customizable later.</p>
            </div>
            <CalendarClock className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 text-slate-400" />
                <div className="space-y-1">
                  <p><span className="font-semibold">Schedule name/code:</span> Internal identifier for rosters and reports.</p>
                  <p><span className="font-semibold">Type:</span> Fixed = same daily time, Rotational = shifts rotate, Flexible = hours vary.</p>
                  <p><span className="font-semibold">Timezone:</span> Used for attendance and notifications.</p>
                  <p><span className="font-semibold">Times:</span> Shift start/end plus break and grace for late clock‑in.</p>
                  <p><span className="font-semibold">Min/Max hours:</span> Compliance boundaries for total hours per shift.</p>
                  <p><span className="font-semibold">Location/Department/Role:</span> Default assignment scope.</p>
                  <p><span className="font-semibold">Effective dates:</span> Valid period for this schedule.</p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Schedule name"
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Display name used in rosters and reports.</p>
              </div>
              <div className="space-y-1">
                <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Schedule code (auto)"
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Unique code for payroll exports and approvals.</p>
              </div>
              <div className="space-y-1">
                <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
              >
                <option>Fixed</option>
                <option>Rotational</option>
                <option>Flexible</option>
              </select>
                <p className="text-xs text-slate-400">Defines if timings are constant or rotating.</p>
              </div>
              <div className="space-y-1">
                <select
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
              >
                <option>Asia/Kuwait</option>
                <option>UTC</option>
                <option>Asia/Dubai</option>
                <option>Asia/Riyadh</option>
              </select>
                <p className="text-xs text-slate-400">Used for accurate attendance timing.</p>
              </div>
              <div className="space-y-1">
                <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Shift start time.</p>
              </div>
              <div className="space-y-1">
                <input
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Shift end time.</p>
              </div>
              <div className="space-y-1">
                <input
                value={breakMinutes}
                onChange={(event) => setBreakMinutes(event.target.value)}
                placeholder="Break minutes"
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Paid/unpaid break duration.</p>
              </div>
              <div className="space-y-1">
                <input
                value={graceMinutes}
                onChange={(event) => setGraceMinutes(event.target.value)}
                placeholder="Grace minutes"
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Allowed late check‑in before mark late.</p>
              </div>
              <div className="space-y-1">
                <input
                value={minHours}
                onChange={(event) => setMinHours(event.target.value)}
                placeholder="Min hours"
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Minimum required hours per shift.</p>
              </div>
              <div className="space-y-1">
                <input
                value={maxHours}
                onChange={(event) => setMaxHours(event.target.value)}
                placeholder="Max hours"
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Maximum allowed hours per shift.</p>
              </div>
              <div className="space-y-1">
                <select
                value={overtimePolicy}
                onChange={(event) => setOvertimePolicy(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
              >
                <option>None</option>
                <option>After shift</option>
                <option>Weekend only</option>
                <option>Holiday</option>
              </select>
                <p className="text-xs text-slate-400">Defines when overtime applies.</p>
              </div>
              <div className="space-y-1">
                <input
                type="color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Color used in monthly roster.</p>
              </div>
              <div className="space-y-1">
                <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
              >
                <option value="">Work location</option>
                {workLocations.map((item) => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </select>
                <p className="text-xs text-slate-400">Default location for the shift.</p>
              </div>
              <div className="space-y-1">
                <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
              >
                <option value="">Department</option>
                {departments.map((item) => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </select>
                <p className="text-xs text-slate-400">Limit schedule to a department.</p>
              </div>
              <div className="space-y-1">
                <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
              >
                <option value="">Role</option>
                {roles.map((item) => (
                  <option key={item.id} value={item.title}>{item.title}</option>
                ))}
              </select>
                <p className="text-xs text-slate-400">Default role for this schedule.</p>
              </div>
              <div className="space-y-1">
                <input
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Notes"
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Internal notes for HR/admin.</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <input
                type="date"
                value={effectiveFrom}
                onChange={(event) => setEffectiveFrom(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Schedule start date.</p>
              </div>
              <div className="space-y-1">
                <input
                type="date"
                value={effectiveTo}
                onChange={(event) => setEffectiveTo(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <p className="text-xs text-slate-400">Schedule end date (optional).</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase text-slate-400">Working days</p>
              <div className="flex flex-wrap gap-2">
                {WEEK_DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      days.includes(day)
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={addSchedule}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                <PlusCircle className="h-4 w-4" />
                Add schedule
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold">Saved schedules</p>
          {savedSchedules.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
              No schedules yet.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {savedSchedules.map((schedule) => (
                <div key={schedule.id} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
