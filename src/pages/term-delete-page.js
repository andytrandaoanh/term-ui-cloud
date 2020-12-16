import { useParams } from 'react-router-dom';
import TermDeleteComponent from '../components/term-delete-component';


export default function TermDeletePage () {

    // retrieve params into a variable
    const params = useParams();   
	return <TermDeleteComponent termId = {params.id}/>
}
