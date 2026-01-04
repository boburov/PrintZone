import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  // This endpoint is no longer used for PDF page counting as it's now handled client-side.
  // It can be removed or repurposed if needed.
  return NextResponse.json({ success: true, message: 'PDF page counting is now handled client-side.' });
}