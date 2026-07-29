import Sidebar from '../layouts/sidebar/Sidebar';
import styles from './../css/home.module.css';
import BuscarPins from '../layouts/BuscarPins/buscarPins';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../config/api";

export default function HomePage() {

    const [pins, setPins] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [pinsFiltrados, setPinsFiltrados] = useState([]);

    const [busca, setBusca] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    function verPinsUser(username: string){
        navigate("/secUserPage", {state: {username: username}});
    }

    async function carregarPins() {
        const token = localStorage.getItem("token");

        const dados = await fetch(`${API_URL}pins`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await dados.json();

        setPins(Array.isArray(data) ? data : []);
        setLoading(false);
    }

    function verPinIndividual(id: number){
        navigate("/individualPin", {state: {id: id}});
    }

    useEffect(() => {
        carregarPins();
    }, [])

    useEffect(() => {
        if(!busca){
            setPinsFiltrados(pins);
        }else{
            setPinsFiltrados(pins.filter((pin: any) => pin.title.toLowerCase().includes(busca.toLowerCase()) || 
            pin.descricao.toLowerCase().includes(busca.toLowerCase())));
        }
    }, [busca, pins])

    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                <BuscarPins 
                    busca={busca}
                    setBusca={setBusca}
                />

                <div className={styles.line}>
                    <p>Para você</p>
                </div>
                
                <div className={styles.divider}></div>

                {loading ? (
                    <p>Carregando...</p>
                ) : pinsFiltrados.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Não foram encontrados pins</p>
                    </div>
                ) : (
                    <section>
                        <div className={styles.pinsFeed}>
                            {pinsFiltrados.map((pin: any) => {
                                return (
                                    <div key={pin.id} className={styles.pinCard} onClick={() => verPinIndividual(pin.id)}>
                                        <img className={styles.imgUserPins} src={`${API_URL}${pin.image}`} alt={pin.title} />
                                        {pin.title !== "" && <p>{pin.title}</p>}
                                        <a href="#" className={styles.user}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                verPinsUser(pin.user.username);
                                            }}
                                        >
                                            {pin.user.username}
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}
            </div> 
        </>
    );
}