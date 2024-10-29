import { useParams, useNavigate } from 'react-router-dom';

import { Post } from './BoardIF';

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

function PostPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const post = garaPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
      <div className='text-gray-500 mb-2'>작성자: {post.author}</div>
      <div className='text-gray-500 mb-4'>작성일: {post.date}</div>
      <p className='text-gray-700'>{post.content}</p>

      <div className='flex justify-end'>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default PostPage;
