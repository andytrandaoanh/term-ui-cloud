import { useParams } from 'react-router-dom';
import TermSearchComponent from '../components/term-search-component';


export default function TermSearchPage () {

    // retrieve params into a variable
    const params = useParams();   
	return ( 

		<TermSearchComponent queryString = {params.query}/>            

		)
}
