/* =========================================================
   BUILDEASY PROFESSIONAL WEBSITE
========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const SUPPORT_NUMBER = "89278876";

const STORAGE = {
  suppliers: "buildeasy_suppliers",
  customers: "buildeasy_customers",
  materials: "buildeasy_materials",
  orders: "buildeasy_orders",
  language: "buildeasy_language",
  session: "buildeasy_session"
};


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
  localStorage.getItem(STORAGE.language) || "en";


const translations = {

  en: {

    navHome: "Home",
    navMaterials: "Materials",
    navSuppliers: "Suppliers",
    navHow: "How It Works",
    navSupplier: "Register as Supplier",

    login: "Login",
    getStarted: "Get Started",

    heroEyebrow: "Trusted construction material marketplace",
    heroTitle: "Build smarter. Buy better.",
    heroText:
      "Find trusted suppliers, choose the materials you need, and place your construction order through one simple platform.",

    startOrder: "Start an Order",
    viewSuppliers: "View Suppliers",

    quickOrder: "Quick Order",
    materialLabel: "Material",
    quantityLabel: "Quantity",
    unitLabel: "Unit",
    locationLabel: "Delivery location",
    continue: "Continue",

    locationPlaceholder: "City / Area / Full address",

    statSuppliers: "Registered suppliers",
    statMaterials: "Construction materials",
    statOrders: "Orders placed",
    statSupport: "Support access",

    materialsKicker: "BUILDING ESSENTIALS",
    materialsTitle: "Materials for every project",
    materialsText:
      "Choose the material you need and continue with your requirement.",
    orderMaterial: "Order material",

    workspaceTitle: "Place your material requirement",
    workspaceText:
      "Tell us what you need. Then choose an approved supplier.",
    backHome: "Back",

    requirementTitle: "Your requirement",
    requiredBy: "Required by",
    deliveryLocation: "Delivery location",
    projectType: "Project type",
    findSuppliers: "Find suppliers",

    chooseSupplier: "Choose your supplier",
    approvedSupplierText:
      "Only approved suppliers are shown here.",
    approvedOnly: "Approved supplier directory",
    approvedOnlyText:
      "Supplier profiles become visible after approval.",

    reviewOrder: "Review your order",

    supplierTitle: "Work with registered suppliers",
    supplierText:
      "Customers can choose from suppliers approved by BuildEasy.",
    becomeSupplier: "Become a supplier",

    supplierSupportTitle: "Supplier Support",
    supplierSupportText:
      "Suppliers can contact the BuildEasy team for registration and account support.",

    howTitle: "How BuildEasy works",
    howText: "A clear process from requirement to delivery.",

    step1Title: "Tell us what you need",
    step1Text:
      "Select the material, quantity, unit and delivery location.",

    step2Title: "Choose a supplier",
    step2Text:
      "Select from BuildEasy-approved supplier profiles.",

    step3Title: "Confirm your order",
    step3Text:
      "Review your order and submit it for confirmation.",

    step4Title: "Track delivery",
    step4Text:
      "Follow the order through confirmation, processing and delivery.",

    registerSupplierTitle: "Register your business with BuildEasy",
    registerSupplierText:
      "Submit your supplier information. Your profile will become visible to customers after BuildEasy approval.",

    supplierFormTitle: "Business information",

    supportTitle: "Need help with BuildEasy?",
    supportText:
      "Visitors, customers and suppliers can contact our support team."
  },


  bn: {

    navHome: "হোম",
    navMaterials: "সামগ্রী",
    navSuppliers: "সাপ্লায়ার",
    navHow: "কীভাবে কাজ করে",
    navSupplier: "সাপ্লায়ার রেজিস্টার",

    login: "লগইন",
    getStarted: "শুরু করুন",

    heroEyebrow: "বিশ্বস্ত নির্মাণ সামগ্রীর মার্কেটপ্লেস",
    heroTitle: "আরও স্মার্টভাবে নির্মাণ করুন। ভালোভাবে কিনুন।",
    heroText:
      "বিশ্বস্ত সাপ্লায়ার খুঁজুন, প্রয়োজনীয় নির্মাণ সামগ্রী নির্বাচন করুন এবং একটি সহজ প্ল্যাটফর্মের মাধ্যমে অর্ডার করুন।",

    startOrder: "অর্ডার শুরু করুন",
    viewSuppliers: "সাপ্লায়ার দেখুন",

    quickOrder: "দ্রুত অর্ডার",
    materialLabel: "সামগ্রী",
    quantityLabel: "পরিমাণ",
    unitLabel: "ইউনিট",
    locationLabel: "ডেলিভারি লোকেশন",
    continue: "চালিয়ে যান",

    locationPlaceholder: "শহর / এলাকা / সম্পূর্ণ ঠিকানা",

    statSuppliers: "নিবন্ধিত সাপ্লায়ার",
    statMaterials: "নির্মাণ সামগ্রী",
    statOrders: "অর্ডার",
    statSupport: "সাপোর্ট",

    materialsKicker: "নির্মাণের প্রয়োজনীয় সামগ্রী",
    materialsTitle: "প্রতিটি প্রজেক্টের জন্য সামগ্রী",
    materialsText:
      "প্রয়োজনীয় সামগ্রী নির্বাচন করে আপনার রিকোয়ারমেন্ট দিন।",
    orderMaterial: "সামগ্রী অর্ডার করুন",

    workspaceTitle: "আপনার সামগ্রীর প্রয়োজনীয়তা দিন",
    workspaceText:
      "আপনার কী প্রয়োজন তা জানান। তারপর অনুমোদিত সাপ্লায়ার নির্বাচন করুন।",
    backHome: "ফিরে যান",

    requirementTitle: "আপনার প্রয়োজনীয়তা",
    requiredBy: "প্রয়োজনের তারিখ",
    deliveryLocation: "ডেলিভারি ঠিকানা",
    projectType: "প্রজেক্টের ধরন",
    findSuppliers: "সাপ্লায়ার খুঁজুন",

    chooseSupplier: "আপনার সাপ্লায়ার নির্বাচন করুন",
    approvedSupplierText:
      "এখানে শুধুমাত্র অনুমোদিত সাপ্লায়ার দেখানো হয়।",
    approvedOnly: "অনুমোদিত সাপ্লায়ার",
    approvedOnlyText:
      "অনুমোদনের পর সাপ্লায়ার প্রোফাইল গ্রাহকদের কাছে দেখা যাবে।",

    reviewOrder: "আপনার অর্ডার যাচাই করুন",

    supplierTitle: "নিবন্ধিত সাপ্লায়ারের সাথে কাজ করুন",
    supplierText:
      "BuildEasy অনুমোদিত সাপ্লায়ারদের মধ্য থেকে গ্রাহক নির্বাচন করতে পারবেন।",
    becomeSupplier: "সাপ্লায়ার হন",

    supplierSupportTitle: "সাপ্লায়ার সাপোর্ট",
    supplierSupportText:
      "রেজিস্ট্রেশন এবং অ্যাকাউন্ট সংক্রান্ত সাহায্যের জন্য BuildEasy টিমের সাথে যোগাযোগ করুন।",

    howTitle: "BuildEasy কীভাবে কাজ করে",
    howText: "রিকোয়ারমেন্ট থেকে ডেলিভারি পর্যন্ত সহজ প্রক্রিয়া।",

    step1Title: "আপনার প্রয়োজন জানান",
    step1Text:
      "সামগ্রী, পরিমাণ, ইউনিট এবং ডেলিভারি লোকেশন নির্বাচন করুন।",

    step2Title: "সাপ্লায়ার নির্বাচন করুন",
    step2Text:
      "BuildEasy অনুমোদিত সাপ্লায়ারদের মধ্যে থেকে নির্বাচন করুন।",

    step3Title: "অর্ডার নিশ্চিত করুন",
    step3Text:
      "অর্ডারের তথ্য যাচাই করে কনফার্মেশনের জন্য পাঠান।",

    step4Title: "ডেলিভারি ট্র্যাক করুন",
    step4Text:
      "কনফার্মেশন, প্রসেসিং এবং ডেলিভারির অগ্রগতি দেখুন।",

    registerSupplierTitle: "BuildEasy-তে আপনার ব্যবসা রেজিস্টার করুন",
    registerSupplierText:
      "সাপ্লায়ারের তথ্য জমা দিন। BuildEasy অনুমোদনের পর আপনার প্রোফাইল গ্রাহকদের কাছে দেখা যাবে।",

    supplierFormTitle: "ব্যবসার তথ্য",

    supportTitle: "BuildEasy নিয়ে সাহায্য দরকার?",
    supportText:
      "ভিজিটর, গ্রাহক এবং সাপ্লায়ার আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে পারবেন।"
  }

};


/* =========================================================
   DEFAULT MATERIALS
========================================================= */

