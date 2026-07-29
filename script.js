// BOTFORGE SCRIPT
const bots = [
  { id: 1, name: "Guardian", category: "Moderation", icon: "fa-shield-alt", desc: "Advanced auto-mod, anti-spam, warning system and custom filters.", price: 9.99 },
  { id: 2, name: "Melody", category: "Music", icon: "fa-music", desc: "High-quality music playback with queue, playlists and filters.", price: 7.99 },
  { id: 3, name: "WelcomeBot", category: "Utility", icon: "fa-door-open", desc: "Beautiful customizable welcome and leave messages with embeds.", price: 4.99 },
  { id: 4, name: "LevelUp", category: "Engagement", icon: "fa-chart-line", desc: "XP system, ranks, leaderboards and custom level-up rewards.", price: 6.99 },
  { id: 5, name: "RaidShield", category: "Moderation", icon: "fa-user-shield", desc: "Real-time anti-raid protection with lockdown and verification.", price: 12.99 },
  { id: 6, name: "FunZone", category: "Fun", icon: "fa-gamepad", desc: "Memes, games, would-you-rather, and hundreds of fun commands.", price: 5.99 },
  { id: 7, name: "EcoBot", category: "Economy", icon: "fa-coins", desc: "Full economy system with shop, jobs, gambling and inventory.", price: 8.99 },
  { id: 8, name: "Analytics", category: "Utility", icon: "fa-chart-pie", desc: "Server insights, message stats, growth charts and reports.", price: 9.99 },
  { id: 9, name: "RoleMaster", category: "Utility", icon: "fa-user-tag", desc: "Reaction roles, temporary roles, role menus and automations.", price: 6.99 },
  { id: 10, name: "Logger", category: "Moderation", icon: "fa-clipboard-list", desc: "Complete audit logging for messages, members, channels and more.", price: 5.99 },
  { id: 11, name: "Giveaway", category: "Engagement", icon: "fa-gift", desc: "Create and manage giveaways with requirements and winners.", price: 4.99 },
  { id: 12, name: "TicketPro", category: "Support", icon: "fa-ticket-alt", desc: "Professional ticket system with panels, transcripts and claims.", price: 11.99 },
  { id: 13, name: "WeatherBot", category: "Utility", icon: "fa-cloud-sun", desc: "Accurate weather forecasts, alerts and location-based info.", price: 3.99 },
  { id: 14, name: "QuestRPG", category: "Fun", icon: "fa-dragon", desc: "Full RPG experience with quests, monsters, items and guilds.", price: 10.99 },
  { id: 15, name: "InviteTracker", category: "Utility", icon: "fa-link", desc: "Track invites, rewards for inviters and detailed analytics.", price: 5.99 },
  { id: 16, name: "Announce", category: "Utility", icon: "fa-bullhorn", desc: "Scheduled announcements, embeds and auto-posting tools.", price: 4.99 },
  { id: 17, name: "CustomCMD", category: "Utility", icon: "fa-terminal", desc: "Create unlimited custom commands with variables and embeds.", price: 7.99 },
  { id: 18, name: "Translate", category: "Utility", icon: "fa-language", desc: "Auto-translate messages between 50+ languages instantly.", price: 6.99 },
  { id: 19, name: "StatBot", category: "Utility", icon: "fa-server", desc: "Live server stats channels, member counts and status displays.", price: 5.99 },
  { id: 20, name: "Zenith", category: "All-in-One", icon: "fa-star", desc: "Ultimate all-in-one bot combining moderation, music, economy and more.", price: 19.99 }
];

const hostingPlans = [
  { id: "h1", name: "Starter", price: 2.99, features: ["1 Bot", "Shared CPU", "512 MB RAM", "5 GB Storage", "Basic Support"] },
  { id: "h2", name: "Pro", price: 7.99, features: ["5 Bots", "2 vCPU", "2 GB RAM", "20 GB Storage", "Priority Support", "99.5% Uptime"] },
  { id: "h3", name: "Elite", price: 14.99, features: ["15 Bots", "4 vCPU", "4 GB RAM", "50 GB Storage", "24/7 Support", "99.9% Uptime", "Custom Domain"] },
  { id: "h4", name: "Ultimate", price: 29.99, features: ["Unlimited Bots", "8 vCPU", "8 GB RAM", "100 GB Storage", "Dedicated Support", "99.99% Uptime", "DDoS Protection", "Full Root Access"] }
];

