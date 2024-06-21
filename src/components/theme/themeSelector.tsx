import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  DropdownMenuContent,
  DropdownMenuLabel
} from "../ui";
import { cn } from "../lib/utils";
import { AppDispatch, themesActions, useAppSelector } from "@/reduxStore";
import { useDispatch } from "react-redux";
import { Button } from "../custom";
import { Paintbrush } from "lucide-react";

const ThemeSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useAppSelector((state) => state.theme.themeColor);
  const bgColor =
    theme === "zinc"
      ? "bg-zinc-950"
      : theme === "orange"
      ? "bg-orange-400"
      : theme === "green"
      ? "bg-green-600"
      : theme === "rose"
      ? "bg-rose-600"
      : "bg-blue-600";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarFallback className={`text-white ${bgColor}`}>
              <Paintbrush className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-5" align="end" forceMount>
        <DropdownMenuLabel
          className="flex items-center font-normal cursor-pointer"
          onClick={() => dispatch(themesActions.setThemeColor("zinc"))}
        >
          <Button
            size="icon"
            variant="outline"
            className={cn("w-7 h-7", theme === "zinc" && "border-zinc-950")}
          >
            <div className="w-5 rounded-sm bg-zinc-950 aspect-square" />
            <span className="sr-only">Zinc</span>
          </Button>
          <div className="ml-2"> Zinc </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel
          className="flex items-center font-normal cursor-pointer"
          onClick={() => dispatch(themesActions.setThemeColor("orange"))}
        >
          <Button
            size="icon"
            variant="outline"
            className={cn("w-7 h-7", theme === "orange" && "border-orange-400")}
          >
            <div className="w-5 bg-orange-400 rounded-sm aspect-square" />
            <span className="sr-only">Orange</span>
          </Button>
          <div className="ml-2"> Orange </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel
          className="flex items-center font-normal cursor-pointer"
          onClick={() => dispatch(themesActions.setThemeColor("green"))}
        >
          <Button
            size="icon"
            variant="outline"
            className={cn("w-7 h-7", theme === "green" && "border-green-600")}
          >
            <div className="w-5 bg-green-600 rounded-sm aspect-square" />
            <span className="sr-only">Green</span>
          </Button>
          <div className="ml-2"> Green </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel
          className="flex items-center font-normal cursor-pointer"
          onClick={() => dispatch(themesActions.setThemeColor("rose"))}
        >
          <Button
            size="icon"
            variant="outline"
            className={cn("w-7 h-7", theme === "rose" && "border-rose-600")}
          >
            <div className="w-5 rounded-sm bg-rose-600 aspect-square" />
            <span className="sr-only">Rose</span>
          </Button>
          <div className="ml-2"> Rose </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel
          className="flex items-center font-normal cursor-pointer"
          onClick={() => dispatch(themesActions.setThemeColor("blue"))}
        >
          <Button
            size="icon"
            variant="outline"
            className={cn("w-7 h-7", theme === "blue" && "border-blue-600")}
          >
            <div className="w-5 bg-blue-600 rounded-sm aspect-square" />
            <span className="sr-only">Blue</span>
          </Button>
          <div className="ml-2"> Blue </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
