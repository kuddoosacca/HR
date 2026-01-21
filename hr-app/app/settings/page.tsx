import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Settings</p>
          <h1 className="text-2xl font-semibold">Configuration</h1>
          <p className="text-sm text-slate-500">Manage core HR setup data for the organization.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/settings/work-location"
            className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-300"
          >
            Work Locations
            <p className="mt-2 text-xs font-normal text-slate-500">Offices, branches, and remote hubs.</p>
          </Link>
          <Link
            href="/settings/employee-role"
            className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-300"
          >
            Employee Roles
            <p className="mt-2 text-xs font-normal text-slate-500">Role definitions and permission templates.</p>
          </Link>
          <Link
            href="/settings/department"
            className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-300"
          >
            Departments
            <p className="mt-2 text-xs font-normal text-slate-500">Department lists for reporting and payroll.</p>
          </Link>
        </div>

        <Link
          href="/hr"
          className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Back to HR Dashboard
        </Link>
      </div>
    </div>
  );
}
