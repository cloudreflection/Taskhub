<template>
    <n-card :title="p[1]">
        <n-space vertical>
            <n-text>{{ p[2] }}</n-text>
            <div>
                <n-space>
                    <n-text depth="3" :type="finish ? 'warning' : 'info'">{{ finish ? '待处理' : '已完成' }}</n-text>
                    <n-text depth="3">
                        {{ time }} {{ name }} taskid:{{ p[0] }}
                    </n-text></n-space>
            </div>
            <n-space>
                <n-button text tag="a" type="primary" @click="reclist">{{ showrecord ? '隐藏' : '查看' }}任务记录</n-button>
                <n-button text tag="a" type="primary" @click="comlist">{{ showcomment ? '关闭' : '打开' }}评论区</n-button>
            </n-space>
            <div v-if="showrecord">
                <n-card title="任务记录">
                    <div v-if="er">
                        <n-empty description="暂无记录"></n-empty>
                    </div>
                    <div v-else>
                        <div v-for="i in r">
                            <n-list>
                                <Comments :i="i" />
                            </n-list>
                        </div>
                    </div>
                </n-card>
            </div>
            <div v-if="showcomment">
                <n-card title="评论区">
                    <n-space vertical>
                        <n-text>发表评论</n-text>
                        <n-input type="textarea" placeholder="喵喵喵" :autosize="{
                                minRows: 3
                            }" v-model:value="newcomment" maxlength="300" show-count />
                        <n-checkbox v-model:checked="taskrecord" label="标记为任务记录" />
                        <n-button @click="makecomment">发布</n-button>
                        <div v-if="ec">
                            <n-empty description="暂无评论"></n-empty>
                        </div>
                        <div v-else>
                            <div v-for="i in c">
                                <n-list bordered hoverable>
                                    <Comments :i="i" />
                                </n-list>
                            </div>
                        </div>
                    </n-space>
                </n-card>
            </div>
        </n-space>
    </n-card>
</template>
<script setup>
import { NCard, NText, NButton, NSpace, NInput, NCheckbox, NList, NEmpty, useMessage } from 'naive-ui'
import { ref, defineProps, toRaw } from 'vue'
import Comments from './Comments.vue'
import { getapi, postapi } from '../src/share'
const q = defineProps(['q'])
const p = toRaw(q.q)
const newcomment = ref("")
const taskrecord = ref(false)
const finish = ref(p[5] == 0)
const time = (new Date(p[3] * 1000)).toLocaleString()
const name = p[4]
const showcomment = ref(false)
const showrecord = ref(false)
const er = ref(true)
const ec = ref(true)
const r = ref([])
const c = ref([])
const message = useMessage()
async function reclist() {
    if (showrecord.value == true) {
        showrecord.value = false
        return
    }
    r.value = await getapi('getrecord?tid=' + p[0])
    showrecord.value = true
    if (r.value.length > 0) {
        er.value = false
    }
}
async function comlist() {
    if (showcomment.value == true) {
        showcomment.value = false
        return
    }
    c.value = await getapi('getcomment?tid=' + p[0])
    showcomment.value = true
    if (c.value.length > 0) {
        ec.value = false
    }
}
async function makecomment() {
    if (newcomment.value == "") {
        message.warning("请填写评论")
        return
    }
    const req = await postapi("newcomment", { "taskid": p[0], "content": newcomment.value, "isrec": taskrecord.value })
    if (req === true) {
        message.success("提交成功")
        newcomment.value = ""
    } else {
        message.error("提交失败")
    }
    if (taskrecord.value) {
        r.value = await getapi('getrecord?tid=' + p[0])
        if (showrecord.value) {
            showrecord.value = false
        }
    } else {
        c.value = await getapi('getcomment?tid=' + p[0])
        showcomment.value = false
    }
}
</script>