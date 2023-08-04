import { useNavigate } from "react-router-dom"
import { useLogOut } from "./useLogout"


export function useCheckingRegisterDirectus() {
    const [logout] = useLogOut()
    const navigate = useNavigate()
    const directusToken = localStorage.getItem("directus_token")
    const registerationTime = localStorage.getItem("registeration_time")
    const currentTime = Date.now()
    let parseDirectusToken: { expires: number }

    const checkRegisterDirectus = async () => {
        if (directusToken) {
            parseDirectusToken = JSON.parse(directusToken)
        } else {
            navigate('/admin/login')
        }
        if (!registerationTime) return navigate('/admin/login')

        const tokenExpires = parseDirectusToken.expires
        const timeTokenExpires = +registerationTime + tokenExpires

        if (currentTime > timeTokenExpires) {
            await logout()
        }
    }

    return [checkRegisterDirectus]
}