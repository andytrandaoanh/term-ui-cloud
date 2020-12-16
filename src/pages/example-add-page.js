import { useParams } from 'react-router-dom';
import ExampleAddComponent from '../components/example-add-component';


export default function ExampleAddPage () {

    // retrieve params into a variable
    const params = useParams();   
	return <ExampleAddComponent termId = {params.id}/>
}
