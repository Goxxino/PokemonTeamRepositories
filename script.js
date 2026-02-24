const chartOptions = {
    scales: {
        r: {
            angleLines: { color: 'rgba(255,255,255,0.05)' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            pointLabels: { color: '#666', font: { size: 11 } },
            ticks: { display: false },
            suggestedMin: 0,
            suggestedMax: 210
        }
    },
    plugins: { legend: { display: false } },
    responsive: true
};

const draw = (id, stats, color) => {
    new Chart(document.getElementById(id), {
        type: 'radar',
        data: {
            labels: ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'],
            datasets: [{
                data: stats,
                backgroundColor: color + '33',
                borderColor: color,
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: chartOptions
    });
};

// Inserisci qui le tue stats reali al liv. 50
draw('chartGarchomp', [184, 182, 115, 90, 105, 169], '#ff4d4d');
draw('chartStarmie', [136, 85, 105, 152, 105, 183], '#4d79ff');
draw('chartMetagross', [187, 205, 151, 103, 110, 90], '#00f2ff');