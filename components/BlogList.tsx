"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchBlogs } from "@/lib/api";

export default function BlogList({ initialBlogs }: { initialBlogs: any }) {
    const [blogs, setBlogs] = useState(initialBlogs.data || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialBlogs.links?.next !== null);

    const loadMore = async () => {
        const nextPage = currentPage + 1;
        const newBlogs = await fetchBlogs(nextPage);
        setBlogs([...blogs, ...(newBlogs.data || [])]);
        setCurrentPage(nextPage);
        setHasMore(newBlogs.links?.next !== null);
    };

    if (blogs.length === 0) {
        return <div>No blog posts available</div>;
    }

    return (
        <div className="space-y-8">
            {blogs.map((blog: any) => (
                <Card key={blog.id}>
                    <CardHeader>
                        <CardTitle>
                            <Link
                                href={`/blog/${blog.slug}`}
                                className="hover:underline">
                                {blog.title}
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.split(",").map((tag: string) => (
                                <Link key={tag} href={`/tag/${tag.trim()}`}>
                                    <Badge variant="secondary">
                                        {tag.trim()}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                            {new Date(blog.published_at).toLocaleDateString()}
                        </span>
                        <Link href={`/category/${blog.category.slug}`}>
                            <Badge variant="secondary">
                                {blog.category.name}
                            </Badge>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
            {hasMore && (
                <div className="text-center">
                    <Button onClick={loadMore}>Load More</Button>
                </div>
            )}
        </div>
    );
}
