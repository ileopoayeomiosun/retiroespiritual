/* ==========================================
      INICIALIZAR EMAILJS
========================================== */
emailjs.init("2BR4ZjBjuOxBBtxLu");

/* ==========================================
      MODAL RETIRO
========================================== */
function abrirModal() {
    document.getElementById("modal-retiro").style.display = "flex";
}
function fecharModal() {
    document.getElementById("modal-retiro").style.display = "none";
}
document.getElementById("modal-retiro").addEventListener("click", function(e) {
    if (e.target.id === "modal-retiro") fecharModal();
});

/* ==========================================
      MODAL INSCRIÇÕES
========================================== */
document.querySelector(".destaque").addEventListener("click", function() {
    document.getElementById("modal-inscricoes").style.display = "flex";
});
function fecharModalInscricao() {
    document.getElementById("modal-inscricoes").style.display = "none";
    limparSelecao();
}
document.getElementById("modal-inscricoes").addEventListener("click", function(e) {
    if (e.target.id === "modal-inscricoes") fecharModalInscricao();
});

/* ==========================================
      CALENDÁRIO
========================================== */
const mesesBtns = document.querySelectorAll(".mes-btn");
const calendario = document.getElementById("calendario-container");
let dataEscolhida = null;

function gerarDatas(mes) {
    calendario.innerHTML = "";
    let ano = 2026;
    let dt = new Date(ano, mes - 1, 1);

    while (dt.getMonth() === mes - 1) {
        if (dt.getDay() === 5) {
            let dia = dt.getDate();
            if (dia >= 14) {
                let btn = document.createElement("button");
                btn.classList.add("data-btn");
                btn.innerText = `${dia}/${mes}/2026`;
                btn.onclick = () => selecionarData(btn);
                calendario.appendChild(btn);
            }
        }
        dt.setDate(dt.getDate() + 1);
    }

    if (!calendario.innerHTML) calendario.innerHTML = `<p class="selecione-aviso">Nenhuma data disponível neste mês ❌</p>`;
}

function selecionarData(btn) {
    document.querySelectorAll(".data-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    dataEscolhida = btn.innerText;
    document.querySelector(".data-escolhida").innerText = `📌 Data escolhida: ${dataEscolhida} às 19h`;
    document.getElementById("form-inscricao").style.display = "flex";
}

mesesBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        mesesBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        gerarDatas(btn.dataset.mes);
        document.getElementById("form-inscricao").style.display = "none";
        document.querySelector(".data-escolhida").innerText = "";
    });
});

function limparSelecao() {
    mesesBtns.forEach(b => b.classList.remove("active"));
    calendario.innerHTML = `<p class="selecione-aviso">Selecione um mês acima 📅</p>`;
    document.getElementById("form-inscricao").style.display = "none";
    document.querySelector(".data-escolhida").innerText = "";
    dataEscolhida = null;
}

/* ==========================================
      ENVIAR INSCRIÇÃO POR EMAIL
========================================== */
document.getElementById("form-inscricao").addEventListener("submit", function(e) {
    e.preventDefault();

    const dadosInsc = {
        data: dataEscolhida + " às 19h",
        nome: document.getElementById("nome").value,
        cidade: document.getElementById("cidade").value,
        telefone: document.getElementById("telefone").value,
        religiao: document.getElementById("religiao").value,
        motivo: document.getElementById("motivo").value
    };

    emailjs.send("service_amqsdiv", "template_hv3vkec", dadosInsc)
    .then(() => {
        alert("📨 Inscrição enviada com sucesso!");
        fecharModalInscricao();
    }, error => {
        alert("❌ Erro ao enviar inscrição. Tente novamente.");
        console.log(error);
    });
});

/* ==========================================
      MÁSCARA DATA (dd/mm/aaaa)
========================================== */
document.getElementById("fp-nascimento").addEventListener("input", function(e) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 2 && v.length <= 4) v = v.replace(/(\d{2})(\d+)/, "$1/$2");
    else if (v.length > 4) v = v.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
    e.target.value = v;
});

/* ==========================================
      ACESSO PRIVADO (LOGIN)
========================================== */
document.querySelector(".acesso").addEventListener("click", function() {
    document.getElementById("modal-acesso").style.display = "flex";
});
function fecharModalAcesso() {
    document.getElementById("modal-acesso").style.display = "none";
    document.getElementById("senha-acesso").value = "";
    document.getElementById("erro-senha").style.display = "none";
}
document.getElementById("modal-acesso").addEventListener("click", function(e) {
    if (e.target.id === "modal-acesso") fecharModalAcesso();
});
function validarSenha() {
    let senha = document.getElementById("senha-acesso").value;
    if (senha === "OriRetiro") {
        fecharModalAcesso();
        document.getElementById("modal-area-privada").style.display = "flex";
    } else {
        document.getElementById("erro-senha").style.display = "block";
    }
}
document.getElementById("senha-acesso").addEventListener("keyup", function(e) {
    if (e.key === "Enter") validarSenha();
});

