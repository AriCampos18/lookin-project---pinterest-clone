import Sidebar from "../layouts/sidebar/Sidebar";
import styles from "../css/individualPin.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../config/api";

type TokenPayload = {
    id: number;
    email: string;
    exp: number;
    iat: number;
};

export default function IndividualPin() {

    const token = localStorage.getItem("token");

    const [pin, setPin] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [comentarioEmRespostaId, setComentarioEmRespostaId] = useState<number | null>(null);
    const [textoComentario, setTextoComentario] = useState("");
    const [textoResposta, setTextoResposta] = useState("");
    const [comentarioEditandoId, setComentarioEditandoId] = useState<number | null>(null);
    const [respostaEditandoId, setRespostaEditandoId] = useState<number | null>(null);
    const [textoComentarioEditando, setTextoComentarioEditando] = useState("");
    const [textoRespostaEditando, setTextoRespostaEditando] = useState("");

    const decoded = token ? jwtDecode<TokenPayload>(token) : null;
    const usuarioLogadoId = decoded?.id;

    const navigate = useNavigate();
    
    const location = useLocation();
    const { id } = location.state;

    async function buscarPin(){
        
        const dados = await fetch(`${API_URL}/pins/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

            const data = await dados.json();

            if(dados.ok){
                setPin(data);
                setComentarios(data.comentarios);
            }
    }

    async function adicionarComentario(){
        if(textoComentario.trim() === ""){
            alert("Digite um comentário!");
            return;
        }
        
        const dados = await fetch(`${API_URL}/comentarios/comentar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                descricao: textoComentario,
                pinId: id
            })
        });

        if(dados.ok){
            setTextoComentario("");
            buscarPin();
        }
    }

    async function adicionarResposta(idComentario: number){
        if(textoResposta.trim() === ""){
            alert("Digite uma resposta!");
            return;
        }

        const dados = await fetch(`${API_URL}/respostas/responder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                descricao: textoResposta,
                comentarioId: idComentario
            })
        });

        if(dados.ok){
            setTextoResposta("");
            setComentarioEmRespostaId(null);
            buscarPin();
        }
    }

    async function editarComentario(idComentario: number){
        if(textoComentarioEditando.trim() === ""){
            alert("Digite um comentário!");
            return;
        }

        if(confirm("Você deseja editar este comentário?")){
            const dados = await fetch(`${API_URL}/comentarios/${idComentario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                descricao: textoComentarioEditando
            })
        });

        if(dados.ok){
            setComentarioEditandoId(null);
            setTextoComentarioEditando("");
            buscarPin();
        }
    }
    }

    async function deletarComentario(idComentario: number){
        if(confirm("Todas as respostas a esse comentário serão apagadas. Deseja continuar?")){
                const dados = await fetch(`${API_URL}/comentarios/${idComentario}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(dados.ok){
                buscarPin();
            }
        }
    }

    async function editarResposta(idResposta: number){
        if(textoRespostaEditando.trim() === ""){
            alert("Digite uma resposta!");
            return;
        }

        if(confirm("Você deseja editar esta resposta?")){
            const dados = await fetch(`${API_URL}/respostas/${idResposta}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                descricao: textoRespostaEditando
            })
        });

        if(dados.ok){
            setRespostaEditandoId(null);
            setTextoRespostaEditando("");
            buscarPin();
        }
    }
    }

    async function deletarResposta(idResposta: number){
        if(confirm("Tem certeza que deseja deletar esta resposta?")){
            const dados = await fetch(`${API_URL}/respostas/${idResposta}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(dados.ok){
                buscarPin();
            }
        }
    }

    function verPinsUser(username: string){
        navigate("/secUserPage", {state: {username: username}});
    }
    
    useEffect(()=>{
        buscarPin();
    },[])
    
    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                {pin ? (
                    <div className={styles.pinCard}>
                        <div className={styles.pinHeader}>
                            <div className={styles.imageWrapper}>
                                <img src={`${API_URL}${pin.image}`} alt={pin.title} />
                            </div>
                            <div className={styles.pinContent}>
                                {pin.title !== "" && <h2 className={styles.title}>{pin.title}</h2>}
                                {pin.descricao !== "" && (
                                    <div className={styles.descSection}>
                                        <p className={styles.descTitle}>Descrição</p>
                                        <p className={styles.descText}>{pin.descricao}</p>
                                    </div>
                                )}
                                <div className={styles.authorSection}>
                                    <span className={styles.authorLabel}>Criado por</span>
                                    <a href="#" className={styles.user}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            verPinsUser(pin.user.username);
                                        }}
                                    >
                                        {pin.user.username}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <section className={styles.commentsSection}>
                            <h3>Comentários</h3>
                            <div className={styles.divider}></div>
                            <div className={styles.inputContainer}>
                                <input type="text" placeholder="Deixe seu comentário..." className={styles.inputComentario} 
                                value={textoComentario}
                                onChange={(e) => setTextoComentario(e.target.value)}
                                />
                                <button className={styles.btnComentar} onClick={adicionarComentario}>Comentar</button>
                            </div>
                            {
                                comentarios.length > 0 ? 
                                    (comentarios.map((comentario, index) => (
                                        <div key={comentario.id || index} className={styles.comentario}>
                                            <div className={styles.comentarioHeader}>
                                                <a href="#" className={styles.comentarioUser} onClick={(e) => {
                                                    e.preventDefault();
                                                    verPinsUser(comentario.user.username);
                                                }}>{comentario.user.username}</a>
                                                {
                                                    comentario.user.id === usuarioLogadoId && (
                                                        <div className={styles.comentarioAcoes}>
                                                            <button className={styles.btnAcaoComentario} title="Editar comentário" onClick={()=> {
                                                                const abrindo = comentarioEditandoId !== comentario.id;
                                                                setComentarioEditandoId(abrindo ? comentario.id : null);
                                                                setTextoComentarioEditando(abrindo ? comentario.comentario : "");
                                                                setComentarioEmRespostaId(null);
                                                                setRespostaEditandoId(null);
                                                            }}>
                                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M12 20h9" />
                                                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                                </svg>
                                                            </button>
                                                    <button className={styles.btnAcaoComentario} title="Excluir comentário" onClick={()=> deletarComentario(comentario.id)}>
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                    )
                                                }
                                            </div>
                                                {
                                                        comentarioEditandoId === comentario.id ? (
                                                            <div className={styles.editContainer}>
                                                                <input
                                                                    type="text"
                                                                    value={textoComentarioEditando}
                                                                    onChange={(e) => setTextoComentarioEditando(e.target.value)}
                                                                    className={styles.inputEdit}
                                                                />
                                                                <button className={styles.btnResponder} onClick={() => editarComentario(comentario.id)}>Editar</button>
                                                            </div>
                                                        ) : (
                                                            <p className={styles.comentarioTexto}>
                                                                {comentario.comentario}
                                                                {comentario.updatedAt && comentario.createdAt && new Date(comentario.updatedAt).getTime() !== new Date(comentario.createdAt).getTime() && (
                                                                    <span className={styles.tagEditado}> (editado)</span>
                                                                )}
                                                            </p>
                                                        )
                                                }
                                           
                                            {
                                                comentarioEmRespostaId !== comentario.id && (
                                                    <p className={styles.comentarioResposta} onClick={() => {
                                                        setComentarioEmRespostaId(comentarioEmRespostaId === comentario.id ? null : comentario.id);
                                                        setComentarioEditandoId(null);
                                                        setRespostaEditandoId(null);
                                                    }}>Responder</p>
                                                )
                                            }
                                            {comentarioEmRespostaId === comentario.id && (
                                                <div className={styles.resposta}>
                                                    <input type="text" placeholder="Digite sua resposta..." className={styles.inputComentario} value={textoResposta}
                                                    onChange={(e) => setTextoResposta(e.target.value)}/>
                                                    <button className={styles.btnResponder} onClick={() => adicionarResposta(comentario.id)}>Enviar</button>
                                                </div>
                                            )}
                                            {
                                                comentario.respostas?.map((resposta, rIndex) => (
                                                    <div key={resposta.id || rIndex} className={styles.respostaItem}>
                                                        <div className={styles.comentarioHeader}>
                                                            <a href="#" className={styles.comentarioUser} onClick={(e) => {
                                                                e.preventDefault();
                                                                verPinsUser(resposta.user.username);
                                                            }}>{resposta.user.username}</a>
                                                            {
                                                                resposta.user.id === usuarioLogadoId && (
                                                                    <div className={styles.comentarioAcoes}>
                                                                        <button className={styles.btnAcaoComentario} title="Editar resposta" onClick={() => {
                                                                            const abrindo = respostaEditandoId !== resposta.id;
                                                                            setRespostaEditandoId(abrindo ? resposta.id : null);
                                                                            setTextoRespostaEditando(abrindo ? resposta.resposta : "");
                                                                            setComentarioEmRespostaId(null);
                                                                            setComentarioEditandoId(null);
                                                                        }}>
                                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                                <path d="M12 20h9" />
                                                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                                            </svg>
                                                                        </button>
                                                                        <button className={styles.btnAcaoComentario} title="Excluir resposta" onClick={() => deletarResposta(resposta.id)}>
                                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                                <polyline points="3 6 5 6 21 6" />
                                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        {
                                                            respostaEditandoId === resposta.id ? (
                                                                <div className={styles.editContainer}>
                                                                    <input
                                                                        type="text"
                                                                        value={textoRespostaEditando}
                                                                        onChange={(e) => setTextoRespostaEditando(e.target.value)}
                                                                        className={styles.inputEdit} 
                                                                    />
                                                                    <button className={styles.btnResponder} onClick={() => editarResposta(resposta.id)}>Editar</button>
                                                                </div>
                                                            ) : (
                                                                <p className={styles.comentarioTexto}>
                                                                    {resposta.resposta}
                                                                    {resposta.updatedAt && resposta.createdAt && new Date(resposta.updatedAt).getTime() !== new Date(resposta.createdAt).getTime() && (
                                                                        <span className={styles.tagEditado}> (editado)</span>
                                                                    )}
                                                                </p>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                ))) : (<p className={styles.noComments}>Nenhum comentário ainda. Seja o primeiro a comentar!</p>)
                            }
                        </section>
                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </>
    );
}