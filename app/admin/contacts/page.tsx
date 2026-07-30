"use client";

import { useEffect, useState } from "react";

import type { ContactSubmission } from "@/lib/contact/schema";

export default function AdminContactsPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadSubmissions = async () => {
    const response = await fetch("/api/admin/contacts");

    if (response.status === 401) {
      setAuthenticated(false);
      setSubmissions([]);
      return;
    }

    if (!response.ok) {
      setError("Não foi possível carregar os contatos.");
      return;
    }

    const data = (await response.json()) as { submissions: ContactSubmission[] };
    setAuthenticated(true);
    setSubmissions(data.submissions);
  };

  useEffect(() => {
    loadSubmissions().finally(() => setLoading(false));
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Senha inválida.");
      return;
    }

    setPassword("");
    await loadSubmissions();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setSubmissions([]);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#141516] px-6 py-24 text-white">
        <p className="text-sm font-light text-white/60">Carregando...</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#141516] px-6 text-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8"
        >
          <p className="text-xs font-light uppercase tracking-tight text-white/45">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-light tracking-[-0.03em]">
            Mensagens de contato
          </h1>
          <p className="mt-3 text-sm font-light text-white/60">
            Acesso restrito para visualizar os formulários recebidos.
          </p>
          <label className="mt-8 block text-sm font-light text-white/70">
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 outline-none focus:border-white/30"
            />
          </label>
          {error ? (
            <p className="mt-3 text-sm font-light text-red-300/90">{error}</p>
          ) : null}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-light text-black transition-opacity hover:opacity-90"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#141516] px-6 py-24 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-light uppercase tracking-tight text-white/45">
              Admin
            </p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.03em]">
              Mensagens recebidas
            </h1>
            <p className="mt-2 text-sm font-light text-white/60">
              {submissions.length} contato(s) no total
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/15 px-5 py-2 text-sm font-light transition-colors hover:border-white/40"
          >
            Sair
          </button>
        </div>

        <ul className="mt-12 space-y-4">
          {submissions.length === 0 ? (
            <li className="rounded-2xl border border-white/10 p-8 text-sm font-light text-white/60">
              Nenhuma mensagem recebida ainda.
            </li>
          ) : (
            submissions.map((submission) => (
              <li
                key={submission.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-light tracking-[-0.02em]">
                      {submission.name}
                    </h2>
                    <p className="mt-1 text-sm font-light text-white/60">
                      {submission.email}
                    </p>
                  </div>
                  <time className="text-xs font-light text-white/45">
                    {new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(submission.createdAt))}
                  </time>
                </div>

                {submission.organization ? (
                  <p className="mt-4 text-sm font-light text-white/75">
                    <span className="text-white/45">Organização: </span>
                    {submission.organization}
                  </p>
                ) : null}

                <p className="mt-4 text-sm font-light text-white/75">
                  <span className="text-white/45">Serviços: </span>
                  {submission.services}
                </p>

                <p className="mt-4 whitespace-pre-wrap text-sm font-light leading-relaxed text-white/85">
                  {submission.message}
                </p>

                <a
                  href={`mailto:${submission.email}`}
                  className="mt-6 inline-flex text-sm font-light text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                >
                  Responder por e-mail
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
