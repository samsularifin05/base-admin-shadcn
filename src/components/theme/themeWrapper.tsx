import { useTheme } from "./useTheme";
import { cn } from "../lib/utils";
import "./theme.css";

export function ThemeWrapper({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme] = useTheme();

  return <div className={cn(theme && `theme-${theme}`)}>{children}</div>;
}
