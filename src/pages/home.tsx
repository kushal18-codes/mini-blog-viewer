import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-white shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-extrabold text-5xl leading-tight">
            Welcome to the Mini Blog Viewer
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Discover insightful articles, engaging stories, and the latest
            updates on a variety of topics. Your go-to place for quick reads and
            deep dives.
          </p>
          <Link
            className="inline-block transform rounded-full bg-white px-8 py-3 font-semibold text-blue-600 text-lg shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-100"
            to="/posts"
          >
            Explore Posts
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-bold text-4xl text-gray-800">
            About Our Blog
          </h2>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mb-4 text-gray-700 text-lg leading-relaxed">
                The Mini Blog Viewer is designed to provide a seamless and
                enjoyable reading experience. We believe in sharing knowledge
                and fostering a community of curious minds. Our platform is
                built with simplicity and performance in mind, ensuring you can
                focus on what matters most: the content.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                From technology trends to lifestyle tips, our diverse range of
                articles caters to various interests. We are constantly updating
                our content to bring you fresh perspectives and valuable
                insights.
              </p>
            </div>
            <div className="flex justify-center">
              {/* biome-ignore lint/performance/noImgElement: Using standard <img> tag as Next.js Image component is not available. */}
              <img
                alt="About Us"
                className="rounded-lg shadow-xl"
                src="https://cataas.com/cat"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features/Call to Action Section (Optional, can be expanded) */}
      <section className="rounded-lg bg-gray-50 py-16 shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-bold text-4xl text-gray-800">
            Ready to Dive In?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-gray-600 text-xl">
            Start exploring our collection of articles today. Whether you're
            looking for inspiration, information, or just a good read, you'll
            find it here.
          </p>
          <Link
            className="inline-block transform rounded-full bg-blue-600 px-10 py-4 font-semibold text-white text-xl shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            to="/posts"
          >
            View All Posts
          </Link>
        </div>
      </section>
    </div>
  );
}
