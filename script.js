const tipoMesa = document.getElementById("tipoMesa");
const madeira = document.getElementById("madeira");
const espessura = document.getElementById("espessura");
const largura = document.getElementById("largura");
const comprimento = document.getElementById("comprimento");
const diametro = document.getElementById("diametro");
const borda = document.getElementById("borda");
const acabamento = document.getElementById("acabamento");
const tipoPe = document.getElementById("tipoPe");
const outrosDesc = document.getElementById("outrosDesc");
const outrosValor = document.getElementById("outrosValor");

const btnCalcular = document.getElementById("btnCalcular");
const btnWhatsapp = document.getElementById("btnWhatsapp");
const btnNovo = document.getElementById("btnNovo");
const valorFinal = document.getElementById("valorFinal");
const resumoOrcamento = document.getElementById("resumoOrcamento");
const listaHistorico = document.getElementById("listaHistorico");

let ultimoResultado = 0;
let calculoRealizado = false;
let orcamentoJaSalvoNoHistorico = false;

function preencherSelect(select, lista) {
  select.innerHTML = '<option value="">Selecione</option>';

  lista.forEach(item => {
    const option = document.createElement("option");
    option.value = typeof item === "object" ? item.nome : item;
    option.textContent = typeof item === "object" ? item.nome : item;
    select.appendChild(option);
  });
}

function limparSelect(select) {
  select.innerHTML = '<option value="">Selecione</option>';
}

function preencherSelectComValorAtual(select, lista, valorAtual = "") {
  select.innerHTML = '<option value="">Selecione</option>';

  lista.forEach(item => {
    const option = document.createElement("option");
    option.value = typeof item === "object" ? item.nome : item;
    option.textContent = typeof item === "object" ? item.nome : item;
    select.appendChild(option);
  });

  const existe = lista.some(item => {
    const valor = typeof item === "object" ? item.nome : item;
    return valor === valorAtual;
  });

  if (existe) {
    select.value = valorAtual;
  } else {
    select.value = "";
  }
}

