import React, {Component} from 'react';
import XLSX from 'xlsx';
import fire from '../../fire';
import { swapDisplayNamesToKeys } from './utils';


export default class SheetJSApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            /* Array of Arrays e.g. [["a","b"],[1,2]] */
            cols: []/* Array of column objects e.g. { name: "C", K: 2 } */
        };
        this.handleFile = this.handleFile.bind(this);
        this.exportFile = this.exportFile.bind(this);
    };
    handleFile(file/*:File*/) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {
                type: rABS ? 'binary' : 'array'
            });

            const sheetData = parseWorkBook(wb);
            const readDataAllSheets = { name: file.name,
                data: JSON.stringify(sheetData),
                uploaded: Date.now()
            }
            /* Get first worksheet */
            const wsname = wb.SheetNames[3];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {header: 1});
            // const dataObj = XLSX.utils.sheet_to_json(ws); // creates a straight-up object - save this in Firebase
            // console.log(data);
            // console.log(dataObj);

            /* Update Firebase */
            const newPostRef = fire.database().ref('uploads').push(readDataAllSheets);
            const postId = newPostRef.key;
        
            /* Update state */
            this.setState({
                data: data,
                postId: postId,
                cols: make_cols(ws['!ref'])
            });
        };
        if (rABS) 
            reader.readAsBinaryString(file);
        else 
            reader.readAsArrayBuffer(file);
        }
    ;
    exportFile() {
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(this.state.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "sheetjs.xlsx")
    };
    render() {
        return (
            <div>
                <div className="flex">
                    <div className="bg-grey-light m-4 p-4">
                        <div className="col-xs-12">
                            <DataInput handleFile={this.handleFile}/>
                        </div>
                    </div>

                    {/* <div className="bg-orange-light m-4 p-4">
                        <button disabled={!this.state.data.length} className="btn btn-success" onClick={this.exportFile}>Export</button>
                    </div> */}
                </div>

                {/* <div className="row">
                    <div className="col-xs-12">
                        <OutTable data={this.state.data} cols={this.state.cols}/>
                    </div>
                </div> */}
            </div>

        );
    };
};

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };
    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) 
            this.props.handleFile(files[0]);
        };
    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    {/* <label htmlFor="file">Spreadsheet</label> */}
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        accept={SheetJSFT}
                        onChange={this.handleChange}/>
                </div>
            </form>
        );
    };
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
/*
class OutTable extends React.Component {

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>{this.props.cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((r, i) => <tr key={i}>
                                {this.props.cols.map(c => <td key={c.key}>{r[c.key]}</td>)}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        );
    };
};
*/
/* list of supported file types */
const SheetJSFT = [
    "xlsx",
        "xlsb",
        "xlsm",
        "xls",
        "xml",
        "csv",
        "txt",
        "ods",
        "fods",
        "uos",
        "sylk",
        "dif",
        "dbf",
        "prn",
        "qpw",
        "123",
        "wb*",
        "wq*",
        "html",
        "htm"
    ].map(function (x) {
    return "." + x;
}).join(",");

/* generate an array of column objects */
const make_cols = refstr => {
    let o = [],
        C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) 
        o[i] = {
            name: XLSX
                .utils
                .encode_col(i),
            key: i
        }
    return o;
};

function parseWorkBook(wb) {

    let tmp = {};
    wb.SheetNames.forEach(wsname => {
        const ws = wb.Sheets[wsname];
        if (ws !== undefined && wsname !== 'lookups') {
            const dataObj = XLSX.utils.sheet_to_json(ws);
            tmp[wsname] = swapDisplayNamesToKeys(wsname, dataObj);
        }
    });

    return tmp;
}