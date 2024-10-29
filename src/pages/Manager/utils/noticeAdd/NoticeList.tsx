interface Notice {
  id: number;
  title: string;
  content: string;
}

interface NoticeListProps {
  notices: Notice[];
  onNoticeClick: (notice: Notice) => void;
  onDeleteClick: (id: number) => void; // 삭제 기능을 위한 콜백 함수
  onEditClick: (notice: Notice) => void; // 수정 기능을 위한 콜백 함수 추가
}

function NoticeList({
  notices,
  onNoticeClick,
  onDeleteClick,
  onEditClick,
}: NoticeListProps) {
  return (
    <div className='bg-gray-200 p-4 rounded-lg shadow-md mb-6'>
      <h2 className='text-xl font-semibold mb-4'>공지사항 목록</h2>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='border-b border-gray-400 p-2 text-left'>제목</th>
            <th className='border-b border-gray-400 p-2 text-left'>내용</th>
            <th className='border-b border-gray-400 p-2 text-left'>
              작업
            </th>{' '}
            {/* 작업 열 추가 */}
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id} className='hover:bg-gray-100 transition-colors'>
              <td
                className='border-b border-gray-400 p-2 cursor-pointer'
                onClick={() => onNoticeClick(notice)}
              >
                {notice.title}
              </td>
              <td
                className='border-b border-gray-400 p-2 cursor-pointer'
                onClick={() => onNoticeClick(notice)}
              >
                {notice.content}
              </td>
              <td className='border-b border-gray-400 p-2 flex gap-2'>
                <button
                  onClick={() => onEditClick(notice)}
                  className='bg-yellow text-white p-1 rounded hover:bg-yellow-600 transition-colors'
                >
                  수정
                </button>
                <button
                  onClick={() => onDeleteClick(notice.id)}
                  className='bg-red text-white p-1 rounded hover:bg-red-600 transition-colors'
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NoticeList;
