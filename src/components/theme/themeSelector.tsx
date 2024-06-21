// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenuContent,
  DropdownMenuLabel
} from "../ui";
import { useTheme } from "./useTheme";
import { cn } from "../lib/utils";

const ThemeSelector = () => {
  const [theme, setTheme] = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-5" align="end" forceMount>
        <DropdownMenuLabel
          className="flex items-center font-normal cursor-pointer"
          onClick={() => setTheme("zinc")}
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
          onClick={() => setTheme("orange")}
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
          onClick={() => setTheme("green")}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
