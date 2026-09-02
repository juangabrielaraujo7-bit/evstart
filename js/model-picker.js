(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5511912251681";
  var form = document.getElementById("modelForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var select = document.getElementById("modelSelect");
    var modelo = select.value;
    if (!modelo) return;

    // O serviço vem do data-servico da página (ex.: "trocar a tela").
    var servico = form.getAttribute("data-servico") || "consertar";
    var message = "Olá! Quero " + servico + " do meu " + modelo + ". Pode me passar um orçamento?";
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
  });
})();
