# Next.js Frontend Project Blog

This is a Next.js frontend project for the Laravel Filament backend. The project also supports highlighting code snippets in blog details using **react-markdown**, **remark-gfm**, and **rehype-highlight**.

## Installation

### Prerequisites

-   Node.js (version 14 or higher)
-   npm or Yarn

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mohammadisa2/nextjs-blog.git
    cd nextjs-blog
    ```

2. **Install dependencies:**
   If you're using npm:

    ```bash
    npm install
    ```

    Or if you're using Yarn:

    ```bash
    yarn install
    ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:

    ```
    NEXT_PUBLIC_API_URL=<Your Laravel Backend API URL>
    ```

    Replace `<Your Laravel Backend API URL>` with the actual URL of your Laravel backend, such as `http://127.0.0.1:8000`.

4. **Run the development server:**
   If using npm:

    ```bash
    npm run dev
    ```

    Or with Yarn:

    ```bash
    yarn dev
    ```

    The application should now be running at `http://localhost:3000`.

5. **Build for production (optional):**
   To create an optimized production build:

    ```bash
    npm run build
    npm run start
    ```

6. **Backend Repository Link:**
   The Laravel Filament backend for this project can be found [here](https://github.com/mohammadisa2/blog).

## Blog Detail with Code Highlight Support

The blog detail pages support rendering markdown content, including code blocks with syntax highlighting. This is achieved using the following libraries:

-   **react-markdown**: A React component to render markdown content.
-   **remark-gfm**: A plugin to support GitHub Flavored Markdown (GFM) for additional syntax like tables, task lists, etc.
-   **rehype-highlight**: A plugin for syntax highlighting of code blocks.

### Example

Here's an example of how the markdown and code blocks are rendered:

```js
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const BlogDetail = ({ content }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}>
            {post.content}
        </ReactMarkdown>
    );
};
```

In this configuration:

-   **remark-gfm** is used for supporting extended markdown syntax such as tables, strikethrough, and task lists.
-   **rehype-highlight** is responsible for highlighting code blocks based on the language specified in the markdown.

To use this, make sure to install the necessary dependencies:

```bash
npm install react-markdown remark-gfm rehype-highlight
```

This setup will automatically highlight code in the blog details using the appropriate syntax, making it easy to display formatted code blocks in your blog content, Dont forget to install tailwindcss/typography juga.
