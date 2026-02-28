// Registra il plugin per mostrare i valori sulle barre
Chart.register(ChartDataLabels);

// Definizione delle nature e le statistiche che modificano
const natures = {
    // Nature neutre
    'ardita': { increased: null, decreased: null },
    'docile': { increased: null, decreased: null },
    'ritrosa': { increased: null, decreased: null },
    'furba': { increased: null, decreased: null },
    'seria': { increased: null, decreased: null },
    
    // +ATK
    'schiva': { increased: 1, decreased: 2 }, // ATK +, DEF -
    'decisa': { increased: 1, decreased: 3 }, // ATK +, SPA -
    'birbona': { increased: 1, decreased: 4 }, // ATK +, SPD -
    'audace': { increased: 1, decreased: 5 }, // ATK +, SPE -
    
    // +DEF
    'sicura': { increased: 2, decreased: 1 }, // DEF +, ATK -
    'scaltra': { increased: 2, decreased: 3 }, // DEF +, SPA -
    'fiacca': { increased: 2, decreased: 4 }, // DEF +, SPD -
    'placida': { increased: 2, decreased: 5 }, // DEF +, SPE -
    
    // +SPA
    'modesta': { increased: 3, decreased: 1 }, // SPA +, ATK -
    'mite': { increased: 3, decreased: 2 }, // SPA +, DEF -
    'ardente': { increased: 3, decreased: 4 }, // SPA +, SPD -
    'quieta': { increased: 3, decreased: 5 }, // SPA +, SPE -
    
    // +SPD
    'calma': { increased: 4, decreased: 1 }, // SPD +, ATK -
    'gentile': { increased: 4, decreased: 2 }, // SPD +, DEF -
    'cauta': { increased: 4, decreased: 3 }, // SPD +, SPA -
    'vivace': { increased: 4, decreased: 5 }, // SPD +, SPE -
    
    // +SPE
    'timida': { increased: 5, decreased: 1 }, // SPE +, ATK -
    'lesta': { increased: 5, decreased: 2 }, // SPE +, DEF -
    'allegra': { increased: 5, decreased: 3 }, // SPE +, SPA -
    'ingenua': { increased: 5, decreased: 4 } // SPE +, SPD -
};

// Funzione per creare opzioni di chart personalizzate in base alla natura
const getChartOptions = (nature) => {
    const natureData = natures[nature];
    
    return {
        indexAxis: 'y',
        scales: {
            x: {
                display: false,
                max: 255 
            },
            y: {
                grid: { display: false },
                ticks: {
                    color: '#999', // Colore più morbido
                    font: {
                        family: "'Montserrat', sans-serif", // Font più moderna
                        size: 11,
                        weight: '600'
                    }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const idx = context.dataIndex;
                        const statName = context.chart.data.labels[idx];
                        const val = context.dataset.data[idx];
                        const iv = context.dataset.ivs ? context.dataset.ivs[idx] : '';
                        const ev = context.dataset.evs ? context.dataset.evs[idx] : '';
                        return [`${statName}: ${val}`, `IV: ${iv}`, `EV: ${ev}`];
                    }
                }
            },
            datalabels: {
                color: (context) => {
                    const idx = context.dataIndex;
                    if (idx === natureData.increased) return '#ff5555';
                    if (idx === natureData.decreased) return '#5588ff';
                    return '#fff';
                },
                anchor: 'end',
                align: 'right',
                offset: 5,
                font: { size: 11, weight: 'bold' }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        // Questo arrotonda le barre a "pillola"
        elements: {
            bar: {
                borderRadius: 20, 
                borderSkipped: false
            }
        }
    };
};

const draw = (id, stats, color, nature, evs) => {
    const statLabels = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'];
    // estraiamo solo i valori per disegnare le barre
    const values = stats.map(s => s.value);
    const ivs = stats.map(s => s.iv);
    // evs è già un array di numeri

    new Chart(document.getElementById(id), {
        type: 'bar',
        data: {
            labels: statLabels,
            datasets: [{
                data: values,
                ivs: ivs,
                evs: evs,
                backgroundColor: color + 'cc', // Leggera trasparenza
                barThickness: 8, // Barre più sottili = più eleganza
            }]
        },
        options: getChartOptions(nature)
    });
};

// Render IV/EV statistics as HTML grid table
const renderStatsTable = (containerId, ivs, evs, color) => {
    const labels = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'];
    const container = document.getElementById(containerId);
    
    const gridHTML = `
        <div class="stats-grid">
            <div class="stats-grid-header">
                <div>STAT</div>
                <div>IV</div>
                <div>EV</div>
            </div>
            ${labels.map((label, i) => `
                <div class="stats-grid-row">
                    <div class="stats-grid-cell label">${label}</div>
                    <div class="stats-grid-cell iv">${ivs[i]}</div>
                    <div class="stats-grid-cell ev" style="color: ${color}">
                        <span>${evs[i]}</span>
                        <div class="ev-bar">
                            <div class="ev-bar-fill" style="width: ${(evs[i]/252)*100}%; background: ${color};"></div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = gridHTML;
};

// chiamate per ciascun Pokémon
const garchompIVs = [24, 29, 5, 16, 18, 31];
const garchompEVs = [6, 163, 20, 34, 16, 106];
draw('chartGarchomp', [
    { value: 184, iv: 24 }, { value: 182, iv: 29 }, { value: 115, iv: 5 },
    { value: 90, iv: 16 }, { value: 105, iv: 18 }, { value: 169, iv: 31 }
], '#ff4d4d', 'allegra', garchompEVs);
renderStatsTable('statsGarchomp', garchompIVs, garchompEVs, '#ff4d4d');

const starmieIVs = [6, 30, 31, 25, 30, 26];
const starmieEVs = [0, 0, 0, 255, 0, 255];
draw('chartStarmie', [
    { value: 114, iv: 6 }, { value: 68, iv: 30 }, { value: 101, iv: 31 },
    { value: 164, iv: 25 }, { value: 105, iv: 30 }, { value: 133, iv: 26 }
], '#44ddff', 'timida', starmieEVs);
renderStatsTable('statsStarmie', starmieIVs, starmieEVs, '#44ddff');

const metagrossIVs = [25, 31, 24, 12, 19, 0];
const metagrossEVs = [255, 255, 0, 0, 0, 0];
draw('chartMetagross', [
    { value: 184, iv: 25 }, { value: 187, iv: 31 }, { value: 147, iv: 24 },
    { value: 106, iv: 12 }, { value: 104, iv: 19 }, { value: 75, iv: 0 }
], '#00f2ff', 'furba', metagrossEVs);
renderStatsTable('statsMetagross', metagrossIVs, metagrossEVs, '#00f2ff');