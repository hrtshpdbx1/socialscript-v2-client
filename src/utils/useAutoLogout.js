// utils/useAutoLogout.js  
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { tokenAtom, tokenExpireAtom } from "../atoms/auth.atom";

export function useAutoLogout() {
    const token = useAtomValue(tokenAtom); // lis tokenAtom
    const isTokenExpire = useAtomValue(tokenExpireAtom)
    const setToken = useSetAtom(tokenAtom); //le setter de tokenAtom 

    useEffect(() => {
        if (token && isTokenExpire) {
            setToken(null)
        }
    }, [token, isTokenExpire, setToken]);
     // dès que token ou isTokenExpire change l'effet se rejoue et vérifie la condition
}