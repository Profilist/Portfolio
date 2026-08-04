import tanstackServerEntry from "@tanstack/react-start/server-entry";
import { canonicalRedirect } from "./canonicalRedirect";

export default {
  async fetch(request: Request) {
    return canonicalRedirect(request)
      ?? tanstackServerEntry.fetch(request);
  },
};
