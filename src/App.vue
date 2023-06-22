<template>
    <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
        <NGlobalStyle />
        <div v-if="!loginstate">
            <Login />
        </div>
        <div v-else>
            <NMessageProvider>
                <App />
            </NMessageProvider>
        </div>
    </NConfigProvider>
</template>

<script setup>
import Login from './Login.vue'
import App from './app/Main.vue'
import { loginstate } from './share.js'
import { NMessageProvider, NConfigProvider, zhCN, dateZhCN, useOsTheme, darkTheme, NGlobalStyle } from 'naive-ui'
import { ref } from 'vue'
const otheme = useOsTheme()
const theme = ref(otheme.value == 'dark' ? darkTheme : null)
</script>