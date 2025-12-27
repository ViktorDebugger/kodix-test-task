import { API_BASE_URL, API_ENDPOINTS } from "./api-config";

interface JsonPlaceholderPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostData {
  id: number;
  date: string;
  title: string;
  image: string;
  description: string;
}

const formatDate = (id: number): string => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const baseDate = new Date(2025, 27, 12);
  const date = new Date(baseDate);
  date.setDate(baseDate.getDate() + (id % 30));

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName} ${day}, ${monthName} ${year}`;
};

export const transformPost = (post: JsonPlaceholderPost): PostData => {
  return {
    id: post.id,
    date: formatDate(post.id),
    title: post.title,
    image: "",
    description: post.body,
  };
};

export const fetchPosts = async (): Promise<PostData[]> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.posts}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts: JsonPlaceholderPost[] = await response.json();
  return posts.map(transformPost);
};

export const fetchPost = async (id: number): Promise<PostData> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.post(id)}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Post not found");
    }
    throw new Error(`Failed to fetch post: ${response.statusText}`);
  }

  const post: JsonPlaceholderPost = await response.json();
  return transformPost(post);
};
