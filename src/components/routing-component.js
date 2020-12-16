import {  Switch,  Route } from "react-router-dom";
import HomePage from '../pages/home-page';
import TermAddPage from '../pages/term-add-page';
import TermCombinedPage from '../pages/term-combined-page';
import TermListPage from '../pages/term-list-page';
import TermSearchPage from '../pages/term-search-page';
import TermEditPage from '../pages/term-edit-page';
import TermDeletePage from '../pages/term-delete-page';
import TermDisplayPage from '../pages/term-display-page';
import TermOrderListPage from '../pages/term-orderlist-page';
import ExampleAddPage from '../pages/example-add-page';
import ExampleEditPage from '../pages/example-edit-page';
import ExampleDeletePage from '../pages/example-delete-page';

export default function RoutingComponent()  {
    
    return (
      <Switch>

        <Route path="/examples/add/:id" component={ExampleAddPage} />
        <Route path="/examples/edit/:id" component={ExampleEditPage} />
        <Route path="/examples/delete/:id" component={ExampleDeletePage} />
        <Route path="/terms/add" component={TermAddPage} />
        <Route path="/terms/combinedlist/:id" component={TermCombinedPage} />      
        <Route path="/terms/delete/:id" component={TermDeletePage} />
        <Route path="/terms/display/:id" component={TermDisplayPage} />
        <Route path="/terms/edit/:id" component={TermEditPage} />
        <Route path="/terms/list" component={TermListPage} />
        <Route path="/terms/orderlist/:query" component={TermOrderListPage} />
        <Route path="/terms/search/:query" component={TermSearchPage} />
        <Route path="/" component={HomePage} />
        
      </Switch>

      
    );
    
}
