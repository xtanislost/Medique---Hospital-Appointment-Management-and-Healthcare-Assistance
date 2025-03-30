import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-lg"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{blog.description}</p>
        <Link
          to={`/blog/${blog._id}`}
          className="mt-2 inline-block bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
