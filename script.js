// --- LÓGICA DE MODO OSCURO (SWITCH iOS) ---
const themeToggle = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('panini26_theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('panini26_theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('panini26_theme', 'light');
    }
});

// --- ESTRUCTURA DEL ÁLBUM CON CÓDIGOS DE PAÍS ---
const albumData = [
    { 
        "name": "Especiales", 
        "codes": "", 
        "teams": [
            { "name": "Logo Panini", "stickers": 1 }, 
            { "name": "Emblemas y Campeones", "stickers": 19 }, 
            { "name": "Coca Cola", "stickers": 14 }
        ] 
    },
    { 
        "name": "Grupo A", 
        "codes": "MEX, RSA, KOR, CZE", 
        "teams": [
            { "name": "México", "stickers": 20 }, { "name": "Sudáfrica", "stickers": 20 }, 
            { "name": "Corea del Sur", "stickers": 20 }, { "name": "República Checa", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo B", 
        "codes": "CAN, BIH, QAT, SUI", 
        "teams": [
            { "name": "Canadá", "stickers": 20 }, { "name": "Bosnia y Herzegovina", "stickers": 20 }, 
            { "name": "Catar", "stickers": 20 }, { "name": "Suiza", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo C", 
        "codes": "BRA, MAR, HAI, SCO", 
        "teams": [
            { "name": "Brasil", "stickers": 20 }, { "name": "Marruecos", "stickers": 20 }, 
            { "name": "Haití", "stickers": 20 }, { "name": "Escocia", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo D", 
        "codes": "USA, PAR, AUS, TUR", 
        "teams": [
            { "name": "Estados Unidos", "stickers": 20 }, { "name": "Paraguay", "stickers": 20 }, 
            { "name": "Australia", "stickers": 20 }, { "name": "Turquía", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo E", 
        "codes": "GER, CUW, CIV, ECU", 
        "teams": [
            { "name": "Alemania", "stickers": 20 }, { "name": "Curazao", "stickers": 20 }, 
            { "name": "Costa de Marfil", "stickers": 20 }, { "name": "Ecuador", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo F", 
        "codes": "NED, JPN, SWE, TUN", 
        "teams": [
            { "name": "Países Bajos", "stickers": 20 }, { "name": "Japón", "stickers": 20 }, 
            { "name": "Suecia", "stickers": 20 }, { "name": "Túnez", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo G", 
        "codes": "BEL, EGY, IRN, NZL", 
        "teams": [
            { "name": "Bélgica", "stickers": 20 }, { "name": "Egipto", "stickers": 20 }, 
            { "name": "Irán", "stickers": 20 }, { "name": "Nueva Zelanda", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo H", 
        "codes": "ESP, CPV, KSA, URU", 
        "teams": [
            { "name": "España", "stickers": 20 }, { "name": "Cabo Verde", "stickers": 20 }, 
            { "name": "Arabia Saudí", "stickers": 20 }, { "name": "Uruguay", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo I", 
        "codes": "FRA, SEN, IRQ, NOR", 
        "teams": [
            { "name": "Francia", "stickers": 20 }, { "name": "Senegal", "stickers": 20 }, 
            { "name": "Irak", "stickers": 20 }, { "name": "Noruega", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo J", 
        "codes": "ARG, ALG, AUT, JOR", 
        "teams": [
            { "name": "Argentina", "stickers": 20 }, { "name": "Argelia", "stickers": 20 }, 
            { "name": "Austria", "stickers": 20 }, { "name": "Jordania", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo K", 
        "codes": "POR, COD, UZB, COL", 
        "teams": [
            { "name": "Portugal", "stickers": 20 }, { "name": "R.D. Congo", "stickers": 20 }, 
            { "name": "Uzbekistán", "stickers": 20 }, { "name": "Colombia", "stickers": 20 }
        ] 
    },
    { 
        "name": "Grupo L", 
        "codes": "ENG, CRO, GHA, PAN", 
        "teams": [
            { "name": "Inglaterra", "stickers": 20 }, { "name": "Croacia", "stickers": 20 }, 
            { "name": "Ghana", "stickers": 20 }, { "name": "Panamá", "stickers": 20 }
        ] 
    }
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

        const headerTitle = group.codes 
            ? `<span class="g-name">${group.name}</span><small class="g-codes">(${group.codes})</small>` 
            : `<span class="g-name">${group.name}</span>`;

        card.innerHTML = `
            <div class="group-header" id="ghead-${gIndex}">
                <div class="g-title-box">
                    ${headerTitle}
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="group-stats" id="gstat-${gIndex}"></span>
                    <span class="chevron"></span>
                </div>
            </div>
            <div class="accordion-wrapper" id="gwrap-${gIndex}">
                <div class="accordion-inner" id="gcontent-${gIndex}"></div>
            </div>
        `;

        const groupHeader = card.querySelector(`#ghead-${gIndex}`);
        const groupWrapper = card.querySelector(`#gwrap-${gIndex}`);
        const groupContent = card.querySelector(`#gcontent-${gIndex}`);

        groupHeader.onclick = () => {
            const isClosing = groupHeader.classList.contains('open');
            groupWrapper.classList.toggle('active');
            groupHeader.classList.toggle('open');

            if (isClosing) {
                const openTeamHeaders = groupContent.querySelectorAll('.team-header.open');
                const activeTeamWrappers = groupContent.querySelectorAll('.accordion-wrapper.active');
                openTeamHeaders.forEach(th => th.classList.remove('open'));
                activeTeamWrappers.forEach(tw => tw.classList.remove('active'));
            }
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

            for (let i = 1; i <= team.stickers; i++) {
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
    if (mode === 'pegadas') {
        if (pegadas.includes(id)) pegadas = pegadas.filter(x => x !== id);
        else pegadas.push(id);
        el.classList.toggle('pegada');
    } else if (mode === 'repetidas') {
        if (repetidas.includes(id)) repetidas = repetidas.filter(x => x !== id);
        else repetidas.push(id);
        el.classList.toggle('repetida');
    }
    localStorage.setItem('panini26_pegadas', JSON.stringify(pegadas));
    localStorage.setItem('panini26_repetidas', JSON.stringify(repetidas));
    refreshUI();
}

function refreshUI() {
    albumData.forEach((g, gIndex) => {
        let groupRepetidasCount = 0;
        g.teams.forEach((t, tIndex) => {
            const safeId = `g${gIndex}-t${tIndex}`;
            const prefix = `${g.name}|${t.name}|`;
            const statEl = document.getElementById(`stat-${safeId}`);
            const repCount = repetidas.filter(id => id.startsWith(prefix)).length;
            groupRepetidasCount += repCount;

            if (mode === 'pegadas') {
                const count = pegadas.filter(id => id.startsWith(prefix)).length;
                statEl.innerText = `${count} de ${t.stickers} pegadas`;
                statEl.style.color = count === t.stickers ? 'var(--primary-color)' : 'var(--stats-muted)';
            } else {
                statEl.innerText = repCount > 0 ? `${repCount} repetidas` : '0 repetidas';
                statEl.style.color = repCount > 0 ? 'var(--secondary-color)' : 'var(--stats-muted)';
            }
        });

        const gStatEl = document.getElementById(`gstat-${gIndex}`);
        if (mode === 'repetidas' && groupRepetidasCount > 0) {
            gStatEl.innerText = groupRepetidasCount;
            gStatEl.style.display = 'inline-block';
        } else {
            gStatEl.style.display = 'none';
        }
    });

    const pCount = pegadas.length;
    const perc = ((pCount / totalStickers) * 100).toFixed(1);
    document.getElementById('text-pegadas').innerText = `Pegadas: ${pCount} / ${totalStickers}`;
    document.getElementById('text-faltan').innerText = `Faltan: ${totalStickers - pCount}`;
    document.getElementById('text-porcentaje').innerText = `${perc}%`;
    document.getElementById('progress-bar').style.width = `${perc}%`;
    document.getElementById('text-total-repetidas').innerText = `Total Repetidas: ${repetidas.length}`;
}

// --- FUNCIÓN PARA RENDERIZAR LAS ESTADÍSTICAS ---
function renderStats() {
    const statsContainer = document.getElementById('stats-container');
    const pCount = pegadas.length;
    const faltan = totalStickers - pCount;
    const perc = ((pCount / totalStickers) * 100).toFixed(1);

    // 1. Calcular País con más pegadas
    const pegadasPorPais = {};
    pegadas.forEach(id => {
        const pais = id.split('|')[1];
        pegadasPorPais[pais] = (pegadasPorPais[pais] || 0) + 1;
    });

    let maxPegadas = 0;
    let topPaises = [];
    for (const pais in pegadasPorPais) {
        if (pegadasPorPais[pais] > maxPegadas) {
            maxPegadas = pegadasPorPais[pais];
            topPaises = [pais];
        } else if (pegadasPorPais[pais] === maxPegadas) {
            topPaises.push(pais);
        }
    }
    const topPaisesStr = topPaises.length > 0 ? `${topPaises.join(', ')} (${maxPegadas} pegadas)` : 'Ninguna figurita pegada aún';

    // 2. Calcular lista de repetidas agrupada por Álbum (Grupos)
    let repHtml = '<ul class="stats-list">';
    let tieneAlgunaRepetida = false;

    albumData.forEach(group => {
        let htmlGrupo = '';
        let grupoTiene = false;

        group.teams.forEach((team, tIndex) => {
            const prefix = `${group.name}|${team.name}|`;
            const reps = repetidas
                .filter(id => id.startsWith(prefix))
                .map(id => parseInt(id.split('|')[2]))
                .sort((a, b) => a - b);

            if (reps.length > 0) {
                tieneAlgunaRepetida = true;
                grupoTiene = true;
                
                let codeStr = "";
                if (group.codes) {
                    const codesArray = group.codes.split(',').map(c => c.trim());
                    if (codesArray[tIndex]) {
                        codeStr = ` <small class="rep-nums">(${codesArray[tIndex]})</small>`;
                    }
                }
                htmlGrupo += `<li><strong>${team.name}${codeStr}</strong> <span class="rep-nums">${reps.join(' - ')}</span></li>`;
            }
        });

        if (grupoTiene) {
            repHtml += `<li style="background: var(--bg-color); padding: 5px 10px; font-weight: bold; font-size: 0.85rem; color: var(--panini-blue); border-radius: 4px; margin-top: 10px; border-bottom: none;">${group.name.toUpperCase()}</li>`;
            repHtml += htmlGrupo;
        }
    });

    if (!tieneAlgunaRepetida) {
        repHtml += '<li>No tienes figuritas repetidas.</li>';
    }
    repHtml += '</ul>';

    // 3. Inyectar HTML
    statsContainer.innerHTML = `
        <div class="group-card stats-box">
            <h2 class="stats-title"><i class="fa-solid fa-chart-pie"></i> Progreso General</h2>
            <div style="font-size: 1.2rem; margin-bottom: 15px; font-weight: bold;">
                Completado: ${perc}%
            </div>
            <div class="progress-bar-container" style="height: 16px; margin-bottom: 15px; background: #e1e4e8;">
                <div class="progress-bar" style="width: ${perc}%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.1rem;">
                <span style="color: var(--panini-green); font-weight: bold;">Pegadas: ${pCount}</span>
                <span style="color: var(--panini-red); font-weight: bold;">Faltan: ${faltan}</span>
            </div>
        </div>

        <div class="group-card stats-box">
            <h2 class="stats-title"><i class="fa-solid fa-trophy"></i> Más Avanzados</h2>
            <p class="stats-top-country">${topPaisesStr}</p>
        </div>

        <div class="group-card stats-box">
            <h2 class="stats-title"><i class="fa-solid fa-cloud-arrow-up"></i> Gestión de Datos</h2>
            <p style="font-size: 0.9rem; color: var(--stats-muted); margin: 0;">Genera un código para guardar tu progreso o muévelo a otro dispositivo.</p>
            <div class="btn-container">
                <button id="btn-export-full" class="btn-primary"><i class="fa-solid fa-file-export"></i> Exportar</button>
                <button id="btn-import-full" class="btn-secondary"><i class="fa-solid fa-file-import"></i> Importar</button>
            </div>
        </div>

        <div class="group-card stats-box">
            <h2 class="stats-title" style="color: var(--panini-orange); border-bottom-color: var(--panini-orange);">
                <i class="fa-solid fa-clone"></i> Lista de Repetidas
            </h2>
            ${repHtml}
        </div>
    `;

    // --- LÓGICA DE LOS BOTONES DE IMPORTAR/EXPORTAR PROGRESO COMPLETO ---
    
    document.getElementById('btn-export-full').addEventListener('click', async () => {
        const data = { pegadas, repetidas };
        const codigo = btoa(JSON.stringify(data)); 
        
        const btn = document.getElementById('btn-export-full'); // Capturamos ANTES del await
        const originalHTML = btn.innerHTML;

        try {
            await navigator.clipboard.writeText(codigo);
            btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Código Copiado!';
            btn.style.backgroundColor = 'var(--panini-green)';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            alert("No se pudo copiar el código. Intenta nuevamente.");
        }
    });

    document.getElementById('btn-import-full').addEventListener('click', () => {
        const codigo = prompt("Pega aquí tu código de progreso generado previamente:");
        if (codigo) {
            try {
                const parsed = JSON.parse(atob(codigo)); 
                
                if (Array.isArray(parsed.pegadas) && Array.isArray(parsed.repetidas)) {
                    pegadas = parsed.pegadas;
                    repetidas = parsed.repetidas;
                    
                    localStorage.setItem('panini26_pegadas', JSON.stringify(pegadas));
                    localStorage.setItem('panini26_repetidas', JSON.stringify(repetidas));
                    
                    alert("¡Progreso importado con éxito!");
                    renderStats(); 
                } else {
                    alert("El código ingresado no es válido.");
                }
            } catch (err) {
                alert("Código inválido o corrupto. Verifica que lo hayas copiado completo.");
            }
        }
    });
}

// --- LOGICA DE CAMBIO DE PESTAÑAS ---
document.querySelectorAll('.tab').forEach(tab => {
    tab.onclick = (e) => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        mode = tab.dataset.mode;
        document.body.className = `mode-${mode}`;
        
        if (mode === 'estadisticas') {
            document.getElementById('app-container').classList.add('hidden');
            document.getElementById('stats-container').classList.remove('hidden');
            document.getElementById('footer-pegadas').classList.add('hidden');
            document.getElementById('footer-repetidas').classList.add('hidden');
            renderStats(); 
        } else {
            document.getElementById('app-container').classList.remove('hidden');
            document.getElementById('stats-container').classList.add('hidden');
            document.getElementById('footer-pegadas').classList.toggle('hidden', mode !== 'pegadas');
            document.getElementById('footer-repetidas').classList.toggle('hidden', mode !== 'repetidas');
            refreshUI(); 
        }
    };
});

init();

// --- FUNCIONALIDAD: COPIAR REPETIDAS AL PORTAPAPELES (BOTÓN FOOTER) ---
document.getElementById('btn-export-repetidas').addEventListener('click', async () => {
    if (repetidas.length === 0) {
        alert("Aún no tienes figuritas repetidas marcadas.");
        return;
    }

    let textoExportacion = "REPETIDAS:\n";
    textoExportacion += "===============\n\n";

    albumData.forEach(group => {
        let textoGrupo = '';
        let grupoTiene = false;

        group.teams.forEach((team, tIndex) => {
            const prefix = `${group.name}|${team.name}|`;
            const reps = repetidas
                .filter(id => id.startsWith(prefix))
                .map(id => parseInt(id.split('|')[2]))
                .sort((a, b) => a - b);

            if (reps.length > 0) {
                grupoTiene = true;
                let codeStr = "";
                if (group.codes) {
                    const codesArray = group.codes.split(',').map(c => c.trim());
                    if (codesArray[tIndex]) {
                        codeStr = ` (${codesArray[tIndex]})`;
                    }
                }
                textoGrupo += `${team.name}${codeStr}: ${reps.join(' - ')}\n`;
            }
        });

        if (grupoTiene) {
            textoExportacion += `--- ${group.name.toUpperCase()} ---\n`;
            textoExportacion += textoGrupo + "\n";
        }
    });

    const btn = document.getElementById('btn-export-repetidas'); // Capturamos ANTES del await
    const originalHTML = btn.innerHTML;

    try {
        await navigator.clipboard.writeText(textoExportacion);
        
        btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
        btn.style.backgroundColor = 'var(--panini-green)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = '';
        }, 2000);

    } catch (err) {
        console.error('Error al copiar: ', err);
        alert("Hubo un error al intentar copiar. Es posible que tu navegador no tenga los permisos necesarios.");
    }
});