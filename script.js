// --- LÓGICA DE MODO OSCURO (SWITCH iOS) ---
const themeToggle = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('panini26_theme') || 'light';

// Inicializar el switch según la preferencia guardada
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

// Escuchar cambios en el switch
themeToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('panini26_theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('panini26_theme', 'light');
    }
});
// ------------------------------------------

const albumData = [
    {"name": "Grupo A", "teams": [{"name": "México", "stickers": 20}, {"name": "Sudáfrica", "stickers": 20}, {"name": "Corea del Sur", "stickers": 20}, {"name": "República Checa", "stickers": 20}]},
    {"name": "Grupo B", "teams": [{"name": "Canadá", "stickers": 20}, {"name": "Suiza", "stickers": 20}, {"name": "Catar", "stickers": 20}, {"name": "Bosnia y Herzegovina", "stickers": 20}]},
    {"name": "Grupo C", "teams": [{"name": "Brasil", "stickers": 20}, {"name": "Marruecos", "stickers": 20}, {"name": "Haití", "stickers": 20}, {"name": "Escocia", "stickers": 20}]},
    {"name": "Grupo D", "teams": [{"name": "Estados Unidos", "stickers": 20}, {"name": "Paraguay", "stickers": 20}, {"name": "Australia", "stickers": 20}, {"name": "Turquía", "stickers": 20}]},
    {"name": "Grupo E", "teams": [{"name": "Alemania", "stickers": 20}, {"name": "Curazao", "stickers": 20}, {"name": "Costa de Marfil", "stickers": 20}, {"name": "Ecuador", "stickers": 20}]},
    {"name": "Grupo F", "teams": [{"name": "Países Bajos", "stickers": 20}, {"name": "Japón", "stickers": 20}, {"name": "Túnez", "stickers": 20}, {"name": "Suecia", "stickers": 20}]},
    {"name": "Grupo G", "teams": [{"name": "Bélgica", "stickers": 20}, {"name": "Egipto", "stickers": 20}, {"name": "Irán", "stickers": 20}, {"name": "Nueva Zelanda", "stickers": 20}]},
    {"name": "Grupo H", "teams": [{"name": "España", "stickers": 20}, {"name": "Cabo Verde", "stickers": 20}, {"name": "Arabia Saudita", "stickers": 20}, {"name": "Uruguay", "stickers": 20}]},
    {"name": "Grupo I", "teams": [{"name": "Francia", "stickers": 20}, {"name": "Senegal", "stickers": 20}, {"name": "Noruega", "stickers": 20}, {"name": "Irak", "stickers": 20}]},
    {"name": "Grupo J", "teams": [{"name": "Argentina", "stickers": 20}, {"name": "Argelia", "stickers": 20}, {"name": "Austria", "stickers": 20}, {"name": "Jordania", "stickers": 20}]},
    {"name": "Grupo K", "teams": [{"name": "Portugal", "stickers": 20}, {"name": "Uzbekistán", "stickers": 20}, {"name": "Colombia", "stickers": 20}, {"name": "R.D. Congo", "stickers": 20}, {"name": "Logo Panini", "stickers": 1}, {"name": "Emblemas", "stickers": 4}, {"name": "Ciudades", "stickers": 4}, {"name": "Coca Cola", "stickers": 14}]},
    {"name": "Grupo L", "teams": [{"name": "Inglaterra", "stickers": 20}, {"name": "Croacia", "stickers": 20}, {"name": "Ghana", "stickers": 20}, {"name": "Panamá", "stickers": 20}]}
];

let mode = 'pegadas';
let pegadas = JSON.parse(localStorage.getItem('panini26_pegadas')) || [];
let repetidas = JSON.parse(localStorage.getItem('panini26_repetidas')) || [];
let totalStickers = 0;
albumData.forEach(g => g.teams.forEach(t => totalStickers += t.stickers));

