<template>
    <n-list-item>
        <n-text>{{ i[2] }}</n-text>
        <br><n-text depth="3">
            {{ time }} {{ i[3] }} id:{{ i[0] }}
        </n-text>
    </n-list-item>
</template>
<script setup>
import { NText, NListItem } from 'naive-ui'
import { defineProps } from 'vue';
const p = defineProps(['i'])
const i = p.i
const time = (new Date(i[4] * 1000)).toLocaleString()
</script>