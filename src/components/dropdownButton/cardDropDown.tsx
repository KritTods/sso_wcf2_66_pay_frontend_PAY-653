'use client';
import { Dropdown, Menu } from 'wcf-component-lib/node_modules/antd';
import { DownOutlined } from '@ant-design/icons';
import { BaseButton } from 'wcf-component-lib/src/components';

interface MenuItem {
  key: string;
  icon: React.ReactElement;
  label: string;
}

interface CardDropDownProps {
  btnLabel?: string;
  btnIcon?: React.ReactElement;
  menuItems: MenuItem[];
  onMenuClick?: (key: string) => void;
}

const CardDropDown: React.FC<CardDropDownProps> = ({
  btnLabel = 'พิมพ์เอกสาร', btnIcon = <DownOutlined />,
  menuItems,
  onMenuClick,
}) => {

const menu = (
  <Menu
    onClick={({ key }) => {
      console.log(`เลือกเมนู: ${key}`);
      if (onMenuClick) {
        onMenuClick(key);
      }
    }}
    className="p-2 shadow-lg rounded-lg" // เพิ่ม padding และเงาให้ดูดีขึ้น
  >
    {menuItems.map((item) => (
      <Menu.Item
        key={item.key}
        icon={<span style={{ fontSize: '24px' }}>{item.icon}</span>}
        className="mx-4 my-1 rounded-xl px-4 py-2 hover:bg-[#E7F3F5] transition-all duration-200"
      >
        <span style={{ fontSize: '18px', fontWeight: 'normal' }}>{item.label}</span>
      </Menu.Item>
    ))}
  </Menu>
);


  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <BaseButton
        size="large"
        label={btnLabel}
        icon={<span style={{ fontSize: '16px' }}>{btnIcon}</span>}
        className="w-[280px] flex flex-row-reverse justify-between items-center px-4 text-center"
        onClick={() => console.log(btnLabel)}
      />
    </Dropdown>
  );
};

export default CardDropDown;





