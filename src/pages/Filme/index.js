import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { useEffect , useState } from 'react';
import {toast} from 'react-toastify';

 export default function Filme() {
    const {id} = useParams();
    const history = useHistory()


    const [filme, setFilme] = useState([]);
    const [loading,setLoading] = useState(true)

    useEffect(()=>{

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`)
            //console.log(response.data)
            if(response.data.length === 0){
                //tentou acessar com um ID QUE NAO EXISTE, NAVEGO ELE PARA HOME!
                history.replace('/');
                return;
            }


            setFilme(response.data)
            setLoading(false)
        }

        loadFilme()

        return () => {
            
        }

    }, [history, id]);



    function salvaFilme(){
        
        const minhaLista = localStorage.getItem('filmes');

        let filmeSalvos = JSON.parse(minhaLista) || [];

        //Se tiver algum fiilme salvo com esse mesmo id precisa ignorar...

        const hasFilme = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
        
        if(hasFilme){
            toast.error(`Você ja possui ${filme.nome} salvo.`)
            return;
            //parou a execução
        }



        filmeSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmeSalvos))
        
        toast.success(`O filme ${filme.nome} foi salvo!!`)
    }



    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando seu filme...</h1>
            </div>
        )
    }


    return(
        <div className='filme-info'>
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome}/>

            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className='botoes'>
                <button onClick={ salvaFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

