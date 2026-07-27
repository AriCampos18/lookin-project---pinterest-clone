import Sidebar from "../layouts/sidebar/Sidebar";
import styles from "../css/criarPin.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CriarPin() {
    const navigate = useNavigate();

    const location = useLocation();
    const { editingPin } = location.state || {};

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const token = localStorage.getItem("token");

    async function criarPin() {
        const formData = new FormData();
        formData.append("title", titulo);
        formData.append("description", descricao);
        formData.append("image", imagem);

        const dados = await fetch("http://localhost:3000/pins/criarPin", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        })

        const data = await dados.json();

        if (data.status === 200) {
            setSuccess("Pin criado com sucesso!");
            return true;
        }
        else {
            setError(data.message);
            return false;
        }
    }

    async function editarPin() {
        const formData = new FormData();
        formData.append("title", titulo);
        formData.append("description", descricao);

        const dados = await fetch(`http://localhost:3000/pins/editarPin/${editingPin.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        })

        const data = await dados.json();

        if (data.status === 200) {
            setSuccess("Pin editado com sucesso!");
            return true;
        }
        else {
            setError(data.message);
            return false;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPin) {
            if (imagem == null) {
                setError("Por favor, selecione uma imagem");
                return;
            }
        }

        setLoading(true);
        if (editingPin) {
            await editarPin();
        } else {
            await criarPin();
        }

        if (!error) {
            setTimeout(() => {
                setLoading(false);
                navigate('/userPage');
            }, 2000);
        }
    };

    useEffect(() => {
        if (editingPin) {
            setTitulo(editingPin.title);
            setDescricao(editingPin.descricao);
        }
    }, [editingPin]);

    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                <div className={styles.contentCard}>
                    <div className={styles.headerCard}>
                        <h1>{editingPin ? "Editar Pin" : "Criar Pin"}</h1>
                    </div>
                </div>

                {error && (
                    <div className={styles.alertMessageError}>
                        <svg className={styles.socialIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {error}
                    </div>
                )}

                {success && (
                    <div className={styles.alertMessageSuccess}>
                        <svg className={styles.socialIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {success}
                    </div>
                )}

                <div className={styles.card}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="titulo">Titulo</label>
                        <input className={styles.inputText}
                            type="text" id="titulo" placeholder="Digite o titulo do seu pin"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            disabled={loading} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        <input className={styles.inputText}
                            type="text" id="descricao" placeholder="Digite a descrição do seu pin"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            disabled={loading} />
                    </div>
                     <div className={styles.inputGroup}>
                        <label htmlFor="imagem">Imagem</label>
                        {!editingPin && <input className={styles.inputText}
                            type="file" id="imagem"
                            accept="image/*"
                            onChange={(e) => setImagem(e.target.files ? e.target.files[0] : null)}
                            required
                            disabled={loading} />}
                    </div>

                    {editingPin ? <img className={styles.imagePreview} src={editingPin.image} alt="Prévia" /> : 
                    imagem && <img className={styles.imagePreview} src={URL.createObjectURL(imagem)} alt="Prévia" />}

                    <button type="submit" className={styles.submitBtn}
                        onClick={handleSubmit}
                        disabled={loading}>
                        {loading ? (
                            <>
                                <div className={styles.spinner}></div>
                                <span>Processando...</span>
                            </>
                        ) : (
                            <span>{editingPin ? "Editar Pin" : "Salvar Pin"}</span>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}