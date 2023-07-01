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
                    <n-card style="width:90vw;max-width: 1200px;" title="新任务">
                        <n-space vertical>
                            <n-text>标题</n-text>
                            <n-input type="text" placeholder="喵喵喵" v-model:value="title" maxlength="30" show-count />
                            <n-text>任务内容</n-text>
                            <n-input type="textarea" placeholder="新建任务" :autosize="{
                                minRows: 2
                            }" v-model:value="task" maxlength="500" show-count />
                            <n-space>
                                <n-checkbox v-model:checked="showprofile" label="公开昵称和uid" />
                                <n-checkbox v-model:checked="isprivate" disabled label="非公开任务" />
                            </n-space>
                            <n-button @click="submit">提交</n-button>
                        </n-space>
                    </n-card>
                    <NDivider />
                    <div v-for="q in tasklist">
                        <Tasks :q="q" />
                    </div>
                </n-space>
            </n-layout-content>
        </n-space>
    </n-layout>
</template>

<script setup>
import { NSpace, NLayout, NLayoutHeader, NLayoutContent, NH2, NCard, NInput, useMessage, NText, NCheckbox, NButton, NDivider } from 'naive-ui';
import { ref } from 'vue'
import { getapi, postapi } from '../share.js'
import Tasks from './Tasks.vue'
const username = ref(localStorage.getItem("username"))
const task = ref("")
const title = ref("")
const message = useMessage()
const isprivate = ref(false)
const showprofile = ref(true)
const tasklist = ref([])
async function submit() {
    const ispublic = !isprivate.value
    if (title.value == "" || task.value == "") {
        message.warning("请输入标题/内容")
        return
    }
    const r = await postapi("newtask", { "title": title.value, "content": task.value, "public": ispublic, "showid": showprofile.value })
    console.log({ "title": title.value, "content": task.value, "public": !isprivate.value, "showid": showprofile.value })
    if (r === true) {
        message.success("提交成功")
        title.value = ""
        task.value = ""
    } else {
        message.error("提交失败")
    }
    refreshlist()
}
function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    location.reload()
}
function refreshlist() {
    getapi("gettasklist").then(r => {
        if (r == false) {
            message.error("获取任务列表失败,关闭此信息将自动刷新页面", { closable: true, duration: 0, onClose: () => { location.reload() } })
        } else {
            tasklist.value = r
        }
    })
}
refreshlist()
</script>
