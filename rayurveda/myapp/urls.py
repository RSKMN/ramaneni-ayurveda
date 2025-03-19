# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('cart/', views.cart, name='cart'),
    path('shop/', views.shop, name='shop'),  # Shop page
    path('add_to_cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('update_cart/<int:product_id>/', views.update_cart, name='update_cart'),
    path('remove_from_cart/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
]
