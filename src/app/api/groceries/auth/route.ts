import { NextResponse } from "next/server";

const BACKEND_API = "http://localhost:8000/api/v1/auth";

type RouteContext = {
  params?: { id?: string } | Promise<{ id?: string }>;
};

export async function GET(_req: Request, context: RouteContext) {
  const params = await Promise.resolve(context?.params);
  const id = params?.id as string | undefined;
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  const res = await fetch(`${BACKEND_API}/${id}`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(req: Request, context: RouteContext) {
  const params = await Promise.resolve(context?.params);
  const id = params?.id as string | undefined;
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  const body = await req.json();
  const res = await fetch(`${BACKEND_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(_req: Request, context: RouteContext) {
  const params = await Promise.resolve(context?.params);
  const id = params?.id as string | undefined;
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  const res = await fetch(`${BACKEND_API}/${id}`, { method: "DELETE" });
  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
