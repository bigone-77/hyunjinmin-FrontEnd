// import { useState, useEffect } from 'react';
// import { Notice } from './NoticeInter';
// import NoticeAddPopup from './NoticeAddPopup';
// import NoticeEditPopup from './NoticeEditPopup';
// import NoticeDetailPopup from './NoticeDetailPopup';
// import NoticeSearchBar from './NoticeSearchBar';
// import {
//   fetchNotices,
//   deleteNotice,
//   updateNotice,
//   openPopup,
//   closePopup,
//   loadNotices,
//   handleDelete,
//   handleSaveEdit,
//   handleEditClick,
//   handleNoticeClick,
// } from './NoticeFunc';

// function NoticeList() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
//   const [notices, setNotices] = useState<Notice[]>([]);
//   const [, setError] = useState<string | null>(null);
//   const [deleteError, setDeleteError] = useState<string | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     loadNotices(() => fetchNotices(''), setNotices, setError);
//   }, []);

//   // 검색 버튼 클릭 시 공지사항 목록 불러오기
//   const handleSearch = () => {
//     loadNotices(() => fetchNotices(searchTerm), setNotices, setError);
//   };

//   return (
//     <div className='bg-gray-200 p-4 rounded-lg shadow-md mb-6'>
//       <h2 className='text-xl font-semibold mb-4'>공지사항 목록</h2>
//       <NoticeSearchBar
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         onSearch={handleSearch} // 검색 버튼 클릭 시만 handleSearch 호출
//       />
//       {deleteError && <p className='text-red-500 mb-4'>{deleteError}</p>}
//       <table className='w-full'>
//         <thead>
//           <tr>
//             <th className='border-b border-gray-400 p-2 text-left'>제목</th>
//             <th className='border-b border-gray-400 p-2 text-left'>내용</th>
//             <th className='border-b border-gray-400 p-2 text-left'>작업</th>
//           </tr>
//         </thead>
//         <tbody>
//           {notices.map((notice) => (
//             <tr
//               key={notice.NOTICE_IDX}
//               className='hover:bg-gray-100 transition-colors'
//               onClick={() =>
//                 handleNoticeClick(
//                   notice,
//                   setSelectedNotice,
//                   setIsDetailPopupOpen,
//                 )
//               }
//             >
//               <td className='border-b border-gray-400 p-2 cursor-pointer'>
//                 {notice.NOTICE_SUBJ}
//               </td>
//               <td className='border-b border-gray-400 p-2 cursor-pointer'>
//                 {notice.NOTICE_CONT}
//               </td>
//               <td className='border-b border-gray-400 p-2 flex gap-2'>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleEditClick(
//                       notice,
//                       setSelectedNotice,
//                       setIsEditPopupOpen,
//                     );
//                   }}
//                   className='bg-modify text-white p-1 rounded hover:bg-modify-hover btn-shadow'
//                 >
//                   수정
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(
//                       notice.NOTICE_IDX,
//                       deleteNotice,
//                       setIsDeleting,
//                       setDeleteError,
//                       setNotices,
//                     );
//                   }}
//                   className='bg-negative text-white p-1 rounded hover:bg-negative-hover btn-shadow'
//                   disabled={isDeleting}
//                 >
//                   삭제
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className='flex mt-5 justify-end'>
//         <button
//           onClick={() => openPopup(setIsPopupOpen)}
//           className='bg-positive text-white p-2 rounded w-1/8 hover:bg-positive-hover btn-shadow'
//         >
//           공지사항 추가
//         </button>
//       </div>
//       <NoticeAddPopup
//         isOpen={isPopupOpen}
//         onClose={() => closePopup(setIsPopupOpen)}
//         onNoticeAdd={(newNotice) => {
//           setNotices((prevNotices) => [...prevNotices, newNotice]);
//         }}
//       />
//       <NoticeEditPopup
//         isOpen={isEditPopupOpen}
//         notice={selectedNotice}
//         onClose={() => setIsEditPopupOpen(false)}
//         onSave={(updatedNotice) =>
//           handleSaveEdit(updatedNotice, updateNotice, setNotices, setError)
//         }
//       />
//       <NoticeDetailPopup
//         isOpen={isDetailPopupOpen}
//         notice={selectedNotice}
//         onClose={() => setIsDetailPopupOpen(false)}
//       />
//     </div>
//   );
// }

// export default NoticeList;
// NoticeList.js
// NoticeList.tsx
import { useState } from 'react';
import { Notice } from './NoticeInter';
import NoticeAddPopup from './NoticeAddPopup';
import NoticeEditPopup from './NoticeEditPopup';
import NoticeDetailPopup from './NoticeDetailPopup';
import {
  deleteNotice,
  updateNotice,
  openPopup,
  closePopup,
  handleDelete,
  handleSaveEdit,
  handleEditClick,
  handleNoticeClick,
} from './NoticeFunc';

interface NoticeListProps {
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
}

function NoticeList({ notices, setNotices }: NoticeListProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [, setError] = useState<string | null>(null);

  return (
    <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
      {deleteError && <p className='text-red mb-4'>{deleteError}</p>}
      <table className='w-full'>
        <thead>
          <tr>
            <th className='border-b border-gray-400 p-2 text-center'>제목</th>
            <th className='border-b border-gray-400 p-2 text-center'>내용</th>
            <th className='border-b border-gray-400 p-2 text-center w-1/6'>
              작업
            </th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice: Notice) => (
            <tr
              key={notice.NOTICE_IDX}
              className='hover:bg-gray-100 transition-colors'
              onClick={() =>
                handleNoticeClick(
                  notice,
                  setSelectedNotice,
                  setIsDetailPopupOpen,
                )
              }
            >
              <td className='border-b border-gray-400 p-2 cursor-pointer'>
                {notice.NOTICE_SUBJ}
              </td>
              <td className='border-b border-gray-400 p-2 cursor-pointer'>
                {notice.NOTICE_CONT}
              </td>
              <td className='border-b border-gray-400 p-2'>
                <div className='flex justify-center gap-2'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(
                        notice,
                        setSelectedNotice,
                        setIsEditPopupOpen,
                      );
                    }}
                    className='bg-modify text-white p-1 rounded hover:bg-modify-hover px-5 btn-shadow'
                  >
                    수정
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(
                        notice.NOTICE_IDX,
                        deleteNotice,
                        setIsDeleting,
                        setDeleteError,
                        setNotices,
                      );
                    }}
                    className='bg-negative text-white p-1 rounded hover:bg-negative-hover px-5 btn-shadow'
                    disabled={isDeleting}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex mt-5 justify-end'>
        <button
          onClick={() => openPopup(setIsPopupOpen)}
          className='bg-positive text-white p-2 rounded w-1/8 hover:bg-positive-hover btn-shadow'
        >
          공지사항 추가
        </button>
      </div>
      <NoticeAddPopup
        isOpen={isPopupOpen}
        onClose={() => closePopup(setIsPopupOpen)}
        onNoticeAdd={(newNotice: Notice) => {
          setNotices((prevNotices) => [...prevNotices, newNotice]);
        }}
      />
      <NoticeEditPopup
        isOpen={isEditPopupOpen}
        notice={selectedNotice}
        onClose={() => setIsEditPopupOpen(false)}
        onSave={(updatedNotice: Notice) =>
          handleSaveEdit(updatedNotice, updateNotice, setNotices, setError)
        }
      />
      <NoticeDetailPopup
        isOpen={isDetailPopupOpen}
        notice={selectedNotice}
        onClose={() => setIsDetailPopupOpen(false)}
      />
    </div>
  );
}

export default NoticeList;
