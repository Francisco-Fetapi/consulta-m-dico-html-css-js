import { Medico, App } from "./classes.js";

const medico1 = new Medico("Paulo", "Manhã");
const medico2 = new Medico("Felipe", "Noite");
const medico3 = new Medico("Maria", "Tarde");

const app = new App("#app");

app.adicionarMedico(medico1);
app.adicionarMedico(medico2);
app.adicionarMedico(medico3);
