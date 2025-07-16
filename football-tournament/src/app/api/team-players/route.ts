import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET() {
  try {
    const teamPlayers = db.teamPlayers.getAll();
    return NextResponse.json(teamPlayers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team players' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { team, player, price } = await request.json();
    
    const teamPlayer = db.teamPlayers.create(team, player, price);
    return NextResponse.json(teamPlayer, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}