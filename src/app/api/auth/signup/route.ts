import { NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || ''

export async function POST(req: Request) {
  const body = await req.text()
  const res = await fetch(`${API_BASE.replace(/\/+$/,'')}/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': req.headers.get('content-type') || 'application/json',
    },
    body,
  })

  const text = await res.text()
  const headers: Record<string,string> = {}
  const contentType = res.headers.get('content-type')
  if (contentType) headers['content-type'] = contentType
  return new Response(text, { status: res.status, headers })
}
