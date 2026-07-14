import Link from "next/link";
import Button from "@/components/common/Button";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold text-heading">Create your account</h1>
        <p className="text-sm text-body">Start building your future with SkillBridge.</p>
      </div>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Full name
          <input
            type="text"
            placeholder="Jane Doe"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Email
          <input
            type="email"
            placeholder="you@example.com"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Password
          <input
            type="password"
            placeholder="Create a password"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <Button type="submit" variant="primary" className="w-full justify-center">
          Sign Up
        </Button>
      </form>
      <p className="text-center text-sm text-body">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
