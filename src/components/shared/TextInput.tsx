import { useState } from 'react';

import { IconType } from 'react-icons';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import { flexCenter } from '@/styles/flex';

interface ITextInputProps {
  icon?: IconType;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
}: ITextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (placeholder === '비밀번호') {
    return (
      <div className={`relative ${flexCenter} gap-x-2`}>
        {Icon && <Icon size={20} color='#ABABAB' />}
        <input
          className='w-full pb-[2px] font-light text-grey100 transition border-b border-b-grey100 outline-none'
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {showPassword ? (
          <IoMdEye
            className='absolute right-0 cursor-pointer bottom-1'
            color='#ABABAB'
            size={20}
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <IoMdEyeOff
            className='absolute right-0 cursor-pointer bottom-1'
            color='#ABABAB'
            size={20}
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`${flexCenter} gap-x-2`}>
      {Icon && <Icon size={20} color='#ABABAB' />}
      <input
        className='w-full pb-[2px] font-light text-grey100 transition border-b border-b-grey100 outline-none'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
