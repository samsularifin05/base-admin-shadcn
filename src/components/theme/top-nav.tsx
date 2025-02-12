import { memo, useMemo } from 'react';
import { cn } from '@/components/lib/utils';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '../custom/button';
import { IconMenu } from '@tabler/icons-react';

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: {
    title: string;
    href: string;
    isActive: boolean;
  }[];
}

const TopNav = ({ className, links, ...props }: TopNavProps) => {
  // Memoize links rendering
  const renderedLinks = useMemo(
    () =>
      links.map(({ title, href, isActive }) => (
        <Link
          key={`${title}-${href}`}
          to={href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            !isActive && 'text-muted-foreground'
          )}
        >
          {title}
        </Link>
      )),
    [links]
  );

  // Memoize dropdown menu rendering
  const renderedDropdownLinks = useMemo(
    () =>
      links.map(({ title, href, isActive }) => (
        <DropdownMenuItem key={`${title}-${href}`} asChild>
          <Link to={href} className={!isActive ? 'text-muted-foreground' : ''}>
            {title}
          </Link>
        </DropdownMenuItem>
      )),
    [links]
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <IconMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            {renderedDropdownLinks}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={cn(
          'hidden items-center space-x-4 md:flex lg:space-x-6',
          className
        )}
        {...props}
      >
        {renderedLinks}
      </nav>
    </>
  );
};

export default memo(TopNav);
