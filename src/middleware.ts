import { nanoid } from 'nanoid';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.cookies.get('poll-token')) {
    return;
  }
  const random = nanoid();

  // Redirect (to apply cookie)
  const res = NextResponse.next();
  res.cookies.set('poll-token', random);

  return res;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/:path*',
// };
