from django.contrib import admin
from django.urls import path,include
from app import views
urlpatterns = [
    path('regions/', views.RegionListCreate.as_view(), name="regions"),
    path('regions/<int:pk>/', views.RegionRetrieveUpdateDestroy.as_view(), name="region-detail"),
    path('stores/', views.StoreListCreate.as_view(), name="stores"),
    path('stores/<int:pk>/', views.StoreRetrieveUpdateDestroy.as_view(), name="store-detail"),
    path('users/',views.GenericListCreateUser.as_view(),name="user"),
    path('users/<int:pk>/', views.UserRetrieveUpdateDestroy.as_view(), name="user-detail"),
    path('users/stores/<int:pk>/',views.GenericListStoreUser.as_view(),name="user")
]