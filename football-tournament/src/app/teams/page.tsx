import TeamGrid from '@/components/teams/teamGrid';

export default function TeamsPage() {
  return (
    <div className="fixed top-0 left-0 bg-[url('/bg.jpg')] bg-cover bg-bottom w-screen h-screen">
      <TeamGrid />
    </div>
  );
}