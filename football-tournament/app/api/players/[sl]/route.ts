import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { sl: string } }
) {
  try {
    const sl = parseInt(params.sl);
    const player = db.players.getById(sl);
    
    if (!player) {
      return NextResponse.json(
        { detail: 'Player not found.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch player' },
      { status: 500 }
    );
  }
}