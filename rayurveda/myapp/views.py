# myapp/views.py
from django.shortcuts import render, redirect, get_object_or_404
from .models import Product  # Ensure you have a Product model with fields like id, name, price, etc.

def index(request):
    products = Product.objects.all()
    context = {'products': products}
    return render(request, 'myapp/index.html', context)

def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    # Get the cart from session; if none exists, initialize an empty dictionary.
    cart = request.session.get('cart', {})

    # Use stringified product_id as key.
    if str(product_id) in cart:
        cart[str(product_id)] += 1
    else:
        cart[str(product_id)] = 1

    request.session['cart'] = cart  # Save the updated cart in the session
    return redirect('home')

def cart(request):
    cart = request.session.get('cart', {})
    cart_items = []
    cart_total = 0

    # Build a list of items for the cart view.
    for product_id, quantity in cart.items():
        product = get_object_or_404(Product, id=product_id)
        total_price = product.price * quantity
        cart_total += total_price
        cart_items.append({
            'product': product,
            'quantity': quantity,
            'total_price': total_price,
        })

    context = {
        'cart_items': cart_items,
        'cart_total': cart_total,
    }
    return render(request, 'myapp/cart.html', context)

def update_cart(request, product_id):
    if request.method == 'POST':
        cart = request.session.get('cart', {})
        try:
            quantity = int(request.POST.get('quantity', 1))
        except ValueError:
            quantity = 1
        if quantity > 0:
            cart[str(product_id)] = quantity
        else:
            cart.pop(str(product_id), None)
        request.session['cart'] = cart
    return redirect('cart')

def remove_from_cart(request, product_id):
    cart = request.session.get('cart', {})
    if str(product_id) in cart:
        cart.pop(str(product_id))
    request.session['cart'] = cart
    return redirect('cart')

def shop(request):
    products = Product.objects.all()  # Fetch all products
    context = {'products': products}
    return render(request, 'myapp/shop.html', context)
