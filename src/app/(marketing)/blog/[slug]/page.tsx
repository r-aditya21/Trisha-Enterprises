import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="pt-28 pb-section px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
      <Link href="/blog" className="text-secondary text-sm font-semibold hover:underline">
        ← Back to blog
      </Link>
      <header className="mt-8 mb-12">
        <time className="text-label-md text-on-surface-variant normal-case">{post.date}</time>
        <h1 className="text-headline-xl text-primary mt-4">{post.title}</h1>
        <p className="text-body-md text-on-surface-variant mt-4">
          By {post.author} · {post.readingTime}
        </p>
      </header>
      <div
        className="prose prose-lg max-w-none text-on-surface-variant [&_h2]:text-primary [&_h2]:font-headline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {related.length > 0 && (
        <aside className="mt-16 pt-12 border-t border-outline-variant/30">
          <h2 className="text-headline-sm text-primary mb-6">Related posts</h2>
          <ul className="space-y-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="text-secondary hover:underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
