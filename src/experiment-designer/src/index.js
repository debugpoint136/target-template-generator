import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './css/semantic/dist/semantic.min.css';
import AppRouter from './AppRouter';

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

const TailList = () => (
    <div className="max-w-sm">
        <ul>
            <li className=" rounded-t relative -mb-px block border p-4 border-grey">Cras justo odio</li>
            <li className="relative -mb-px block border p-4 border-grey">Dapibus ac facilisis in</li>
            <li className="relative -mb-px block border p-4 border-grey">Morbi leo risus</li>
            <li className="relative -mb-px block border p-4 border-grey">Porta ac consectetur ac</li>
            <li className="rounded-b relative block border p-4 border-grey">Vestibulum at eros</li>
        </ul>
    </div>
)