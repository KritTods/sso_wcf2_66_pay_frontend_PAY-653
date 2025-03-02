import type { Metadata } from 'next';
import ReduxProvider from '@/store-redux/reduxProvider';
import { Suspense } from 'react';
import { LayoutProvider } from 'wcf-component-lib/src/provider/LayoutProvider';
import { URL } from '@/constants/configPage';
import { AntdProvider } from 'wcf-component-lib/src/provider/AntdProvider';
import BaseLoading from 'wcf-component-lib/src/components/BaseLoading';

export const metadata: Metadata = {
  title: 'PAY',
  description: 'PAY',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang='en'>
      <AntdProvider>
        <LayoutProvider configPage={URL} urlApi={`${process.env.NEXT_PUBLIC_API_URL_UMS}users/page-accesses`}>
          <ReduxProvider>
            <body>
              <Suspense fallback={<BaseLoading size='default' />}>{children}</Suspense>
            </body>
          </ReduxProvider>
        </LayoutProvider>
      </AntdProvider>
    </html>
  );
}
