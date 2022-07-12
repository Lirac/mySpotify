import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  //Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  console.log("Login Token: " + token)

  const { pathname } = req.nextUrl

  //Allow the request if the following is true
  //1) Its a request for next auth session & provider fetch
  //2) The token exist

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  //Redirect them to login page if they dont have a token and are requesting a page that requires login
  if (token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
// export { default } from 'next-auth/middleware'

// export const config = { matcher: ['/'] }
