import { ref } from "vue"
// export const api = "http://127.0.0.1:8000/"
export const api = "https://tbapi.1451419.xyz/"
export const loginstate = ref(false)
export async function getapi(path) {
    try {
        const res = await fetch(api + path, { headers: { 'token': localStorage.getItem("token") } })
        if (res.status == 403) {
            localStorage.removeItem("token")
            loginstate.value=false
            return
        }
        if (res.status != 200) {
            return false
        }
        const u = await res.json()
        return u.result
    }
    catch { return false }
}
export async function postapi(path, data) {
    try {
        const res = await fetch(api + path, { method: 'post', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem("token") } })
        if (res.status == 403) {
            localStorage.removeItem("token")
            loginstate.value=false
            return
        }
        if (res.status != 200) { return false }
        const u = await res.json()
        if (u.code != 0) { return false }
        return true
    }
    catch { return false }
}
