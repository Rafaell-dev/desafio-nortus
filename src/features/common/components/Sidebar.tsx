'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUser } from '@/src/features/users/hooks/useUser';
import { authService } from '../../auth/services/authService';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('sidebar');
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, isLoading } = useUser();

  const handleLogout = () => {
    authService.logout();
    router.push('/');
  };

  const navigation = [
    {
      name: t('dashboard'),
      href: '/dashboard',
      iconPath: '/icons/dashboard_icon.svg',
    },
    {
      name: t('tickets'),
      href: '/tickets',
      iconPath: '/icons/ticket_icon.svg',
    },
    { name: t('chat'), href: '/chat', iconPath: '/icons/chat_icon.svg' },
    { name: 'Perfil', href: '#', iconPath: '/icons/account_icon.svg' },
    {
      name: t('calculator'),
      href: '/calculator',
      iconPath: '/icons/calculator_icon.svg',
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <aside
      className={cn(
        'bg-dark-surface shadow-dark fixed top-0 left-0 z-50 flex h-screen flex-col rounded-r-2xl transition-all duration-300 ease-in-out',
        isExpanded ? 'w-64' : 'w-24'
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-20 items-center justify-center border-b border-gray-800">
        <div
          className={cn(
            'relative h-10 w-10 transition-all duration-300',
            isExpanded && 'w-32'
          )}
        >
          <Image
            src="/nortus_logotipo.svg"
            alt="Nortus"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <TooltipProvider>
          {navigation.map((item) => {
            // pathname may include locale prefix (e.g. /en/dashboard)
            const isActive =
              pathname === item.href || pathname.endsWith(item.href);
            return (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'group transitions-colors flex items-center rounded-xl p-4',
                      isExpanded ? 'justify-start gap-4' : 'justify-center',
                      isActive
                        ? 'bg-blue shadow-blue-glow text-white'
                        : 'bg-dark-surface-2 text-gray-400 hover:text-white'
                    )}
                  >
                    <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                      <Image
                        src={item.iconPath}
                        alt={item.name}
                        fill
                        className={cn(
                          'object-contain transition-all',
                          isActive
                            ? 'brightness-0 invert'
                            : 'brightness-0 invert-[0.6] group-hover:brightness-0'
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        'font-medium whitespace-nowrap transition-all duration-300',
                        isExpanded
                          ? 'translate-x-0 opacity-100'
                          : 'w-0 -translate-x-4 overflow-hidden opacity-0'
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent
                    side="right"
                    className="bg-blue border-gray-700 text-white"
                  >
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      <div className="border-t border-gray-800 p-4">
        <div
          className="group flex cursor-pointer items-center gap-4 rounded-xl p-2 transition-colors hover:bg-[#1A253A]"
          onClick={handleLogout}
        >
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-700">
            {isLoading ? (
              <div className="h-full w-full animate-pulse bg-gray-600" />
            ) : (
              <div className="bg-blue flex h-full w-full items-center justify-center text-xs font-bold text-white">
                {user ? getInitials(user.name) : 'RL'}
              </div>
            )}
          </div>
          <div
            className={cn(
              'flex flex-col overflow-hidden transition-all duration-300',
              isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
            )}
          >
            {isLoading ? (
              <div className="space-y-1">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-600" />
                <div className="h-2 w-28 animate-pulse rounded bg-gray-600" />
              </div>
            ) : (
              <>
                <span className="truncate text-sm font-medium text-white">
                  {user?.name || 'Ricardo Leite'}
                </span>
                <span className="truncate text-xs text-gray-400">
                  {user?.email || 'ricardo@email.com'}
                </span>
              </>
            )}
          </div>
          <LogOut
            className={cn(
              'ml-auto h-5 w-5 text-gray-400 transition-opacity group-hover:text-white',
              isExpanded ? 'opacity-100' : 'hidden opacity-0'
            )}
          />
        </div>
      </div>
    </aside>
  );
}
