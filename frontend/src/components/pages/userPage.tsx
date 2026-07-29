import Sidebar from "../layouts/sidebar/Sidebar";
import styles from "../css/userPage.module.css";
import BuscarPins from "../layouts/BuscarPins/buscarPins";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

export default function UserPage() {

    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPin, setEditingPin] = useState(null);
    const [busca, setBusca] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    async function buscarPinsDoUser() {
        const dados = await fetch(`${API_URL}/pins/userPins`, {
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

    async function handleEdit(pin: any) {
        navigate('/criarPin', { state: { editingPin: pin } });
    }

    async function handleDelete(id: number) {
        if (window.confirm("Tem certeza que deseja apagar este pin?")) {
            const dados = await fetch(`${API_URL}/pins/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (dados.ok) {
                setPins(pins.filter((pin: any) => pin.id !== id));
            }
        }
    }

    function handleInfos() {
        navigate("/userInfos");
    }

    function verPinIndividual(id: number){
        navigate("/individualPin", {state: {id: id}});
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
                    <h3 className={styles.seusPins}>Seus Pins</h3>
                    <button className={styles.iconButton} title="Configurações da conta" 
                    onClick={handleInfos}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01A1.65 1.65 0 0 0 10.91 3H11a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01A1.65 1.65 0 0 0 21 10.91H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </button>
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
                            <div key={pin.id} className={styles.pinCard} onClick={() => verPinIndividual(pin.id)}>
                                <img className={styles.imgUserPins} src={`${API_URL}${pin.image}`} alt={pin.title} />
                                <div className={styles.pinInfo}>
                                    {pin.title !== "" && <p>{pin.title}</p>}
                                    <p>{pin.descricao}</p>
                                    <div className={styles.btnActions}>
                                        <button
                                            onClick={() => handleEdit(pin)}
                                            className={styles.iconButton}
                                            title="Editar"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => handleDelete(pin.id)}
                                            className={styles.iconButton}
                                            title="Excluir"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14H6L5 6" />
                                                <path d="M10 11v6" />
                                                <path d="M14 11v6" />
                                                <path d="M9 6V4h6v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </>
    );
}