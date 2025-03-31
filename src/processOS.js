import ApexCharts from "apexcharts";

let chart; // Variável global para a instância do gráfico de RAM
let chart2; // Variável global para a instância do gráfico de CPU
let ramData = []; // Array para armazenar os valores da RAM
let cpuData = []; // Array para armazenar os valores da CPU

const infoRam = document.querySelector('.infoRam');
const infoCpu = document.querySelector('.infoCpu');

async function fetchProcess() {
    const response = await fetch('http://localhost:5000/api/system-info');
    const data = await response.json();

    // Adiciona os novos valores aos arrays, mantendo um limite de 10 valores
    ramData.push(data.usedMemGB);
    cpuData.push(data.cpuUsagePercent);

    if (ramData.length > 10) ramData.shift();
    if (cpuData.length > 10) cpuData.shift();

    infoRam.innerText = `${ramData[ramData.length - 1].toString()} GB`
    infoCpu.innerText = `${cpuData[cpuData.length - 1].toString()} %`

    // Atualiza os gráficos com os novos dados
    updateCharts();
}

function initializeCharts() {
    const options = {
        chart: {
            height: "200px",
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: { enabled: false },
            toolbar: { show: false },
        },
        tooltip: { enabled: true, x: { show: false } },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        dataLabels: { enabled: false },
        stroke: { width: 6 },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: { left: 2, right: 2, top: 0 },
        },
        series: [],
        xaxis: {
            categories: [],
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: { show: false },
    };

    const grafico = document.getElementById("area-chart");
    if (grafico) {
        chart = new ApexCharts(grafico, { ...options, series: [{ name: "RAM", data: [] }], xaxis: { categories: [] } });
        chart.render();
    }

    const grafico2 = document.getElementById("area-chart2");
    if (grafico2) {
        chart2 = new ApexCharts(grafico2, { ...options, series: [{ name: "CPU", data: [] }], xaxis: { categories: [] } });
        chart2.render();
    }
}

function updateCharts() {
    const categories = Array.from({ length: ramData.length }, (_, i) => `T${i + 1}`);

    if (chart) {
        chart.updateOptions({
            series: [{ name: "RAM", data: ramData }],
            xaxis: { categories: categories },
        });
    }

    if (chart2) {
        chart2.updateOptions({
            series: [{ name: "CPU", data: cpuData }],
            xaxis: { categories: categories },
        });
    }
}

// Inicializa os gráficos
initializeCharts();

// Busca e atualiza os dados a cada segundo
setInterval(fetchProcess, 1000);
