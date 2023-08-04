import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import { useCheckingRegisterDirectus } from "../../hooks/useCheckingRegisterDirectus"

export function DeleteSim() {
    const [searchInputLength, setSearchInputLength] = useState('')
    const [checkRegisterDirectus] = useCheckingRegisterDirectus()

    function changeSearchInput(input: string): void {
        setSearchInputLength(input)
    }

    useEffect(() => {
        checkRegisterDirectus();
    }, []);
    return (
        <div style={{ minWidth: "100%", marginTop: "20px", padding: "0 12px" }}>
            <Header changeSearchInput={changeSearchInput} />
        </div>
    )
}