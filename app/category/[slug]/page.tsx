import { fetchBlogs, fetchCategories } from "@/lib/api";
import BlogList from "@/components/BlogList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
    const categories = await fetchCategories();
    return categories.map((category: any) => ({
        slug: category.slug.toString(),
    }));
}

export default async function CategoryPage({
    params,
}: {
    params: { slug: string };
}) {
    const blogsData = await fetchBlogs(1, params.slug);
    const categories = await fetchCategories();
    const currentCategory = categories.find(
        (cat: any) => cat.slug === params.slug
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">
                Category: {currentCategory?.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <BlogList initialBlogs={blogsData} />
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {categories.map((category: any) => (
                                    <li key={category.slug}>
                                        <Link
                                            href={`/category/${category.slug}`}>
                                            <Button
                                                variant={
                                                    category.slug ===
                                                    params.slug
                                                        ? "default"
                                                        : "ghost"
                                                }
                                                className="w-full justify-start">
                                                {category.name}
                                            </Button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
