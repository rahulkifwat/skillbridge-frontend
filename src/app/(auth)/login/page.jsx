import Link from "next/link";
import Button from "@/components/common/Button";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold text-heading">Welcome back</h1>
        <p className="text-sm text-body">Log in to continue your learning journey.</p>
      </div>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Email
          <input
            type="email"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-heading">
          Password
          <input
            type="password"
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <Button type="submit" variant="primary" className="w-full justify-center">
          Log In
        </Button>
      </form>
      <p className="text-center text-sm text-body">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-primary">
          Sign up
        </Link>
      </p>
    </div>
  );
}
