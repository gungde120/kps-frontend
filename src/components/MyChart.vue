<template>
    <canvas id="myChart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'MyChart',
    props: {
        chartData: {
        type: Object,
        required: true
        }
    },
    mounted() {
        const ctx = document.getElementById('myChart')
        const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.chartData.labels,
            datasets: [{
            label: this.chartData.label,
            data: this.chartData.data,
            backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    // 'rgba(75, 192, 64, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(255, 99, 132, 1)', 
                ],
            borderColor: [
                    'rgba(54, 162, 235, 1)',
                    // 'rgba(75, 192, 64, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(255, 99, 132, 1)', 
                ],
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        });
        myChart;
    },
};
</script>