const defaultMaterials = [

  {
    id: "cement",
    nameEn: "Cement",
    nameBn: "সিমেন্ট",
    unit: "Bags",
    descriptionEn: "Construction-grade cement for concrete and structural work.",
    descriptionBn: "কংক্রিট এবং নির্মাণকাজের জন্য সিমেন্ট।",
    visual: "cement"
  },

  {
    id: "steel",
    nameEn: "Steel",
    nameBn: "স্টিল",
    unit: "Tons",
    descriptionEn: "Steel materials for structural reinforcement and construction.",
    descriptionBn: "স্ট্রাকচারাল রিইনফোর্সমেন্ট ও নির্মাণের জন্য স্টিল।",
    visual: "steel"
  },

  {
    id: "sand",
    nameEn: "Sand",
    nameBn: "বালি",
    unit: "CFT",
    descriptionEn: "Construction sand for concrete, plaster and masonry work.",
    descriptionBn: "কংক্রিট, প্লাস্টার এবং গাঁথুনির জন্য নির্মাণ বালি।",
    visual: "sand"
  },

  {
    id: "bricks",
    nameEn: "Bricks & Blocks",
    nameBn: "ইট ও ব্লক",
    unit: "Pieces",
    descriptionEn: "Bricks and blocks for walls, partitions and structural work.",
    descriptionBn: "দেয়াল ও নির্মাণকাজের জন্য ইট এবং ব্লক।",
    visual: "brick"
  },

  {
    id: "tiles",
    nameEn: "Tiles",
    nameBn: "টাইলস",
    unit: "Sq Ft",
    descriptionEn: "Tiles for floors, walls and finishing applications.",
    descriptionBn: "ফ্লোর, দেয়াল এবং ফিনিশিংয়ের জন্য টাইলস।",
    visual: "tile"
  },

  {
    id: "pipes",
    nameEn: "Pipes & Plumbing",
    nameBn: "পাইপ ও প্লাম্বিং",
    unit: "Pieces",
    descriptionEn: "Pipes and plumbing materials for construction projects.",
    descriptionBn: "নির্মাণ প্রকল্পের জন্য পাইপ এবং প্লাম্বিং সামগ্রী।",
    visual: "pipe"
  }

];


/* =========================================================
   DEFAULT SUPPLIERS
========================================================= */

const defaultSuppliers = [

  {
    id: "SUP-001",
    businessName: "Max Star Traders",
    ownerName: "Max Star Team",
    phone: "",
    email: "",
    businessType: "Construction Material Supplier",
    address: "Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "",
    categories: [
      "Cement",
      "Steel",
      "Sand",
      "Bricks & Blocks"
    ],
    description:
      "Registered construction material supplier serving building projects.",
    profileImage: "",
    status: "APPROVED",
    createdAt: "2026-01-01"
  },

  {
    id: "SUP-002",
    businessName: "BuildMart Supplies",
    ownerName: "BuildMart Team",
    phone: "",
    email: "",
    businessType: "Building Material Shop",
    address: "Howrah",
    city: "Howrah",
    state: "West Bengal",
    pincode: "",
    categories: [
      "Cement",
      "Sand",
      "Bricks & Blocks",
      "Tiles"
    ],
    description:
      "Building material supplier serving residential and commercial projects.",
    profileImage: "",
    status: "APPROVED",
    createdAt: "2026-01-02"
  },

  {
    id: "SUP-003",
    businessName: "ProBuild Materials",
    ownerName: "ProBuild Team",
    phone: "",
    email: "",
    businessType: "Distributor",
    address: "Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "",
    categories: [
      "Steel",
      "Tiles",
      "Pipes & Plumbing"
    ],
    description:
      "Professional construction material distribution business.",
    profileImage: "",
    status: "APPROVED",
    createdAt: "2026-01-03"
  }

];


/* =========================================================
   ORDER STATUS
========================================================= */

const ORDER_STATUS = {
  PENDING_CONFIRMATION: "PENDING_CONFIRMATION",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  DECLINED: "DECLINED",
  CANCELLED: "CANCELLED"
};


/* =========================================================
   APPLICATION STATE
========================================================= */

let materials = [];
let suppliers = [];
let customers = [];
let orders = [];
let currentAccount = null;

let selectedSupplier = null;

let supplierImageData = "";
let customerImageData = "";

let loginRole = "customer";


const order = {
  material: "",
  quantity: "",
  unit: "",
  location: "",
  requiredDate: "",
  projectType: "",
  supplier: null,
  orderId: "",
  orderDate: "",
  expectedDeliveryDate: "",
  quoteAccessToken: "",
  status: ORDER_STATUS.PENDING_CONFIRMATION
};


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

  initializeStorage();

  loadData();

  await loadMaterialsFromApi();
  await loadSuppliersFromApi();
  await restoreAccountSession();

  applyLanguage();

  populateMaterialSelects();

  renderMaterials();

  renderPublicSuppliers();

  renderSupplierCategoryChecks();

  setMinimumOrderDate();

  updateStats();

});


/* =========================================================
   DATABASE MATERIALS
========================================================= */

async function loadMaterialsFromApi() {
  try {
    const response = await fetch("/api/materials");
    if (!response.ok) throw new Error("Materials request failed.");
    const rows = await response.json();
    materials = rows.map(item => {
      const name = String(item.name || "Material");
      const visualName = `${name} ${item.nameBn || ""}`.toLowerCase();
      const allowedVisuals = ["cement", "steel", "sand", "brick", "tile", "pipe", "generic"];
      let visual = allowedVisuals.includes(item.visual) ? item.visual : "generic";
      // Existing database rows receive "generic" as the migration default.
      // Infer their original artwork from the material name in that case.
      if (visual === "generic") {
        if (visualName.includes("cement")) visual = "cement";
        else if (visualName.includes("steel")) visual = "steel";
        else if (visualName.includes("sand")) visual = "sand";
        else if (visualName.includes("brick")) visual = "brick";
        else if (visualName.includes("tile")) visual = "tile";
        else if (visualName.includes("pipe")) visual = "pipe";
      }
      return {
        id: String(item.id),
        nameEn: name,
        nameBn: String(item.nameBn || name),
        unit: String(item.defaultUnit || "Unit"),
        descriptionEn: String(item.description || `${name} construction material.`),
        descriptionBn: String(item.description || `${name} construction material.`),
        visual
      };
    });
  } catch (error) {
    console.error("Could not load database materials:", error);
    showToast("Could not reach the database. Showing demo materials.");
  }
}

/* =========================================================
   DATABASE SUPPLIERS
========================================================= */

async function loadSuppliersFromApi() {
  try {
    const response = await fetch("/api/suppliers");
    if (!response.ok) throw new Error("Suppliers request failed.");
    suppliers = await response.json();
  } catch (error) {
    console.error("Could not load database suppliers:", error);
    showToast("Could not load approved suppliers from the backend.");
  }
}

async function restoreAccountSession() {
  try {
    const response = await fetch('/api/auth/me');
    const data = await response.json();
    currentAccount = data.account || null;
    updateAccountHeader();
    if (currentAccount?.role === 'CUSTOMER') await loadMyOrders();
  } catch (error) { console.warn('Could not restore account session:', error); }
}

async function loadMyOrders() {
  const response = await fetch('/api/my/orders');
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Could not load your orders.');
  orders = data.map(row => ({
    databaseId: row.id, orderId: row.order_number, status: row.status,
    amount: Number(row.total_amount), location: row.delivery_location,
    expectedDeliveryDate: row.expected_delivery_date || 'Awaiting supplier',
    supplier: { businessName: row.supplier_name || 'Supplier' },
    items: row.items || [], timeline: row.timeline || [], quoteRequestId: row.quote_request_id,
    requestStatus: row.request_status, requiredDate: row.required_date, projectType: row.project_type
  }));
  updateStats();
  return orders;
}

/* =========================================================
   STORAGE
========================================================= */

function initializeStorage() {

  if (!localStorage.getItem(STORAGE.materials)) {
    save(STORAGE.materials, defaultMaterials);
  }

  if (!localStorage.getItem(STORAGE.suppliers)) {
    save(STORAGE.suppliers, defaultSuppliers);
  }

  if (!localStorage.getItem(STORAGE.customers)) {
    save(STORAGE.customers, []);
  }

  if (!localStorage.getItem(STORAGE.orders)) {
    save(STORAGE.orders, []);
  }

}


function loadData() {

  materials = load(STORAGE.materials, defaultMaterials);
  suppliers = load(STORAGE.suppliers, defaultSuppliers);
  customers = load(STORAGE.customers, []);
  orders = load(STORAGE.orders, []);

}


/* =========================================================
   SAFE STORAGE
========================================================= */

function save(key, value) {

  localStorage.setItem(key, JSON.stringify(value));

}


function load(key, fallback) {

  try {

    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);

  } catch (error) {

    console.error("Storage error:", error);

    return fallback;
  }

}


/* =========================================================
   SECURITY HELPERS
========================================================= */

function escapeHtml(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

  return escapeHtml(value)
    .replaceAll("\n", " ")
    .replaceAll("\r", " ");

}


/* =========================================================
   LANGUAGE
========================================================= */

function setLanguage(language) {

  if (!["en", "bn"].includes(language)) {
    language = "en";
  }

  currentLanguage = language;

  localStorage.setItem(STORAGE.language, language);

  applyLanguage();

  populateMaterialSelects();

  renderMaterials();

  renderPublicSuppliers();

  renderSupplierCategoryChecks();

  if (!document.getElementById("supplierScreen").classList.contains("hidden")) {
    renderSuppliers();
  }

}


function applyLanguage() {

  const dictionary = translations[currentLanguage];

  document.querySelectorAll("[data-i18n]").forEach(element => {

    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }

  });


  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

    const key = element.dataset.i18nPlaceholder;

    if (dictionary[key]) {
      element.placeholder = dictionary[key];
    }

  });


  document.getElementById("langEn")?.classList.toggle(
    "active",
    currentLanguage === "en"
  );

  document.getElementById("langBn")?.classList.toggle(
    "active",
    currentLanguage === "bn"
  );

  updateAccountHeader();

}

function getAccountDisplayName(account) {
  if (!account) return currentLanguage === "bn" ? "লগইন" : "Login";
  const fullName = account.role === "SUPPLIER" ? account.businessName : account.fullName;
  const name = String(fullName || account.email || "Account").trim();
  return name.length > 18 ? `${name.slice(0, 16)}…` : name;
}

function updateAccountHeader() {
  const label = getAccountDisplayName(currentAccount);
  const desktopButton = document.getElementById("accountHeaderButton");
  const mobileButton = document.getElementById("mobileAccountButton");
  if (desktopButton) {
    desktopButton.textContent = label;
    desktopButton.title = currentAccount?.email || label;
    desktopButton.setAttribute("aria-label", currentAccount ? `Account: ${label}` : label);
  }
  if (mobileButton) mobileButton.textContent = currentAccount ? `Account: ${label}` : label;
}

