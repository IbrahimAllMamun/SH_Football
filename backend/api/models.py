from django.db import models

class Player(models.Model):
    SL = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=50)
    session = models.CharField(max_length=8)
    playingPosition = models.CharField(max_length=5)
    image = models.CharField(max_length=50)  # Store image uploads
    status = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.SL}. {self.name}'


class Team(models.Model):
    id = models.IntegerField(primary_key=True, unique=True) 
    team_name = models.CharField(max_length=255)
    balance = models.IntegerField(default=1000)
    team_logo = models.CharField(max_length=50)
    
    def __str__(self):
        return self.team_name
    

class TeamPlayer(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)  # Link to Team table
    player = models.ForeignKey(Player, on_delete=models.CASCADE)  # Link to Player table
    price = models.IntegerField()
    
    class Meta:
        unique_together = ('player', 'team')

    def __str__(self):
        return f"{self.player.SL} - {self.team.team_name}"