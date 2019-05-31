import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SubmissionsList from './SubmissionsList';
import { Button } from 'semantic-ui-react'


class Dashboard extends Component {
    state = { visible: false }
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible } = this.state
        return (
            <div className='test'>
                <div className='flex justify-center mx-auto'>
                    <Link
                        to="/metadata"
                        className="hidden md:inline-block px-16 text-white bg-orange p-4 text-center m-4 no-underline">Create / Update Metadata</Link>
                    <Link
                        to="/data" className='text-2xl text-grey-darker flex items-center justify-center'>
                            
                        <div className="mr-2 rounded-full flex items-center justify-center h-16 w-16 text-4xl text-white bg-purple no-underline">+</div>
                            Create new submission
                    </Link>
                        </div>

                        <div>
                            <div className='flex justify-center m-8 p-8'>
                                <Button content={visible ? 'Hide submissions' : 'Show submissions by my lab'} onClick={this.toggleVisibility} />
                            </div>
                            {visible && <SubmissionsList/>}
                        </div>
            </div>
        );
    }
}

export default Dashboard;