function openAccountMenu() {
  if (currentAccount?.role === "SUPPLIER") showSupplierAccount(currentAccount);
  else if (currentAccount?.role === "CUSTOMER") showCustomerAccount(currentAccount);
  else openLogin("customer");
}


function materialName(material) {

  return currentLanguage === "bn"
    ? material.nameBn
    : material.nameEn;

}


function materialDescription(material) {

  return currentLanguage === "bn"
    ? material.descriptionBn || material.descriptionEn
    : material.descriptionEn || material.descriptionBn;

}


/* =========================================================
   MATERIAL VISUAL
========================================================= */

function materialVisual(type) {

  const safeType = [
    "cement",
    "steel",
    "sand",
    "brick",
    "tile",
    "pipe",
    "generic"
  ].includes(type)
    ? type
    : "generic";

  return `
    <div class="material-art ${safeType}"></div>
  `;
}


/* =========================================================
   MATERIAL RENDER
========================================================= */

function renderMaterials() {

  const grid = document.getElementById("materialsGrid");

  if (!grid) return;

  grid.innerHTML = materials.map(material => `

    <article class="material-card">

      <div class="material-visual">
        ${materialVisual(material.visual)}
      </div>

      <div class="material-card-body">

        <h3>
          ${escapeHtml(materialName(material))}
        </h3>

        <p>
          ${escapeHtml(materialDescription(material))}
        </p>

        <div class="material-meta">

          <span class="unit-badge">
            ${escapeHtml(material.unit)}
          </span>

          <button
            class="material-order"
            onclick="selectMaterialAndStart('${escapeAttribute(material.id)}')"
          >
            ${currentLanguage === "bn" ? "অর্ডার করুন" : "Order"} →
          </button>

        </div>

      </div>

    </article>

  `).join("");

}


/* =========================================================
   MATERIAL SELECTS
========================================================= */

function populateMaterialSelects() {

  const selects = [
    document.getElementById("quickMaterial"),
    document.getElementById("orderMaterial")
  ];

  selects.forEach(select => {

    if (!select) return;

    const currentValue = select.value;

    select.innerHTML = `
      <option value="">
        ${currentLanguage === "bn"
          ? "সামগ্রী নির্বাচন করুন"
          : "Select material"}
      </option>
    `;

    materials.forEach(material => {

      const option = document.createElement("option");

      option.value = material.id;
      option.textContent = materialName(material);

      select.appendChild(option);

    });

    if (materials.some(material => material.id === currentValue)) {
      select.value = currentValue;
    }

  });


  updateUnitsForMaterial(
    document.getElementById("quickMaterial"),
    document.getElementById("quickUnit")
  );

  updateUnitsForMaterial(
    document.getElementById("orderMaterial"),
    document.getElementById("orderUnit")
  );

}


/* =========================================================
   UNIT HANDLING
========================================================= */

function updateUnitsForMaterial(materialSelect, unitSelect) {

  if (!materialSelect || !unitSelect) return;

  const material = materials.find(
    item => item.id === materialSelect.value
  );

  const oldValue = unitSelect.value;

  unitSelect.innerHTML = `
    <option value="">
      ${currentLanguage === "bn" ? "ইউনিট" : "Unit"}
    </option>
  `;

  if (!material) return;

  const option = document.createElement("option");

  option.value = material.unit;
  option.textContent = material.unit;

  unitSelect.appendChild(option);

  if (oldValue === material.unit) {
    unitSelect.value = oldValue;
  }

}


document.getElementById("quickMaterial")?.addEventListener(
  "change",
  () => {

    updateUnitsForMaterial(
      document.getElementById("quickMaterial"),
      document.getElementById("quickUnit")
    );

  }
);


document.getElementById("orderMaterial")?.addEventListener(
  "change",
  () => {

    updateUnitsForMaterial(
      document.getElementById("orderMaterial"),
      document.getElementById("orderUnit")
    );

  }
);


/* =========================================================
   START ORDER
========================================================= */

function startOrder() {

  document.getElementById("orderWorkspace").scrollIntoView({
    behavior: "smooth"
  });

  showRequirementScreen();

}


function selectMaterialAndStart(materialId) {

  const material = materials.find(
    item => item.id === materialId
  );

  if (!material) return;

  document.getElementById("orderMaterial").value = materialId;

  updateUnitsForMaterial(
    document.getElementById("orderMaterial"),
    document.getElementById("orderUnit")
  );

  startOrder();

}


function quickOrderStart() {

  const materialId =
    document.getElementById("quickMaterial").value;

  const quantity =
    document.getElementById("quickQuantity").value;

  const unit =
    document.getElementById("quickUnit").value;

  const location =
    document.getElementById("quickLocation").value.trim();


  if (!materialId || !quantity || !unit || !location) {

    showToast(
      currentLanguage === "bn"
        ? "দয়া করে সব তথ্য পূরণ করুন।"
        : "Please complete all order details."
    );

    return;
  }


  document.getElementById("orderMaterial").value = materialId;

  updateUnitsForMaterial(
    document.getElementById("orderMaterial"),
    document.getElementById("orderUnit")
  );

  document.getElementById("orderQuantity").value = quantity;
  document.getElementById("orderUnit").value = unit;
  document.getElementById("orderLocation").value = location;

  startOrder();

}


/* =========================================================
   REQUIREMENT
========================================================= */

