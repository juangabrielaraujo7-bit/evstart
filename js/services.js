(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5511912251681";
  var form = document.getElementById("otherServiceForm");
  if (!form) return;

  // Serviços que já têm página própria: leva para lá em vez de abrir o WhatsApp direto.
  var SERVICE_PAGES = {
    "Troca de bateria": "troca-de-bateria.html"
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var select = document.getElementById("otherService");
    var servico = select.value;
    if (!servico) return;

    if (SERVICE_PAGES[servico]) {
      window.location.href = SERVICE_PAGES[servico];
      return;
    }

    var message = "Olá! Gostaria de saber mais sobre " + servico.toLowerCase() + ".";
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
    form.reset();
  });
})();
