import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/admin",
    timeout: 10000, // Set a timeout of 10 seconds
});

export const fetchBlogs = async (
    page = 1,
    category?: string,
    tags?: string
) => {
    try {
        const params = new URLSearchParams({
            include: "category",
            page: page.toString(),
        });

        if (category) {
            params.append("filter[category.slug]", category.toString());
        }

        if (tags) {
            params.append("filter[tags]", tags);
        }

        const response = await api.get(`/blogs?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { data: [], links: { next: null } };
    }
};

export const fetchBlogBySlug = async (slug: string) => {
    try {
        const response = await api.get(`/blogs/${slug}?include=category`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching blog by slug:", error);
        return null;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await api.get("/category-blogs");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export default api;