function atualizarEstadoCampos() {
  const tipo = tipoMesa.value;
    const campos = [madeira, espessura, largura, comprimento, diametro, borda, acabamento, tipoPe];

  campos.forEach(campo => {
    campo.classList.remove("campo-bloqueado");
  });

  const madeirasPranchaInteirica = dados.madeiras.filter(m => m.nome !== "Jequitibá");

  const madeirasEmendaLateral = dados.madeiras.filter(m =>
    m.nome === "Angelim Pedra" ||
    m.nome === "Cumaru Rosa" ||
    m.nome === "Jequitibá"
  );

  const madeirasRedonda = dados.madeiras.filter(m =>
    m.nome === "Angelim Pedra" ||
    m.nome === "Cumaru Rosa" ||
    m.nome === "Cumaru Champanhe" ||
    m.nome === "Jequitibá" ||
    m.nome === "Peroba Rosa" ||
    m.nome === "Muirapiranga" ||
    m.nome === "Tauari"
  );

  const espessurasPranchaInteirica = dados.espessuras;
  const espessurasEmendaLateral = ["5 cm - 6 cm"];

  const largurasPranchaInteirica = dados.largurasPranchaInteirica;
  const largurasEmendaLateral = [
    "80 a 84",
    "85 a 89",
    "90 a 94",
    "95 a 99",
    "100 a 104",
    "105 a 109",
    "110 a 114",
    "115 a 119",
    "120 a 124",
    "125 a 130"
  ];

  const bordasPranchaInteirica = dados.bordas;
  const bordasEmendaLateral = ["Requadrada"];

  const acabamentosPrancha = dados.acabamentos;
  const acabamentosRedonda = dados.acabamentos.filter(a => a !== "Só Lixada");

  const pesSemRedonda = dados.pes.filter(p => !p.includes("Redonda") && !p.includes("Mesa Redonda"));
  const pesApenasRedonda = dados.pes.filter(p => p.includes("Redonda") || p.includes("Mesa Redonda"));

  if (tipo === "PRANCHA INTEIRIÇA") {
    preencherSelectComValorAtual(madeira, madeirasPranchaInteirica, madeira.value);
    preencherSelectComValorAtual(espessura, espessurasPranchaInteirica, espessura.value);
    preencherSelectComValorAtual(largura, largurasPranchaInteirica, largura.value);
    preencherSelectComValorAtual(borda, bordasPranchaInteirica, borda.value);
    preencherSelectComValorAtual(acabamento, acabamentosPrancha, acabamento.value);
    preencherSelectComValorAtual(tipoPe, pesSemRedonda, tipoPe.value);
    preencherSelectComValorAtual(diametro, dados.diametros, "");

    madeira.disabled = false;
    espessura.disabled = false;
    largura.disabled = false;
    comprimento.disabled = false;
    diametro.disabled = true;
        diametro.classList.add("campo-bloqueado");
    borda.disabled = false;
    acabamento.disabled = false;
    tipoPe.disabled = false;

    diametro.value = "";
  } else if (tipo === "PRANCHA EMENDA LATERAL") {
    preencherSelectComValorAtual(madeira, madeirasEmendaLateral, madeira.value);
    preencherSelectComValorAtual(espessura, espessurasEmendaLateral, espessura.value);
    preencherSelectComValorAtual(largura, largurasEmendaLateral, largura.value);
    preencherSelectComValorAtual(borda, bordasEmendaLateral, borda.value);
    preencherSelectComValorAtual(acabamento, acabamentosPrancha, acabamento.value);
    preencherSelectComValorAtual(tipoPe, pesSemRedonda, tipoPe.value);
    preencherSelectComValorAtual(diametro, dados.diametros, "");

    madeira.disabled = false;
    espessura.disabled = false;
    largura.disabled = false;
    comprimento.disabled = false;
    diametro.disabled = true;
        diametro.classList.add("campo-bloqueado");
    borda.disabled = false;
    acabamento.disabled = false;
    tipoPe.disabled = false;

    diametro.value = "";
  } else if (tipo === "REDONDA") {
    preencherSelectComValorAtual(madeira, madeirasRedonda, madeira.value);
    preencherSelectComValorAtual(acabamento, acabamentosRedonda, acabamento.value);
    preencherSelectComValorAtual(tipoPe, pesApenasRedonda, tipoPe.value);
    preencherSelectComValorAtual(diametro, dados.diametros, diametro.value);
    preencherSelectComValorAtual(espessura, dados.espessuras, "");
    preencherSelectComValorAtual(largura, largurasPranchaInteirica, "");
    preencherSelectComValorAtual(borda, dados.bordas, "");

    espessura.value = "";
    largura.value = "";
    comprimento.value = "";
    borda.value = "";

    madeira.disabled = false;
    espessura.disabled = true;
    largura.disabled = true;
    comprimento.disabled = true;
    diametro.disabled = false;
    borda.disabled = true;
        espessura.classList.add("campo-bloqueado");
    largura.classList.add("campo-bloqueado");
    comprimento.classList.add("campo-bloqueado");
    borda.classList.add("campo-bloqueado");
    acabamento.disabled = false;
    tipoPe.disabled = false;
  } else {
    preencherSelectComValorAtual(madeira, dados.madeiras, "");
    preencherSelectComValorAtual(espessura, dados.espessuras, "");
    limparSelect(largura);
    preencherSelectComValorAtual(borda, dados.bordas, "");
    preencherSelectComValorAtual(acabamento, dados.acabamentos, "");
    preencherSelectComValorAtual(tipoPe, dados.pes, "");
    preencherSelectComValorAtual(diametro, dados.diametros, "");

    madeira.disabled = false;
    espessura.disabled = false;
    largura.disabled = true;
    comprimento.disabled = false;
    diametro.disabled = true;
        largura.classList.add("campo-bloqueado");
    diametro.classList.add("campo-bloqueado");
    borda.disabled = false;
    acabamento.disabled = false;
    tipoPe.disabled = false;

    comprimento.value = "";
  }
}

