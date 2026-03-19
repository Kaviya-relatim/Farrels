// @ts-nocheck

// ─────────────────────────────────────────────────────────────────────────────
// FORM WEBHOOK — All form submissions are POSTed as JSON to this URL.
// Replace with your actual webhook endpoint (n8n, Make, Zapier, custom API, etc.)
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_WEBHOOK_URL = "YOUR_FORM_WEBHOOK_URL_HERE";

// Called by every form — sends all field data as JSON payload
export async function sendFormEmail(formType, data) {
  const payload = {
    form_type: formType,
    submitted_at: new Date().toISOString(),
    page: typeof window !== "undefined" ? window.location.href : "",
    ...data,
  };

  const response = await fetch(FORM_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status}`);
  }

  return response;
}
