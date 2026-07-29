import styles from "../css/userInfos.module.css";
import Sidebar from "../layouts/sidebar/Sidebar";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { API_URL } from "../../config/api";

export default function UserInfos() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [novoNome, setNovoNome] = useState("");
    const [novoEmail, setNovoEmail] = useState("");

    const navigate = useNavigate();

    async function buscarInfosUser(){
        const token = localStorage.getItem("token");

        const dados = await fetch(`${API_URL}/user/userInfos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await dados.json();

        if(dados.ok){
            setNome(data.username);
            setEmail(data.email);
            setNovoNome(data.username);
            setNovoEmail(data.email);
        }
    }

    async function deletarConta(){
        if(window.confirm("Tem certeza que deseja apagar sua conta? Todos os seus pins serão apagados.")){
            const token = localStorage.getItem("token");
            const dados = await fetch(`${API_URL}/user/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if(dados.ok){
                localStorage.removeItem("token");
                navigate("/");
            }
        }
    }

    async function editarConta(){
        setModalOpen(true);
    }

    function cancelarEdicao(){
        if(window.confirm("Tem certeza que deseja cancelar a edição?")){
            setModalOpen(false);
        }
    }

    async function confirmarEdicao(){
        if(window.confirm("Tem certeza que deseja mudar suas informações?")){
            const token = localStorage.getItem("token");
            const dados = await fetch(`${API_URL}/user/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: novoNome,
                    email: novoEmail
                })
            })

            if(dados.ok){
                setModalOpen(false);
                setNome(novoNome);
                setEmail(novoEmail);
            }
        }
    }

    useEffect(()=>{
        buscarInfosUser();
    }, []);
    
    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                <h3 className={styles.seusPins}>Minhas informações</h3>
                <div className={styles.divider}></div>

                <section>
                    <h3>Nome de usuário: {nome}</h3>
                    <h3>E-mail: {email}</h3>
                </section>
                <div className={styles.btnContainer}>
                    <button className={styles.btnDelete} onClick={deletarConta}>
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
                        Deletar Conta
                    </button>
                    <button className={styles.btnEdit} onClick={editarConta}>
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
                        Editar Perfil
                    </button>
                </div>
            </div>

            {modalOpen && (
                <div className={styles.containerModal}>
                    <div className={styles.modal}>
                        <h3>Editar Perfil</h3>
                        <div className={styles.divider}></div>
                        <form>
                            <label htmlFor="nome">Nome de usuário</label>
                            <input type="text" id="nome" placeholder="Nome de usuário" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" placeholder="E-mail" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} />
                        </form>
                        <div className={styles.btnContainer}>
                            <button className={styles.cancelarEdicao} onClick={cancelarEdicao}>
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
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                Cancelar
                            </button>
                            <button className={styles.confirmEditBtn} onClick={confirmarEdicao}>
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
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}