function iniciar() {
  preencherSelect(tipoMesa, dados.tiposMesa);
  preencherSelect(madeira, dados.madeiras);
  preencherSelect(espessura, dados.espessuras);
  preencherSelect(borda, dados.bordas);
  preencherSelect(acabamento, dados.acabamentos);
  preencherSelect(tipoPe, dados.pes);
  preencherSelect(diametro, dados.diametros);

  atualizarEstadoCampos();
  atualizarResumo();
    renderizarHistorico();
}

function obterConjuntoDaMadeira(nomeMadeira) {
  const item = dados.madeiras.find(m => m.nome === nomeMadeira);
  return item ? item.conjunto : null;
}

function obterInicioFaixa(textoFaixa) {
  if (!textoFaixa) return 0;
  return parseInt(textoFaixa.split(" a ")[0], 10) || 0;
}

function obterLarguraCalculo() {
  if (tipoMesa.value !== "PRANCHA INTEIRIÇA") {
    return largura.value;
  }

  if (borda.value !== "Requadrada") {
    return largura.value;
  }

  const inicioAtual = obterInicioFaixa(largura.value);
  const novaLargura = inicioAtual + 10;

  for (const faixa of dados.largurasPranchaInteirica) {
    const inicioFaixa = obterInicioFaixa(faixa);
    const fimFaixa = inicioFaixa + 4;

    if (novaLargura >= inicioFaixa && novaLargura <= fimFaixa) {
      return faixa;
    }
  }

  return "115 a 119";
}

function obterPrecoBase() {
  const conjunto = obterConjuntoDaMadeira(madeira.value);
  const larguraCalculo = obterLarguraCalculo();

  if (!conjunto) return 0;

  if (tipoMesa.value === "PRANCHA INTEIRIÇA") {
    if (espessura.value === "5 cm - 6 cm") {
      return dados.precosPranchaInteirica56[conjunto]?.[larguraCalculo] || 0;
    }

    if (espessura.value === "7 cm - 8 cm") {
      return dados.precosPranchaInteirica78[conjunto]?.[larguraCalculo] || 0;
    }
  }

  if (tipoMesa.value === "PRANCHA EMENDA LATERAL") {
    return dados.precosPranchaEmendaLateral[conjunto]?.[largura.value] || 0;
  }

  if (tipoMesa.value === "REDONDA") {
    return dados.precosRedonda[conjunto]?.[diametro.value] || 0;
  }

  return 0;
}

function obterValorPe() {
  let valorPe = dados.precosPes[tipoPe.value] || 0;
  const comprimentoValor = parseFloat(comprimento.value) || 0;

  if (tipoMesa.value !== "REDONDA" && comprimentoValor >= 3.5) {
    valorPe = valorPe * 1.5;
  }

  return valorPe;
}

function obterPercentualAcabamento() {
  return dados.percentuaisAcabamento[acabamento.value] || 0;
}

