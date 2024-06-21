import React from "react";
import { Layout, LayoutBody, LayoutHeader } from "./ui";
import { Search } from "./search";
import ThemeSwitch from "./theme-switch";
import { UserNav } from "./user-nav";

import { Breadcrumbs } from "./BreadcrumbGenerate";
import { useLocation } from "react-router-dom";
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
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody>{props.children}</LayoutBody>
    </Layout>
  );
};

export default PanelAdmin;
