<script setup lang="ts">
import Card from './card.vue'
import { computed } from 'vue'
import FilterChips from './filterChips.vue'
import UserProfile from './userProfile.vue'

const props = defineProps({
  itemId: {
    type: Number,
    required: true,
    default: 0
  },
  itemPriority: {
    type: String,
    required: true,
    default: 'low',
  },
  itemTags: {
    type: [String],
    required: true,
    default: () => ['Tag-1', 'Tag-2']
  },
  itemTitle: {
    type: String,
    required: true,
    default: 'Ticket Title'
  },
  itemDescription: {
    type: String,
    required: true,
    default: '#Description'
  },
  itemStatus: {
    type: String,
    required: true,
    default: 'BACKLOG'
  },
  itemDueDate: {
    type: Date,
    required: false,
    default: new Date()
  }
})

const emit = defineEmits<{
  (e: 'settings-click', payload?: any): void
}>()

function onSettingsClick() {
  emit('settings-click', {
    id: props.itemId,
    name: props.itemTitle,
    description: props.itemDescription,
    priority: props.itemPriority,
    due_date: props.itemDueDate,
    status: props.itemStatus
  })
}

function formatPriority(itemPriority: String) {
  if (itemPriority === 'LOW')
    return 'Baixo';
  else if (itemPriority === 'MED')
    return 'Media';
  else if (itemPriority === 'HIGH')
    return 'Alta';
}

function formatDate(itemDueDate: Date) {
  return itemDueDate.toLocaleDateString('en-GB') // DD-MM-AAAA;
}

const classes = computed(() => [
  props.itemPriority.toLowerCase()
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
    <h2>{{ props.itemTitle }}</h2>
    <p>{{ props.itemDescription }}</p>
    <div class="authors">
        <!-- <UserProfile/> -->
        <!-- <UserProfile/> -->
        <!-- <button class="add">+</button> -->
    </div>
    <p class="item-priority">{{ formatPriority(props.itemPriority) }}</p>
  </Card>
</template>

<style scoped lang="css">
p {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100ch;
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

.date {
  display: flex;
  > * {
    flex: 1;
  }

  > *:last-child {
    text-align: end;
  }
}
</style>
