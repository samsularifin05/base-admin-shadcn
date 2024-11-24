import { SideLink, sidelinks } from "@/router/sidelinks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
export const Breadcrumbs: React.FC<{ currentPath: string }> = ({
  currentPath,
}) => {
  const findBreadcrumbPath = (menu: SideLink[], path: string): SideLink[] => {
    for (const item of menu) {
      if (item.href === path) {
        return [item];
      }
      if (item.sub) {
        const subPath = findBreadcrumbPath(item.sub, path);
        if (subPath.length) {
          return [item, ...subPath];
        }
      }
    }
    return [];
  };
  const pathArray = findBreadcrumbPath(sidelinks, currentPath);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/dashboard">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathArray.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === pathArray.length - 1 ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
