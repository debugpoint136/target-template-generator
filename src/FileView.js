import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash'
import {Link} from 'react-router-dom';
import {Table, Loader, Label} from 'semantic-ui-react';
const URL = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/submission';
const QC_REPORT_URL = 'https://dcc.targetepigenomics.org/file';

class FileView extends Component {
    state = {
        files: []
    }

    async componentDidMount() {
        try {
            const res = await axios.get(`${URL}/${this.props.match.params.id}`);
            const {body} = res.data;
            if (body[0].hasOwnProperty('validated_files')) {
                const files = body[0].validated_files;
                this.setState({files: files})
            }
        } catch (error) {
            new Error(error)
        }

    }

    render() {
        if (this.state.files.length === 0) {
            return <Loader active inline='centered'/>;
        }
        return (
            <div>
                <Label color='blue'>{this.props.match.params.id}</Label>
                <Table sortable celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            UUID
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Filename
                        </Table.HeaderCell>
                        {/* <Table.HeaderCell
                            sorted={column === 'registered'
                            ? direction
                            : null}
                            onClick={this.handleSort('registered')}>
                            Registered
                        </Table.HeaderCell> */}
                        <Table.HeaderCell>
                            QC report
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(this.state.files, ({
                        uuid,
                        filename,
                        identifier
                    }) => (
                        <Table.Row key={uuid}>
                            <Table.Cell>
                                <div className='font-mono bg-grey-lighter text-red text-center text-sm'>
                                    {uuid}
                                </div>
                            </Table.Cell>
                            <Table.Cell>{filename}</Table.Cell>
                            <Table.Cell>{(identifier.split('.')[0] === uuid) ? <a href={`${QC_REPORT_URL}/${uuid}`} target='_blank'>QC Report</a>: null }</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            </div>
        );
    }
}

export default FileView;