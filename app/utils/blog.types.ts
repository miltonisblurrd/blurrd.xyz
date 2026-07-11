export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  category?: string;
  tags: string[];
  youtube?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  html: string;
};
