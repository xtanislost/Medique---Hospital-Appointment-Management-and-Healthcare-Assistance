import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import BlogCard from "./BlogCard";

const BlogList = () => {
    const { blogs, getAllBlogs } = useAppContext();

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold text-center mb-8">Latest Blogs</h2>
            {blogs.length > 0 ? (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No blogs found.</p>
            )}
        </div>
    );
};

export default BlogList;
