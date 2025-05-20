import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from '../ui';
import { Avatar, AvatarFallback } from '../ui';
import { Button } from '@/components/custom/button';
import { Paintbrush } from 'lucide-react';
import { cn } from '../lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, themesActions } from '@/reduxStore';

const themes = [
  { key: 'zinc', name: 'Zinc', colorHex: '#27272a', borderHex: '#27272a' },
  { key: 'orange', name: 'Orange', colorHex: '#f97316', borderHex: '#f97316' },
  { key: 'green', name: 'Green', colorHex: '#16a34a', borderHex: '#16a34a' },
  { key: 'rose', name: 'Rose', colorHex: '#be123c', borderHex: '#be123c' },
  { key: 'blue', name: 'Blue', colorHex: '#2563eb', borderHex: '#2563eb' }
];

export default function ThemeSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: any) => state.theme.themeColor);
  // const customColor = useSelector((state: any) => state.theme.customColor);

  // Menentukan tema aktif, fallback ke blue
  const currentTheme =
    themes.find((t) => t.key === theme) || {
      key: 'custom',
      name: 'Custom',
      colorHex: theme,
      borderHex: theme
    } ||
    themes[4];

  const bgColor = currentTheme.colorHex;

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState(theme || '#000000');

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', bgColor);
  }, [bgColor]);

  function onSelectTheme(key: string) {
    console.log(key);
    dispatch(themesActions.setThemeColor(key));
    setShowColorPicker(false);
  }

  function onCustomColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTempColor(e.target.value);
  }

  function applyCustomColor() {
    dispatch(themesActions.setThemeColor(tempColor));
    document.documentElement.style.setProperty('--primary', tempColor);

    setShowColorPicker(false);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarFallback
              className="text-white"
              style={{ backgroundColor: bgColor }}
            >
              <Paintbrush className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-48 p-1 bg-white rounded-md shadow-md dark:bg-gray-900"
        align="end"
        sideOffset={5}
        forceMount
      >
        <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Pilih Warna Tema
        </DropdownMenuLabel>

        {themes.map(({ key, name, colorHex, borderHex }) => (
          <DropdownMenuItem
            key={key}
            onSelect={() => onSelectTheme(key)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded cursor-pointer select-none text-sm',
              'focus:bg-gray-200 focus:outline-none dark:focus:bg-gray-700',
              theme === key && 'bg-gray-200 dark:bg-gray-700'
            )}
            aria-label={`Pilih tema warna ${name}`}
          >
            <Button
              size="icon"
              variant="outline"
              className="p-0 border rounded-sm w-7 h-7"
              aria-hidden="true"
              style={{
                borderColor: theme === key ? borderHex : 'transparent',
                padding: 0
              }}
            >
              <div
                style={{ backgroundColor: colorHex }}
                className="w-5 h-5 rounded-sm"
              />
            </Button>
            {name}
          </DropdownMenuItem>
        ))}

        {/* Item Custom Color */}
        <DropdownMenuItem
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded cursor-pointer select-none text-sm',
            'focus:bg-gray-200 focus:outline-none dark:focus:bg-gray-700',
            theme === 'custom' && 'bg-gray-200 dark:bg-gray-700'
          )}
          onSelect={(event) => {
            event.preventDefault(); // cegah dropdown tutup saat klik custom
            setShowColorPicker((v) => !v);
          }}
          aria-label="Pilih warna custom"
        >
          <Button
            size="icon"
            variant="outline"
            className="p-0 border rounded-sm w-7 h-7"
            aria-hidden="true"
            style={{
              borderColor: theme === 'custom' ? tempColor : 'transparent',
              padding: 0
            }}
          >
            <div
              style={{ backgroundColor: tempColor }}
              className="w-5 h-5 rounded-sm"
            />
          </Button>
          Custom Color
        </DropdownMenuItem>

        {/* Color picker muncul jika showColorPicker true */}
        {showColorPicker && (
          <div className="px-3 py-2">
            <input
              type="color"
              value={tempColor}
              onChange={onCustomColorChange}
              className="w-full h-8 border border-gray-300 rounded-md cursor-pointer dark:border-gray-700"
            />
            <Button
              onClick={applyCustomColor}
              className="w-full mt-2"
              variant="default"
              size="sm"
            >
              Apply Custom Color
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
