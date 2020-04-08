import _ from 'lodash'
import React, {Component} from 'react'
import {Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class SubmissionsTable extends Component {
    state = {
        column: null,
        direction: null
    }

    handleSort = clickedColumn => () => {
        const {column, direction} = this.state;
        const {data} = this.props;

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending'
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending'
                ? 'descending'
                : 'ascending'
        })
    }

    render() {
        const {column, direction} = this.state;
        const {data} = this.props;

        return (
            <Table sortable celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            ID
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Assay
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'registered'
                            ? direction
                            : null}
                            onClick={this.handleSort('registered')}>
                            Registered
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Status
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Samples
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Data Phase
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Files
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(data, ({
                        _id,
                        assay,
                        registered,
                        submission_status,
                        validated_files,
                        data_phase
                    }) => (
                        <Table.Row key={_id}>
                            <Table.Cell>
                                <div className='font-mono bg-grey-lighter text-red text-center text-sm'>
                                    {_id}
                                </div>
                            </Table.Cell>
                            <Table.Cell>{assay}</Table.Cell>
                            <Table.Cell>{registered}</Table.Cell>
                            <Table.Cell>{submission_status}</Table.Cell>
                            <Table.Cell>{(validated_files)
                                    ? validated_files.length
                                    : 'NA'}</Table.Cell>
                            <Table.Cell>{data_phase}</Table.Cell>
                            <Table.Cell><Link to={`/submission/${_id}`}>View Files</Link></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
}