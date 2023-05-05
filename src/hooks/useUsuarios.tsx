import { useEffect, useRef, useState } from "react"
import { reqResApi } from "../api/reqRes"
import { ReqResListado, Usuario } from '../interfaces/reqRes';

export const useUsuarios = () => {
    const [usuario, setUsuario] = useState<Usuario[]>([])

    const paginaRef = useRef(1);

    useEffect( () => {
        cargarUsuarios();
    },[])

    const cargarUsuarios = async() => {
        const res = await reqResApi.get<ReqResListado>('/users', {
            params: {
                page: paginaRef.current
            }
        })

        if(res.data.data.length > 0){
            setUsuario(res.data.data);
            // paginaRef.current++;
        }else{
            alert('No hay mas registros');
        }
    }

    const paginaSiguiente = () => {
        paginaRef.current++;
        cargarUsuarios();
    }

    const paginaAnterior = () => {
        if (paginaRef.current > 1) {
            paginaRef.current --;
            cargarUsuarios();
        }
    }
        
    return {
        usuario,
        paginaSiguiente,
        paginaAnterior,        
    }
}
