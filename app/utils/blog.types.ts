export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified?: string;
  published: boolean;
  category?: string;
  tags: string[];
  youtube?: string;
  readTime?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  html: string;
};
