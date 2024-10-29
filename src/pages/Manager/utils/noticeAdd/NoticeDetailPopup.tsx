interface NoticeDetailPopupProps {
  isOpen: boolean;
  notice: { title: string; content: string } | null;
  onClose: () => void;
}

function NoticeDetailPopup({
  isOpen,
  notice,
  onClose,
}: NoticeDetailPopupProps) {
  if (!isOpen || !notice) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-semibold mb-4'>{notice.title}</h2>
        <p className='mb-4'>{notice.content}</p>
        <button
          onClick={onClose}
          className='mt-4 bg-red text-white p-2 rounded w-full'
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default NoticeDetailPopup;
