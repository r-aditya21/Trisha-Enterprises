import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { getAllPosts } from "@/lib/blog";

export const metadata = createMetadata({
  title: "Blog",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        title="Solar Insights"
        description="Guides, news, and expert tips for your clean energy journey."
      />
      <section className="py-section px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block glass-card p-8 rounded-2xl hover:shadow-lg transition-shadow group"
              >
                <time className="text-label-md text-on-surface-variant normal-case">
                  {post.date}
                </time>
                <h2 className="text-headline-md text-primary mt-2 group-hover:text-secondary transition-colors">
                  {post.title}
                </h2>
                <p className="text-body-md text-on-surface-variant mt-2">{post.excerpt}</p>
                <p className="text-sm text-secondary mt-4 m-0">
                  {post.readingTime} read →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
