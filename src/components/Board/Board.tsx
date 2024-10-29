import { Link } from 'react-router-dom';

import { Post } from './Utils/BoardIF';

const garaPosts: Post[] = [
  {
    id: 1,
    author: '홍길동',
    title: '첫 번째 공지사항',
    content: '첫 번째 공지사항의 내용입니다.',
    date: '2024-10-01 12:00:00',
  },
  {
    id: 2,
    author: '김길동',
    title: '두 번째 공지사항',
    content: '두 번째 공지사항의 내용입니다.',
    date: '2024-10-01 12:00:00',
  },
  {
    id: 3,
    author: '박길동',
    title: '세 번째 공지사항',
    content: '세 번째 공지사항의 내용입니다.',
    date: '2024-10-01 12:00:00',
  },
  {
    id: 4,
    author: '이길동',
    title: '네 번째 공지사항',
    content: '네 번째 공지사항의 내용입니다.',
    date: '2024-10-02 10:00:00',
  },
  {
    id: 5,
    author: '최길동',
    title: '다섯 번째 공지사항',
    content: '다섯 번째 공지사항의 내용입니다.',
    date: '2024-10-02 11:00:00',
  },
];
function BoardPage() {
  const posts = garaPosts;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>공지사항</h1>
      {/* 게시물 목록 */}
      <div className='space-y-4 h-[58vh] overflow-y-auto'>
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <div className='bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer mb-4'>
              <div className='flex justify-between mb-4'>
                <h2 className='text-lg font-bold'>
                  {post.title.length > 15
                    ? `${post.title.substring(0, 15)}...`
                    : post.title}
                </h2>
              </div>
              <p className='text-gray-700 mt-2'>
                {post.content.length > 15
                  ? `${post.content.substring(0, 15)}...`
                  : post.content}
              </p>
              <div className='flex justify-between items-center mt-4'>
                <span className='text-sm text-gray-500'>
                  작성자: {post.author}
                </span>
                <span className='text-sm text-gray-500'>{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BoardPage;
