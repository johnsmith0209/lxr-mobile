<template>
    <TablePinned
        ref="root"
        :refresh-reference="refreshReference"
        :init-position="initPosition"
        :get-fixed-top="getFixedTop"
        :window="window"
    >
        <slot />
    </TablePinned>
</template>
<script>
const TABLE_WINDOW = 'div.ion-page:not(.ion-page-hidden)>ion-content';
</script>
<script setup>
import {
    ref,
    onMounted,
    onUnmounted,
    nextTick,
} from 'vue';
import {
    TablePinned,
} from '@lxr/common-fe/lib/vue-component';
import {
    GlobalState
} from '@/utils';

const root = ref();
let watcher;

defineProps({
    refreshReference: {
        type: Object,
        required: false,
        default: null,
    },
    initPosition: {
        type: String,
        required: false,
        default: 'left',
        validator(value) {
            return ['left', 'right'].includes(value);
        },
    },
    getFixedTop: {
        type: Function,
        required: false,
        default() {
            return document.querySelector(TABLE_WINDOW).getBoundingClientRect().y - 1;
        }
    },
    window: {
        type: String,
        required: false,
        default: TABLE_WINDOW,
    }
});

onMounted(() => {
    watcher = name => {
        if (name !== 'siteNotifications') {
            return;
        }
        nextTick(() => {
            refresh();
        });
    };
    GlobalState.addWatcher(watcher);
});

onUnmounted(() => {
    GlobalState.removeWatcher(watcher);
});

function refresh() {
    if (root.value) {
        root.value.refresh();
    }
}

defineExpose({refresh});

</script>
