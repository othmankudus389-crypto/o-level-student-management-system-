(function () {
  const wrap = document.getElementById("studentsTableWrap");
  const searchInput = document.getElementById("searchInput");
  const storageKey = "hss_students";

  function getStudents() {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  }

  function saveStudents(students) {
    localStorage.setItem(storageKey, JSON.stringify(students));
  }

  function removeStudent(regNo) {
    const students = getStudents().filter(function (s) { return s.regNo !== regNo; });
    saveStudents(students);
    render(searchInput.value.trim());
  }

  function render(query) {
    const q = (query || "").toLowerCase();
    const students = getStudents().filter(function (s) {
      return s.fullName.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q);
    });

    if (!students.length) {
      wrap.innerHTML = "<p>Hakuna mwanafunzi aliyepatikana.</p>";
      return;
    }

    const rows = students
      .map(function (s) {
        return "<tr>" +
          "<td>" + s.fullName + "</td>" +
          "<td>" + s.regNo + "</td>" +
          "<td>" + s.classLevel + "</td>" +
          "<td>" + s.gender + "</td>" +
          "<td><button type='button' data-reg='" + s.regNo + "'>Futa</button></td>" +
          "</tr>";
      })
      .join("");

    wrap.innerHTML =
      "<table><thead><tr><th>Jina</th><th>Reg No</th><th>Darasa</th><th>Jinsia</th><th>Action</th></tr></thead><tbody>" +
      rows +
      "</tbody></table>";

    wrap.querySelectorAll("button[data-reg]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        removeStudent(btn.getAttribute("data-reg"));
      });
    });
  }

  searchInput.addEventListener("input", function () {
    render(searchInput.value.trim());
  });

  render("");
})();
