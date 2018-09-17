import React from 'react';
import {Link} from 'react-router-dom';
import {Segment, Container} from 'semantic-ui-react';

const NotFoundPage = () => (
    <Container>
        <div style={{
            marginTop: "150px"
        }}>
            <Segment>
                404 - Page not found
                <Link to="/">Go home</Link>
            </Segment>
        </div>
    </Container>
);

export default NotFoundPage;