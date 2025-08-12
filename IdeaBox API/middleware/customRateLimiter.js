const rateLimitStore = new Map(); // Store per IP
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 2;

function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now - entry.firstRequestTime > WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}
setInterval(cleanupOldEntries, 60 * 1000); // Every minute

function isRateLimited(ip) {
  const entry = rateLimitStore.get(ip);

  if (!entry) return false;

  const now = Date.now();
  if (now - entry.firstRequestTime > WINDOW_MS) {
    rateLimitStore.delete(ip);
    return false;
  }

  return entry.count >= MAX_REQUESTS;
}

function incrementRequest(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry) {
    rateLimitStore.set(ip, { count: 1, firstRequestTime: now });
  } else {
    entry.count += 1;
  }
}

module.exports = {
  isRateLimited,
  incrementRequest,
};
