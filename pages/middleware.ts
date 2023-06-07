import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  // Token will exist if user logged in
  let token = '';
  try {
    token = localStorage.getItem("Token") || '';
  } catch (error) {
    console.log(error)
  }

  const url = req.url;

  if(url.include('/')){
    // Protected Routes
    if (token === undefined) {
      return NextResponse.redirect('/login');
    }else{
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}