export class App {
  constructor(selector) {
    this.app = document.querySelector("#app");
    this.loading = this.app.querySelector(".loading");
    this.bemVindo = this.app.querySelector(".bem-vindo");
    this.appTerminado = this.app.querySelector(".app-terminado");
    this.form = this.app.querySelector("form");
    this.input = this.form.querySelector("input");
    this.turnos = this.form.querySelector("#turnos");
    this.erro = this.form.querySelector("#erro");
    this.msg = this.form.querySelector("#msg");
    this.turnosValidos = ["Manhã", "Tarde", "Noite"];
    this.medicos = [];
    this.init();
  }
  init() {
    console.log("Ola Mundo");
    this.ocultarBemVindo();
    this.definirTurnos();
    this.adicionarEventos();
    this.esconderMsg();
    this.ocultarLoading();
    this.ocultarAppTerminado();
  }
  definirTurnos() {
    const turnosFragment = document.createDocumentFragment();
    this.turnosValidos.forEach((turno) => {
      const option = document.createElement("option");
      option.innerText = turno;
      turnosFragment.appendChild(option);
    });
    this.turnos.appendChild(turnosFragment);
  }
  escolherTurno(e) {
    e.preventDefault();
    if (!this.input.value) {
      this.mostrarErro("Este campo não pode estar vazio");
    } else if (!this.turnosValidos.includes(this.input.value)) {
      this.mostrarErro("Este turno não está disponivel");
    } else {
      const medicosDisponiveis = this.medicos.filter((medico) => {
        return medico.turno == this.input.value;
      });
      const nomesMedicos = medicosDisponiveis.map((medico) => medico.nome);
      if (nomesMedicos.length === 1) {
        this.mostrarMsg(`O único médico disponivel é o <b>${nomesMedicos}</b>`);
        this.concluir();
      } else if (nomesMedicos.length > 1) {
        this.mostrarMsg(`Medicos disponiveis: <b>${nomesMedicos}</b>`);
        this.concluir();
      } else {
        this.mostrarMsg(`Nenhum médico disponivel nesse turno.`);
      }
    }
  }
  adicionarEventos() {
    this.form.addEventListener("submit", this.escolherTurno.bind(this));
    this.input.addEventListener("input", this.limprarErro.bind(this));
  }
  mostrarErro(mensagem) {
    this.erro.innerHTML = mensagem;
  }
  esconderMsg() {
    this.msg.style.display = "none";
  }
  mostrarMsg(mensagem) {
    this.msg.innerHTML = mensagem;
    this.msg.style.display = "block";
  }
  limprarErro() {
    this.erro.innerHTML = "";
  }
  ocultarLoading() {
    this.loading.style.display = "none";
  }
  mostrarLoading() {
    this.loading.style.display = "flex";
  }
  ocultarAppTerminado() {
    this.appTerminado.style.display = "none";
  }
  mostrarAppTerminado() {
    this.appTerminado.style.display = "flex";
  }
  ocultarBemVindo() {
    setTimeout(() => {
      this.bemVindo.style.display = "none";
    }, 2100);
  }
  concluir() {
    setTimeout(this.mostrarLoading.bind(this), 2000);
    setTimeout(this.ocultarLoading.bind(this), 4000);
    setTimeout(this.marcarConsulta.bind(this), 4000);

    setTimeout(this.mostrarLoading.bind(this), 4500);
    setTimeout(this.ocultarLoading.bind(this), 7000);

    setTimeout(this.mostrarAppTerminado.bind(this), 8000);
  }
  marcarConsulta() {
    this.mostrarMsg("A consulta foi marcada");
  }
  adicionarMedico(medico) {
    this.medicos.push(medico);
  }
}

export class Medico {
  constructor(nome, turno) {
    this.nome = nome;
    this.turno = turno;
  }
}
