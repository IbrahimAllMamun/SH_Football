import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const team = db.teams.getById(id);
    
    if (!team) {
      return NextResponse.json(
        { detail: 'Team not found.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    );
  }
}