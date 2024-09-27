from django.contrib import admin
from .models import Player, Team, TeamPlayer

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('SL', 'name', 'department', 'session', 'playingPosition', 'status', 'image')
    search_fields = ('name', 'department', 'session', 'playingPosition')
    list_filter = ('department', 'playingPosition', 'status', 'session')
    ordering = ('SL',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id','team_name','balance','team_logo')
    search_fields = ('id','team_name')
    ordering = ('id',)


@admin.register(TeamPlayer)
class TeamPlayerAdmin(admin.ModelAdmin):
    list_display = ('team', 'player', 'price')  # Display these fields in the list view
    search_fields = ('team__team_name', 'player')  # Allow search by team name and player name
    list_filter = ('team',)  # Filter by team

