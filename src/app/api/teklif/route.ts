import { NextResponse } from "next/server";
import { teklifSchema } from "@/lib/teklif-schema";

// TODO: wire LEAD_NOTIFY_EMAIL → SendGrid/Resend, plus Sheets/CRM webhook.
// For now we log. Never log PII at production volume — replace before launch.

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const parsed = teklifSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Bazı alanlar eksik veya hatalı.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const lead = parsed.data;

  console.info("[teklif] new lead", {
    from: lead.fromDistrict,
    to: lead.toDistrict,
    homeType: lead.homeType,
    density: lead.density,
    extras: lead.extras,
    date: lead.date,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: "Teşekkürler. Ekibimiz 30 dakika içinde size dönecek.",
  });
}
