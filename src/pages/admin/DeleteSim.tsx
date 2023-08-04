import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import { useCheckingRegister } from "../../hooks/useCheckingRegister"

export function DeleteSim() {
    const [searchInputLength, setSearchInputLength] = useState('')
    const [checkRegister] = useCheckingRegister("/admin/login")

    function changeSearchInput(input: string): void {
        setSearchInputLength(input)
    }

    useEffect(() => {
        checkRegister();
    }, []);
    return (
        <div style={{ minWidth: "100%", marginTop: "20px", padding: "0 12px" }}>
            <Header changeSearchInput={changeSearchInput} />
        </div>
    )
}