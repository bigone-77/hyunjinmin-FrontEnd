function NewTimeTableForm() {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>새 시간표 추가</h2>
      <div className='flex flex-col gap-4 items-start'>
        <input
          type='text'
          placeholder='학교 입력'
          className='border p-2 rounded w-full'
        />
        <input
          type='text'
          placeholder='학년 입력'
          className='border p-2 rounded w-full'
        />
        <button className='bg-green text-white p-2 rounded mt-4 w-full'>
          새 시간표 추가
        </button>
      </div>
    </div>
  );
}

export default NewTimeTableForm;
