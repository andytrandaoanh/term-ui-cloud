import { useParams } from 'react-router-dom';
import ExampleEditComponent from '../components/example-edit-component';


export default function ExampleEditPage () {

    // retrieve params into a variable
    const params = useParams();   
	return <ExampleEditComponent egId = {params.id}/>
}