function getCart() {
  return JSON.parse(localStorage.getItem("botforge_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("botforge_cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, type = "bot") {
  const cart = getCart();
  const existing = cart.find(item => item.id === id && item.type === type);
  if (existing) {
    showToast("Already in cart!", true);
    return;
  }
  if (type === "bot") {
    const bot = bots.find(b => b.id === id);
    if (bot) cart.push({ id: bot.id, type: "bot", name: bot.name, price: bot.price, icon: bot.icon });
  } else {
    const plan = hostingPlans.find(p => p.id === id);
    if (plan) cart.push({ id: plan.id, type: "hosting", name: plan.name + " Hosting", price: plan.price, icon: "fa-server" });
  }
  saveCart(cart);
  showToast("Added to cart!");
}

function removeFromCart(id, type) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === id && item.type === type));
  saveCart(cart);
  if (document.getElementById("cart-items")) renderCart();
}

function updateCartCount() {
  const count = getCart().length;
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
}

function showToast(msg, isError = false) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = "toast" + (isError ? " error" : "") + " show";
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function createBotCard(bot, showAdd = true) {
  return `
    <div class="bot-card" data-category="${bot.category}">
      <div class="bot-icon"><i class="fas ${bot.icon}"></i></div>
      <h3>${bot.name}</h3>
      <div class="bot-category">${bot.category}</div>
      <p>${bot.desc}</p>
      <div class="bot-footer">
        <div class="bot-price">$${bot.price}<span>/mo</span></div>
        ${showAdd ? `<button class="btn btn-primary btn-sm" onclick="addToCart(${bot.id})"><i class="fas fa-cart-plus"></i> Add</button>` : ""}
      </div>
    </div>
  `;
}

function renderPopularBots() {
  const container = document.getElementById("popular-bots");
  if (!container) return;
  const popular = [bots[0], bots[1], bots[4], bots[11]];
  container.innerHTML = popular.map(b => createBotCard(b)).join("");
}

function renderAllBots() {
  const container = document.getElementById("bots-grid");
  if (!container) return;
  container.innerHTML = bots.map(b => createBotCard(b)).join("");
}

