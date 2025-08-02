import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
  const isCheckoutPage = req.nextUrl.pathname.startsWith('/checkout');
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');

  // Redirect logged-in users away from auth pages
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Protect checkout pages
  if (isCheckoutPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Protect admin pages
  if (isAdminPage) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    if (req.auth?.user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};