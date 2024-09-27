from django.urls import path
from .views import get_players  # Updated to use new view name
from .views import get_teams  # Updated to use new view name
from .views import get_team_players, create_team_players  # Updated to use new view name

urlpatterns = [
    path('players/', get_players, name='get_players'),
    # path('players/<int:pk>', get_player, name='get_player'),
    path('teams/', get_teams, name='get_teams'),
    path('team-players/', get_team_players, name='get_team_players'),
    path('team-players/create', create_team_players, name='create_team_players'),
]
