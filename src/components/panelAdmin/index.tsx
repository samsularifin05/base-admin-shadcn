import React from 'react';
import { Layout, LayoutBody, LayoutHeader } from '../ui';
import { Search } from '../theme/search';
import ThemeSwitch from '../theme/theme-switch';
import { UserNav } from '../theme/user-nav';

import { Breadcrumbs } from '../theme/BreadcrumbGenerate';
import { useLocation } from 'react-router-dom';
import ThemeSelector from '../theme/themeSelector';
interface Props {
  children: React.ReactNode;
}
const PanelAdmin = (props: Props) => {
  const location = useLocation();
  return (
    <Layout>
      <LayoutHeader className="">
        <Breadcrumbs currentPath={location.pathname} />
        <div className="flex items-center ml-auto space-x-4">
          <Search />
          <ThemeSwitch />
          <ThemeSelector />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody>{props.children}</LayoutBody>
    </Layout>
  );
};

export default PanelAdmin;
