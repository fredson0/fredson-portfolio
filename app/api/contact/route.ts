import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { sendContactNotification } from "@/lib/contact/email";
import { isRateLimited } from "@/lib/contact/rate-limit";
import { contactFormSchema } from "@/lib/contact/schema";
import { saveContactSubmission } from "@/lib/contact/store";

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em alguns minutos." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = contactFormSchema.parse(body);
    const submission = await saveContactSubmission(data);
    const emailResult = await sendContactNotification(submission);

    return NextResponse.json(
      {
        ok: true,
        id: submission.id,
        emailSent: emailResult.sent,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos.",
          fieldErrors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error("[contact] Erro ao processar envio:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
