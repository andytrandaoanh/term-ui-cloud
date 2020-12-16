import { useParams } from 'react-router-dom';
import TermEditComponent from '../components/term-edit-component';


export default function PhotoEditPage () {

    // retrieve params into a variable
    const params = useParams();   
	return <TermEditComponent termId = {params.id}/>
}
