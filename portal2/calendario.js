// Função para gerar o calendário
function gerarCalendario() {
    const calendario = document.getElementById("calendario");
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth(); // 0 (Janeiro) a 11 (Dezembro)

    // Determina o primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1).getDay(); // 0 (Domingo) a 6 (Sábado)
    
    // Determina o número de dias no mês
    const diasNoMes = new Date(ano, mes + 1, 0).getDate(); // Dias no mês atual
    
    // Limpa o conteúdo existente do calendário
    calendario.innerHTML = "";

    // Adiciona os nomes dos dias da semana
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    diasDaSemana.forEach(dia => {
        const elementoDiaDaSemana = document.createElement("div");
        elementoDiaDaSemana.classList.add("dia");
        elementoDiaDaSemana.textContent = dia;
        calendario.appendChild(elementoDiaDaSemana);
    });

    // Adiciona os espaços em branco antes do primeiro dia do mês
    for (let i = 0; i < primeiroDia; i++) {
        const elementoEspaco = document.createElement("div");
        calendario.appendChild(elementoEspaco); // Espaços em branco
    }

    // Cria os dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const elementoDia = document.createElement("div");
        elementoDia.classList.add("dia");
        elementoDia.textContent = dia;

        // Adiciona evento de clique para permitir a seleção do dia
        elementoDia.addEventListener('click', () => {
            // Remove a classe de seleção dos outros dias
            const dias = document.querySelectorAll(".dia-selecionado");
            dias.forEach(d => d.classList.remove("dia-selecionado"));

            // Adiciona a classe de seleção ao dia clicado (para ficar azul)
            elementoDia.classList.add("dia-selecionado");
        });

        calendario.appendChild(elementoDia);
    }

    // Exibe o calendário como uma grade
    calendario.style.display = "grid";
}

// Função para selecionar médico e horário aleatoriamente
const medicos = ["Dr. João", "Dra. Maria", "Dr. Pedro"];
const horarios = ["09:00", "10:00", "11:00", "14:00", "15:00"];

function selecionarMedicoEHorario() {
    // Verifica se o usuário selecionou um médico e um horário
    const medicoSelecionado = document.getElementById("medico").value;
    const horarioSelecionado = document.getElementById("horario").value;

    // Se não houver seleção, escolhe aleatoriamente
    const medico = medicoSelecionado || medicos[Math.floor(Math.random() * medicos.length)];
    const horario = horarioSelecionado || horarios[Math.floor(Math.random() * horarios.length)];

    return { medico, horario };
}

document.getElementById("btnAgendar").addEventListener("click", () => {
    const procedimento = document.getElementById("procedimento").value;
    const diaSelecionado = document.querySelector(".dia-selecionado");

    if (!diaSelecionado) {
        alert("Por favor, selecione um dia para o agendamento.");
        return;
    }

    const dia = diaSelecionado.textContent;
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const cancelamentos = JSON.parse(localStorage.getItem('cancelamentos')) || [];

    // Verifica se já existe uma consulta para o mesmo procedimento no mesmo dia
    const consultaExistente = agendamentos.find(agendamento => 
        agendamento.dia === dia && agendamento.procedimento === procedimento
    );

    if (consultaExistente) {
        alert(`Você já tem uma consulta para o procedimento "${procedimento}" no dia ${dia}. Verifique suas consultas.`);
        return;
    }

    // Verifica se houve um cancelamento anterior para o mesmo dia e procedimento
    const cancelamentoAnterior = cancelamentos.find(cancelamento => 
        cancelamento.dia === dia && cancelamento.procedimento === procedimento
    );

    if (cancelamentoAnterior) {
        alert(`Você não pode remarcar uma consulta para o procedimento "${procedimento}" no dia ${dia}. Motivo do cancelamento anterior: "${cancelamentoAnterior.motivo}".`);
        return;
    }

    // Verifica se já existe uma consulta no mesmo dia para outro procedimento
    const consultaMesmoDia = agendamentos.find(agendamento => agendamento.dia === dia);

    if (consultaMesmoDia) {
        if (!confirm(`Você já tem uma consulta para outro procedimento no dia ${dia}. Deseja agendar este também?`)) {
            return;
        }
    }

    const { medico, horario } = selecionarMedicoEHorario();

    const agendamento = {
        procedimento,
        dia,
        medico,
        horario
    };

    // Salva o agendamento no localStorage
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    alert(`Agendamento realizado com sucesso!\nDia: ${dia}\nMédico: ${medico}\nHorário: ${horario}`);
});




document.getElementById('btnConsultas').addEventListener('click', () => {
    window.location.href = 'consultas.html';
});

window.onload = function() {
    const userName = document.querySelector('.perfil span');
    const userImage = document.querySelector('.perfil img');
    
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        userName.textContent = `Bem-vindo, ${usuarioLogado.nome}`;
        userImage.src = usuarioLogado.imagem || 'img/profile.jpg'; // Substitua 'img/profile.jpg' pela imagem padrão se necessário
    }
};


// Evento de clique no botão "Agendar" para gerar o calendário
document.getElementById("btnAgendar").addEventListener("click", gerarCalendario);
