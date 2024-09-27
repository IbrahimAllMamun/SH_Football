from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializer import PlayerSerializer, TeamSerializer, TeamPlayerSerializer
from .models import Player, Team, TeamPlayer

# Player
@api_view(['GET'])
def get_players(request):
    players = Player.objects.all() 
    if not players.exists():
        return Response([], status=status.HTTP_200_OK)  
    
    serialized_data = PlayerSerializer(players, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)  


@api_view(['POST'])
def create_players(request):
    data = request.data  
    serilizer = PlayerSerializer(data=data) 
    
    if serilizer.is_valid():
        serilizer.save()
        return Response(serilizer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)

# Team
@api_view(['GET'])
def get_teams(request):
    teams = Team.objects.all()  
    if not teams.exists():
        return Response([], status=status.HTTP_200_OK)  
    
    serialized_data = TeamSerializer(teams, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)  


@api_view(['POST'])
def create_teams(request):
    data = request.data  
    serilizer = TeamSerializer(data=data) 
    
    if serilizer.is_valid():
        serilizer.save()
        return Response(serilizer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
    
