"use client";

import { useActionState } from "react";
import { sendMagicLink } from "./actions";

type State = { status: "idle" } | { status: "sent"; email: string } | { status: "error"; message: string };

export function LoginForm() {
  const [state, action, pending] = useActionState<State, FormData>(
    sendMagicLink,
    { status: "idle" }
  );

  if (state.status === "sent") {
    return (
      <div className="text-center">
        <div className="text-3xl mb-4">📧</div>
        <h2 className="font-semibold text-slate-900">Check your inbox</h2>
        <p className="mt-2 text-sm text-slate-600">
          We sent a sign-in link to <strong>{state.email}</strong>.
          <br />
          It expires in 1 hour.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Email address
        </label>
        <input
          name="email"
          type="email"
          required
          autoFocus
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="host@openpodtalk.com"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 disabled:opacity-60 transition-colors"
      >
        {pending ? "Sending…" : "Send sign-in link"}
      </button>
    </form>
  );
}
