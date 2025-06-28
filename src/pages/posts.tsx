import PostList from '../components/post-list';

export default function Posts() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-bold text-4xl">Explore Posts</h1>
        <p className="text-gray-600 text-lg">
          Discover a wide range of articles. Use the filters below to find
          exactly what you're looking for.
        </p>
      </div>
      <PostList />
    </div>
  );
}
