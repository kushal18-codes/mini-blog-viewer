import { useEffect, useState } from 'react';
import type { User } from '../types';

export default function AuthorInfo({ userId }: Readonly<{ userId: number }>) {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setAuthor(data));
  }, [userId]);

  if (!author) {
    return <p>Loading author info...</p>;
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>Author: {author.name}</h4>
      <p>Email: {author.email}</p>
      <p>Company: {author.company.name}</p>
    </div>
  );
}
