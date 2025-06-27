import { Suspense, useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants';
import type { User } from '../types';
import { fetchJson } from '../utils';

function AuthorInfoContent({ userId }: Readonly<{ userId: number }>) {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    fetchJson<User>(`${API_BASE_URL}/users/${userId}`).then(setAuthor);
  }, [userId]);

  if (!author) {
    return <p>Loading author info...</p>;
  }

  return (
    <div className="mt-4">
      <h4>Author: {author.name}</h4>
      <p>Email: {author.email}</p>
      <p>Company: {author.company.name}</p>
    </div>
  );
}

export default function AuthorInfo({ userId }: Readonly<{ userId: number }>) {
  return (
    <Suspense fallback={<p>Loading author info...</p>}>
      <AuthorInfoContent userId={userId} />
    </Suspense>
  );
}
