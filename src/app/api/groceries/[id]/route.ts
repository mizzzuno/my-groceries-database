import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "groceries.json");

interface Grocery {
  id: string;
  name: string;
  category: string;
  price: number;
  purchaseDate: string;
}

type RouteContext = {
  params?: { id?: string } | Promise<{ id?: string }>;
};

async function readData(): Promise<Grocery[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as Grocery[];
  } catch {
    return [];
  }
}

async function writeData(data: Grocery[]) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function DELETE(_req: Request, context: RouteContext) {
  // context.params may be a Promise or an object depending on Next internals.
  const params = await Promise.resolve(context?.params);
  const id = params?.id as string | undefined;
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const data = await readData();
  const index = data.findIndex((d) => d.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  data.splice(index, 1);
  await writeData(data);

  // 204 No Content
  return new NextResponse(null, { status: 204 });
}

export async function PUT(req: Request, context: RouteContext) {
  const params = await Promise.resolve(context?.params);
  const id = params?.id as string | undefined;
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  try {
    const body = (await req.json()) as Partial<Grocery>;
    const data = await readData();
    const index = data.findIndex((d) => d.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const existing = data[index];
    const updated: Grocery = {
      ...existing,
      ...body,
      id: existing.id,
    };

    data[index] = updated;
    await writeData(data);

    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
