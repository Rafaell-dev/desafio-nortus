'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  {
    value: 'pt-BR',
    label: 'pt-BR',
    flag: '/icons/brazil_flag.svg',
    alt: 'Brasil',
  },
  { value: 'en', label: 'en-US', flag: '/icons/usa_flag.svg', alt: 'USA' },
  { value: 'es', label: 'es-ES', flag: '/icons/spain_flag.svg', alt: 'España' },
];

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function handleChange(newLocale: string) {
    // Remove the current locale prefix from the pathname, then navigate
    const segments = pathname.split('/');
    // segments[1] is the locale if present (e.g. /en/...) or empty for default
    const isLocaleSegment = languages.some((l) => l.value === segments[1]);
    const pathWithoutLocale = isLocaleSegment
      ? '/' + segments.slice(2).join('/')
      : pathname;

    router.push(`/${newLocale}${pathWithoutLocale}`);
  }

  return (
    <Select defaultValue={currentLocale} onValueChange={handleChange}>
      <SelectTrigger className="bg-dark-surface h-11! rounded-full border border-gray-700/50 px-4 text-white hover:bg-white/10 focus:ring-0 focus:ring-offset-0">
        <div className="flex items-center gap-2">
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-dark-surface border-gray-700 text-white">
        {languages.map(({ value, label, flag, alt }) => (
          <SelectItem key={value} value={value}>
            <div className="flex items-center gap-2">
              <Image src={flag} alt={alt} width={18} height={18} />
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
