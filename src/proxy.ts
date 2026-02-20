import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

const PROTECTED_PATHS = ['/dashboard', '/tickets', '/chat', '/calculator'];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) =>
      pathname === path ||
      pathname.endsWith(path) ||
      pathname.includes(`${path}/`)
  );
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname)) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      const firstSegment = pathname.split('/')[1];
      const isLocalePrefix = locales.includes(
        firstSegment as (typeof locales)[number]
      );
      const loginUrl = new URL(
        isLocalePrefix ? `/${firstSegment}` : '/',
        request.url
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
