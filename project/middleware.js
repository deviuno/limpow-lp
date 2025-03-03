// middleware.js
export default function middleware(request) {
  // A URL solicitada
  const url = new URL(request.url);
  
  // Se a rota contém /club
  if (url.pathname.includes('/club')) {
    console.log('Club route detected, ensuring proper rendering');
  }

  // Continue para o próximo middleware ou rota
  return Response.next();
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas exceto:
     * 1. /api routes
     * 2. /_next (arquivos do Next.js)
     * 3. /_vercel (arquivos internos do Vercel)
     * 4. todos os arquivos estáticos (imagens, fontes, etc.)
     */
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
