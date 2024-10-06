import { useState } from 'react';
import { Link } from 'react-router-dom';
import BoardToggleButton from '@/components/shared/Board/BoardToggleButton';
import PostAdd from './PostAdd';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

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

const garaPosts2: Post[] = [
  {
    id: 6,
    author: '홍길동',
    title: '첫 번째 자유게시판 글',
    content: '첫 번째 자유게시판 글의 내용입니다.',
    date: '2024-10-01 12:00:00',
  },
  {
    id: 7,
    author: '김길동',
    title: '두 번째 자유게시판 글',
    content: '두 번째 자유게시판 글의 내용입니다.',
    date: '2024-10-01 12:00:00',
  },
  {
    id: 8,
    author: '박길동',
    title: '세 번째 자유게시판 글',
    content: '세 번째 자유게시판 글의 내용입니다.',
    date: '2024-10-01 12:00:00',
  },
  {
    id: 9,
    author: '이길동',
    title: '네 번째 자유게시판 글',
    content: '네 번째 자유게시판 글의 내용입니다.',
    date: '2024-10-02 10:00:00',
  },
  {
    id: 10,
    author: '최길동',
    title: '다섯 번째 자유게시판 글',
    content: '다섯 번째 자유게시판 글의 내용입니다.',
    date: '2024-10-02 11:00:00',
  },
];

const BoardPage = () => {
  const [isNotice, setIsNotice] = useState(true);
  const [freePosts, setFreePosts] = useState(garaPosts2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addPost = (newPost: Post) => {
    setFreePosts([...freePosts, newPost]);
  };

  const posts = isNotice ? garaPosts : freePosts;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>게시판</h1>
      <BoardToggleButton isNotice={isNotice} setIsNotice={setIsNotice} />
      {/* 게시물 목록 */}
      <div className='space-y-4 h-[58vh] overflow-y-auto'>
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <div className='bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer mb-4'>
              <div className='flex justify-between mb-4'>
                <h2 className='text-lg font-bold'>{post.title}</h2>
              </div>
              <p className='text-gray-700 mt-2'>{post.content}</p>
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
      {/* 글쓰기 버튼 (자유 게시판일 때만 나타나도록 설정) */}
      {!isNotice && (
        <div className='fixed bottom-24 left-1/2 transform -translate-x-1/2'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-blue text-black px-4 py-2 rounded hover:bg-blue-600'
          >
            글쓰기
          </button>
        </div>
      )}
      {/* PostAdd 모달 (자유게시판에서만 글쓰기 가능) */}
      {isModalOpen && (
        <PostAdd onClose={() => setIsModalOpen(false)} addPost={addPost} />
      )}
    </div>
  );
};

export default BoardPage;