async function continueToSuppliers() {

  const materialId = document.getElementById("orderMaterial").value;
  const quantity = document.getElementById("orderQuantity").value;
  const unit = document.getElementById("orderUnit").value;
  const location = document.getElementById("orderLocation").value.trim();
  const requiredDate = document.getElementById("orderDate").value;
  const projectType = document.getElementById("projectType").value;

  if (!materialId || !quantity || !unit || !location) {
    showToast(currentLanguage === "bn"
      ? "সামগ্রী, পরিমাণ, ইউনিট এবং ঠিকানা পূরণ করুন।"
      : "Please complete material, quantity, unit and location.");
    return;
  }

  if (Number(quantity) <= 0) {
    showToast(currentLanguage === "bn"
      ? "পরিমাণ সঠিকভাবে দিন।"
      : "Please enter a valid quantity.");
    return;
  }

  try {
    const response = await fetch("/api/quote-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        materialId,
        quantity,
        unit,
        deliveryLocation: location,
        requiredDate,
        projectType
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not save your requirement.");

    order.material = materialId;
    order.quantity = quantity;
    order.unit = unit;
    order.location = location;
    order.requiredDate = requiredDate;
    order.projectType = projectType;
    order.quoteRequestId = result.id;
    order.quoteAccessToken = result.guestAccessToken || "";
    selectedSupplier = null;
    order.supplier = null;

    renderRequirementSummary();
    showSupplierScreen();
  } catch (error) {
    showToast(error.message || "Could not connect to the BuildEasy backend.");
  }
}


function renderRequirementSummary() {

  const container =
    document.getElementById("requirementSummary");

  const material =
    materials.find(item => item.id === order.material);


  container.innerHTML = `

    <div class="summary-item">
      <span>Material</span>
      <strong>${escapeHtml(material ? materialName(material) : "")}</strong>
    </div>

    <div class="summary-item">
      <span>Quantity</span>
      <strong>${escapeHtml(order.quantity)} ${escapeHtml(order.unit)}</strong>
    </div>

    <div class="summary-item">
      <span>Delivery</span>
      <strong>${escapeHtml(order.location)}</strong>
    </div>

    <div class="summary-item">
      <span>Required</span>
      <strong>${escapeHtml(order.requiredDate || "Flexible")}</strong>
    </div>

    <div class="summary-item">
      <span>Project</span>
      <strong>${escapeHtml(order.projectType)}</strong>
    </div>

  `;

}


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function hideWorkspaceScreens() {

  [
    "requirementScreen",
    "supplierScreen",
    "reviewScreen",
    "orderSuccess"
  ].forEach(id => {

    document.getElementById(id)?.classList.add("hidden");

  });

}


function showRequirementScreen() {

  hideWorkspaceScreens();

  document
    .getElementById("requirementScreen")
    .classList.remove("hidden");

}


function showSupplierScreen() {

  hideWorkspaceScreens();

  document
    .getElementById("supplierScreen")
    .classList.remove("hidden");

  renderSuppliers();

}


function showReviewScreen() {

  hideWorkspaceScreens();

  document
    .getElementById("reviewScreen")
    .classList.remove("hidden");

}


function showOrderSuccessScreen() {

  hideWorkspaceScreens();

  document
    .getElementById("orderSuccess")
    .classList.remove("hidden");

}


/* =========================================================
   SUPPLIER CATEGORY CHECKBOXES
========================================================= */

function renderSupplierCategoryChecks() {

  const container =
    document.getElementById("supplierCategoryChecks");

  if (!container) return;

  container.innerHTML = materials.map(material => `

    <label class="checkbox-item">

      <input
        type="checkbox"
        name="supplierCategory"
        value="${escapeAttribute(material.nameEn)}"
      >

      <span>
        ${escapeHtml(materialName(material))}
      </span>

    </label>

  `).join("");

}


/* =========================================================
   SUPPLIER CATEGORY FILTER
========================================================= */

function populateSupplierCategoryFilter() {

  const select =
    document.getElementById("supplierCategoryFilter");

  if (!select) return;

  const current = select.value;

  select.innerHTML = `
    <option value="">
      ${currentLanguage === "bn"
        ? "সব ক্যাটাগরি"
        : "All categories"}
    </option>
  `;

  const categories = new Set();

  suppliers
    .filter(supplier => supplier.status === "APPROVED")
    .forEach(supplier => {

      supplier.categories.forEach(category => {
        categories.add(category);
      });

    });


  Array.from(categories)
    .sort()
    .forEach(category => {

      const option = document.createElement("option");

      option.value = category;
      option.textContent = getLocalizedCategory(category);

      select.appendChild(option);

    });


  if (categories.has(current)) {
    select.value = current;
  }

}


function getLocalizedCategory(category) {

  const material = materials.find(
    item => item.nameEn === category
  );

  return material
    ? materialName(material)
    : category;

}


/* =========================================================
   SUPPLIER RENDERING
========================================================= */

function renderSuppliers() {

  const grid =
    document.getElementById("suppliersGrid");

  if (!grid) return;

  populateSupplierCategoryFilter();


  const search =
    document.getElementById("supplierSearch")?.value
      .trim()
      .toLowerCase() || "";


  const category =
    document.getElementById("supplierCategoryFilter")?.value || "";


  const approvedSuppliers =
    suppliers.filter(supplier => {

      if (supplier.status !== "APPROVED") {
        return false;
      }

      const searchMatch =
        !search ||
        supplier.businessName.toLowerCase().includes(search) ||
        supplier.city.toLowerCase().includes(search) ||
        supplier.categories.some(
          item => item.toLowerCase().includes(search)
        );


      const categoryMatch =
        !category ||
        supplier.categories.includes(category);


      return searchMatch && categoryMatch;

    });


  if (!approvedSuppliers.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No approved suppliers match your search.
      </div>
    `;

    return;
  }


  grid.innerHTML =
    approvedSuppliers.map(supplier =>
      supplierCardHtml(supplier, true)
    ).join("");

}


function supplierCardHtml(supplier, chooseButton = false) {

  const initials =
    getInitials(supplier.businessName);


  const image =
    supplier.profileImage
      ? `<img src="${escapeAttribute(supplier.profileImage)}" alt="${escapeAttribute(supplier.businessName)}">`
      : `<span>${escapeHtml(initials)}</span>`;


  return `

    <article class="supplier-card">

      <div class="supplier-top">

        <div class="supplier-avatar">
          ${image}
        </div>

        <div class="supplier-info">

          <h3>
            ${escapeHtml(supplier.businessName)}
          </h3>

          <span class="verified-badge">
            ✓ Registered / Verified Supplier
          </span>

          <div class="supplier-location">
            ${escapeHtml(supplier.city)}, ${escapeHtml(supplier.state)}
          </div>

        </div>

      </div>


      <p class="supplier-description">
        ${escapeHtml(supplier.description || "Registered BuildEasy supplier.")}
      </p>


      <div class="category-tags">

        ${supplier.categories
          .slice(0, 6)
          .map(category => `
            <span class="category-tag">
              ${escapeHtml(getLocalizedCategory(category))}
            </span>
          `)
          .join("")}

      </div>


      <div class="supplier-card-footer">

        <span class="supplier-location">
          BuildEasy registered
        </span>

        ${
          chooseButton
            ? `
              <button
                class="choose-supplier-button"
                onclick="chooseSupplier('${escapeAttribute(supplier.id)}')"
              >
                ${currentLanguage === "bn"
                  ? "সাপ্লায়ার নির্বাচন"
                  : "Choose Supplier"}
              </button>
            `
            : ""
        }

      </div>

    </article>

  `;

}


function renderPublicSuppliers() {

  const grid =
    document.getElementById("publicSuppliersGrid");

  if (!grid) return;

  const approved =
    suppliers.filter(
      supplier => supplier.status === "APPROVED"
    );

  if (!approved.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No approved suppliers available.
      </div>
    `;

    return;
  }


  grid.innerHTML =
    approved
      .slice(0, 6)
      .map(supplier => supplierCardHtml(supplier, false))
      .join("");

}


/* =========================================================
   CHOOSE SUPPLIER
========================================================= */

function chooseSupplier(supplierId) {

  const supplier =
    suppliers.find(
      item =>
        item.id === supplierId &&
        item.status === "APPROVED"
    );


  if (!supplier) {

    showToast("This supplier is not available.");

    return;
  }


  selectedSupplier = supplier;

  order.supplier = supplier;

  renderReview();

  showReviewScreen();

  document.getElementById("orderWorkspace").scrollIntoView({
    behavior: "smooth"
  });

}


/* =========================================================
   REVIEW
========================================================= */

function renderReview() {

  const container =
    document.getElementById("reviewContent");

  const material =
    materials.find(item => item.id === order.material);


  container.innerHTML = `

    <div class="review-card">

      <div class="review-header">

        <span class="mini-kicker">
          ORDER REVIEW
        </span>

        <h3>
          ${escapeHtml(material ? materialName(material) : "")}
        </h3>

      </div>


      <div class="review-body">

        <div class="review-row">
          <span>Material</span>
          <strong>
            ${escapeHtml(material ? materialName(material) : "")}
          </strong>
        </div>

        <div class="review-row">
          <span>Quantity</span>
          <strong>
            ${escapeHtml(order.quantity)}
            ${escapeHtml(order.unit)}
          </strong>
        </div>

        <div class="review-row">
          <span>Delivery Location</span>
          <strong>
            ${escapeHtml(order.location)}
          </strong>
        </div>

        <div class="review-row">
          <span>Required By</span>
          <strong>
            ${escapeHtml(order.requiredDate || "Flexible")}
          </strong>
        </div>

        <div class="review-row">
          <span>Project Type</span>
          <strong>
            ${escapeHtml(order.projectType)}
          </strong>
        </div>

        <div class="review-row">
          <span>Supplier</span>
          <strong>
            ${escapeHtml(selectedSupplier.businessName)}
          </strong>
        </div>

      </div>


      <div class="review-footer">

        <button
          class="secondary-button"
          onclick="showRequirementScreen()"
        >
          Change Requirement
        </button>

        <button
          class="primary-button"
          onclick="placeOrder()"
        >
          Place Order →
        </button>

      </div>

    </div>

  `;

}


/* =========================================================
   PLACE ORDER
========================================================= */

async function placeOrder() {

  if (currentAccount?.role !== 'CUSTOMER') {
    showToast('Please create or sign in to your customer account before placing an order.');
    openLogin('customer');
    return;
  }

  if (!selectedSupplier) {

    showToast("Please select a supplier first.");

    return;
  }


  if (!order.quoteRequestId) {
    showToast("Please enter your material requirement again before placing this order.");
    return;
  }
  try {
    const response = await fetch("/api/orders", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quoteRequestId: order.quoteRequestId, guestAccessToken: order.quoteAccessToken, supplierId: selectedSupplier.id })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not save your order.");
    order.orderId = result.orderId;
    order.orderDate = getToday();
    order.expectedDeliveryDate = "To be confirmed";
    order.status = ORDER_STATUS.PENDING_CONFIRMATION;
    order.supplier = { id: selectedSupplier.id, businessName: selectedSupplier.businessName };
    order.databaseId = result.id;
    orders.unshift({ ...order });
    renderOrderSuccess(); showOrderSuccessScreen(); updateStats();
    showToast("Order saved. The supplier still needs to confirm its price and delivery date.");
  } catch (error) { showToast(error.message || "Could not connect to the BuildEasy backend."); }

}


/* =========================================================
   ORDER SUCCESS
========================================================= */

function renderOrderSuccess() {

  const container =
    document.getElementById("orderSuccessContent");


  const material =
    materials.find(item => item.id === order.material);


  const statusClass =
    getStatusClass(order.status);


  const statusLabel =
    getStatusLabel(order.status);


  container.innerHTML = `

    <div class="success-card">

      <div class="success-header">

        <div class="success-icon">
          ✓
        </div>

        <div>

          <span class="mini-kicker">
            ORDER SUBMITTED
          </span>

          <h2>
            Order received successfully
          </h2>

          <p>
            ${order.status === ORDER_STATUS.PENDING_CONFIRMATION ? 'The supplier will confirm the price and delivery date.' : order.status === ORDER_STATUS.CONFIRMED ? 'The supplier confirmed your price and delivery date.' : order.status === ORDER_STATUS.DECLINED ? 'The supplier declined this request. You can choose another supplier.' : order.status === ORDER_STATUS.CANCELLED ? 'This order has been cancelled.' : 'Your order is being fulfilled.'}
          </p>

        </div>

      </div>


      <div class="order-meta-grid">

        <div class="order-meta">
          <span>Order ID</span>
          <strong>${escapeHtml(order.orderId)}</strong>
        </div>

        <div class="order-meta">
          <span>Order Date</span>
          <strong>${escapeHtml(order.orderDate)}</strong>
        </div>

        <div class="order-meta">
          <span>Expected Delivery</span>
          <strong>${escapeHtml(order.expectedDeliveryDate)}</strong>
        </div>

        <div class="order-meta">
          <span>Supplier</span>
          <strong>
            ${escapeHtml(
              order.supplier?.businessName ||
              selectedSupplier?.businessName ||
              ""
            )}
          </strong>
        </div>

        <div class="order-meta">
          <span>Material</span>
          <strong>
            ${escapeHtml(material ? materialName(material) : "")}
          </strong>
        </div>

        <div class="order-meta">
          <span>Status</span>

          <strong>
            <span class="status-badge ${statusClass}">
              ${escapeHtml(statusLabel)}
            </span>
          </strong>

        </div>

      </div>


      <div class="order-meta-grid">

        <div class="order-meta">
          <span>Quantity</span>
          <strong>
            ${escapeHtml(order.quantity)}
            ${escapeHtml(order.unit)}
          </strong>
        </div>

        <div class="order-meta">
          <span>Delivery Location</span>
          <strong>
            ${escapeHtml(order.location)}
          </strong>
        </div>

        <div class="order-meta">
          <span>Project Type</span>
          <strong>
            ${escapeHtml(order.projectType)}
          </strong>
        </div>

      </div>


      <div class="timeline">

        ${timelineStep(
          "Confirmed",
          ORDER_STATUS.CONFIRMED
        )}

        ${timelineStep(
          "Processing",
          ORDER_STATUS.PROCESSING
        )}

        ${timelineStep(
          "Out for Delivery",
          ORDER_STATUS.OUT_FOR_DELIVERY
        )}

        ${timelineStep(
          "Delivered",
          ORDER_STATUS.DELIVERED
        )}

      </div>


      <div class="order-actions">

        ${
          canChangeOrder()
            ? `
              <button
                class="secondary-button"
                onclick="changeOrder()"
              >
                Change Order
              </button>
            `
            : ""
        }


        ${
          order.status === ORDER_STATUS.PENDING_CONFIRMATION
            ? `
              <button
                class="secondary-button"
                onclick="declineOrder()"
              >
                Decline Order
              </button>
            `
            : ""
        }

        ${
          [ORDER_STATUS.DECLINED, ORDER_STATUS.CANCELLED].includes(order.status)
            ? '<button class="primary-button" onclick="chooseAnotherSupplier()">Choose another supplier</button>'
            : ""
        }


        ${
          canCancelOrder()
            ? `
              <button
                class="cancel-button"
                onclick="cancelOrder()"
              >
                <span class="cancel-icon">×</span>
                Cancel Order
              </button>
            `
            : ""
        }

      </div>


      <div class="supplier-notice" style="margin-top:25px">

        <span>☎</span>

        <div>

          <strong>
            Need help?
          </strong>

          <p>
            Customer Support:
            <a href="tel:${SUPPORT_NUMBER}">
              ${SUPPORT_NUMBER}
            </a>
          </p>

        </div>

      </div>

    </div>

  `;

}

