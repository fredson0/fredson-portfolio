import type { ContactSubmission } from "@/lib/contact/schema";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendContactNotification(submission: ContactSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn(
      "[contact] RESEND_API_KEY ou CONTACT_NOTIFICATION_EMAIL não configurados — e-mail não enviado."
    );
    return { sent: false as const, reason: "missing_config" as const };
  }

  const html = `
    <h2>Novo contato pelo portfólio</h2>
    <p><strong>Nome:</strong> ${escapeHtml(submission.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Organização:</strong> ${escapeHtml(submission.organization || "—")}</p>
    <p><strong>Serviços:</strong> ${escapeHtml(submission.services)}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(submission.message).replaceAll("\n", "<br />")}</p>
    <hr />
    <p><small>ID: ${submission.id} · ${submission.createdAt}</small></p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: submission.email,
      subject: `Novo contato: ${submission.name}`,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[contact] Falha ao enviar e-mail:", errorText);
    return { sent: false as const, reason: "provider_error" as const };
  }

  return { sent: true as const };
}
