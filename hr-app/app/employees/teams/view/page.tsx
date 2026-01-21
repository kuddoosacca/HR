"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { FileText } from "lucide-react";

type EmployeeProfile = {
  id: string;
  fullName: string;
  department: string;
  role: string;
  employeeCode: string;
  status: string;
  workLocation: string;
  civilId: string;
  passportNumber: string;
  residencyNumber: string;
  basicSalary: string;
  bankName: string;
  iban: string;
  dependents: Array<{
    id: string;
    name: string;
    relationship: string;
    dob: string;
    civilId: string;
  }>;
  correspondence: Array<{ id: string; subject: string; message: string; date: string }>;
};

export default function EmployeeViewPage() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");
  const [employee, setEmployee] = React.useState<EmployeeProfile | null>(null);

  React.useEffect(() => {
    if (!employeeId) return;
    try {
      const stored = localStorage.getItem("hr_employees");
      const parsed: EmployeeProfile[] = stored ? JSON.parse(stored) : [];
      const match = parsed.find((item) => item.id === employeeId) || null;
      setEmployee(match);
    } catch {
      setEmployee(null);
    }
  }, [employeeId]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Employee profile</p>
            <h1 className="text-2xl font-semibold">Employee details</h1>
            <p className="text-sm text-slate-500">Read-only view in a new window.</p>
          </div>
          <Link
            href="/employees/teams"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Back to list
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Employee summary</p>
            <FileText className="h-5 w-5 text-slate-400" />
          </div>
          {!employee ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
              Employee not found.
            </div>
          ) : (
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{employee.fullName}</p>
                <p className="text-xs text-slate-500">{employee.role || "Role"} · {employee.department || "Department"}</p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-xl border border-slate-200 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-slate-400">Identity</p>
                  <p className="text-sm">Civil ID: {employee.civilId || "-"}</p>
                  <p className="text-sm">Passport: {employee.passportNumber || "-"}</p>
                  <p className="text-sm">Residency/Iqama: {employee.residencyNumber || "-"}</p>
                </div>
                <div className="rounded-xl border border-slate-200 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-slate-400">Employment</p>
                  <p className="text-sm">Code: {employee.employeeCode || "-"}</p>
                  <p className="text-sm">Status: {employee.status}</p>
                  <p className="text-sm">Location: {employee.workLocation || "-"}</p>
                </div>
                <div className="rounded-xl border border-slate-200 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-slate-400">Payroll</p>
                  <p className="text-sm">Basic salary: {employee.basicSalary || "-"}</p>
                  <p className="text-sm">Bank: {employee.bankName || "-"}</p>
                  <p className="text-sm">IBAN: {employee.iban || "-"}</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <p className="text-xs font-semibold uppercase text-slate-400">Dependents</p>
                {employee.dependents.length === 0 ? (
                  <p className="text-sm text-slate-500">No dependents added.</p>
                ) : (
                  <div className="mt-2 space-y-2">
                    {employee.dependents.map((dep) => (
                      <div key={dep.id} className="text-sm">
                        <p className="font-semibold text-slate-900">{dep.name}</p>
                        <p className="text-xs text-slate-500">{dep.relationship} · {dep.dob || "-"} · {dep.civilId}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <p className="text-xs font-semibold uppercase text-slate-400">Correspondence</p>
                {employee.correspondence.length === 0 ? (
                  <p className="text-sm text-slate-500">No correspondence yet.</p>
                ) : (
                  <div className="mt-2 space-y-2">
                    {employee.correspondence.map((note) => (
                      <div key={note.id} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                        <p className="text-xs text-slate-500">{note.date}</p>
                        <p className="font-semibold text-slate-900">{note.subject}</p>
                        <p className="text-sm text-slate-600">{note.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
