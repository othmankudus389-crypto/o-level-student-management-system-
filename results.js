(function () {
  const form = document.getElementById("resultForm");
  const msg = document.getElementById("resultMsg");
  const tableWrap = document.getElementById("resultsTableWrap");
  const filterRegNo = document.getElementById("filterRegNo");
  const printBtn = document.getElementById("printBtn");

  const studentKey = "hss_students";
  const resultKey = "hss_results";

  document.getElementById("year").value = new Date().getFullYear();

  function getStudents() {
    return JSON.parse(localStorage.getItem(studentKey) || "[]");
  }

  function getResults() {
    return JSON.parse(localStorage.getItem(resultKey) || "[]");
  }

  function setResults(results) {
    localStorage.setItem(resultKey, JSON.stringify(results));
  }

  function gradeFromScore(score) {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  }

  function showMessage(text, good) {
    msg.textContent = text;
    msg.className = "msg " + (good ? "ok" : "bad");
  }

  function render(queryRegNo) {
    const q = (queryRegNo || "").trim().toUpperCase();
    const studentsByReg = getStudents().reduce(function (acc, s) {
      acc[s.regNo] = s.fullName;
      return acc;
    }, {});

    let results = getResults();
    if (q) results = results.filter(function (r) { return r.regNo === q; });

    if (!results.length) {
      tableWrap.innerHTML = "<p>Hakuna matokeo ya kuonesha.</p>";
      return;
    }

    const rows = results
      .map(function (r) {
        const name = studentsByReg[r.regNo] || "Unknown Student";
        return "<tr>" +
          "<td>" + name + "</td>" +
          "<td>" + r.regNo + "</td>" +
          "<td>" + r.subject + "</td>" +
          "<td>" + r.score + "</td>" +
          "<td>" + r.grade + "</td>" +
          "<td>" + r.term + " " + r.year + "</td>" +
          "</tr>";
      })
      .join("");

    tableWrap.innerHTML =
      "<table><thead><tr><th>Jina</th><th>Reg No</th><th>Somo</th><th>Score</th><th>Grade</th><th>Term</th></tr></thead><tbody>" +
      rows +
      "</tbody></table>";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const regNo = document.getElementById("resultRegNo").value.trim().toUpperCase();
    const subject = document.getElementById("subject").value.trim();
    const score = Number(document.getElementById("score").value);
    const term = document.getElementById("term").value;
    const year = Number(document.getElementById("year").value);

    const studentExists = getStudents().some(function (s) { return s.regNo === regNo; });
    if (!studentExists) {
      showMessage("Reg No haijasajiliwa. Sajili student kwanza.", false);
      return;
    }

    const result = {
      regNo: regNo,
      subject: subject,
      score: score,
      grade: gradeFromScore(score),
      term: term,
      year: year,
      createdAt: new Date().toISOString()
    };

    const results = getResults();
    results.push(result);
    setResults(results);

    form.reset();
    document.getElementById("year").value = new Date().getFullYear();
    showMessage("Tokeo limehifadhiwa vizuri.", true);
    render(filterRegNo.value);
  });

  filterRegNo.addEventListener("input", function () {
    render(filterRegNo.value);
  });

  printBtn.addEventListener("click", function () {
    window.print();
  });

  render("");
})();
