(function () {
  const form = document.getElementById("registerForm");
  const msg = document.getElementById("registerMsg");
  const recentWrap = document.getElementById("recentStudents");
  const storageKey = "hss_students";

  function getStudents() {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  }

  function setStudents(students) {
    localStorage.setItem(storageKey, JSON.stringify(students));
  }

  function showMessage(text, good) {
    msg.textContent = text;
    msg.className = "msg " + (good ? "ok" : "bad");
  }

  function renderRecent() {
    const students = getStudents().slice(-5).reverse();
    if (!students.length) {
      recentWrap.innerHTML = "<p>Hakuna student bado.</p>";
      return;
    }

    recentWrap.innerHTML = students
      .map(function (s) {
        return "<div class='list-item'><strong>" + s.fullName + "</strong><br>Reg: " + s.regNo + " | " + s.classLevel + "</div>";
      })
      .join("");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = {
      fullName: document.getElementById("fullName").value.trim(),
      regNo: document.getElementById("regNo").value.trim().toUpperCase(),
      classLevel: document.getElementById("classLevel").value.trim(),
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      createdAt: new Date().toISOString()
    };

    const students = getStudents();
    const exists = students.some(function (s) { return s.regNo === student.regNo; });

    if (exists) {
      showMessage("Reg No tayari ipo.", false);
      return;
    }

    students.push(student);
    setStudents(students);
    form.reset();
    showMessage("Student amehifadhiwa vizuri.", true);
    renderRecent();
  });

  renderRecent();
})();
