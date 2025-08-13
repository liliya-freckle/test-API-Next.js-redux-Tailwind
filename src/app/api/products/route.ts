export async function GET() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return Response.json(data);
}
