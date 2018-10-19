import React, {Component} from 'react';
import TemplateGenerator from './components/template-generator';

class App extends Component {
    state = {}
    
    render() {
        return (
            <div>
                <TemplateGenerator/>
            </div>
        );
    }
}

export default App;