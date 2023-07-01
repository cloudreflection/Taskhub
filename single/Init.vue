<template>
    <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
        <NGlobalStyle />
        <NMessageProvider>
            <Suspense>
                <Single />
            </Suspense>
        </NMessageProvider>
    </NConfigProvider>
</template>

<script setup>
import Single from './Single.vue'
import { loginstate } from '../src/share.js'
import { NMessageProvider, NConfigProvider, zhCN, dateZhCN, useOsTheme, darkTheme, NGlobalStyle } from 'naive-ui'
import { ref, Suspense } from 'vue'
const otheme = useOsTheme()
const theme = ref(otheme.value == 'dark' ? darkTheme : null)
if (localStorage.getItem("token") != null) { loginstate.value = true }
</script>