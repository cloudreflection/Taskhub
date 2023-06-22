<template>
    <div style="margin: 40px;">
        <n-space vertical>
            <n-input type="text" placeholder="Token" style="width: 400px;" v-model:value="token" />
            <n-space>
                <n-button @click="login">登录</n-button>
                <n-text type="error">{{ message }}</n-text>
            </n-space>
        </n-space>
    </div>
</template>
<script setup>
import { NSpace, NInput, NButton, NText } from 'naive-ui'
import { ref } from 'vue'
import { api, loginstate } from './share'
const token = ref(localStorage.getItem("token"))
const message = ref("")
async function login() {
    try {
        const res = await fetch(api + "login", { headers: { 'token': token.value } })
        if (res.status == 403) {
            message.value = "无效token"
            localStorage.removeItem("token")
            return
        }

        if (res.status != 200) {
            message.value = "服务器错误"
            return
        }
        const u = await res.json()
        localStorage.setItem("token", token.value)
        localStorage.setItem("username", u.name)
        loginstate.value = true
    }
    catch {
        message.value = "服务器错误"
    }
}
</script>
