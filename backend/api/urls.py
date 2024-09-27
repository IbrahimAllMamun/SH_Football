from django.urls import path
from .views import get_players, create_players  # Updated to use new view name
from .views import get_teams, create_teams  # Updated to use new view name
from .views import get_team_players, create_team_players  # Updated to use new view name

urlpatterns = [
    path('players/', get_players, name='get_players'),
    path('players/create', create_players, name='create_players'),
    path('teams/', get_teams, name='get_teams'),
    path('teams/create', create_teams, name='create_teams'),
    path('team-players/', get_team_players, name='get_team_players'),
    path('team-players/create', create_team_players, name='create_team_players'),
]
