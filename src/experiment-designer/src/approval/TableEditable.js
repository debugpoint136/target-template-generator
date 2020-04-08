import React from "react";
// import {render} from "react-dom";
// import {makeData, Tips} from "./Utils";
import { Button } from 'semantic-ui-react'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css"; 


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [], done: false
        };
        this.renderEditable = this.renderEditable.bind(this);
        this.getColumns = this.getColumns.bind(this);
    }

    getColumns(data) {        
        const columns = [];
        const sample = data[0];        
        Object
            .keys(sample)
            .forEach(key => {
                if (key !== "_id" && key !== "mouse-gender" && key !== "detergent-added" && key !== "strand-specific") {
                    columns.push({accessor: key, Header: key, Cell: this.renderEditable});
                }
            });

        if (!sample.hasOwnProperty('mouse-gender') && !sample.hasOwnProperty('mouse_gender')) {
            columns.push({accessor: 'mouse_gender', Header: 'mouse_gender', Cell: this.renderEditable});
        }
        if (sample.hasOwnProperty('mouse-gender')) {
            columns.push({accessor: 'mouse-gender', Header: 'mouse_gender', Cell: this.renderEditable});
        }
        if (sample.hasOwnProperty('detergent-added')) {
            columns.push({accessor: 'detergent-added', Header: 'detergent_added', Cell: this.renderEditable});
        }
        if (sample.hasOwnProperty('strand-specific')) {
            columns.push({accessor: 'strand-specific', Header: 'strand_specific', Cell: this.renderEditable});
        }
        if (!sample.hasOwnProperty('mouse_age_collection')) {
            columns.push({accessor: 'mouse_age_collection', Header: 'mouse_age_collection', Cell: this.renderEditable});
        }
        return columns;
    }

    handleFinishClick = () => {
        this.setState({ done: true })
        this.props.onSubmit(this.state.data)
    }

    renderEditable(cellInfo) {
        return (<div
            style={{
            backgroundColor: "#fafafa"
        }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
            const data = [...this.state.data];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({data});
        }}
            dangerouslySetInnerHTML={{
            __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}/>);
    }

    componentDidMount() {
        let {data} = this.props
        
        this.setState({ data: data })
    }

    render() {
        const { data, done } = this.state;

        return (
        <div>
            {(done) ? <h5>Registering submission ...</h5> :
                (data.length >0) ? 
                    <div className='text-center'>
                        <h5>Please review to see if entered information is correct</h5>
                        <p>Edit values in the cells if needed</p>
                        <br/>
                        <div className="inline-flex">
                        {(this.props.update) ? <Button color='blue' onClick={this.props.handleResetClick}>RESET</Button> : null}
                        
                        <Button color='green' onClick={this.handleFinishClick}>FINISH</Button>
                        </div>
                        <br/>
                        <ReactTable
                            data={data}
                            columns={this.getColumns(data)}
                            defaultPageSize={15}
                            className="-striped -highlight text-xs text-grey-darkest"/>
                        <br/>
                        {/* <Tips/> */}
                    </div>
                : <p>Loading ...</p>
            }
        </div>
        )
    }
}

export default App



