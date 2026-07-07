<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { ref, onMounted, watch } from 'vue'

interface Props {
  labels: string[]
  unitName: string
  data: number[]
}

const props = defineProps<Props>();
const pieCanvas = ref<HTMLCanvasElement | null>(null);
const root = document.documentElement;
let isDark = root.getAttribute('data-theme');

let chart: Chart | null = null

onMounted(() => {
  if (!pieCanvas) return

  chart = new Chart(pieCanvas.value!, {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.unitName,
          data: props.data,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: isDark ? '#000' : '#fff',
            font: {
              family: 'Inter',
            },
          },
        },
      },
    },
  })
})

watch(
  () => [props.labels, props.data, isDark],
  () => {
    if (!chart) return

    chart.data.labels = props.labels
    chart.data.datasets[0].data = props.data
    chart.update()
  },
)
</script>

<template>
  <canvas ref="pieCanvas" :width="50" :height="50" aria-label="pie chart"></canvas>
</template>
