export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const API_ENDPOINTS = {
  posts: "/posts",
  post: (id: number) => `/posts/${id}`,
  auth: {
    register: "/auth/register",
    login: "/auth/login",
  },
} as const;