function init() {
    const container = document.getElementById('app-container');
    
    albumData.forEach((group, gIndex) => {
        const card = document.createElement('div');
        card.className = 'group-card';
        
        card.innerHTML = `
            <div class="group-header" id="ghead-${gIndex}">
                <span>${group.name}</span>
                <span class="chevron"></span>
            </div>
            <div class="accordion-wrapper" id="gwrap-${gIndex}">
                <div class="accordion-inner" id="gcontent-${gIndex}"></div>
            </div>
        `;
        
        const groupHeader = card.querySelector(`#ghead-${gIndex}`);
        const groupWrapper = card.querySelector(`#gwrap-${gIndex}`);
        const groupContent = card.querySelector(`#gcontent-${gIndex}`);
        
        groupHeader.onclick = () => {
            groupWrapper.classList.toggle('active');
            groupHeader.classList.toggle('open');
        };

        group.teams.forEach((team, tIndex) => {
            const safeId = `g${gIndex}-t${tIndex}`; 
            const item = document.createElement('div');
            item.className = 'team-item';
            
            item.innerHTML = `
                <div class="team-header" id="head-${safeId}">
                    <div class="team-info">
                        <span class="team-name">${team.name}</span>
                        <span class="team-stats" id="stat-${safeId}"></span>
                    </div>
                    <span class="chevron"></span>
                </div>
                <div class="accordion-wrapper" id="twrap-${safeId}">
                    <div class="accordion-inner">
                        <div class="stickers-grid" id="grid-${safeId}"></div>
                    </div>
                </div>
            `;
            
            const teamHeader = item.querySelector(`#head-${safeId}`);
            const teamWrapper = item.querySelector(`#twrap-${safeId}`);
            const grid = item.querySelector(`#grid-${safeId}`);
            
            for(let i=1; i<=team.stickers; i++) {
                const id = `${group.name}|${team.name}|${i}`;
                const s = document.createElement('div');
                s.className = `sticker ${pegadas.includes(id) ? 'pegada' : ''} ${repetidas.includes(id) ? 'repetida' : ''}`;
                s.innerText = i;
                s.onclick = () => toggleSticker(id, s, group.name, team.name, team.stickers);
                grid.appendChild(s);
            }

            teamHeader.onclick = () => {
                teamWrapper.classList.toggle('active');
                teamHeader.classList.toggle('open');
            };
            
            groupContent.appendChild(item);
        });
        container.appendChild(card);
    });
    refreshUI();
}

function toggleSticker(id, el, gName, tName, tTotal) {
    if(mode === 'pegadas') {
        if(pegadas.includes(id)) pegadas = pegadas.filter(x => x !== id);
        else pegadas.push(id);
        el.classList.toggle('pegada');
    } else {
        if(repetidas.includes(id)) repetidas = repetidas.filter(x => x !== id);
        else repetidas.push(id);
        el.classList.toggle('repetida');
    }
    localStorage.setItem('panini26_pegadas', JSON.stringify(pegadas));
    localStorage.setItem('panini26_repetidas', JSON.stringify(repetidas));
    refreshUI();
}

function refreshUI() {
    albumData.forEach((g, gIndex) => g.teams.forEach((t, tIndex) => {
        const safeId = `g${gIndex}-t${tIndex}`;
        const prefix = `${g.name}|${t.name}|`;
        const statEl = document.getElementById(`stat-${safeId}`);
        
        if(mode === 'pegadas') {
            const count = pegadas.filter(id => id.startsWith(prefix)).length;
            statEl.innerText = `${count} de ${t.stickers} pegadas`;
            statEl.style.color = count === t.stickers ? 'var(--primary-color)' : 'var(--stats-muted)';
        } else {
            const count = repetidas.filter(id => id.startsWith(prefix)).length;
            statEl.innerText = count > 0 ? `${count} repetidas` : '0 repetidas';
            statEl.style.color = count > 0 ? 'var(--secondary-color)' : 'var(--stats-muted)';
        }
    }));

    const pCount = pegadas.length;
    const perc = ((pCount / totalStickers) * 100).toFixed(1);
    document.getElementById('text-pegadas').innerText = `Pegadas: ${pCount} / ${totalStickers}`;
    document.getElementById('text-faltan').innerText = `Faltan: ${totalStickers - pCount}`;
    document.getElementById('text-porcentaje').innerText = `${perc}%`;
    document.getElementById('progress-bar').style.width = `${perc}%`;
    document.getElementById('text-total-repetidas').innerText = `Total Repetidas: ${repetidas.length}`;
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.onclick = (e) => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        mode = tab.dataset.mode;
        document.body.className = `mode-${mode}`;
        document.getElementById('footer-pegadas').classList.toggle('hidden', mode !== 'pegadas');
        document.getElementById('footer-repetidas').classList.toggle('hidden', mode !== 'repetidas');
        refreshUI();
    };
});

init();