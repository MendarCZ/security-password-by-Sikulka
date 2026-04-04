function toggle(btn) {
  const content = btn.nextElementSibling;
  const isOpen = content.classList.contains("open");

  if (isOpen) {
    content.classList.remove("open");
    content.style.display = "none";
    btn.setAttribute("aria-expanded", "false");
  } else {
    content.style.display = "block";
    content.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }

  updateToggleLabels();
}

const LANGUAGE_STORAGE_KEY = "sikulka-security-language-v1";
const CHECKS_STORAGE_KEY = "sikulka-security-checks";

const TRANSLATIONS = {
  cs: {
    page_title: "Bezpečnost za 2 minuty",
    hero_title: "🔐 Bezpečnost za 2 minuty",
    hero_subtitle: "Neřeš blbosti. Udělej pár základních věcí a budeš bezpečnější než většina lidí.",
    hero_note: "Telefon tě chrání před ostatními. Záloha tě chrání před tebou.",
    show_all: "Zobrazit vše",
    hide_all: "Skrýt vše",
    reset: "Reset",
    done: "Hotovo",
    show_steps: "Zobrazit kroky",
    hide_steps: "Skrýt kroky",
    progress_label: "Máš hotovo",
    progress_suffix: "kroků",
    progress_complete: "Všechno hotovo",
    completion_message: "🎉 Hotovo. Teď jsi bezpečnější než většina lidí.",
    google_intro: "Gmail, YouTube a často i přístup k dalším účtům. Kdo má tvůj Google, může mít skoro všechno.",
    google_action: "Otevřít Google zabezpečení",
    google_step_1: "Najdi <strong>Dvoufázové ověření</strong>.",
    google_step_2: "Klikni na <strong>Zapnout</strong>.",
    google_step_3: "Nastav potvrzení přes telefon.",
    google_bonus: "<strong>Bonus:</strong> Ulož si záložní kódy. Když rozbiješ telefon, nezůstaneš venku.",
    meta_intro: "Meta účty lidi často podceňují. Přitom se přes ně dají dělat podvody, zprávy i převzetí profilu.",
    meta_action: "Otevřít Meta zabezpečení",
    meta_step_1: "Najdi <strong>Dvoufázové ověření</strong>.",
    meta_step_2: "Zapni ochranu přes telefon nebo aplikaci.",
    meta_bonus: "<strong>Bonus:</strong> Ulož si recovery kódy.",
    chatgpt_intro: "Konverzace, nápady, projekty a práce. Tohle už dávno není jen hračka.",
    chatgpt_action: "Otevřít ChatGPT zabezpečení",
    chatgpt_step_1: "Najdi <strong>Two-Factor Authentication</strong>.",
    chatgpt_step_2: "Klikni na <strong>Enable</strong>.",
    chatgpt_bonus: "<strong>Bonus:</strong> Ulož si backup kódy.",
    apple_intro: "Apple účet znamená iCloud, zařízení, fotky a další věci, o které nechceš přijít.",
    apple_action: "Otevřít Apple účet",
    apple_step_1: "Přihlas se.",
    apple_step_2: "Najdi <strong>Security</strong>.",
    apple_step_3: "Zapni <strong>Two-Factor Authentication</strong>.",
    email_title: "📧 Email",
    email_intro: "Email je základ všeho. Kdo má email, může resetovat hesla skoro kamkoliv.",
    email_step_1: "Přihlas se do svého emailu.",
    email_step_2: "Najdi <strong>Zabezpečení / Security</strong>.",
    email_step_3: "Zapni <strong>2FA</strong>.",
    email_bonus: "<strong>Bonus:</strong> Pokud to služba umožní, ulož si recovery kódy.",
    bank_title: "🏦 Banka",
    bank_intro: "Tady není potřeba kouzlit. Většinou stačí mít zapnuté to, co už banka nabízí.",
    bank_step_1: "Zkontroluj potvrzení přes mobil.",
    bank_step_2: "Nastav limity na kartě.",
    bank_step_3: "Vypni internetové platby, když je nepotřebuješ.",
    bank_bonus: "<strong>Realita:</strong> Není to 100 %, ale za minimum práce dostaneš hodně silnou ochranu.",
    windows_intro: "Když někdo sedí přímo u tvého počítače, je pozdě řešit, proč tam není PIN nebo heslo.",
    windows_step_1: "Stiskni <strong>Win + R</strong>.",
    windows_step_2: "Vlož <code>ms-settings:signinoptions</code>",
    windows_step_3: "Nastav PIN nebo heslo.",
    passwords_title: "🔑 Hesla",
    passwords_intro: "Největší klasika internetu: stejné heslo všude a pak překvapení, že je průser.",
    passwords_step_1: "Nepoužívej stejné heslo všude.",
    passwords_step_2: "Nepoužívej kraviny jako <strong>123456</strong>.",
    passwords_step_3: "Používej radši delší větu než krátké heslo.",
    passwords_bonus: "<strong>Příklad:</strong> <code>PesSkacePoStrese2024!</code>"
  },
  en: {
    page_title: "Security in 2 Minutes",
    hero_title: "🔐 Security in 2 Minutes",
    hero_subtitle: "Skip the noise. Do a few basic things and you'll be safer than most people online.",
    hero_note: "Your phone protects you from other people. Backups protect you from yourself.",
    show_all: "Show all",
    hide_all: "Hide all",
    reset: "Reset",
    done: "Done",
    show_steps: "Show steps",
    hide_steps: "Hide steps",
    progress_label: "You have completed",
    progress_suffix: "steps",
    progress_complete: "Everything completed",
    completion_message: "🎉 Done. You are now safer than most people online.",
    google_intro: "Gmail, YouTube, and often access to many other accounts too. If someone gets your Google account, they can get almost everything.",
    google_action: "Open Google security",
    google_step_1: "Find <strong>2-Step Verification</strong>.",
    google_step_2: "Click <strong>Turn on</strong>.",
    google_step_3: "Set up phone-based confirmation.",
    google_bonus: "<strong>Bonus:</strong> Save your backup codes. If your phone breaks, you won't get locked out.",
    meta_intro: "People often underestimate Meta accounts. But they can still be used for scams, messages, and full profile takeover.",
    meta_action: "Open Meta security",
    meta_step_1: "Find <strong>Two-Factor Authentication</strong>.",
    meta_step_2: "Enable protection with your phone or an authenticator app.",
    meta_bonus: "<strong>Bonus:</strong> Save your recovery codes.",
    chatgpt_intro: "Conversations, ideas, projects, and work. This stopped being just a toy a long time ago.",
    chatgpt_action: "Open ChatGPT security",
    chatgpt_step_1: "Find <strong>Two-Factor Authentication</strong>.",
    chatgpt_step_2: "Click <strong>Enable</strong>.",
    chatgpt_bonus: "<strong>Bonus:</strong> Save your backup codes.",
    apple_intro: "Your Apple account means iCloud, devices, photos, and a lot of things you really don't want to lose.",
    apple_action: "Open Apple account",
    apple_step_1: "Sign in.",
    apple_step_2: "Find <strong>Security</strong>.",
    apple_step_3: "Enable <strong>Two-Factor Authentication</strong>.",
    email_title: "📧 Email",
    email_intro: "Email is the foundation of everything. If someone gets your email, they can reset passwords almost anywhere.",
    email_step_1: "Sign in to your email account.",
    email_step_2: "Find <strong>Security</strong> settings.",
    email_step_3: "Enable <strong>2FA</strong>.",
    email_bonus: "<strong>Bonus:</strong> If the service allows it, save your recovery codes.",
    bank_title: "🏦 Bank",
    bank_intro: "No magic needed here. In most cases, it's enough to enable the protections your bank already offers.",
    bank_step_1: "Make sure transaction approval through your phone is enabled.",
    bank_step_2: "Set card limits.",
    bank_step_3: "Disable online payments when you don't need them.",
    bank_bonus: "<strong>Reality:</strong> It's not 100%, but for very little effort you get very strong protection.",
    windows_intro: "If someone is physically at your computer, it's too late to wonder why there is no PIN or password.",
    windows_step_1: "Press <strong>Win + R</strong>.",
    windows_step_2: "Type <code>ms-settings:signinoptions</code>",
    windows_step_3: "Set a PIN or password.",
    passwords_title: "🔑 Passwords",
    passwords_intro: "The oldest internet classic: using the same password everywhere and then acting surprised when it all goes wrong.",
    passwords_step_1: "Don't use the same password everywhere.",
    passwords_step_2: "Don't use nonsense like <strong>123456</strong>.",
    passwords_step_3: "Use a longer phrase instead of a short password.",
    passwords_bonus: "<strong>Example:</strong> <code>MyDogJumpsOnTheRoof2024!</code>"
  }
};

