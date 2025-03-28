import ApexCharts from "apexcharts";

let chart; // Variável global para manter a instância do gráfico
let chart2;
let ramData = []; // Array para armazenar os valores da RAM
let cpuData = [];

async function fetchProcess() {
    const response = await fetch('http://localhost:5000/api/system-info');
    const data = await response.json();

    // console.log("Novo valor ram:", data.usedMemGB);
    if (!Array.isArray(ramData)) {
        ramData = [];
    }
    if (!Array.isArray(cpuData)) {
        cpuData = [];
    }

    // Adiciona o novo valor ao array (mantendo um limite de 10 valores, por exemplo)
    ramData.push(data.usedMemGB);
    cpuData.push(data.cpuUsagePercent);

    if (ramData.length > 10 || cpuData.length > 10) {
        ramData.shift(); // Remove o primeiro elemento para manter o tamanho fixo
        cpuData.shift();
    }

    if (!chart) {
        // Criar o gráfico apenas na primeira vez
        const options = {
            chart: {
                height: "100%",
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
            series: [
                {
                    name: "RAM",
                    data: ramData, // Inicia com os primeiros valores
                    color: "#1A56DB",
                },
            ],
            xaxis: {
                categories: Array.from({ length: ramData.length }, (_, i) => `T${i + 1}`), // Gera rótulos dinâmicos
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: { show: false },
        };

        const grafico = document.getElementById("area-chart");
        if (grafico && typeof ApexCharts !== "undefined") {
            chart = new ApexCharts(grafico, options);
            chart.render();
        }
    }

    if (!chart2) {
        // Criar o segundo gráfico apenas na primeira vez
        const options2 = {
            chart: {
                height: "100%",
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
            series: [
                {
                    name: "CPU",
                    data: cpuData, // Inicia com os primeiros valores
                    color: "#1A56DB",
                },
            ],
            xaxis: {
                categories: Array.from({ length: cpuData.length }, (_, i) => `T${i + 1}`), // Gera rótulos dinâmicos
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: { show: false },
        };

        const grafico2 = document.getElementById("area-chart2");
        if (grafico2 && typeof ApexCharts !== "undefined") {
            chart2 = new ApexCharts(grafico2, options2);
            chart2.render();
        }
    } else {
        // Atualizar os gráficos com os novos valores
        chart.updateSeries([{ data: ramData }]); // Atualiza o gráfico de RAM com os novos dados
        chart2.updateSeries([{ data: cpuData }]); // Atualiza o gráfico de CPU com os novos dados
    }
}

setInterval(fetchProcess, 3000);
