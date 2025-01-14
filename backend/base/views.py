from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializer import NoteSerializer, UserRegisterSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework import status


# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
  def post(self, request, *args, **kwargs):
    try: 
      response = super().post(request, *args, **kwargs)
      access_token = response.data['access']
      refresh_token = response.data['refresh']

      res = Response()
      res.data = {'success': True}

      res.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite='none',
        secure=True,
        path="/"
      )
      res.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite='none',
        secure=True,
        path="/"
      )
      return res
    
    except:
      res.data = {'success': False}
      return res

class CustomTokenRefreshView(TokenRefreshView):
  def post(self, request, *args, **kwargs):
    try:
      refresh_token = request.COOKIES.get("refresh_token")
      request.data['refresh'] = refresh_token
      response = super().post(request, *args, **kwargs)
      access_token = response.data['access']
      
      res = Response()
      res.data = {'refresh': True}
      res.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite='none',
        secure=True,
        path="/"
      )
      return res
    
    except:
      return Response({'refresh': False})
  
class LogoutView(APIView):
  def post(self, request):
    try:
      res = Response()
      res.data = {'logout': True}
      res.delete_cookie('access_token')
      return res
    except:
      return Response({'logout': False})

class NoteView(generics.ListAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]
  def get_queryset(self):
    user = self.request.user
    return user.note

class AuthenticatedView(APIView):
  permission_classes = [IsAuthenticated]
  def post(self, request):
    return Response({'authenticated': True})

class UserRegisterView(generics.CreateAPIView):
  serializer_class = UserRegisterSerializer
  authentication_classes = []
  permission_classes = []

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    if serializer.is_valid():
      user = serializer.save()
      print(user)
      refresh = RefreshToken.for_user(user)
      res = Response()
      res.data = {"register": True}
      res.set_cookie(
        key="access_token",
        value=str(refresh.access_token),
        httponly=True,
        samesite='none',
        secure=True,
        path="/"
      )
      res.set_cookie(
        key="refresh_token",
        value=str(refresh),
        httponly=True,
        samesite='none',
        secure=True,
        path="/"
      )
      return res
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

