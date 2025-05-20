import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../sidebar/sidebar';
import React from 'react';
import { SidebarProvider } from '../ui/sidebar';
import Cookies from 'js-cookie';
import { SearchProvider } from '../search-context';
import { cn } from '../lib';
import { Main } from '../header/main';
import { Header } from '../header/header';
import { Search } from './search';
import ThemeSwitch from './theme-switch';
import ThemeSelector from './themeSelector';
import UserNav from './user-nav';

export default function AppShell() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SearchProvider>
        <AppSidebar />
        <React.Suspense fallback="loading">
          <div
            className={cn(
              'ml-auto w-full max-w-full',
              'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
              'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
              'sm:transition-[width] sm:duration-200 sm:ease-linear',
              'flex h-svh flex-col',
              'group-data-[scroll-locked=1]/body:h-full',
              'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
            )}
          >
            <Header fixed>
              <Search />
              <div className="flex items-center ml-auto space-x-4">
                <ThemeSwitch />
                <ThemeSelector />
                <UserNav />
              </div>
            </Header>
            <Main>
              <Outlet />
            </Main>
          </div>
        </React.Suspense>
      </SearchProvider>
    </SidebarProvider>
  );
}
