"use client";

import Link from "next/link";
import * as React from "react";

type EmployeeRole = {
  id: string;
  title: string;
  department: string;
  level: string;
};

export default function EmployeeRoleSettingsPage() {
  const [title, setTitle] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [level, setLevel] = React.useState("Mid");
  const [roles, setRoles] = React.useState<EmployeeRole[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("hr_employee_roles");
      if (stored) {
        setRoles(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("hr_employee_roles", JSON.stringify(roles));
    } catch {
      // ignore storage errors
    }
  }, [roles]);

  const addRole = () => {
    if (!title.trim()) return;
    const newRole: EmployeeRole = {
      id: crypto.randomUUID(),
      title: title.trim(),
      department: department.trim() || "-",
      level,
    };
    setRoles((prev) => [newRole, ...prev]);
    setTitle("");
    setDepartment("");
    setLevel("Mid");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Settings</p>
          <h1 className="text-2xl font-semibold">Employee Roles</h1>
          <p className="text-sm text-slate-500">Create standardized job roles and permission templates.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Add new role</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Role title"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
            />
            <input
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              placeholder="Department (optional)"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
            />
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400 sm:col-span-2"
            >
              <option>Intern</option>
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={addRole}
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Add role
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Roles</p>
          {roles.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
              No roles configured yet.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {roles.map((role) => (
                <div key={role.id} className="flex flex-col gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{role.title}</p>
                    <p className="text-xs text-slate-500">{role.department} · {role.level}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/settings"
            className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Back to Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