function filterBots(category) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === category);
  });
  const cards = document.querySelectorAll(".bot-card");
  cards.forEach(card => {
    if (category === "All" || card.dataset.category === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function renderHosting() {
  const container = document.getElementById("hosting-grid");
  if (!container) return;
  container.innerHTML = hostingPlans.map((plan, i) => `
    <div class="hosting-card ${i === 2 ? "featured" : ""}">
      ${i === 2 ? `<div class="featured-badge">Most Popular</div>` : ""}
      <h3>${plan.name}</h3>
      <div class="hosting-price">$${plan.price}<span>/mo</span></div>
      <ul class="hosting-features">
        ${plan.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join("")}
      </ul>
      <button class="btn ${i === 2 ? "btn-primary" : "btn-outline"}" style="width:100%" onclick="addToCart('${plan.id}', 'hosting')">
        Choose Plan
      </button>
    </div>
  `).join("");
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  if (!container) return;
  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>Add some bots or hosting plans to get started.</p>
        <a href="bots.html" class="btn btn-primary" style="margin-top:20px">Browse Bots</a>
      </div>
    `;
    if (summary) summary.style.display = "none";
    return;
  }
  if (summary) summary.style.display = "block";
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon"><i class="fas ${item.icon}"></i></div>
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.type === "bot" ? "Discord Bot" : "Hosting Plan"}</p>
      </div>
      <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      <button class="cart-item-remove" onclick="removeFromCart(${typeof item.id === "string" ? "'" + item.id + "'" : item.id}, '${item.type}')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join("");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").textContent = "$" + total.toFixed(2);
}

function submitTicket(e) {
  e.preventDefault();
  const name = document.getElementById("ticket-name").value;
  const email = document.getElementById("ticket-email").value;
  const subject = document.getElementById("ticket-subject").value;
  const message = document.getElementById("ticket-message").value;
  if (!name || !email || !subject || !message) {
    showToast("Please fill all fields", true);
    return;
  }
  const tickets = JSON.parse(localStorage.getItem("botforge_tickets") || "[]");
  tickets.push({ name, email, subject, message, date: new Date().toISOString(), id: Date.now() });
  localStorage.setItem("botforge_tickets", JSON.stringify(tickets));
  showToast("Ticket submitted! We will reply soon.");
  e.target.reset();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Cart is empty", true);
    return;
  }
  showToast("Checkout successful! (Demo mode)");
  localStorage.removeItem("botforge_cart");
  updateCartCount();
  renderCart();
}

function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      q.parentElement.classList.toggle("open");
    });
  });
}

function initMobileNav() {
  const toggle = document.getElementById("mobile-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderPopularBots();
  renderAllBots();
  renderHosting();
  renderCart();
  initFAQ();
  initMobileNav();
});

// ===== CHECKOUT & AUTH =====
let currentUser = JSON.parse(localStorage.getItem("botforge_user") || "null");
let currentStep = 1;

function loginWithDiscord() {
  // DEMO: In production use Discord OAuth2
  // https://discord.com/developers/docs/topics/oauth2
  currentUser = {
    provider: "discord",
    name: "DiscordUser#" + Math.floor(Math.random() * 9999),
    email: "user" + Math.floor(Math.random() * 999) + "@discord.demo",
    id: "d_" + Date.now()
  };
  localStorage.setItem("botforge_user", JSON.stringify(currentUser));
  showLoggedIn();
  showToast("Logged in with Discord (demo)");
}

function loginWithGoogle() {
  // DEMO: In production use Google Identity Services / OAuth
  currentUser = {
    provider: "google",
    name: "Google User",
    email: "user" + Math.floor(Math.random() * 999) + "@gmail.demo",
    id: "g_" + Date.now()
  };
  localStorage.setItem("botforge_user", JSON.stringify(currentUser));
  showLoggedIn();
  showToast("Logged in with Google (demo)");
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem("botforge_user");
  document.getElementById("login-section").style.display = "block";
  document.getElementById("logged-in-box").style.display = "none";
  document.getElementById("step1-actions").style.display = "none";
  showToast("Logged out");
}

function showLoggedIn() {
  if (!currentUser) return;
  document.getElementById("login-section").style.display = "none";
  document.getElementById("logged-in-box").style.display = "block";
  document.getElementById("user-name").textContent = currentUser.name;
  document.getElementById("user-email").textContent = currentUser.email + " (" + currentUser.provider + ")";
  document.getElementById("step1-actions").style.display = "flex";
}

function goToStep(step) {
  const cart = getCart();
  if (step === 2 && cart.length === 0) {
    showToast("Cart is empty", true);
    return;
  }
  if (step === 2 && !currentUser) {
    const guestEmail = document.getElementById("guest-email")?.value;
    if (guestEmail && guestEmail.includes("@")) {
      currentUser = { provider: "guest", name: "Guest", email: guestEmail, id: "guest_" + Date.now() };
      localStorage.setItem("botforge_user", JSON.stringify(currentUser));
      showLoggedIn();
    } else {
      showToast("Please login or enter guest email", true);
      return;
    }
  }

  currentStep = step;
  document.getElementById("checkout-step-1").style.display = step === 1 ? "block" : "none";
  document.getElementById("checkout-step-2").style.display = step === 2 ? "block" : "none";
  document.getElementById("checkout-step-3").style.display = step === 3 ? "block" : "none";

  // Update indicators
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById("step-indicator-" + i);
    if (!el) continue;
    el.classList.remove("active", "completed");
    if (i === step) el.classList.add("active");
    else if (i < step) el.classList.add("completed");
  }

  if (step === 2) {
    const total = cart.reduce((s, i) => s + i.price, 0);
    const tEl = document.getElementById("step2-total");
    if (tEl) tEl.textContent = "$" + total.toFixed(2);
  }
}

function selectPayment(method) {
  document.getElementById("card-form").style.display = method === "card" ? "block" : "none";
  document.getElementById("paypal-form").style.display = method === "paypal" ? "block" : "none";
  document.getElementById("revolut-form").style.display = method === "revolut" ? "block" : "none";
}

function generateLicenseCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let part = () => Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return "BF-" + part() + "-" + part();
}

function processPayment() {
  const method = document.querySelector('input[name="payment"]:checked')?.value || "card";
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Cart is empty", true);
    return;
  }

  if (method === "card") {
    const name = document.getElementById("card-name")?.value?.trim();
    const number = document.getElementById("card-number")?.value?.replace(/\s/g, "");
    const expiry = document.getElementById("card-expiry")?.value?.trim();
    const cvv = document.getElementById("card-cvv")?.value?.trim();
    if (!name || !number || number.length < 13 || !expiry || !cvv || cvv.length < 3) {
      showToast("Please fill all card details correctly", true);
      return;
    }
  }

  // DEMO ONLY - no real charge
  const orderId = "BF-" + Date.now().toString(36).toUpperCase();
  const licenseCode = generateLicenseCode();

  // Save order (demo storage)
  const orders = JSON.parse(localStorage.getItem("botforge_orders") || "[]");
  orders.push({
    orderId,
    licenseCode,
    user: currentUser,
    items: cart,
    total: cart.reduce((s, i) => s + i.price, 0),
    method,
    date: new Date().toISOString(),
    status: "paid"
  });
  localStorage.setItem("botforge_orders", JSON.stringify(orders));

  // Show on confirmation page
  document.getElementById("order-id").textContent = orderId;
  const lic1 = document.getElementById("license-code");
  const lic2 = document.getElementById("license-code-2");
  if (lic1) lic1.textContent = licenseCode;
  if (lic2) lic2.textContent = licenseCode;

  // Clear cart
  localStorage.removeItem("botforge_cart");
  updateCartCount();

  goToStep(3);
  showToast("Payment successful! Code generated.");
}

function copyLicense() {
  const code = document.getElementById("license-code")?.textContent;
  if (!code) return;
  navigator.clipboard.writeText(code).then(() => {
    showToast("Code copied!");
  }).catch(() => {
    showToast("Could not copy", true);
  });
}

// Override original renderCart slightly for checkout flow
const _originalRenderCart = typeof renderCart === "function" ? renderCart : null;

function renderCart() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  if (!container) return;
  const cart = getCart();

  if (cart.length === 0 && currentStep !== 3) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>Add some bots or hosting plans to get started.</p>
        <a href="bots.html" class="btn btn-primary" style="margin-top:20px">Browse Bots</a>
      </div>
    `;
    if (summary) summary.style.display = "none";
    const actions = document.getElementById("step1-actions");
    if (actions) actions.style.display = "none";
    return;
  }

  if (summary && currentStep !== 3) summary.style.display = "block";

  if (cart.length > 0) {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-icon"><i class="fas ${item.icon}"></i></div>
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${item.type === "bot" ? "Discord Bot" : "Hosting Plan"}</p>
        </div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <button class="cart-item-remove" onclick="removeFromCart(${typeof item.id === "string" ? "'" + item.id + "'" : item.id}, '${item.type}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalEl = document.getElementById("cart-total");
    const finalEl = document.getElementById("cart-total-final");
    if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
    if (finalEl) finalEl.textContent = "$" + total.toFixed(2);
  }

  // Show continue button if logged in and has items
  if (currentUser && cart.length > 0 && currentStep === 1) {
    const actions = document.getElementById("step1-actions");
    if (actions) actions.style.display = "flex";
  }
}

// Init checkout extras
document.addEventListener("DOMContentLoaded", () => {
  if (currentUser) showLoggedIn();
  // Card number formatting
  const cardNum = document.getElementById("card-number");
  if (cardNum) {
    cardNum.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
    });
  }
  const cardExp = document.getElementById("card-expiry");
  if (cardExp) {
    cardExp.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
      e.target.value = v;
    });
  }
});
