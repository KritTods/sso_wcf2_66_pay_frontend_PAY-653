'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'wcf-component-lib/node_modules/antd';
import HeaderNavbarLayout from 'wcf-component-lib/src/layout/HeaderNavbarLayout';
import useLayout from 'wcf-component-lib/src/provider/LayoutProvider/useLayout';
export default function Template({ children }: { children: React.ReactNode }): React.ReactElement {
  const {
    stateLayout: { loading },
  } = useLayout();

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}>
      <HeaderNavbarLayout>{children}</HeaderNavbarLayout>
    </Spin>
  );
}
