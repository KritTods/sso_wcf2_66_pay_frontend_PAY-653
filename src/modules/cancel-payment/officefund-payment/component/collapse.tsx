import { useEffect, useState } from 'react';
import { BaseButton } from 'wcf-component-lib/src/components';
import { Compress, DeCompress, Trash } from 'wcf-component-lib/node_modules/iconoir-react';

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  collapseKey: string; // ใช้ชื่อ prop อื่นแทน key
  handleDeleteRow?: ((key: string) => void) | undefined; // ฟังก์ชันลบแถว
  type: string;
  isDefaultOpen?: boolean;
}

const CollapseCustoms: React.FC<CollapseProps> = ({
  isDefaultOpen = false,
  title,
  children,
  collapseKey,
  handleDeleteRow,
  type,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen);

  useEffect(() => {
    //setIsOpen when
  }, [isDefaultOpen]);

  const toggleCollapse = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className='p-6 bg-white shadow-sm rounded-xl'>
      <div className='flex justify-between'>
        <p className='header-card'>{title}</p>
        <div className='flex gap-6'>
          {type === 'detail' && (
            <BaseButton
              className='!min-w-[200px]'
              size='middle'
              type='outline'
              icon={!isOpen ? <Compress /> : <DeCompress />}
              label={!isOpen ? 'แสดงข้อมูล' : 'ย่อลง'}
              onClick={toggleCollapse}
            />
          )}
          {type === 'form' && handleDeleteRow && (
            <BaseButton
              className='!min-w-[200px]'
              size='middle'
              type='fieryRed'
              icon={<Trash />}
              label='ลบ'
              onClick={() => handleDeleteRow(collapseKey)} // ใช้ collapseKey เพื่อระบุแถวที่ลบ
            />
          )}
        </div>
      </div>

      <div className={`overflow-hidden ease-in-out ${isOpen ? 'max-h-[1000px] mt-2 rounded-xl' : 'max-h-0'}`}>
        {isOpen && <div>{children}</div>}
      </div>
    </div>
  );
};

export default CollapseCustoms;
