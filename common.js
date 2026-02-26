(function () {
  const clockEl = document.getElementById("clock");
  const welcomeEl = document.getElementById("welcomeText");
  const themeBtn = document.getElementById("themeBtn");

  const isAlt = localStorage.getItem("hss_theme") === "alt";
  if (isAlt) document.body.classList.add("alt-theme");

  function updateClock() {
    if (!clockEl) return;
    clockEl.textContent = new Date().toLocaleTimeString("sw-TZ", { hour12: false });
  }

  function welcomeByTime() {
    if (!welcomeEl) return;
    const hour = new Date().getHours();
    if (hour < 12) welcomeEl.textContent = "Habari za asubuhi! Karibu Highland Secondary School.";
    else if (hour < 18) welcomeEl.textContent = "Habari za mchana! Endelea kujifunza kwa bidii.";
    else welcomeEl.textContent = "Habari za jioni! Kesho ni siku nyingine ya mafanikio.";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("alt-theme");
      localStorage.setItem("hss_theme", document.body.classList.contains("alt-theme") ? "alt" : "default");
    });
  }

  updateClock();
  welcomeByTime();
  setInterval(updateClock, 1000);
})();
