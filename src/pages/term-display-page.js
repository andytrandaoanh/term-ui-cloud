import { useParams } from 'react-router-dom';
import TermDisplayComponent from '../components/term-display-component';


export default function TermDisplayPage () {

    // retrieve params into a variable
    const params = useParams();   
	return <TermDisplayComponent termId = {params.id}/>
}
