export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Comment {
  id: number;
  author_name: string;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export interface Reaction {
  id: number;
  emoji: string;
  emoji_label: string;
  created_at: string;
}

export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  category: Category | null;
  author_name: string;
  author_image: string | null;
  is_published: boolean;
  published_at: string | null;
  reaction_counts: Record<string, number>;
  user_reaction: string | null;
  view_count: number;
}

export interface PostDetail extends PostListItem {
  content: string;
  comments: Comment[];
  reactions: Reaction[];
}

export interface NewsletterSubscriber {
  id?: number;
  email: string;
  subscribed_at?: string;
  is_active?: boolean;
}

export interface NewsletterResponse {
  message: string;
  email: string;
}