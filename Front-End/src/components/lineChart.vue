<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { ref, onMounted, watch } from 'vue'

interface Props {
  labels: String[]
  unitName: String
  data: Number[]
}

const props = defineProps<Props>()
const lineCanvas = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

onMounted(() => {
    if (!lineCanvas.value) return

    chart = new Chart(lineCanvas.value, {
        type: 'line',
        data: {
            labels: props.labels,
            datasets: [{
                label: props.unitName,
                data: props.data
            }]
        },

        options: {
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
    <canvas ref="lineCanvas" :width="50" :height="50" aria-label="Line Chart"></canvas>
</template>