function expandAll() {
  document.querySelectorAll(".content").forEach((content) => {
    content.style.display = "block";
    content.classList.add("open");
  });

  document.querySelectorAll(".card > button").forEach((btn) => {
    btn.setAttribute("aria-expanded", "true");
  });

  updateToggleLabels();
}

function collapseAll() {
  document.querySelectorAll(".content").forEach((content) => {
    content.style.display = "none";
    content.classList.remove("open");
  });

  document.querySelectorAll(".card > button").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
  });

  updateToggleLabels();
}

function saveChecks() {
  const data = {};
  document.querySelectorAll('input[type="checkbox"][data-check]').forEach((input) => {
    data[input.dataset.check] = input.checked;
  });
  localStorage.setItem(CHECKS_STORAGE_KEY, JSON.stringify(data));
  updateCardStates();
  updateProgress();
}

function loadChecks() {
  const raw = localStorage.getItem(CHECKS_STORAGE_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    document.querySelectorAll('input[type="checkbox"][data-check]').forEach((input) => {
      input.checked = !!data[input.dataset.check];
    });
  } catch (e) {
    console.warn("Nepodařilo se načíst checkboxy.");
  }
}

function resetChecks() {
  document.querySelectorAll('input[type="checkbox"][data-check]').forEach((input) => {
    input.checked = false;
  });
  saveChecks();
}

