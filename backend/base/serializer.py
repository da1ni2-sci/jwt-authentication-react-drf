from rest_framework import serializers
from .models import Note
from django.contrib.auth.models import User

class NoteSerializer(serializers.ModelSerializer):
  # owner = serializers.CharField(source='owner.username', read_only=True)
  class Meta:
    model = Note
    fields = ['id', 'description']

class UserRegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'email', 'password']
    extra_kwargs = {
      'password': {'write_only': True}
    }
  
  def create(self, validated_data):
    username = validated_data['username']
    email = validated_data['email']
    password = validated_data['password']

    user = User(username=username, email=email)
    user.set_password(password)
    user.save()
    return user
