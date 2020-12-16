import { useParams } from 'react-router-dom';
import TermOrderListComponent from '../components/term-orderlist-component';


export default function TermSearchPage () {

    // retrieve params into a variable
    const params = useParams();   
	return ( 

		<TermOrderListComponent queryString = {params.query}/>            

		)
}
