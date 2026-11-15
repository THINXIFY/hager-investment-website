/**
 * Liveness check for the Docker HEALTHCHECK and deploy.sh: answers 200 when the Next.js server is
 * up and serving. Reveals nothing about configuration.
 */
export function GET() {
  return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}