function updateCardStates() {
  document.querySelectorAll(".card").forEach((card) => {
    const input = card.querySelector('input[type="checkbox"][data-check]');
    if (!input) return;
    card.classList.toggle("done", input.checked);
  });
}

function updateToggleLabels() {
  const lang = getCurrentLanguage();
  const copy = TRANSLATIONS[lang] || TRANSLATIONS.cs;

  document.querySelectorAll(".content").forEach((content) => {
    const button = content.previousElementSibling;
    if (!button || button.tagName !== "BUTTON") return;
    const key = content.style.display === "block" ? "hide_steps" : "show_steps";
    button.textContent = copy[key];
  });
}

function getCurrentLanguage() {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "cs";
}

function applyLanguage(lang) {
  const copy = TRANSLATIONS[lang] || TRANSLATIONS.cs;
  document.documentElement.lang = lang;
  document.title = copy.page_title;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (copy[key]) el.textContent = copy[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (copy[key]) el.innerHTML = copy[key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  updateToggleLabels();
  updateProgress();
}

function setLanguage(lang) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  applyLanguage(lang);
}

function updateProgress() {
  const checks = document.querySelectorAll('input[type="checkbox"][data-check]');
  const total = checks.length;
  const done = Array.from(checks).filter((c) => c.checked).length;
  const percent = total === 0 ? 0 : (done / total) * 100;

  const lang = getCurrentLanguage();
  const copy = TRANSLATIONS[lang] || TRANSLATIONS.cs;

  const countEl = document.getElementById("progress-count");
  const totalEl = document.getElementById("progress-total");
  const fillEl = document.getElementById("progress-fill");
  const labelEl = document.getElementById("progress-label");
  const suffixEl = document.getElementById("progress-suffix");
  const bannerEl = document.getElementById("completion-banner");

  if (countEl) countEl.textContent = done;
  if (totalEl) totalEl.textContent = total;
  if (fillEl) fillEl.style.width = percent + "%";

  const finished = total > 0 && done === total;

  if (labelEl) {
    labelEl.textContent = finished ? copy.progress_complete : copy.progress_label;
  }

  if (suffixEl) {
    suffixEl.textContent = finished ? "🎉" : copy.progress_suffix;
  }

  if (bannerEl) {
    bannerEl.hidden = !finished;
    bannerEl.textContent = copy.completion_message;
  }

  setMascotCompleteState(finished);
}

function setMascotCompleteState(isComplete) {
  const eyebrows = document.getElementById("eyebrows");
  const mouth = document.getElementById("mouth");
  const mascot = document.getElementById("sikulka");
  if (!mascot) return;

  if (isComplete) {
    mascot.dataset.expression = "happy";
    if (eyebrows) eyebrows.src = "avatar/oboci_neutral.png";
    if (mouth) {
      mouth.style.transform =
        "translate(calc(var(--mouth-x) + 0px), calc(var(--mouth-y) + -2px)) scaleX(1.04) scaleY(1.08)";
    }
  } else {
    mascot.dataset.expression = "smile";
    if (eyebrows) eyebrows.src = "avatar/oboci_neutral.png";
    if (mouth) mouth.style.transform = "";
  }
}

function startMascotBlink() {
  const eyes = document.getElementById("eyes");
  if (!eyes) return;

  const frames = [
    "avatar/oci_open.png",
    "avatar/oci_half.png",
    "avatar/oci_closed.png",
    "avatar/oci_half.png",
    "avatar/oci_open.png"
  ];

  const setFrame = (index) => {
    eyes.src = frames[index];
  };

  const runBlink = () => {
    const steps = [0, 1, 2, 3, 4];
    steps.forEach((frameIndex, i) => {
      setTimeout(() => setFrame(frameIndex), i * 80);
    });

    const nextDelay = 1800 + Math.random() * 2600;
    setTimeout(runBlink, nextDelay);
  };

  setFrame(0);
  setTimeout(runBlink, 900 + Math.random() * 900);
}

document.addEventListener("DOMContentLoaded", () => {
  loadChecks();
  startMascotBlink();
  applyLanguage(getCurrentLanguage());
  updateCardStates();
  updateProgress();

  document.querySelectorAll(".card > button").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("type", "button");
  });

  document.querySelectorAll('input[type="checkbox"][data-check]').forEach((input) => {
    input.addEventListener("change", saveChecks);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
