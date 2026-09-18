export async function ApiFetch(
  url: string,
  options: RequestInit = {}
) {
  const savedUser = localStorage.getItem("user");

  let userId: string | null = null;

  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);

      userId = user.userId;
    } catch {
      userId = null;
    }
  }

  const headers = new Headers(options.headers);

  if (userId) {
    headers.set("X-User-Id", userId);
  }

  return fetch(url, {
    ...options,
    headers,
  });
}