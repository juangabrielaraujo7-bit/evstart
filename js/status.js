(function () {
  "use strict";

  var OS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQOfuuAz4EbM0K9dw-blJZh6g8lD1mb3OSKQ1YIUqg0RdYlSQLw2MRXKowK9IRbTMoL5RTE-j18evkW/pub?output=csv";

  var form = document.getElementById("osForm");
  var input = document.getElementById("osInput");
  var result = document.getElementById("osResult");

  if (!form || !input || !result) return;

  var submitBtn = form.querySelector("button[type=submit]");

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var field = "";
    var inQuotes = false;

    for (var i = 0; i < text.length; i++) {
      var char = text[i];
      var next = text[i + 1];

      if (inQuotes) {
        if (char === '"' && next === '"') { field += '"'; i++; }
        else if (char === '"') { inQuotes = false; }
        else { field += char; }
      } else if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(field); field = "";
      } else if (char === "\n" || char === "\r") {
        if (char === "\r" && next === "\n") i++;
        row.push(field); field = "";
        rows.push(row); row = [];
      } else {
        field += char;
      }
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (c) { return c.trim() !== ""; }); });
  }

  function rowsToRecords(rows) {
    if (!rows.length) return [];
    var headers = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    return rows.slice(1).map(function (r) {
      var record = {};
      headers.forEach(function (h, idx) { record[h] = (r[idx] || "").trim(); });
      return record;
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function setState(state, html) {
    result.className = "os-result" + (state ? " is-" + state : "");
    result.innerHTML = html || "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var query = input.value.trim();
    if (!query) return;

    if (submitBtn) submitBtn.disabled = true;
    setState("loading", "Consultando...");

    fetch(OS_CSV_URL, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("network-error");
        return response.text();
      })
      .then(function (csvText) {
        var records = rowsToRecords(parseCsv(csvText));
        var match = records.find(function (record) {
          return (record.os || "").toLowerCase() === query.toLowerCase();
        });

        if (!match) {
          setState("error", "Ordem de Serviço não encontrada. Verifique o número ou fale conosco.");
          return;
        }

        var name = match.cliente || "Cliente";
        var status = match.status || "Em andamento";
        var modelo = match.modelo;

        setState(
          "success",
          '<p class="os-result-line">Cliente: <strong>' + escapeHtml(name) + '</strong>' +
          '<span class="os-sep">|</span>Status atual: <strong class="os-result-status-text">' + escapeHtml(status) + '</strong></p>' +
          (modelo ? '<p class="os-result-model">Aparelho: ' + escapeHtml(modelo) + '</p>' : "")
        );
      })
      .catch(function () {
        setState("error", "Não foi possível consultar o status agora. Tente novamente em instantes ou fale conosco no WhatsApp.");
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();
