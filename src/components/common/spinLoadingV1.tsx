import React from 'react';
import { Spin } from 'wcf-component-lib/node_modules/antd';

interface Props {
  size?: 'small' | 'large' | 'default';
  label?: string;
}

export default function SpinLoading({ size = 'default', label = 'Loading...' }: Props): React.ReactElement {
  return (
    <Spin size={size}>
      <div className='pt-16'>{label}</div>
    </Spin>
  );
}
