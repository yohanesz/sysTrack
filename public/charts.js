const os = require('os');


async function getCpuUsage() {
  return new Promise((resolve) => {
    const start = os.cpus();

    setTimeout(() => {
      const end = os.cpus();
      let idleDiff = 0, totalDiff = 0;

      for (let i = 0; i < start.length; i++) {
        const startCpu = start[i].times;
        const endCpu = end[i].times;

        const idle = endCpu.idle - startCpu.idle;
        const total = 
          (endCpu.user - startCpu.user) +
          (endCpu.nice - startCpu.nice) +
          (endCpu.sys - startCpu.sys) +
          (endCpu.irq - startCpu.irq) +
          idle;

        idleDiff += idle;
        totalDiff += total;
      }

      const cpuUsagePercent = 100 - (idleDiff / totalDiff) * 100;
      resolve(cpuUsagePercent.toFixed(2));
    }, 100); // Mede a diferença em 100ms
  });
}

async function updateChart() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  const ramUsagePercent = ((usedMem / totalMem) * 100).toFixed(2);
  const cpuUsagePercent = await getCpuUsage();

  return {
    ram: parseFloat(ramUsagePercent),
    cpu: parseFloat(cpuUsagePercent)
  };
}

// Configuração inicial do gráfico
const options = {
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0
    },
  },
  series: [
    {
      name: "RAM Usage (%)",
      data: [],
      color: "#1A56DB",
    },
  ],
  xaxis: {
    categories: [],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
};

if (document.getElementById("ram-chart") && typeof ApexCharts !== 'undefined') {
  const chart = new ApexCharts(document.getElementById("ram-chart"), options);
  chart.render();

  // Atualizar o gráfico a cada 2 segundos
  setInterval(async () => {
    const data = await updateChart();
    const currentTime = new Date().toLocaleTimeString();

    chart.updateSeries([{
      name: "RAM Usage (%)",
      data: [...options.series[0].data, data.ram].slice(-10) // Mantém apenas os últimos 10 valores
    }]);

    options.xaxis.categories.push(currentTime);
    if (options.xaxis.categories.length > 10) {
      options.xaxis.categories.shift();
    }
  }, 2000);
}
