from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializer import PlayerSerializer, TeamSerializer, TeamPlayerSerializer
from .models import Player, Team, TeamPlayer
from rest_framework import generics

# Player

@api_view(['GET'])
def get_players(request):
    # Check if the 'SL' query parameter is provided
    sl = request.query_params.get('SL', None)  # Use 'SL' or any other field you want to filter by

    if sl is not None:
        try:
            player = Player.objects.get(SL=sl)  # Retrieve a single player by SL
            serialized_data = PlayerSerializer(player)
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        except Player.DoesNotExist:
            return Response({'detail': 'Player not found.'}, status=status.HTTP_404_NOT_FOUND)

    # If no SL is provided, return all players
    players = Player.objects.all()
    if not players.exists():
        return Response([], status=status.HTTP_200_OK)

    serialized_data = PlayerSerializer(players, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)


# Team
@api_view(['GET'])
def get_teams(request):
    teams = Team.objects.all()  
    if not teams.exists():
        return Response([], status=status.HTTP_200_OK)  
    
    serialized_data = TeamSerializer(teams, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)  

# TeamPlayer
@api_view(['GET'])
def get_team_players(request):
    team_players = TeamPlayer.objects.all() 
    if not team_players.exists():
        return Response([], status=status.HTTP_200_OK)  
    
    serialized_data = TeamPlayerSerializer(team_players, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK) 


@api_view(['POST'])
def create_team_players(request):
    data = request.data 
    serilizer = TeamPlayerSerializer(data=data) 
    
    if serilizer.is_valid():
        serilizer.save()
        return Response(serilizer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)
