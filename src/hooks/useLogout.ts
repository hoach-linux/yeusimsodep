import { authentication, logout as directusLogout, rest } from "@directus/sdk";
import { directusClient } from "../directus";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
    const navigate = useNavigate()
    const getDirectusClient = directusClient.with(authentication()).with(rest())
    const getDirectusToken = localStorage.getItem('directus_token')

    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if (getDirectusToken !== null) {
            const getRefreshToken: string = JSON.parse(getDirectusToken)?.refresh_token

            const result = await getDirectusClient.request(directusLogout(getRefreshToken));

            localStorage.removeItem('directus_token')
        }

        if (error) {
            console.log(error)
        }

        navigate('/admin/login')
    }

    return [logout]
}