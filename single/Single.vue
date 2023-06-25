<template>
    <n-layout>
        <n-space vertical>
            <n-layout-header bordered style="height: 64px; padding: 17px">
                <n-space justify="space-between">
                    <n-h2>Taskhub</n-h2>
                    <n-space>
                        <n-text>欢迎 {{ username }} 主人</n-text>
                        <n-button text tag="a" type="primary" @click="logout">退出登录</n-button>
                    </n-space></n-space>
            </n-layout-header>
            <n-layout-content content-style="display: flex;justify-content: center;">
                <n-space vertical>
                    <Tasks :q="q" />
                </n-space>
            </n-layout-content>
        </n-space>
    </n-layout>
</template>

<script setup>
import { NSpace, NLayout, NLayoutHeader, NLayoutContent, NH2, useMessage, NText, NButton} from 'naive-ui';
import { ref } from 'vue'
import { getapi, postapi } from '../src/share.js'
import Tasks from './Tasks.vue'
</script>../src/share.js