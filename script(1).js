// ===== BOTFORGE SCRIPT =====

const bots = [
  { id: 1,  name: "Guardian",      category: "Moderation",  icon: "fa-shield-alt",      desc: "Advanced auto-mod, anti-spam, warning system and custom filters.", price: 9.99,  stock: 25 },
  { id: 2,  name: "Melody",        category: "Music",        icon: "fa-music",           desc: "High-quality music playback with queue, playlists and filters.", price: 7.99,  stock: 40 },
  { id: 3,  name: "WelcomeBot",    category: "Utility",      icon: "fa-door-open",       desc: "Beautiful customizable welcome and leave messages with embeds.", price: 4.99,  stock: 50 },
  { id: 4,  name: "LevelUp",       category: "Engagement",   icon: "fa-chart-line",      desc: "XP system, ranks, leaderboards and custom level-up rewards.", price: 6.99,  stock: 30 },
  { id: 5,  name: "RaidShield",    category: "Moderation",   icon: "fa-user-shield",     desc: "Real-time anti-raid protection with lockdown and verification.", price: 12.99, stock: 15 },
  { id: 6,  name: "FunZone",       category: "Fun",          icon: "fa-gamepad",         desc: "Memes, games, would-you-rather, and hundreds of fun commands.", price: 5.99,  stock: 35 },
  { id: 7,  name: "EcoBot",        category: "Economy",      icon: "fa-coins",           desc: "Full economy system with shop, jobs, gambling and inventory.", price: 8.99,  stock: 20 },
  { id: 8,  name: "Analytics",     category: "Utility",      icon: "fa-chart-pie",       desc: "Server insights, message stats, growth charts and reports.", price: 9.99,  stock: 18 },
  { id: 9,  name: "RoleMaster",    category: "Utility",      icon: "fa-user-tag",        desc: "Reaction roles, temporary roles, role menus and automations.", price: 6.99,  stock: 28 },
  { id: 10, name: "Logger",        category: "Moderation",   icon: "fa-clipboard-list",  desc: "Complete audit logging for messages, members, channels and more.", price: 5.99,  stock: 32 },
  { id: 11, name: "Giveaway",      category: "Engagement",   icon: "fa-gift",            desc: "Create and manage giveaways with requirements and winners.", price: 4.99,  stock: 45 },
  { id: 12, name: "TicketPro",     category: "Support",      icon: "fa-ticket-alt",      desc: "Professional ticket system with panels, transcripts and claims.", price: 11.99, stock: 12 },
  { id: 13, name: "WeatherBot",    category: "Utility",      icon: "fa-cloud-sun",       desc: "Accurate weather forecasts, alerts and location-based info.", price: 3.99,  stock: 50 },
  { id: 14, name: "QuestRPG",      category: "Fun",          icon: "fa-dragon",          desc: "Full RPG experience with quests, monsters, items and guilds.", price: 10.99, stock: 10 },
  { id: 15, name: "InviteTracker", category: "Utility",      icon: "fa-link",            desc: "Track invites, rewards for inviters and detailed analytics.", price: 5.99,  stock: 22 },
  { id: 16, name: "Announce",      category: "Utility",      icon: "fa-bullhorn",        desc: "Scheduled announcements, embeds and auto-posting tools.", price: 4.99,  stock: 38 },
  { id: 17, name: "CustomCMD",     category: "Utility",      icon: "fa-terminal",        desc: "Create unlimited custom commands with variables and embeds.", price: 7.99,  stock: 25 },
  { id: 18, name: "Translate",     category: "Utility",      icon: "fa-language",        desc: "Auto-translate messages between 50+ languages instantly.", price: 6.99,  stock: 20 },
  { id: 19, name: "StatBot",       category: "Utility",      icon: "fa-server",          desc: "Live server stats channels, member counts and status displays.", price: 5.99,  stock: 30 },
  { id: 20, name: "Zenith",        category: "All-in-One",   icon: "fa-star",            desc: "Ultimate all-in-one bot combining moderation, music, economy and more.", price: 19.99, stock: 8 }
];

const hostingPlans = [
  { id: "h1", name: "Starter",  price: 2.99,  features: ["1 Bot", "Shared CPU", "512 MB RAM", "5 GB Storage", "Basic Support"] },
  { id: "h2", name: "Pro",      price: 7.99,  features: ["5 Bots", "2 vCPU", "2 GB RAM", "20 GB Storage", "Priority Support", "99.5% Uptime"] },
  { id: "h3", name: "Elite",    price: 14.99, features: ["15 Bots", "4 vCPU", "4 GB RAM", "50 GB Storage", "24/7 Support", "99.9% Uptime", "Custom Domain"] },
  { id: "h4", name: "Ultimate", price: 29.99, features: ["Unlimited Bots", "8 vCPU", "8 GB RAM", "100 GB Storage", "Dedicated Support", "99.99% Uptime", "DDoS Protection", "Full Root Access"] }
];

