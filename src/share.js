// export const toylist = [
//     {
//         label: "项圈",
//         value: "xq"
//     }
// ]

export const api = "https://tbapi.1451419.xyz/"
export async function getapi(path) {
    try {
        const res = await fetch(api + path, { headers: { 'token': localStorage.getItem("token") } })
        if (res.status == 403) {
            localStorage.removeItem("token")
            location.assign(location.origin)
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
            location.assign(location.origin)
            return
        }
        if (res.status != 200) { return false }
        const u = await res.json()
        if (u.code != 0) { return false }
        return true
    }
    catch { return false }
}