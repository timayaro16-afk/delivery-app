// Данные приложения
let restaurants = [
    {
        id: 1,
        name: 'Пицца Мастер',
        category: 'Итальянская кухня',
        rating: 4.8,
        deliveryTime: '30-40 мин',
        minOrder: 300,
        items: [
            { id: 1, name: 'Маргарита', price: 450 },
            { id: 2, name: 'Пепперони', price: 520 },
            { id: 3, name: 'Четыре сыра', price: 580 }
        ]
    },
    {
        id: 2,
        name: 'Суши Express',
        category: 'Японская кухня',
        rating: 4.9,
        deliveryTime: '20-30 мин',
        minOrder: 400,
        items: [
            { id: 4, name: 'Филадельфия', price: 380 },
            { id: 5, name: 'Калифорния', price: 350 },
            { id: 6, name: 'Осака', price: 420 }
        ]
    },
    {
        id: 3,
        name: 'Бургер Паб',
        category: 'Американская кухня',
        rating: 4.6,
        deliveryTime: '25-35 мин',
        minOrder: 250,
        items: [
            { id: 7, name: 'Классический Бургер', price: 320 },
            { id: 8, name: 'Двойной Бургер', price: 420 },
            { id: 9, name: 'Куриный Бургер', price: 280 }
        ]
    },
    {
        id: 4,
        name: 'Шаурма Клуб',
        category: 'Восточная кухня',
        rating: 4.7,
        deliveryTime: '15-25 мин',
        minOrder: 200,
        items: [
            { id: 10, name: 'Шаурма курица', price: 180 },
            { id: 11, name: 'Шаурма говядина', price: 220 },
            { id: 12, name: 'Шаурма овощная', price: 150 }
        ]
    }
];

let orders = [
    {
        id: 1001,
        restaurant: 'Пицца Мастер',
        items: 'Маргарита х1',
        price: 450,
        status: 'delivering',
        time: '15 минут',
        address: 'ул. Примерная, 10'
    },
    {
        id: 1002,
        restaurant: 'Суши Express',
        items: 'Филадельфия х2',
        price: 760,
        status: 'pending',
        time: '25 минут',
        address: 'ул. Примерная, 10'
    }
];

let cart = [];
let currentUser = {
    name: 'Иван Петров',
    phone: '+7 (999) 123-45-67',
    address: 'ул. Примерная, 10'
};

// Переключение вкладок
function switchTab(tabName) {
    // Скрыть все вкладки
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Показать нужную вкладку
    document.getElementById(tabName).classList.add('active');

    // Обновить активную кнопку навигации
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Загрузить контент
    if (tabName === 'orders') loadOrders();
    if (tabName === 'restaurants') loadRestaurants();
    if (tabName === 'cart') updateCart();
    if (tabName === 'profile') loadProfile();
}

// Загрузка заказов
function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    if (orders.length === 0) {
        ordersList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">У вас нет активных заказов</p>';
        return;
    }

    orders.forEach(order => {
        const statusClass = `status-${order.status}`;
        const statusText = order.status === 'pending' ? 'В ожидании' : 
                          order.status === 'delivering' ? 'Доставляется' : 'Доставлено';
        
        ordersList.innerHTML += `
            <div class="order-card">
                <h3>Заказ #${order.id}</h3>
                <span class="order-status ${statusClass}">${statusText}</span>
                <p class="order-info">🍽️ ${order.restaurant}</p>
                <p class="order-info">📦 ${order.items}</p>
                <p class="order-info">⏱️ ${order.time}</p>
                <p class="order-info">📍 ${order.address}</p>
                <div class="order-price">${order.price}₽</div>
            </div>
        `;
    });
}

// Загрузка ресторанов
function loadRestaurants() {
    const restaurantsList = document.getElementById('restaurants-list');
    restaurantsList.innerHTML = '';

    restaurants.forEach(restaurant => {
        restaurantsList.innerHTML += `
            <div class="restaurant-card">
                <h3>🏪 ${restaurant.name}</h3>
                <p class="restaurant-info">📂 ${restaurant.category}</p>
                <p class="restaurant-info">⭐ ${restaurant.rating} • ${restaurant.deliveryTime}</p>
                <p class="restaurant-info">Минимум заказа: ${restaurant.minOrder}₽</p>
                <button class="btn-add" onclick="showRestaurantMenu(${restaurant.id})">Смотреть меню</button>
            </div>
        `;
    });
}

// Фильтр ресторанов
function filterRestaurants() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const restaurantCards = document.querySelectorAll('.restaurant-card');

    restaurantCards.forEach(card => {
        const restaurantName = card.querySelector('h3').textContent.toLowerCase();
        if (restaurantName.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Показать меню ресторана
function showRestaurantMenu(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    alert(`Меню ресторана "${restaurant.name}":\n\n` +
        restaurant.items.map(item => `${item.name} - ${item.price}₽`).join('\n'));
}

// Добавить в корзину
function addToCart(itemId, itemName, price) {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: itemId, name: itemName, price: price, quantity: 1 });
    }
    
    alert(`${itemName} добавлено в корзину!`);
    updateCart();
}

// Обновить корзину
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="color: #999; text-align: center;">Корзина пуста</p>';
        cartTotal.textContent = '0₽';
        return;
    }

    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price}₽ x ${item.quantity}</p>
                </div>
                <div>
                    <span class="cart-item-price">${itemTotal}₽</span>
                    <button style="margin-left: 10px; padding: 5px 10px; background: #ff6b6b; color: white; border: none; border-radius: 3px; cursor: pointer;" onclick="removeFromCart(${index})">Удалить</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = total + '₽';
}

// Удалить из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Оформить заказ
function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Заказ оформлен!\nСумма: ${total}₽\nВремя доставки: 30-40 минут`);
    cart = [];
    updateCart();
}

// Загрузить профиль
function loadProfile() {
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-phone').textContent = currentUser.phone;
    document.getElementById('user-address').textContent = currentUser.address;
}

// Редактировать профиль
function editProfile() {
    const newName = prompt('Введите имя:', currentUser.name);
    const newPhone = prompt('Введите номер телефона:', currentUser.phone);
    const newAddress = prompt('Введите адрес доставки:', currentUser.address);

    if (newName) currentUser.name = newName;
    if (newPhone) currentUser.phone = newPhone;
    if (newAddress) currentUser.address = newAddress;

    loadProfile();
    alert('Профиль обновлен!');
}

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
    loadOrders();
    loadProfile();
});