function chooseAnotherSupplier() {
  if (!order.quoteRequestId) {
    showToast('Start a new material request to choose a supplier.');
    return;
  }
  selectedSupplier = null;
  showSupplierScreen();
}


/* =========================================================
   TIMELINE
========================================================= */

function timelineStep(label, status) {

  const currentIndex =
    statusIndex(order.status);

  const stepIndex =
    statusIndex(status);


  const done =
    currentIndex >= stepIndex &&
    ![
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.DECLINED
    ].includes(order.status);


  const current =
    order.status === status;


  return `

    <div class="timeline-step ${done ? "done" : ""} ${current ? "current" : ""}">

      <div class="timeline-dot">
        ${done ? "✓" : "•"}
      </div>

      <strong>${escapeHtml(label)}</strong>

      <span>
        ${current ? "Current" : ""}
      </span>

    </div>

  `;

}


function statusIndex(status) {

  const statuses = [
    ORDER_STATUS.PENDING_CONFIRMATION,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.OUT_FOR_DELIVERY,
    ORDER_STATUS.DELIVERED
  ];

  return statuses.indexOf(status);

}


/* =========================================================
   ORDER ACTION RULES
========================================================= */

function canChangeOrder() {

  return order.status === ORDER_STATUS.PENDING_CONFIRMATION;

}


function canCancelOrder() {

  return (
    order.status !== ORDER_STATUS.OUT_FOR_DELIVERY &&
    order.status !== ORDER_STATUS.DELIVERED &&
    order.status !== ORDER_STATUS.CANCELLED &&
    order.status !== ORDER_STATUS.DECLINED
  );

}


/* =========================================================
   CHANGE ORDER
========================================================= */

function changeOrder() {

  if (!canChangeOrder()) {

    showToast(
      "Order changes are available only before team confirmation."
    );

    return;
  }


  document.getElementById("orderMaterial").value =
    order.material;

  updateUnitsForMaterial(
    document.getElementById("orderMaterial"),
    document.getElementById("orderUnit")
  );

  document.getElementById("orderQuantity").value =
    order.quantity;

  document.getElementById("orderUnit").value =
    order.unit;

  document.getElementById("orderLocation").value =
    order.location;

  document.getElementById("orderDate").value =
    order.requiredDate;

  document.getElementById("projectType").value =
    order.projectType;


  showRequirementScreen();

}


/* =========================================================
   DECLINE ORDER
========================================================= */

function declineOrder() {

  if (order.status !== ORDER_STATUS.PENDING_CONFIRMATION) {

    showToast(
      "Decline is available before confirmation."
    );

    return;
  }


  openConfirm(
    "Decline this order?",
    "This order is still waiting for confirmation.",
    "Yes, Decline",
    async function () {
      if (await updateStoredCurrentOrder(ORDER_STATUS.DECLINED)) {
        order.status = ORDER_STATUS.DECLINED;
        renderOrderSuccess();
        showToast("Order declined.");
      }

    }
  );

}


/* =========================================================
   CANCEL ORDER
========================================================= */

function cancelOrder() {

  if (!canCancelOrder()) {

    showToast(
      "This order can no longer be cancelled."
    );

    return;
  }


  openConfirm(
    "Cancel this order?",
    "You can cancel this order because it has not reached Out for Delivery.",
    "Yes, Cancel Order",
    async function () {
      if (await updateStoredCurrentOrder(ORDER_STATUS.CANCELLED)) {
        order.status = ORDER_STATUS.CANCELLED;
        renderOrderSuccess();
        showToast("Order cancelled successfully.");
      }

    }
  );

}


/* =========================================================
   UPDATE CURRENT STORED ORDER
========================================================= */

