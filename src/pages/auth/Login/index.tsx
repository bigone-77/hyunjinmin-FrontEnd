import Spacing from '@/components/shared/Spacing';
import { flexColumn } from '@/styles/flex';

function LoginPage() {
  return (
    <div className={`${flexColumn} items-center justify-center`}>
      <Spacing size={75} />

      <span className='flex text-2xl font-semibold gap-x-4 text-primary'>
        <p>현진민 학원</p> |<p>포탈</p>
      </span>

      <Spacing size={20} />

      <section className='w-full rounded-[40px] shadow-lg shadow-primary p-10'>
        <span className='flex gap-x-20 text-grey'>
          <p>학생</p>
          <p>교사(관리인)</p>
        </span>
      </section>
    </div>
  );
}

export default LoginPage;
