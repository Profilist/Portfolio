const CANONICAL_HOST = "www.larrisx.com";

export function canonicalRedirect(request: Request) {
  const url = new URL(request.url);
  const status = url.hostname === "larrisx.com"
    ? 307
    : url.hostname === "larris.me" || url.hostname === "www.larris.me"
      ? 308
      : undefined;

  if (!status) return;

  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";
  return Response.redirect(url, status);
}