async function updateStoredCurrentOrder(status) {

  const index =
    orders.findIndex(
      item => item.orderId === order.orderId
    );


  if (index === -1 || !orders[index].databaseId) {
    showToast("This order is not available from the database in this browser session.");
    return false;
  }
  try {
    const response = await fetch(`/api/my/orders/${encodeURIComponent(orders[index].databaseId)}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not update your order.");
    orders[index] = { ...orders[index], status };
    updateStats();
    return true;
  } catch (error) {
    showToast(error.message || "Could not update your order.");
    return false;
  }

}


/* =========================================================
   STATUS LABEL
========================================================= */

function getStatusLabel(status) {

  const labels = {

    PENDING_CONFIRMATION: "Pending Confirmation",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
    DECLINED: "Declined",
    CANCELLED: "Cancelled"

  };


  return labels[status] || status;

}


function getStatusClass(status) {

  if (status === ORDER_STATUS.DELIVERED) {
    return "green";
  }

  if (
    status === ORDER_STATUS.CANCELLED ||
    status === ORDER_STATUS.DECLINED
  ) {
    return "red";
  }

  if (
    status === ORDER_STATUS.CONFIRMED ||
    status === ORDER_STATUS.PROCESSING ||
    status === ORDER_STATUS.OUT_FOR_DELIVERY
  ) {
    return "blue";
  }

  return "";

}


/* =========================================================
   SUPPLIER REGISTRATION
========================================================= */

async function registerSupplier(event) {
  event.preventDefault();
  const categories = Array.from(document.querySelectorAll('input[name="supplierCategory"]:checked')).map(input => input.value);
  if (!categories.length) {
    showToast("Select at least one material category.");
    return;
  }
  const fields = {
    businessName: document.getElementById("supplierBusinessName").value.trim(),
    ownerName: document.getElementById("supplierOwnerName").value.trim(),
    phone: document.getElementById("supplierPhone").value.trim(),
    email: document.getElementById("supplierEmail").value.trim().toLowerCase(),
    password: document.getElementById("supplierPassword").value,
    businessType: document.getElementById("supplierBusinessType").value,
    city: document.getElementById("supplierCity").value.trim(),
    state: document.getElementById("supplierState").value.trim(),
    pincode: document.getElementById("supplierPincode").value.trim(),
    address: document.getElementById("supplierAddress").value.trim(),
    description: document.getElementById("supplierDescription").value.trim(),
    categories
  };
  try {
    const response = await fetch("/api/auth/register/supplier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not register your supplier account.");
    currentAccount = result.account;
    updateAccountHeader();
    document.getElementById("supplierForm").reset();
    supplierImageData = "";
    document.getElementById("supplierImagePreview").innerHTML = "<span>+</span>";
    showSupplierRegistrationSuccess(result.account);
  } catch (error) {
    showToast(error.message || "Could not connect to the BuildEasy backend.");
  }
}


/* =========================================================
   SUPPLIER REGISTRATION SUCCESS
========================================================= */

function showSupplierRegistrationSuccess(supplier) {

  openConfirm(
    "REGISTRATION SUCCESSFUL",
    `
      <strong>${escapeHtml(supplier.businessName)}</strong><br><br>

      Status: Submitted<br>
      Account: Pending Approval<br><br>

      Please call our BuildEasy Head for supplier support:<br>
      <strong>${SUPPORT_NUMBER}</strong>
    `,
    "Call Supplier Support",
    function () {

      window.location.href =
        "tel:" + SUPPORT_NUMBER;

    }
  );

}


/* =========================================================
   IMAGE PREVIEW
========================================================= */

function readImageFile(file, callback) {

  if (!file) return;

  if (!file.type.startsWith("image/")) {

    showToast("Please select an image file.");

    return;
  }


  if (file.size > 2 * 1024 * 1024) {

    showToast(
      "Please use an image smaller than 2 MB."
    );

    return;
  }


  const reader =
    new FileReader();


  reader.onload = function () {

    callback(reader.result);

  };


  reader.readAsDataURL(file);

}


function previewSupplierImage(event) {

  const file =
    event.target.files?.[0];

  readImageFile(file, function(data) {

    supplierImageData = data;

    document.getElementById(
      "supplierImagePreview"
    ).innerHTML =
      `<img src="${escapeAttribute(data)}" alt="Supplier profile preview">`;

  });

}


function previewCustomerImage(event) {

  const file =
    event.target.files?.[0];

  readImageFile(file, function(data) {

    customerImageData = data;

    document.getElementById(
      "customerImagePreview"
    ).innerHTML =
      `<img src="${escapeAttribute(data)}" alt="Customer profile preview">`;

  });

}


/* =========================================================
   CUSTOMER REGISTER
========================================================= */

async function registerCustomer(event) {
  event.preventDefault();
  const fullName = document.getElementById("customerName").value.trim();
  const email = document.getElementById("customerEmail").value.trim().toLowerCase();
  const phone = document.getElementById("customerPhone").value.trim();
  const password = document.getElementById("customerPassword").value;
  try {
    const response = await fetch("/api/auth/register/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phone, password })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not create your account.");
    currentAccount = result.account;
    updateAccountHeader();
    customers = [result.account];
    closeModal("customerRegisterModal");
    document.querySelector("#customerRegisterModal form")?.reset();
    customerImageData = "";
    document.getElementById("customerImagePreview").innerHTML = "<span>+</span>";
    updateStats();
    showToast("Customer account created successfully.");
    showCustomerAccount(result.account);
  } catch (error) {
    showToast(error.message || "Could not connect to the BuildEasy backend.");
  }
}


/* =========================================================
   LOGIN
========================================================= */

function openLogin(role = "customer") {

  const requestedRole = role === 'supplier' ? 'SUPPLIER' : 'CUSTOMER';
  if (currentAccount?.role === requestedRole) {
    if (requestedRole === 'SUPPLIER') showSupplierAccount(currentAccount);
    else showCustomerAccount(currentAccount);
    return;
  }

  loginRole = role;

  document.getElementById("loginRole").value = role;

  document.getElementById("loginModalTitle").textContent =
    role === "supplier"
      ? "Supplier Login"
      : "Customer Login";

  document.getElementById("loginModalKicker").textContent =
    role === "supplier"
      ? "SUPPLIER ACCOUNT"
      : "CUSTOMER ACCOUNT";

  document.getElementById("loginModalText").textContent =
    role === "supplier"
      ? "Access your own supplier account."
      : "Access your BuildEasy customer account.";

  openModal("loginModal");

}


async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const role = loginRole === "supplier" ? "SUPPLIER" : "CUSTOMER";
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not sign in.");
    currentAccount = result.account;
    updateAccountHeader();
    closeModal("loginModal");
    document.querySelector("#loginModal form")?.reset();
    if (role === "SUPPLIER") showSupplierAccount(result.account);
    else {
      customers = [result.account];
      showCustomerAccount(result.account);
    }
  } catch (error) {
    showToast(error.message || "Could not connect to the BuildEasy backend.");
  }
}


function openRegisterFromLogin() {

  closeModal("loginModal");

  openModal("customerRegisterModal");

}


/* =========================================================
   SUPPLIER ACCOUNT
========================================================= */

function showSupplierAccount(supplier) {

  openConfirm(
    "Supplier Account",
    `
      <strong>${escapeHtml(supplier.businessName)}</strong><br><br>

      Account status:
      <strong>${escapeHtml(supplier.status)}</strong><br><br>

      City:
      ${escapeHtml(supplier.city)}<br>

      Email:
      ${escapeHtml(supplier.email)}<br><br>

      ${supplier.status === 'APPROVED' ? '<button class="primary-button full" onclick="showSupplierOrders()">Open my order desk</button><br><br>' : 'You will be able to manage orders after BuildEasy approves your supplier application.<br><br>'}
      <button class="secondary-button full" onclick="signOutAccount()">Sign out</button><br><br>

      Supplier support:
      <strong>${SUPPORT_NUMBER}</strong>
    `,
    "Call Supplier Support",
    function () {

      window.location.href =
        "tel:" + SUPPORT_NUMBER;

    }
  );

}


/* =========================================================
   CUSTOMER ACCOUNT
========================================================= */

function showCustomerAccount(customer) {

  const imageText =
    customer.profileImage
      ? `
        <img
          src="${escapeAttribute(customer.profileImage)}"
          alt="Customer profile"
          style="
            width:70px;
            height:70px;
            border-radius:16px;
            object-fit:cover;
            margin:0 auto 15px;
          "
        >
      `
      : "";


  openConfirm(
    "Customer Account",
    `
      ${imageText}

      <strong>${escapeHtml(customer.fullName)}</strong><br><br>

      ${escapeHtml(customer.email)}<br>

      ${
        customer.phone
          ? escapeHtml(customer.phone)
          : ""
      }

      <br><br>

      <button class="primary-button full" onclick="showMyOrders()">View my orders</button><br><br>
      <button class="secondary-button full" onclick="signOutAccount()">Sign out</button><br><br>
      Profile photo upload is not saved in this version.
    `,
    "Close",
    function () {}
  );

}

async function showMyOrders() {
  try {
    const customerOrders = await loadMyOrders();
    const content = customerOrders.length ? customerOrders.map(item => `
      <article class="admin-order-row" style="display:block;text-align:left;margin:10px 0;padding:14px;border:1px solid #dbe3ef;border-radius:12px">
        <strong>${escapeHtml(item.orderId)}</strong> · <span class="status-badge ${getStatusClass(item.status)}">${escapeHtml(getStatusLabel(item.status))}</span><br>
        <small>${(item.items || []).map(line => `${escapeHtml(line.materialName)} · ${escapeHtml(line.quantity)} ${escapeHtml(line.unit)}`).join('<br>')}</small><br>
        <small>Supplier: ${escapeHtml(item.supplier.businessName)} · Expected delivery: ${escapeHtml(item.expectedDeliveryDate)}</small><br>
        <strong>${item.amount > 0 ? `₹${item.amount.toFixed(2)}` : 'Price awaiting supplier confirmation'}</strong>
        ${(item.timeline || []).length ? `<br><small>Latest update: ${escapeHtml(item.timeline[item.timeline.length - 1].note || getStatusLabel(item.status))}</small>` : ''}
        ${['PENDING_CONFIRMATION','CONFIRMED','PROCESSING'].includes(item.status) ? `<br><button class="secondary-button" onclick="cancelHistoricalOrder(${Number(item.databaseId)})">Cancel order</button>` : ''}
        ${['DECLINED','CANCELLED'].includes(item.status) && item.requestStatus === 'open' ? `<button class="primary-button" onclick="selectSupplierAgain(${Number(item.databaseId)})">Choose another supplier</button>` : ''}
      </article>`).join('') : '<p>You have no saved orders yet.</p>';
    openConfirm('My Orders', `<div class="account-order-list">${content}</div>`, 'Close', function() {});
  } catch (error) { showToast(error.message || 'Could not load your orders.'); }
}

async function cancelHistoricalOrder(orderId) {
  try {
    const response = await fetch(`/api/my/orders/${encodeURIComponent(orderId)}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'CANCELLED' }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Could not cancel that order.');
    await showMyOrders();
  } catch (error) { showToast(error.message || 'Could not cancel that order.'); }
}

function selectSupplierAgain(orderId) {
  const previous = orders.find(item => Number(item.databaseId) === Number(orderId));
  const line = previous?.items?.[0];
  if (!previous || !line || previous.requestStatus !== 'open') {
    showToast('This request is no longer available to suppliers.');
    return;
  }
  order.material = String(line.materialId);
  order.quantity = line.quantity;
  order.unit = line.unit;
  order.location = previous.location;
  order.requiredDate = previous.requiredDate || '';
  order.projectType = previous.projectType || '';
  order.quoteRequestId = previous.quoteRequestId;
  order.quoteAccessToken = '';
  order.orderId = '';
  selectedSupplier = null;
  closeModal('confirmModal');
  renderRequirementSummary();
  showSupplierScreen();
}

async function showSupplierOrders() {
  try {
    const response = await fetch('/api/supplier/orders');
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not load supplier orders.');
    const content = data.length ? data.map(item => {
      const items = (item.items || []).map(line => `${escapeHtml(line.materialName)} · ${escapeHtml(line.quantity)} ${escapeHtml(line.unit)}`).join('<br>');
      const actions = item.status === 'PENDING_CONFIRMATION' ? `
        <form onsubmit="submitSupplierOffer(event, ${Number(item.id)})" style="text-align:left;margin-top:12px">
          <label>Price per unit (₹)<input name="unitPrice" type="number" min="0.01" step="0.01" required></label>
          <label>Expected delivery date<input name="expectedDeliveryDate" type="date" min="${getToday()}" required></label>
          <label>Note to customer (optional)<input name="note" maxlength="500"></label>
          <button class="primary-button full" type="submit">Confirm price and accept</button>
        </form>
        <button class="secondary-button" onclick="supplierUpdateOrder(${Number(item.id)}, 'DECLINE')">Decline order</button>` : item.status === 'CONFIRMED' ? `<button class="primary-button" onclick="supplierUpdateOrder(${Number(item.id)}, 'PROCESSING')">Mark processing</button>` : item.status === 'PROCESSING' ? `<button class="primary-button" onclick="supplierUpdateOrder(${Number(item.id)}, 'OUT_FOR_DELIVERY')">Mark out for delivery</button>` : item.status === 'OUT_FOR_DELIVERY' ? `<button class="primary-button" onclick="supplierUpdateOrder(${Number(item.id)}, 'DELIVERED')">Mark delivered</button>` : '';
      return `<article class="admin-order-row" style="display:block;text-align:left;margin:10px 0;padding:14px;border:1px solid #dbe3ef;border-radius:12px"><strong>${escapeHtml(item.order_number)}</strong> · ${escapeHtml(getStatusLabel(item.status))}<br><small>${items}<br>Deliver to: ${escapeHtml(item.delivery_location)}<br>Customer: ${escapeHtml(item.customer_name || 'Guest customer')}${item.required_date ? `<br>Requested by: ${escapeHtml(item.required_date)}` : ''}</small><br>${item.total_amount > 0 ? `<strong>Agreed total: ₹${Number(item.total_amount).toFixed(2)}</strong><br>` : ''}${actions}</article>`;
    }).join('') : '<p>No orders have been assigned to your supplier account yet.</p>';
    openConfirm('Supplier Order Desk', `<div class="account-order-list">${content}</div>`, 'Close', function() {});
  } catch (error) { showToast(error.message || 'Could not load supplier orders.'); }
}

