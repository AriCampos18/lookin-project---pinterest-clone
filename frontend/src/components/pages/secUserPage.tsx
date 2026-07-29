import Sidebar from "../layouts/sidebar/Sidebar";
import styles from "../css/userPage.module.css";
import BuscarPins from "../layouts/BuscarPins/buscarPins";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../config/api";

export default function UserPage() {

    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);

    const [busca, setBusca] = useState("");

    const location = useLocation();
    const { username } = location.state || {};

    const token = localStorage.getItem("token");

    async function buscarPinsDoUser() {
        const dados = await fetch(`${API_URL}/pins/userPins/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await dados.json();

        if (dados.ok) {
            setPins(Array.isArray(data) ? data : []);
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarPinsDoUser();
    }, []);

    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                <BuscarPins 
                    busca={busca}
                    setBusca={setBusca}
                />

                <div className={styles.line}>
                    <h3 className={styles.seusPins}>Pins de {username}</h3>
                </div>

                <div className={styles.divider}></div>

                {loading ? (
                    <p>Carregando...</p>
                ) : pins.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Você ainda não tem pins</p>
                    </div>
                ) : (
                    <section className={styles.pinsFeed}>
                        {pins.map((pin: any) => (
                            <div key={pin.id} className={styles.pinCard}>
                                <img className={styles.imgUserPins} src={`${API_URL}${pin.image}`} alt={pin.title} />
                                <div className={styles.pinInfo}>
                                    {pin.title !== "" && <p>{pin.title}</p>}
                                    <p>{pin.descricao}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </>
    );
}