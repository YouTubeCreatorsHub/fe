export const dynamic = 'force-dynamic';

interface Post {
  category: string;
  board: string;
  post: string;
  title: string;
  content: string;
}

export default async function PostPage() {
  const post: Post = {
    category: 'category',
    board: 'board',
    post: 'post',
    title: 'title',
    content: 'content',
  };

  return (
    <div>
      <h1>
        {post.category}-{post.board}={post.post}
      </h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
