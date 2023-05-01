<template>
    <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
        <NGlobalStyle />
        <NMessageProvider>
            <App />
        </NMessageProvider>
    </NConfigProvider>
</template>
<script setup>
import App from './App.vue'
import { NMessageProvider, NConfigProvider, zhCN, dateZhCN, useOsTheme, darkTheme, NGlobalStyle } from 'naive-ui'
import { ref } from 'vue'
const otheme = useOsTheme()
const theme = ref(otheme.value == 'dark' ? darkTheme : null)
</script>