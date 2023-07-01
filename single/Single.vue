<template>
    <n-layout>
        <n-space vertical>
            <n-layout-header bordered style="height: 64px; padding: 17px">
                <n-space justify="space-between">
                    <n-h2>Taskhub</n-h2></n-space>
            </n-layout-header>
            <n-layout-content content-style="display: flex;justify-content: center;">
                <n-space vertical>
                    <div v-if="errr">
                        <n-alert style="width:90vw;max-width: 1200px;" title="加载失败" type="error">
                            加载失败,请尝试<n-a :href="url">登录</n-a>
                        </n-alert>
                    </div>
                    <div v-else>
                        <Tasks :q="q" />
                    </div>
                </n-space>
            </n-layout-content>
        </n-space>
    </n-layout>
</template>

<script setup>
import { NSpace, NLayout, NLayoutHeader, NLayoutContent, NH2, NAlert, NA } from 'naive-ui';
import { ref } from 'vue'
import { getapi } from '../src/share.js'
import Tasks from '../src/app/Tasks.vue'
if (localStorage.getItem("token") == null) { location.assign(location.origin) }
const tid = (location.pathname).slice(11)
const errr = ref(false)
const url = location.origin
const q = ref()
const task = await getapi("gettask?tid=" + tid)
if (task.value == undefined) { errr.value = true } else {
    q.value = ref(task)
}
</script>