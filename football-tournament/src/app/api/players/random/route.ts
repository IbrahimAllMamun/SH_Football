import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET() {
  try {
    const randomPlayer = db.players.getRandom();
    return NextResponse.json(randomPlayer);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch random player' },
      { status: 500 }
    );
  }
}