async function submitSupplierOffer(event, orderId) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = new FormData(form);
  await supplierUpdateOrder(orderId, 'ACCEPT', { unitPrice: fields.get('unitPrice'), expectedDeliveryDate: fields.get('expectedDeliveryDate'), note: fields.get('note') });
}

async function supplierUpdateOrder(orderId, action, details = {}) {
  try {
    const response = await fetch(`/api/supplier/orders/${orderId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ...details }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Could not update this order.');
    showToast(`Order updated: ${getStatusLabel(result.status)}.`);
    await showSupplierOrders();
  } catch (error) { showToast(error.message || 'Could not update this order.'); }
}

async function signOutAccount() {
  try { await fetch('/api/auth/logout', { method: 'POST' }); } catch (_error) {}
  currentAccount = null;
  updateAccountHeader();
  orders = [];
  closeModal('confirmModal');
  closeAdminPanel();
  showToast('You have signed out.');
}


/* =========================================================
   ADMIN LOGIN
========================================================= */

function openAdminLogin() {

  openModal("adminLoginModal");

}


// The API checks the admin credentials and requires its session cookie
// on every admin data request. The first local admin login creates the account.

async function adminLogin(event) {
  event.preventDefault();
  const email = document.getElementById("adminEmail")?.value.trim().toLowerCase();
  const password = document.getElementById("adminPassword")?.value || "";
  try {
    const response = await fetch("/api/auth/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not sign in.");
    currentAccount = result.account;
    updateAccountHeader();
    closeModal("adminLoginModal"); await loadAdminData(); openAdminPanel();
  } catch (error) { showToast(error.message || "Could not connect to the BuildEasy backend."); }
}


/* =========================================================
   ADMIN PANEL
========================================================= */

function openAdminPanel() {

  document
    .getElementById("adminPanel")
    .classList.remove("hidden");


  renderAdmin();

}


function closeAdminPanel() {

  document
    .getElementById("adminPanel")
    .classList.add("hidden");

}


async function loadAdminData() {
  const endpoints = ["/api/admin/summary", "/api/admin/suppliers", "/api/admin/customers", "/api/admin/orders"];
  const responses = await Promise.all(endpoints.map(url => fetch(url)));
  const payloads = await Promise.all(responses.map(response => response.json()));
  const failed = responses.findIndex(response => !response.ok);
  if (failed >= 0) throw new Error(payloads[failed]?.error || "Could not load the admin dashboard.");
  const [summary, supplierRows, customerRows, orderRows] = payloads;
  window.buildEasyAdminSummary = summary;
  suppliers = supplierRows.map(row => ({ id: String(row.id), businessName: row.business_name, ownerName: row.contact_name || "", email: row.email || "", phone: row.phone || "", city: row.city || "", state: row.state || "", categories: row.categories || [], status: row.status, profileImage: "" }));
  customers = customerRows.map(row => ({ id: String(row.id), fullName: row.full_name, email: row.email, phone: row.phone || "" }));
  orders = orderRows.map(row => ({ databaseId: row.id, orderId: row.orderId, status: row.status, amount: row.amount, location: row.location, material: row.material, materialName: row.materialName, quantity: row.quantity, unit: row.unit, supplier: row.supplier }));
}

function renderAdmin() {

  document.getElementById("adminOrders").textContent =
    orders.length;

  document.getElementById("adminSuppliers").textContent =
    suppliers.length;

  document.getElementById("adminCustomers").textContent =
    customers.length;

  document.getElementById("adminMaterials").textContent =
    materials.length;


  renderAdminSuppliers();

  renderAdminMaterials();

  renderAdminOrders();

  renderAdminPeople();

}


/* =========================================================
   ADMIN SUPPLIERS
========================================================= */

function renderAdminSuppliers() {

  const container =
    document.getElementById("adminSupplierList");


  const pending =
    suppliers.filter(
      supplier => supplier.status === "PENDING"
    );


  if (!pending.length) {

    container.innerHTML = `
      <div class="empty-state">
        No suppliers are waiting for approval.
      </div>
    `;

    return;
  }


  container.innerHTML =
    pending.map(supplier => `

      <div class="admin-supplier-row">

        <div class="admin-avatar">

          ${
            supplier.profileImage
              ? `
                <img
                  src="${escapeAttribute(supplier.profileImage)}"
                  alt=""
                >
              `
              : escapeHtml(
                  getInitials(supplier.businessName)
                )
          }

        </div>


        <div class="admin-row-main">

          <strong>
            ${escapeHtml(supplier.businessName)}
          </strong>

          <small>
            ${escapeHtml(supplier.ownerName)}
            ·
            ${escapeHtml(supplier.city)}
            ·
            ${escapeHtml(supplier.email)}
          </small>

          <small>
            Categories:
            ${escapeHtml(supplier.categories.join(", "))}
          </small>

        </div>


        <div class="admin-row-actions">

          <button
            class="admin-small-button approve"
            onclick="approveSupplier('${escapeAttribute(supplier.id)}')"
          >
            Approve
          </button>

          <button
            class="admin-small-button reject"
            onclick="rejectSupplier('${escapeAttribute(supplier.id)}')"
          >
            Reject
          </button>

        </div>

      </div>

    `).join("");

}


async function approveSupplier(supplierId) {

  const supplier =
    suppliers.find(
      item => item.id === supplierId
    );


  if (!supplier) return;


  updateSupplierStatus(supplierId, "APPROVED");

}


async function rejectSupplier(supplierId) {

  const supplier =
    suppliers.find(
      item => item.id === supplierId
    );


  if (!supplier) return;


  updateSupplierStatus(supplierId, "REJECTED");

}

async function updateSupplierStatus(supplierId, status) {
  try {
    const response = await fetch(`/api/admin/suppliers/${encodeURIComponent(supplierId)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not update supplier.");
    await Promise.all([loadAdminData(), loadSuppliersFromApi()]);
    renderAdmin(); renderPublicSuppliers(); updateStats();
    showToast(`Supplier ${status.toLowerCase()}.`);
  } catch (error) { showToast(error.message || "Could not update supplier."); }
}


/* =========================================================
   ADMIN MATERIALS
========================================================= */

function toggleMaterialForm() {

  document
    .getElementById("materialAdminForm")
    .classList.toggle("hidden");

}


async function addMaterial() {

  const nameEn =
    document.getElementById("adminMaterialNameEn")
      .value
      .trim();

  const nameBn =
    document.getElementById("adminMaterialNameBn")
      .value
      .trim();

  const unit =
    document.getElementById("adminMaterialUnit")
      .value
      .trim();

  const visual =
    document.getElementById("adminMaterialVisual")
      .value;

  const description =
    document.getElementById("adminMaterialDescription")
      .value
      .trim();


  if (!nameEn || !unit) {

    showToast(
      "English material name and unit are required."
    );

    return;
  }


  try {
    const response = await fetch("/api/admin/materials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: nameEn, nameBn: nameBn || nameEn, unit, description, visual }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not add the material.");
    await loadMaterialsFromApi();
  } catch (error) { showToast(error.message || "Could not add the material."); return; }

  populateMaterialSelects();

  renderMaterials();

  renderSupplierCategoryChecks();

  renderAdmin();

  document
    .getElementById("materialAdminForm")
    .classList.add("hidden");


  document.getElementById("adminMaterialNameEn").value = "";
  document.getElementById("adminMaterialNameBn").value = "";
  document.getElementById("adminMaterialUnit").value = "";
  document.getElementById("adminMaterialDescription").value = "";


  showToast("Material added successfully.");

}


function renderAdminMaterials() {

  const container =
    document.getElementById("adminMaterialList");


  container.innerHTML =
    materials.map(material => `

      <div class="admin-material-row">

        <div class="admin-avatar">
          ${materialVisual(material.visual)}
        </div>

        <div class="admin-row-main">

          <strong>
            ${escapeHtml(material.nameEn)}
          </strong>

          <small>
            ${escapeHtml(material.nameBn)}
            ·
            Unit: ${escapeHtml(material.unit)}
          </small>

        </div>

      </div>

    `).join("");

}


/* =========================================================
   ADMIN ORDERS
========================================================= */

function renderAdminOrders() {

  const container =
    document.getElementById("adminOrderList");


  if (!orders.length) {

    container.innerHTML = `
      <div class="empty-state">
        No customer orders yet.
      </div>
    `;

    return;
  }


  container.innerHTML =
    orders
      .slice()
      .reverse()
      .map((storedOrder, index) => {

        const material =
          materials.find(
            item => item.id === storedOrder.material
          );


        return `

          <div class="admin-order-row">

            <div class="admin-row-main">

              <strong>
                ${escapeHtml(storedOrder.orderId)}
              </strong>

              <small>
                ${
                  escapeHtml(
                    material
                      ? material.nameEn
                      : storedOrder.material
                  )
                }

                ·

                ${escapeHtml(storedOrder.quantity)}
                ${escapeHtml(storedOrder.unit)}

                ·

                ${
                  escapeHtml(
                    storedOrder.supplier?.businessName || ""
                  )
                }
              </small>

              <small>
                Customer delivery:
                ${escapeHtml(storedOrder.location)}
              </small>

            </div>


            <div>

              <span class="status-badge ${getStatusClass(storedOrder.status)}">
                ${escapeHtml(getStatusLabel(storedOrder.status))}
              </span>

            </div>


            <div class="admin-row-actions">

              ${
                getNextOrderStatus(storedOrder.status)
                  ? `
                    <button
                      class="admin-small-button approve"
                      onclick="advanceOrderStatus('${escapeAttribute(storedOrder.orderId)}')"
                    >
                      Next Status
                    </button>
                  `
                  : ""
              }

            </div>

          </div>

        `;

      }).join("");

}


/* =========================================================
   ADMIN ORDER STATUS
========================================================= */

function getNextOrderStatus(status) {

  const next = {
    CONFIRMED:
      ORDER_STATUS.PROCESSING,

    PROCESSING:
      ORDER_STATUS.OUT_FOR_DELIVERY,

    OUT_FOR_DELIVERY:
      ORDER_STATUS.DELIVERED

  };


  return next[status] || null;

}


async function advanceOrderStatus(orderId) {

  const storedOrder =
    orders.find(
      item => item.orderId === orderId
    );


  if (!storedOrder) return;


  const next =
    getNextOrderStatus(storedOrder.status);


  if (!next) return;


  try {
    const response = await fetch(`/api/admin/orders/${encodeURIComponent(storedOrder.databaseId)}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: next }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not update order status.");
    storedOrder.status = next;
    renderAdmin(); updateStats();
  } catch (error) { showToast(error.message || "Could not update order status."); return; }


  if (order.orderId === orderId) {

    order.status = next;

    renderOrderSuccess();

  }


  showToast(
    "Order status updated to " +
    getStatusLabel(next)
  );

}


/* =========================================================
   ADMIN PEOPLE
========================================================= */

function renderAdminPeople() {

  const customerContainer =
    document.getElementById("adminCustomersList");

  const supplierContainer =
    document.getElementById("adminSuppliersDirectory");


  if (!customers.length) {

    customerContainer.innerHTML =
      `<div class="empty-state">No customers registered.</div>`;

  } else {

    customerContainer.innerHTML =
      customers.map(customer => `

        <div class="admin-person-row">

          <div class="admin-avatar">

            ${
              customer.profileImage
                ? `
                  <img
                    src="${escapeAttribute(customer.profileImage)}"
                    alt=""
                  >
                `
                : escapeHtml(
                    getInitials(customer.fullName)
                  )
            }

          </div>

          <div class="admin-row-main">

            <strong>
              ${escapeHtml(customer.fullName)}
            </strong>

            <small>
              ${escapeHtml(customer.email)}
            </small>

            <small>
              ${
                customer.phone
                  ? escapeHtml(customer.phone)
                  : "No phone provided"
              }
            </small>

          </div>

        </div>

      `).join("");

  }


  if (!suppliers.length) {

    supplierContainer.innerHTML =
      `<div class="empty-state">No suppliers registered.</div>`;

  } else {

    supplierContainer.innerHTML =
      suppliers.map(supplier => `

        <div class="admin-person-row">

          <div class="admin-avatar">

            ${
              supplier.profileImage
                ? `
                  <img
                    src="${escapeAttribute(supplier.profileImage)}"
                    alt=""
                  >
                `
                : escapeHtml(
                    getInitials(supplier.businessName)
                  )
            }

          </div>

          <div class="admin-row-main">

            <strong>
              ${escapeHtml(supplier.businessName)}
            </strong>

            <small>
              ${escapeHtml(supplier.email)}
            </small>

            <small>
              Status:
              ${escapeHtml(supplier.status)}
            </small>

          </div>

        </div>

      `).join("");

  }

}


/* =========================================================
   SUPPORT
========================================================= */

function callCustomerSupport() {

  window.location.href =
    "tel:" + SUPPORT_NUMBER;

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

  document
    .getElementById(id)
    ?.classList.remove("hidden");

}


function closeModal(id) {

  document
    .getElementById(id)
    ?.classList.add("hidden");

}


function openConfirm(
  title,
  text,
  actionLabel,
  action
) {

  const wide = title === 'My Orders' || title === 'Supplier Order Desk';
  document.querySelector('#confirmModal .modal-card')?.classList.toggle('wide', wide);
  document.getElementById('confirmText')?.classList.toggle('confirm-scroll', wide);

  document.getElementById(
    "confirmTitle"
  ).textContent = title;


  document.getElementById(
    "confirmText"
  ).innerHTML = text;


  const button =
    document.getElementById(
      "confirmActionButton"
    );


  button.textContent =
    actionLabel;


  button.onclick = function() {

    closeModal("confirmModal");

    action();

  };


  openModal("confirmModal");

}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

  document
    .getElementById("mobileMenu")
    .classList.toggle("open");

}


function closeMobileMenu() {

  document
    .getElementById("mobileMenu")
    .classList.remove("open");

}


/* =========================================================
   HOME
========================================================= */

function goHome() {

  hideWorkspaceScreens();

  document
    .getElementById("home")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================================================
   DATE HELPERS
========================================================= */

function getToday() {

  const date =
    new Date();

  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(date.getDate())
      .padStart(2, "0");

  return `${year}-${month}-${day}`;

}


function addDays(dateString, days) {

  const date =
    new Date(dateString + "T00:00:00");

  date.setDate(
    date.getDate() + days
  );


  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(date.getDate())
      .padStart(2, "0");


  return `${year}-${month}-${day}`;

}


function setMinimumOrderDate() {

  const input =
    document.getElementById("orderDate");

  if (input) {
    input.min = getToday();
  }

}


/* =========================================================
   INITIAL STATS
========================================================= */

function updateStats() {

  const approvedSuppliers =
    suppliers.filter(
      supplier => supplier.status === "APPROVED"
    ).length;


  const supplierStat =
    document.getElementById("statSuppliers");

  const materialStat =
    document.getElementById("statMaterials");

  const orderStat =
    document.getElementById("statOrders");


  if (supplierStat) {
    supplierStat.textContent =
      approvedSuppliers + "+";
  }

  if (materialStat) {
    materialStat.textContent =
      materials.length + "+";
  }

  if (orderStat) {
    orderStat.textContent =
      orders.length;
  }

}


/* =========================================================
   INITIAL PUBLIC SUPPLIER FILTER
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    populateSupplierCategoryFilter();

  }
);


/* =========================================================
   INITIAL ORDER MATERIAL LISTENERS
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const quickMaterial =
      document.getElementById("quickMaterial");

    const orderMaterial =
      document.getElementById("orderMaterial");


    quickMaterial?.addEventListener(
      "change",
      () => {

        updateUnitsForMaterial(
          quickMaterial,
          document.getElementById("quickUnit")
        );

      }
    );


    orderMaterial?.addEventListener(
      "change",
      () => {

        updateUnitsForMaterial(
          orderMaterial,
          document.getElementById("orderUnit")
        );

      }
    );

  }
);


/* =========================================================
   INITIAL SUPPLIER FILTER
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const search =
      document.getElementById("supplierSearch");

    search?.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {
          event.preventDefault();
        }

      }
    );

  }
);


/* =========================================================
   INITIAL PUBLIC SUPPLIER RENDER
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderPublicSuppliers();

  }
);


/* =========================================================
   INITIAL LANGUAGE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyLanguage();

  }
);


/* =========================================================
   UTILITY
========================================================= */

function getInitials(name) {

  const words =
    String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);


  if (!words.length) {
    return "BE";
  }


  if (words.length === 1) {

    return words[0]
      .slice(0, 2)
      .toUpperCase();

  }


  return (
    words[0][0] +
    words[1][0]
  ).toUpperCase();

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(message) {

  const toast =
    document.getElementById("toast");


  toast.textContent =
    message;


  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(
      () => {
        toast.classList.remove("show");
      },
      2800
    );

}


/* =========================================================
   WINDOW CLICK SAFETY
========================================================= */

window.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      document
        .querySelectorAll(".modal:not(.hidden)")
        .forEach(modal => {

          modal.classList.add("hidden");

        });

    }

  }
);


/* =========================================================
   FINAL DATA REFRESH
========================================================= */

function refreshEverything() {

  loadData();

  populateMaterialSelects();

  renderMaterials();

  renderPublicSuppliers();

  renderSupplierCategoryChecks();

  populateSupplierCategoryFilter();

  updateStats();

}


/* =========================================================
   EXPORT GLOBAL FUNCTIONS
========================================================= */

window.setLanguage = setLanguage;

window.startOrder = startOrder;
window.selectMaterialAndStart = selectMaterialAndStart;
window.quickOrderStart = quickOrderStart;

window.continueToSuppliers = continueToSuppliers;

window.showRequirementScreen = showRequirementScreen;
window.showSupplierScreen = showSupplierScreen;
window.showReviewScreen = showReviewScreen;

window.chooseSupplier = chooseSupplier;

window.placeOrder = placeOrder;
window.chooseAnotherSupplier = chooseAnotherSupplier;
window.changeOrder = changeOrder;
window.declineOrder = declineOrder;
window.cancelOrder = cancelOrder;

window.registerSupplier = registerSupplier;
window.previewSupplierImage = previewSupplierImage;

window.registerCustomer = registerCustomer;
window.previewCustomerImage = previewCustomerImage;

window.openLogin = openLogin;
window.handleLogin = handleLogin;
window.openRegisterFromLogin = openRegisterFromLogin;
window.showMyOrders = showMyOrders;
window.cancelHistoricalOrder = cancelHistoricalOrder;
window.selectSupplierAgain = selectSupplierAgain;
window.showSupplierOrders = showSupplierOrders;
window.submitSupplierOffer = submitSupplierOffer;
window.supplierUpdateOrder = supplierUpdateOrder;
window.signOutAccount = signOutAccount;

window.openAdminLogin = openAdminLogin;
window.adminLogin = adminLogin;

window.openAdminPanel = openAdminPanel;
window.closeAdminPanel = closeAdminPanel;

window.approveSupplier = approveSupplier;
window.rejectSupplier = rejectSupplier;

window.toggleMaterialForm = toggleMaterialForm;
window.addMaterial = addMaterial;

window.advanceOrderStatus = advanceOrderStatus;

window.callCustomerSupport = callCustomerSupport;

window.openModal = openModal;
window.closeModal = closeModal;
window.openConfirm = openConfirm;

window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;

window.goHome = goHome;
window.showToast = showToast;




