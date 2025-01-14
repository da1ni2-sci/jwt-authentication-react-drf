from django.urls import path
from .views import NoteView, CustomTokenObtainPairView, CustomTokenRefreshView, LogoutView, AuthenticatedView, UserRegisterView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('notes/', NoteView.as_view(), name='notes'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('authenticated/', AuthenticatedView.as_view(), name='authenticated'),
    path('register/', UserRegisterView.as_view(), name='register'),
]