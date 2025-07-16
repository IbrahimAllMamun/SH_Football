import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const teamPlayers = db.teamPlayers.getByTeamId(id);
    
    return NextResponse.json(teamPlayers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team players' },
      { status: 500 }
    );
  }
}