/* ==========================================
      ÁREA PRIVADA
========================================== */
function fecharAreaPrivada() {
    document.getElementById("modal-area-privada").style.display = "none";
    document.getElementById("conteudo-privado").innerHTML = `<p class="privado-aviso">Selecione uma opção acima 👆</p>`;
}
document.getElementById("modal-area-privada").addEventListener("click", function(e) {
    if (e.target.id === "modal-area-privada") fecharAreaPrivada();
});
function abrirOrientacoes() {
    document.getElementById("conteudo-privado").innerHTML = `
        <h3 class="subtitulo-privado">Orientações aos Participantes</h3>
        <div class="box-orientacoes">
            <p><strong>👗 Vestuário</strong><br>
            <b>Mulheres:</b> Roupas brancas, preferencialmente saias ou vestidos (não curtos).<br>
            <b>Homens:</b> Roupas brancas, com calça ou bermuda abaixo do joelho.</p>
            <p><strong>🎒 Itens pessoais importantes:</strong><br>
            🛌 Roupa de cama (lençol, fronha e cobertor)<br>
            🚿 Toalha de banho<br>
            🧴 Itens de higiene pessoal.</p>
        </div>`;
}

/* ==========================================
      FICHA PESSOAL + SAÚDE
========================================== */
function abrirFichaPessoal() {
    document.getElementById("modal-ficha-pessoal").style.display = "flex";
}
function fecharFichaPessoal() {
    document.getElementById("modal-ficha-pessoal").style.display = "none";
    document.getElementById("form-ficha").reset();

    document.querySelectorAll(".campo-extra").forEach(campo => campo.style.display = "none");
}
document.getElementById("modal-ficha-pessoal").addEventListener("click", function(e) {
    if (e.target.id === "modal-ficha-pessoal") fecharFichaPessoal();
});

/* ======================
   CAMPOS CONDICIONAIS
======================== */
function mostrarAoSim(selectId, inputId) {
    document.getElementById(selectId).addEventListener("change", function() {
        document.getElementById(inputId).style.display = this.value === "Sim" ? "block" : "none";
    });
}

mostrarAoSim("fp-sabe-orixa","fp-nome-orixa");
mostrarAoSim("saude-alergia-alimento","saude-alergia-alimento-qual");
mostrarAoSim("saude-alergia-medicamento","saude-alergia-medicamento-qual");
mostrarAoSim("saude-cha","saude-cha-qual");
mostrarAoSim("saude-intolerancia","saude-intolerancia-qual");
mostrarAoSim("saude-controlado","saude-controlado-qual");
mostrarAoSim("saude-continuo","saude-continuo-qual");
mostrarAoSim("saude-circulacao","saude-circulacao-descricao");
mostrarAoSim("saude-diabetes-hipertensao","saude-diabetes-hipertensao-qual");

/* Vício tem 2 campos */
document.getElementById("saude-vicio").addEventListener("change", function() {
    const mostrar = this.value === "Sim" ? "block" : "none";
    document.getElementById("saude-vicio-qual").style.display = mostrar;
    document.getElementById("saude-vicio-abstinencia").style.display = mostrar;
});

/* ==========================================
      ENVIAR TUDO (EMAIL JS)
========================================== */
document.getElementById("form-ficha").addEventListener("submit", function(e) {
    e.preventDefault();

    const dados = {
        name: document.getElementById("fp-nome").value,
        nascimento: document.getElementById("fp-nascimento").value,
        documento: document.getElementById("fp-doc").value,
        whatsapp: document.getElementById("fp-whatsapp").value,
        email: document.getElementById("fp-email").value,
        amigo_nome: document.getElementById("fp-amigo-nome").value,
        amigo_tel: document.getElementById("fp-amigo-tel").value,
        amigo_rel: document.getElementById("fp-amigo-rel").value,
        fam_nome: document.getElementById("fp-fam-nome").value,
        fam_tel: document.getElementById("fp-fam-tel").value,
        fam_rel: document.getElementById("fp-fam-rel").value,
        orixa: document.getElementById("fp-sabe-orixa").value,
        qual_orixa: document.getElementById("fp-nome-orixa").value || "-",
        
        alergia_alimento: document.getElementById("saude-alergia-alimento").value,
        alergia_alimento_qual: document.getElementById("saude-alergia-alimento-qual").value || "-",
        alergia_med: document.getElementById("saude-alergia-medicamento").value,
        alergia_med_qual: document.getElementById("saude-alergia-medicamento-qual").value || "-",
        restricao_alimento: document.getElementById("saude-restricao-alimento").value || "-",
        cha: document.getElementById("saude-cha").value,
        cha_qual: document.getElementById("saude-cha-qual").value || "-",
        intolerancia: document.getElementById("saude-intolerancia").value,
        intolerancia_qual: document.getElementById("saude-intolerancia-qual").value || "-",
        controlado: document.getElementById("saude-controlado").value,
        controlado_qual: document.getElementById("saude-controlado-qual").value || "-",
        continuo: document.getElementById("saude-continuo").value,
        continuo_qual: document.getElementById("saude-continuo-qual").value || "-",
        circulacao: document.getElementById("saude-circulacao").value,
        circulacao_desc: document.getElementById("saude-circulacao-descricao").value || "-",
        diab_hip: document.getElementById("saude-diabetes-hipertensao").value,
        diab_hip_qual: document.getElementById("saude-diabetes-hipertensao-qual").value || "-",
        vicio: document.getElementById("saude-vicio").value,
        vicio_qual: document.getElementById("saude-vicio-qual").value || "-",
        vicio_abst: document.getElementById("saude-vicio-abstinencia").value || "-",
        sobremesa: document.getElementById("saude-sobremesa").value || "-"
    };

    emailjs.send("service_amqsdiv", "template_zf6d8yq", dados)
    .then(() => {
        alert("📨 Ficha enviada com sucesso!");
        fecharFichaPessoal();
    }, error => {
        alert("❌ Erro ao enviar. Tente novamente.");
        console.log(error);
    });
});
