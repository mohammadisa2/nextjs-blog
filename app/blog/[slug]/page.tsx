import { fetchBlogBySlug, fetchBlogs } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";

export async function generateStaticParams() {
    const blogsData = await fetchBlogs();
    return blogsData.data.map((blog: any) => ({
        slug: blog.slug,
    }));
}

export default async function BlogPost({
    params,
}: {
    params: { slug: string };
}) {
    const post = await fetchBlogBySlug(params.slug);

    if (!post) {
        return <div>Blog post not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{post.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{post.category.name}</span>
                        <span>•</span>
                        <span>
                            {new Date(post.published_at).toLocaleDateString()}
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    {post.image && (
                        <div className="mb-6">
                            <img
                                src={`http://127.0.0.1:8000/storage/${post.image}`}
                                alt={post.title}
                                className="rounded-lg object-contain max-h-80 w-full"
                            />
                        </div>
                    )}
                    <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {post.tags.split(",").map((tag: string) => (
                            <Link key={tag} href={`/tag/${tag.trim()}`}>
                                <Badge variant="secondary">{tag.trim()}</Badge>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
