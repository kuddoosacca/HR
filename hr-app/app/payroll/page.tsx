import Link from "next/link";

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-2xl font-semibold">Payroll</h1>
        <p className="text-sm text-slate-500">Review payroll runs, approvals, and compensation breakdowns.</p>
        <Link href="/hr" className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
          Back to HR Dashboard
        </Link>
      </div>
    </div>
  );
}
