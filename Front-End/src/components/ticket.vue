<script setup lang="ts">
import Card from './card.vue'
import { computed, onMounted } from 'vue'
import FilterChips from './filterChips.vue'
import UserProfile from './userProfile.vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  },
})

const emit = defineEmits<{
  (e: 'settings-click', payload?: any): void
}>()

function onSettingsClick() {
  emit('settings-click', {
    ticket: props.ticket
  })
}

function formatPriority(itemPriority: String) {
  if (itemPriority === 'LOW')
    return 'Baixo';
  else if (itemPriority === 'MED')
    return 'Média';
  else if (itemPriority === 'HIGH')
    return 'Alta';
}

function formatDate(itemDueDate) {
  return new Date(itemDueDate).toLocaleDateString("en-GB");
}

const classes = computed(() => [
  props.ticket.priority.toLowerCase()
])
</script>

<template>
  <Card :class="classes">
    <div class="tags">
      <!-- <FilterChips :chips="itemTags"/> -->
      <!-- <button class="add">+</button> -->
    </div>
    <button @click="onSettingsClick" class="settings">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-three-dots-vertical"
        viewBox="0 0 16 16"
      >
        <path
          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
        />
      </svg>
    </button>
    <h2>{{ props.ticket.name }}</h2>
    <p>{{ props.ticket.description }}</p>
    <div class="authors">
        <!-- <UserProfile/> -->
        <!-- <UserProfile/> -->
        <!-- <button class="add">+</button> -->
    </div>
    <div class="bottom">
      <p class="item-priority">{{ formatPriority(props.ticket.priority) }}</p>
      <p class="due_date">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
          <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
        </svg>
        <small>{{ formatDate(props.ticket.due_date) }}</small>
      </p>
    </div>
  </Card>
</template>

<style scoped lang="css">
p {
  overflow-wrap: break-word;
  white-space: nowrap;
  max-width: 50ch;
}

.tags {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.add {
    max-width: fit-content;
    max-height: fit-content;
    padding: var(--spacing-xs) var(--spacing-sm);
    border: none;
    background-color: hsl(from green h 50% l / 0.25);
    border: 1px solid hsl(from green h 50% 45% / 0.5);
    color: #fff;
    border-radius: 50%;
    cursor: pointer;
}

.authors {
    margin-block-start: var(--spacing-rg);
    display: flex;
    align-items: center;
    > * {
        width: 36px;
        height: 36px;
    }
}

h2 {
  margin-block-start: var(--spacing-sm);
}

.low .item-priority {
    background: transparent;
    border: none;
    color: var(--priority-low);
    position: relative;
    margin-left: 16px;
}

.low .item-priority::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -18px;
    width: 14px;
    height: 14px;
    background-color: rgb(from var(--priority-low) r g b / 0.1);
    border: 1px solid rgb(from var(--priority-low) r g b / 0.3);
    border-radius: 50%;
    transform: translateY(-50%);
}

.med .item-priority {
    background: transparent;
    border: none;
    color: hsl(from var(--priority-med) h s 45%);
    position: relative;
    margin-left: 16px;
}

.med .item-priority::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -18px;
    width: 14px;
    height: 14px;
    background-color: hsl(from var(--priority-med) h s 45% / 0.1);
    border: 1px solid hsl(from var(--priority-med) h s 45% / 0.3);
    border-radius: 50%;
    transform: translateY(-50%);
}

.high .item-priority {
    background: transparent;
    border: none;
    color: var(--priority-high);
    position: relative;
    margin-left: 16px;
}

.high .item-priority::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -18px;
    width: 14px;
    height: 14px;
    background-color: rgb(from var(--priority-high) r g b / 0.1);
    border: 1px solid rgb(from var(--priority-high) r g b / 0.3);
    border-radius: 50%;
    transform: translateY(-50%);
}


.low {
  background: linear-gradient(
    to bottom,
    var(--bg-light),
    rgb(from var(--priority-low) r g b / 0.1)
  );
  border: 1px solid rgb(from var(--priority-low) r g b / 0.3);
}

.med {
  background: linear-gradient(
    to bottom,
    var(--bg-light),
    rgb(from var(--priority-med) r g b / 0.1)
  );

  border: 1px solid rgb(from var(--priority-med) r g b / 0.3);
}

.high {
  background: linear-gradient(
    to bottom,
    var(--bg-light),
    rgb(from var(--priority-high) r g b / 0.1)
  );
  border: 1px solid rgb(from var(--priority-high) r g b / 0.3);
}

.settings {
    border: none;
    background: transparent;
    position: absolute;
    cursor: pointer;
    top: 15px;
    right: 15px;
}

.bottom {
  display: flex;
  
  > * {
    flex: 1;
  }

  > *:last-child {
    text-align: end;
  }
}

.due_date {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
