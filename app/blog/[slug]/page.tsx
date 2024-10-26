import { fetchBlogBySlug, fetchBlogs } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";

// Terminal window component for code blocks
const TerminalWindow = ({
    children,
    language,
}: {
    children: React.ReactNode;
    language: string;
}) => {
    // Function to get a friendly language name
    const getLanguageLabel = (lang: string) => {
        const languageLabels: Record<string, string> = {
            php: "PHP",
            bash: "Terminal",
            javascript: "JavaScript",
            typescript: "TypeScript",
            html: "HTML",
            css: "CSS",
            sql: "SQL",
            json: "JSON",
            python: "Python",
            ruby: "Ruby",
            go: "Go",
            rust: "Rust",
            java: "Java",
            csharp: "C#",
            cplusplus: "C++",
            c: "C",
            kotlin: "Kotlin",
            swift: "Swift",
            dart: "Dart",
            scala: "Scala",
            elixir: "Elixir",
            perl: "Perl",
            lua: "Lua",
            haskell: "Haskell",
            objectivec: "Objective-C",
            shell: "Shell",
            groovy: "Groovy",
            r: "R",
            matlab: "MATLAB",
            assembly: "Assembly",
            visualbasic: "Visual Basic",
            pascal: "Pascal",
            fortran: "Fortran",
            ada: "Ada",
            crystal: "Crystal",
            nim: "Nim",
            clojure: "Clojure",
            fsharp: "F#",
            ocaml: "OCaml",
            solidity: "Solidity",
            tcl: "Tcl",
            erlang: "Erlang",
            vbnet: "VB.NET",
            scratch: "Scratch",
            wpf: "WPF",
            powershell: "PowerShell",
            vhdl: "VHDL",
            verilog: "Verilog",
            lisp: "Lisp",
            prolog: "Prolog",
            xquery: "XQuery",
            elm: "Elm",
            apis: "APIs",
        };

        return languageLabels[lang] || lang.toUpperCase();
    };

    return (
        <div className="my-6 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
            <div className="bg-gray-800 px-4 py-4 flex items-center justify-between border-b dark:border-b-white">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-400">
                    {getLanguageLabel(language)}
                </div>
            </div>
            <div className="bg-[#1F2937] overflow-x-auto">{children}</div>
        </div>
    );
};

// Custom components for ReactMarkdown
const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || "");
        const language = match ? match[1] : "";

        return !inline && match ? (
            <TerminalWindow language={language}>
                <code className={className} {...props}>
                    {children}
                </code>
            </TerminalWindow>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
};

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
                                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${post.image}`}
                                alt={post.title}
                                className="rounded-lg object-contain max-h-80 w-full"
                            />
                        </div>
                    )}
                    <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown
                            components={components}
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
