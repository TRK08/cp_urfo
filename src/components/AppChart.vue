<template>
    <div class="chart">
        <h3>{{ title }}</h3>
        <DoughnutChart :chartData="formattedData" :options="options" :height="150"/>
    </div>
</template>

<script setup lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables, type ChartData, type ChartOptions } from "chart.js";
import { computed } from 'vue';
import { CLASS_DICT, type TDictClass } from '@/utilities';

Chart.register(...registerables);

type TProps = {
    title: string
    counts: Record<TDictClass, number>
}

const props = defineProps<TProps>()

// 'Косуля', 'Кабарга', 'Олень'

const BASE_DATA_OBJ: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
    {
        data: [],
        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4'],
    },
    ],
};

const formattedData = computed<ChartData<'doughnut'>>(() => {
    const resultObject: ChartData<'doughnut'> = BASE_DATA_OBJ
    Object.entries(props.counts).map(([key, value]) => {
        resultObject['labels']?.push(CLASS_DICT[Number(key) as TDictClass])
        resultObject['datasets'][0]['data'].push(value)
    })
    return resultObject
})

const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: (context) => {
                    return `${context.label}: ${context.parsed} %`;
                }
            }
        }
    },
}
</script>

<style lang="scss">
.chart {
    background-color: #fff;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}
</style>