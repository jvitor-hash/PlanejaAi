<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { ref, onMounted, watch } from 'vue'

interface Props {
  labels: String[]
  unitName: String
  data: Number[]
}

const props = defineProps<Props>()
const barCanvas = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

onMounted(() => {
    if (!barCanvas.value) return

    chart = new Chart(barCanvas.value, {
        type: 'bar',
        data: {
            labels: props.labels,
            datasets: [
                {
                    label: props.unitName,
                    data: props.data,
                    borderWidth: 1,
                    borderColor: 'rgb(42, 127, 184)',
                    backgroundColor: 'rgba(54, 162, 235, 1)'
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },

            plugins: {
                legend: {
                    display: false,
                    labels: {
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    })
})

watch(
  () => [props.labels, props.data],
  () => {
    if (!chart) return

    chart.data.labels = props.labels
    chart.data.datasets[0].data = props.data
    chart.update()
  },
)
</script>

<template>
  <canvas ref="barCanvas" :width="50" :height="50" aria-label="Bar Chart"></canvas>
</template>
