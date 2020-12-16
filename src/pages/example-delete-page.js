import { useParams } from 'react-router-dom';
import ExampleDeleteComponent from '../components/example-delete-component';


export default function ExampleDeletePage () {

    // retrieve params into a variable
    const params = useParams();   
	return <ExampleDeleteComponent egId = {params.id}/>
}