function formatarMoeda(valor) {
  return "R$ " + valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function obterProximoNumeroOrcamento() {
  const ultimoNumero = parseInt(localStorage.getItem("ultimoNumeroOrcamento")) || 0;
  const proximoNumero = ultimoNumero + 1;
  localStorage.setItem("ultimoNumeroOrcamento", proximoNumero);
  return String(proximoNumero).padStart(4, "0");
}

function gerarTextoWhatsapp() {
  const tipo = tipoMesa.value || "-";
  const madeiraSelecionada = madeira.value || "-";
  const espessuraSelecionada = espessura.value || "-";
  const bordaSelecionada = borda.value || "-";
  const acabamentoSelecionado = acabamento.value || "-";
  const peSelecionado = tipoPe.value || "-";
  const outrosDescricao = outrosDesc.value?.trim() || "-";
  const valorOutrosNumero = parseFloat(outrosValor.value) || 0;

  let dimensoes = "-";

  if (tipo === "REDONDA") {
    dimensoes = diametro.value ? `Diâmetro ${diametro.value} cm` : "-";
  } else {
    const larguraSelecionada = largura.value || "-";
    const comprimentoSelecionado = comprimento.value || "-";
    dimensoes = `${comprimentoSelecionado} m x ${larguraSelecionada} cm`;
  }

  const incluirOutros = valorOutrosNumero !== 0 || outrosDescricao !== "-";

  const numeroOrcamento = obterProximoNumeroOrcamento();
  const dataHoje = new Date().toLocaleDateString("pt-BR");

  let texto = `*ORÇAMENTO (${numeroOrcamento}) - Dunorte Móveis*\n\n`;
  texto += `Data: ${dataHoje}\n\n`;
  texto += `Mesa ${tipo} na madeira maciça ${madeiraSelecionada}\n\n`;
  texto += `- Borda: ${bordaSelecionada}\n`;
  texto += `- Espessura: ${espessuraSelecionada}\n`;
  texto += `- Dimensões: ${dimensoes}\n`;
  texto += `- Acabamento: ${acabamentoSelecionado}\n`;
  texto += `- Tipo de pé: ${peSelecionado}\n`;

  if (incluirOutros) {
    texto += `- Outros: ${outrosDescricao} (${formatarMoeda(valorOutrosNumero)})\n`;
  }

  texto += `\nValor: ${formatarMoeda(ultimoResultado)}\n`;
  texto += `Em até 10x sem juros.`;

  return texto;
}

tipoMesa.addEventListener("change", () => {
  atualizarEstadoCampos();
});

function resetarCalculo() {
  calculoRealizado = false;
  ultimoResultado = 0;
  orcamentoJaSalvoNoHistorico = false;
  valorFinal.textContent = "R$ 0,00";
  atualizarResumo();
}

function atualizarResumo() {

  let dimensoes = "-";

  if (tipoMesa.value === "REDONDA") {
    dimensoes = diametro.value ? `Diâmetro ${diametro.value} cm` : "-";
  } else {
    const comp = comprimento.value || "-";
    const larg = largura.value || "-";
    dimensoes = `${comp} m x ${larg} cm`;
  }

  resumoOrcamento.innerHTML = `
    <p><strong>Tipo:</strong> ${tipoMesa.value || "-"}</p>
    <p><strong>Madeira:</strong> ${madeira.value || "-"}</p>
    <p><strong>Espessura:</strong> ${espessura.value || "-"}</p>
    <p><strong>Dimensões:</strong> ${dimensoes}</p>
    <p><strong>Borda:</strong> ${borda.value || "-"}</p>
    <p><strong>Acabamento:</strong> ${acabamento.value || "-"}</p>
    <p><strong>Pé:</strong> ${tipoPe.value || "-"}</p>
  `;
}

function obterDimensoesResumo() {
  if (tipoMesa.value === "REDONDA") {
    return diametro.value ? `Diâmetro ${diametro.value} cm` : "-";
  }

  const comp = comprimento.value || "-";
  const larg = largura.value || "-";
  return `${comp} m x ${larg} cm`;
}

function lerHistorico() {
  return JSON.parse(localStorage.getItem("historicoOrcamentos")) || [];
}

function salvarHistorico(dadosHistorico) {
  const historico = lerHistorico();
  historico.unshift(dadosHistorico);
  localStorage.setItem("historicoOrcamentos", JSON.stringify(historico));
}

function renderizarHistorico() {
  const historico = lerHistorico();

  if (historico.length === 0) {
    listaHistorico.innerHTML = "<p>Nenhum orçamento salvo ainda.</p>";
    return;
  }

  listaHistorico.innerHTML = historico.map(item => `
    <div class="item-historico">
      <p><strong>Nº:</strong> ${item.numero}</p>
      <p><strong>Data:</strong> ${item.data}</p>
      <p><strong>Tipo:</strong> ${item.tipo}</p>
      <p><strong>Madeira:</strong> ${item.madeira}</p>
      <p><strong>Dimensões:</strong> ${item.dimensoes}</p>
      <p><strong>Valor:</strong> ${item.valor}</p>
    </div>
  `).join("");
}

function validarFormulario() {

  if (!tipoMesa.value) {
    alert("Selecione o tipo de mesa.");
    return false;
  }

  if (!madeira.value) {
    alert("Selecione a madeira.");
    return false;
  }

  if (tipoMesa.value !== "REDONDA" && !espessura.value) {
    alert("Selecione a espessura.");
    return false;
  }

  if (tipoMesa.value !== "REDONDA" && !largura.value) {
    alert("Selecione a largura.");
    return false;
  }

  if (tipoMesa.value !== "REDONDA") {
    const comprimentoValor = parseFloat(comprimento.value);
    if (!comprimento.value || isNaN(comprimentoValor) || comprimentoValor <= 0) {
      alert("Informe um comprimento válido.");
      return false;
    }
  }

  if (tipoMesa.value === "REDONDA" && !diametro.value) {
    alert("Selecione o diâmetro.");
    return false;
  }

  if (tipoMesa.value !== "REDONDA" && !borda.value) {
    alert("Selecione a borda.");
    return false;
  }

  if (!acabamento.value) {
    alert("Selecione o acabamento.");
    return false;
  }

  if (!tipoPe.value) {
    alert("Selecione o tipo de pé.");
    return false;
  }

  return true;
}

btnCalcular.addEventListener("click", () => {
      if (!validarFormulario()) {
    return;
  }
  const precoBase = obterPrecoBase();
  const comprimentoValor = parseFloat(comprimento.value) || 0;
  const valorPe = obterValorPe();
  const percentualAcabamento = obterPercentualAcabamento();
  const valorOutros = parseFloat(outrosValor.value) || 0;

  let subtotal = 0;

  if (tipoMesa.value === "REDONDA") {
    subtotal = precoBase + valorPe + valorOutros;
  } else {
    subtotal = (precoBase * comprimentoValor) + valorPe + valorOutros;
  }

  const valorAcabamento = subtotal * (percentualAcabamento / 100);
  const resultado = subtotal + valorAcabamento;

  ultimoResultado = resultado;
    calculoRealizado = true;
      orcamentoJaSalvoNoHistorico = false;
  valorFinal.textContent = formatarMoeda(resultado);
});

btnWhatsapp.addEventListener("click", async () => {
  if (!validarFormulario()) {
    return;
  }

  if (!calculoRealizado) {
    alert("Clique em Calcular antes de gerar o texto do WhatsApp.");
    return;
  }

  const texto = gerarTextoWhatsapp();

  const numero = String(parseInt(localStorage.getItem("ultimoNumeroOrcamento")) || 0).padStart(4, "0");
  const data = new Date().toLocaleDateString("pt-BR");

  const item = {
    numero,
    data,
    tipo: tipoMesa.value || "-",
    madeira: madeira.value || "-",
    dimensoes: obterDimensoesResumo(),
    valor: formatarMoeda(ultimoResultado)
  };

  if (!orcamentoJaSalvoNoHistorico) {
    salvarHistorico(item);
    renderizarHistorico();
    orcamentoJaSalvoNoHistorico = true;
  }

  try {
    await navigator.clipboard.writeText(texto);
    alert("Texto do orçamento copiado e salvo no histórico.");
  } catch (erro) {
    alert("Não foi possível copiar automaticamente. Veja o texto no console.");
    console.log(texto);
  }
});

btnNovo.addEventListener("click", () => {
  tipoMesa.value = "";
  madeira.value = "";
  espessura.value = "";
  largura.value = "";
  comprimento.value = "";
  diametro.value = "";
  borda.value = "";
  acabamento.value = "";
  tipoPe.value = "";
  outrosDesc.value = "";
  outrosValor.value = "";

  largura.disabled = true;
  diametro.disabled = true;
  comprimento.disabled = false;

  valorFinal.textContent = "R$ 0,00";
  ultimoResultado = 0;
    orcamentoJaSalvoNoHistorico = false;
    calculoRealizado = false;

  atualizarEstadoCampos();
});

[
  tipoMesa,
  madeira,
  espessura,
  largura,
  comprimento,
  diametro,
  borda,
  acabamento,
  tipoPe,
  outrosDesc,
  outrosValor
].forEach(campo => {
  campo.addEventListener("change", resetarCalculo);
  campo.addEventListener("input", resetarCalculo);
});

iniciar();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registrado"));
}