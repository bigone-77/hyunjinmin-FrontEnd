import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface PostAddProps {
  onClose: () => void;
  addPost: (newPost: Post) => void;
}

const PostAdd = ({ onClose, addPost }: PostAddProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: Post = {
      id: Math.floor(Math.random() * 1000), // 임시 ID 생성
      title,
      content,
      author: '익명',
      date: new Date().toISOString(),
    };

    addPost(newPost);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-bold mb-4'>새 글 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              제목
            </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              placeholder='제목을 입력하세요'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              placeholder='내용을 입력하세요'
              rows={6}
              required
            ></textarea>
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2'
            >
              취소
            </button>
            <button
              type='submit'
              className='bg-blue text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAdd;
