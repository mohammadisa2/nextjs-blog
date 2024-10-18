import Link from "next/link";
import { fetchBlogs, fetchCategories } from "@/lib/api";
import BlogList from "@/components/BlogList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
    const blogsData = await fetchBlogs();
    const categories = await fetchCategories();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Next.js Blog</h1>
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
                                {categories && categories.length > 0 ? (
                                    categories.map((category: any) => (
                                        <li key={category.slug}>
                                            <Link
                                                href={`/category/${category.slug}`}>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start">
                                                    {category.name}
                                                </Button>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li>No categories available</li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
