import { useParams } from 'react-router-dom';
import TermCombinedComponent from '../components/term-combined-component';


export default function TermCombinedPage () {

    // retrieve params into a variable
    const params = useParams();   
	return <TermCombinedComponent langId = {params.id}/>
}
