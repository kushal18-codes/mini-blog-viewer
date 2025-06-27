import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../constants';
import type { User } from '../types';
import { fetchJson } from '../utils';
import Status from './status';

function AuthorInfoContent({ userId }: Readonly<{ userId: number }>) {
  const {
    data: author,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => fetchJson(`${API_BASE_URL}/users/${userId}`),
  });

  if (isLoading) {
    return <Status message="Loading author info..." type="loading" />;
  }

  if (isError) {
    return <Status message="Error loading author info." type="error" />;
  }

  if (!author) {
    return <Status message="Author not found." type="error" />;
  }

  return (
    <div className="rounded-lg border bg-gray-50 p-4 shadow-sm">
      <h4 className="mb-2 font-bold text-gray-900 text-xl">Author</h4>
      <p className="text-gray-600">
        <span className="font-medium">Name:</span> {author.name}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Email:</span> {author.email}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Company:</span> {author.company.name}
      </p>
    </div>
  );
}

export default function AuthorInfo({ userId }: Readonly<{ userId: number }>) {
  return <AuthorInfoContent userId={userId} />;
}
