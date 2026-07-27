import styles from "./buscarPins.module.css";

type Props = {
    busca: string;
    setBusca: React.Dispatch<React.SetStateAction<string>>;
};

export default function BuscarPins({ busca, setBusca }: Props) {
    return (
        <div className={styles.buscaContainer}>
            <input className={styles.busca} placeholder='Digite para buscar imagens...'
                value={busca}
                onChange={(e) => setBusca(e.target.value)}></input>
        </div>
    );
}