// ===== STOCK =====
function getStock(botId) {
  const saved = JSON.parse(localStorage.getItem("botforge_stock") || "{}");
  if (saved[botId] !== undefined) return saved[botId];
  const bot = bots.find(b => b.id === botId);
  return bot ? bot.stock : 0;
}

function setStock(botId, value) {
  const saved = JSON.parse(localStorage.getItem("botforge_stock") || "{}");
  saved[botId] = Math.max(0, value);
  localStorage.setItem("botforge_stock", JSON.stringify(saved));
}

// ===== CART =====
function getCart() {
  return JSON.parse(localStorage.getItem("botforge_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("botforge_cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, type) {
  type = type || "bot";
  const cart = getCart();
  const existing = cart.find(item => item.id === id && item.type === type);
  if (existing) {
    showToast("Already in cart!", true);
    return;
  }
  if (type === "bot") {
    const bot = bots.find(b => b.id === id);
    if (!bot) return;
    if (getStock(bot.id) <= 0) {
      showToast("This bot is sold out!", true);
      return;
    }
    cart.push({ id: bot.id, type: "bot", name: bot.name, price: bot.price, icon: bot.icon });
  } else {
    const plan = hostingPlans.find(p => p.id === id);
    if (!plan) return;
    cart.push({ id: plan.id, type: "hosting", name: plan.name + " Hosting", price: plan.price, icon: "fa-server" });
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
  document.querySelectorAll("#cart-count").forEach(function(el) {
    el.textContent = count;
  });
}

function showToast(msg, isError) {
  var toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = "toast" + (isError ? " error" : "") + " show";
  setTimeout(function() { toast.classList.remove("show"); }, 2500);
}

// ===== BOT CARDS =====
function createBotCard(bot) {
  var stock = getStock(bot.id);
  var outOfStock = stock <= 0;
  var lowStock = stock > 0 && stock <= 5;
  var stockBadge = "";
  if (outOfStock) {
    stockBadge = '<span class="stock-badge out">Sold Out</span>';
  } else if (lowStock) {
    stockBadge = '<span class="stock-badge low">Only ' + stock + ' left</span>';
  } else {
    stockBadge = '<span class="stock-badge ok">' + stock + ' in stock</span>';
  }
  var btn = outOfStock
    ? '<button class="btn btn-sm" disabled style="opacity:0.5;cursor:not-allowed">Sold Out</button>'
    : '<button class="btn btn-primary btn-sm" onclick="addToCart(' + bot.id + ')"><i class="fas fa-cart-plus"></i> Add</button>';

  return (
    '<div class="bot-card' + (outOfStock ? ' out-of-stock' : '') + '" data-category="' + bot.category + '">' +
      '<div class="bot-icon"><i class="fas ' + bot.icon + '"></i></div>' +
      '<h3>' + bot.name + '</h3>' +
      '<div class="bot-category">' + bot.category + '</div>' +
      '<p>' + bot.desc + '</p>' +
      stockBadge +
      '<div class="bot-footer">' +
        '<div class="bot-price">$' + bot.price + '<span>/mo</span></div>' +
        btn +
      '</div>' +
    '</div>'
  );
}

function renderPopularBots() {
  var container = document.getElementById("popular-bots");
  if (!container) return;
  var popular = [bots[0], bots[1], bots[4], bots[11]];
  container.innerHTML = popular.map(createBotCard).join("");
}

function renderAllBots() {
  var container = document.getElementById("bots-grid");
  if (!container) return;
  container.innerHTML = bots.map(createBotCard).join("");
}

function filterBots(category) {
  document.querySelectorAll(".filter-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-cat") === category);
  });
  document.querySelectorAll(".bot-card").forEach(function(card) {
    if (category === "All" || card.getAttribute("data-category") === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// ===== HOSTING =====
function renderHosting() {
  var container = document.getElementById("hosting-grid");
  if (!container) return;
  container.innerHTML = hostingPlans.map(function(plan, i) {
    var featured = i === 2;
    var features = plan.features.map(function(f) {
      return '<li><i class="fas fa-check"></i> ' + f + '</li>';
    }).join("");
    return (
      '<div class="hosting-card' + (featured ? ' featured' : '') + '">' +
        (featured ? '<div class="featured-badge">Most Popular</div>' : '') +
        '<h3>' + plan.name + '</h3>' +
        '<div class="hosting-price">$' + plan.price + '<span>/mo</span></div>' +
        '<ul class="hosting-features">' + features + '</ul>' +
        '<button class="btn ' + (featured ? 'btn-primary' : 'btn-outline') + '" style="width:100%" onclick="addToCart(\'' + plan.id + '\', \'hosting\')">Choose Plan</button>' +
      '</div>'
    );
  }).join("");
}

// ===== CART RENDER =====
function renderCart() {
  var container = document.getElementById("cart-items");
  var summary = document.getElementById("cart-summary");
  if (!container) return;

  var cart = getCart();
  var step = typeof currentStep !== "undefined" ? currentStep : 1;

  if (cart.length === 0 && step !== 3) {
    container.innerHTML =
      '<div class="empty-cart">' +
        '<i class="fas fa-shopping-cart"></i>' +
        '<h2>Your cart is empty</h2>' +
        '<p>Add some bots or hosting plans to get started.</p>' +
        '<a href="bots.html" class="btn btn-primary" style="margin-top:20px">Browse Bots</a>' +
      '</div>';
    if (summary) summary.style.display = "none";
    var actions = document.getElementById("step1-actions");
    if (actions) actions.style.display = "none";
    return;
  }

  if (summary && step !== 3) summary.style.display = "block";

  if (cart.length > 0) {
    container.innerHTML = cart.map(function(item) {
      var idArg = typeof item.id === "string" ? "'" + item.id + "'" : item.id;
      return (
        '<div class="cart-item">' +
          '<div class="cart-item-icon"><i class="fas ' + item.icon + '"></i></div>' +
          '<div class="cart-item-info">' +
            '<h3>' + item.name + '</h3>' +
            '<p>' + (item.type === "bot" ? "Discord Bot" : "Hosting Plan") + '</p>' +
          '</div>' +
          '<div class="cart-item-price">$' + item.price.toFixed(2) + '</div>' +
          '<button class="cart-item-remove" onclick="removeFromCart(' + idArg + ', \'' + item.type + '\')">' +
            '<i class="fas fa-trash"></i>' +
          '</button>' +
        '</div>'
      );
    }).join("");

    var total = cart.reduce(function(sum, item) { return sum + item.price; }, 0);
    var totalEl = document.getElementById("cart-total");
    var finalEl = document.getElementById("cart-total-final");
    if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
    if (finalEl) finalEl.textContent = "$" + total.toFixed(2);
  }

  if (currentUser && cart.length > 0 && step === 1) {
    var actions = document.getElementById("step1-actions");
    if (actions) actions.style.display = "flex";
  }
}

// ===== SUPPORT =====
function submitTicket(e) {
  e.preventDefault();
  var name = document.getElementById("ticket-name").value;
  var email = document.getElementById("ticket-email").value;
  var subject = document.getElementById("ticket-subject").value;
  var message = document.getElementById("ticket-message").value;
  if (!name || !email || !subject || !message) {
    showToast("Please fill all fields", true);
    return;
  }
  var tickets = JSON.parse(localStorage.getItem("botforge_tickets") || "[]");
  tickets.push({ name: name, email: email, subject: subject, message: message, date: new Date().toISOString(), id: Date.now() });
  localStorage.setItem("botforge_tickets", JSON.stringify(tickets));
  showToast("Ticket submitted! We will reply soon.");
  e.target.reset();
}

// ===== CHECKOUT & AUTH =====
var currentUser = JSON.parse(localStorage.getItem("botforge_user") || "null");
var currentStep = 1;

function loginWithDiscord() {
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
  var loginSec = document.getElementById("login-section");
  var loggedBox = document.getElementById("logged-in-box");
  var actions = document.getElementById("step1-actions");
  if (loginSec) loginSec.style.display = "block";
  if (loggedBox) loggedBox.style.display = "none";
  if (actions) actions.style.display = "none";
  showToast("Logged out");
}

function showLoggedIn() {
  if (!currentUser) return;
  var loginSec = document.getElementById("login-section");
  var loggedBox = document.getElementById("logged-in-box");
  var actions = document.getElementById("step1-actions");
  if (loginSec) loginSec.style.display = "none";
  if (loggedBox) {
    loggedBox.style.display = "block";
    var un = document.getElementById("user-name");
    var ue = document.getElementById("user-email");
    if (un) un.textContent = currentUser.name;
    if (ue) ue.textContent = currentUser.email + " (" + currentUser.provider + ")";
  }
  if (actions && getCart().length > 0) actions.style.display = "flex";
}

function goToStep(step) {
  var cart = getCart();
  if (step === 2 && cart.length === 0) {
    showToast("Cart is empty", true);
    return;
  }
  if (step === 2 && !currentUser) {
    var guestEmail = document.getElementById("guest-email");
    guestEmail = guestEmail ? guestEmail.value : "";
    if (guestEmail && guestEmail.indexOf("@") !== -1) {
      currentUser = { provider: "guest", name: "Guest", email: guestEmail, id: "guest_" + Date.now() };
      localStorage.setItem("botforge_user", JSON.stringify(currentUser));
      showLoggedIn();
    } else {
      showToast("Please login or enter guest email", true);
      return;
    }
  }

  currentStep = step;
  var s1 = document.getElementById("checkout-step-1");
  var s2 = document.getElementById("checkout-step-2");
  var s3 = document.getElementById("checkout-step-3");
  if (s1) s1.style.display = step === 1 ? "block" : "none";
  if (s2) s2.style.display = step === 2 ? "block" : "none";
  if (s3) s3.style.display = step === 3 ? "block" : "none";

  for (var i = 1; i <= 3; i++) {
    var el = document.getElementById("step-indicator-" + i);
    if (!el) continue;
    el.classList.remove("active", "completed");
    if (i === step) el.classList.add("active");
    else if (i < step) el.classList.add("completed");
  }

  if (step === 2) {
    var total = cart.reduce(function(s, item) { return s + item.price; }, 0);
    var tEl = document.getElementById("step2-total");
    if (tEl) tEl.textContent = "$" + total.toFixed(2);
  }
}

function selectPayment(method) {
  var card = document.getElementById("card-form");
  var paypal = document.getElementById("paypal-form");
  var revolut = document.getElementById("revolut-form");
  if (card) card.style.display = method === "card" ? "block" : "none";
  if (paypal) paypal.style.display = method === "paypal" ? "block" : "none";
  if (revolut) revolut.style.display = method === "revolut" ? "block" : "none";
}

function generateLicenseCode() {
  var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  function part() {
    var s = "";
    for (var i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }
  return "BF-" + part() + "-" + part();
}

function processPayment() {
  var methodEl = document.querySelector('input[name="payment"]:checked');
  var method = methodEl ? methodEl.value : "card";
  var cart = getCart();
  if (cart.length === 0) {
    showToast("Cart is empty", true);
    return;
  }

  if (method === "card") {
    var name = (document.getElementById("card-name") || {}).value || "";
    name = name.trim();
    var number = (document.getElementById("card-number") || {}).value || "";
    number = number.replace(/\s/g, "");
    var expiry = (document.getElementById("card-expiry") || {}).value || "";
    expiry = expiry.trim();
    var cvv = (document.getElementById("card-cvv") || {}).value || "";
    cvv = cvv.trim();
    if (!name || !number || number.length < 13 || !expiry || !cvv || cvv.length < 3) {
      showToast("Please fill all card details correctly", true);
      return;
    }
  }

  var orderId = "BF-" + Date.now().toString(36).toUpperCase();
  var licenseCode = generateLicenseCode();

  var orders = JSON.parse(localStorage.getItem("botforge_orders") || "[]");
  orders.push({
    orderId: orderId,
    licenseCode: licenseCode,
    user: currentUser,
    items: cart,
    total: cart.reduce(function(s, i) { return s + i.price; }, 0),
    method: method,
    date: new Date().toISOString(),
    status: "paid"
  });
  localStorage.setItem("botforge_orders", JSON.stringify(orders));

  var oid = document.getElementById("order-id");
  if (oid) oid.textContent = orderId;
  var lic1 = document.getElementById("license-code");
  var lic2 = document.getElementById("license-code-2");
  if (lic1) lic1.textContent = licenseCode;
  if (lic2) lic2.textContent = licenseCode;

  // Decrease stock
  cart.forEach(function(item) {
    if (item.type === "bot") {
      setStock(item.id, getStock(item.id) - 1);
    }
  });

  localStorage.removeItem("botforge_cart");
  updateCartCount();

  if (document.getElementById("bots-grid")) renderAllBots();
  if (document.getElementById("popular-bots")) renderPopularBots();

  goToStep(3);
  showToast("Payment successful! Code generated.");
}

function copyLicense() {
  var codeEl = document.getElementById("license-code");
  var code = codeEl ? codeEl.textContent : "";
  if (!code) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(function() {
      showToast("Code copied!");
    }).catch(function() {
      showToast("Could not copy", true);
    });
  } else {
    showToast("Code: " + code);
  }
}

// ===== FAQ & NAV =====
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(function(q) {
    q.addEventListener("click", function() {
      q.parentElement.classList.toggle("open");
    });
  });
}

function initMobileNav() {
  var toggle = document.getElementById("mobile-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function() {
      links.classList.toggle("open");
    });
  }
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function() {
  updateCartCount();
  renderPopularBots();
  renderAllBots();
  renderHosting();
  renderCart();
  initFAQ();
  initMobileNav();

  if (currentUser) showLoggedIn();

  var cardNum = document.getElementById("card-number");
  if (cardNum) {
    cardNum.addEventListener("input", function(e) {
      var v = e.target.value.replace(/\D/g, "").slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
    });
  }
  var cardExp = document.getElementById("card-expiry");
  if (cardExp) {
    cardExp.addEventListener("input", function(e) {
      var v = e.target.value.replace(/\D/g, "").slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
      e.target.value = v;
    });
  }
});
