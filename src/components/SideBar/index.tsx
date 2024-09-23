import { motion } from 'framer-motion';

import Spacing from '@shared/Spacing';
import Section from '@/components/sideBar/Section';

const sideTabVariants = {
  open: { width: 250 },
  closed: { width: 0 },
};

const contentVariants = {
  open: { opacity: 1, transition: { duration: 0.3 } },
  closed: { opacity: 0, transition: { duration: 0.3 } },
};

export default function SideBar() {
  return (
    <motion.aside
      className='fixed top-0 left-0 h-full bg-secondary shadow-lg z-[9999]'
      initial='closed'
      animate='open'
      exit='closed'
      variants={sideTabVariants}
    >
      <motion.div
        initial='closed'
        animate='open'
        exit='closed'
        className='w-full p-6 text-white'
        variants={contentVariants}
      >
        <motion.h1 className='text-2xl'>현진민 학원</motion.h1>

        <Spacing size={15} backgroundColor='white' />

        <motion.section>
          <Section title='학원 설명' list={['학원 설명', '학원 오시는 길']} />
          <Spacing size={15} backgroundColor='white' />
          <Section
            title='공지사항'
            list={['공지사항', '공지 게시판', '자유 게시판']}
          />
          <Spacing size={15} backgroundColor='white' />
          <Section title='마이페이지' list={['성적 확인', '성적 그래프']} />
          <Spacing size={15} backgroundColor='white' />
          <Section title='학생 상담' list={['상담 신청', '상담 신청 확인']} />
        </motion.section>
      </motion.div>
    </motion.aside>
  );
}
