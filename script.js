let cart = [];

// Προσθήκη προϊόντος στο καλάθι
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    alert(`Προστέθηκε το "${name}" στο καλάθι!`);
}

// Εμφάνιση/Απόκρυψη Καλαθιού
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('hidden');
}

// Ενημέρωση Καλαθιού
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-slate-400 text-center">Το καλάθι είναι άδειο.</p>';
        cartTotal.innerText = '€0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="flex justify-between items-center bg-slate-900 p-3 rounded-lg">
                <div>
                    <p class="font-semibold">${item.name}</p>
                    <p class="text-sm text-indigo-400">€${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-300 text-sm">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartTotal.innerText = `€${total.toFixed(2)}`;
}

// Αφαίρεση από το καλάθι
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Το καλάθι σου είναι άδειο!');
        return;
    }
    alert('Η παραγγελία καταχωρήθηκε! (Εδώ μπορείς να συνδέσεις PayPal ή Discord Webhook)');
    cart = [];
    updateCart();
    toggleCart();
}

// Custom Bot Form Submit
function handleCustomSubmit(event) {
    event.preventDefault();
    alert('Το αίτημά σου για Custom Bot στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σου στο Discord.');
    event.target.reset();
}
