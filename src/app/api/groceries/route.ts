import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "groceries.json");

async function readData() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeData(data: any) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.purchaseDate) {
      return NextResponse.json(
        { error: "name and purchaseDate required" },
        { status: 400 }
      );
    }
    const data = await readData();
    const created = { id: generateId(), ...body };
    data.push(created);
    await writeData(data);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
