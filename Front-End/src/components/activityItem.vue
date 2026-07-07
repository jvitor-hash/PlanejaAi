<script setup lang="ts">
    const props = defineProps({
        itemDate: {
            type: String,
            required: true,
            default: '01 Jan 00:00'
        },
        itemActionAuthor: {
            type: String,
            required: true,
            default: '#ActionAuthor'
        },
        itemActionAuthorHref: {
            type: String,
            required: true,
            default: "#"
        },
        itemAction: {
            type: String,
            required: true,
            default: '#Action'
        },
        itemNumber: {
            type: String,
            required: true,
            default: '#00001'
        }
    });
</script>

<template>
  <div class="item">
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-hourglass-split"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
        />
      </svg>
    </div>
    <div class="info">
        <p class="muted"><small>{{ props.itemDate }}</small></p>
        <p class="action"><a :href="props.itemActionAuthorHref">{{ props.itemActionAuthor }}</a> {{ props.itemAction }}</p>
        <p class="muted"><small>{{ props.itemNumber }}</small></p>
    </div>
    <div></div>
  </div>
</template>

<style scoped lang="css">
    .item {
        display: flex;
        gap: var(--spacing-sm);
        margin-left: var(--spacing-sm);
    }

    .action, .muted {
        margin-left: var(--spacing-rg);
    }

    .info {
        display: grid;
        gap: var(--spacing-xs);
    }

    .icon {
        display: grid;
        place-items: center;
        position: relative;
        > svg {
            z-index: 1;
            color: #fff;
        }
    }

    .icon::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        background-color: rgb(from var(--secondary-color) r g b / 0.8);
    }

    .muted {
        opacity: 0.5;
    }

    .action a {
        text-decoration: underline;
        color: var(--secondary-color);
    }
</style>