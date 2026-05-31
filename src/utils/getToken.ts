export function getToken(context: any) {
  return context.req.cookies.token;
}
