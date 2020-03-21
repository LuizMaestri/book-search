import React from 'react';
import { useRoutes } from 'hookrouter';
import { Row, Col } from 'reactstrap';
import { ListPage } from './book';

type RouterParams = {
    isbn:string
}

const routes = {
    '/:isbn?': ({ isbn }: RouterParams) => <ListPage isbn={isbn}/>,
};

export default () => (
    <>
        <Row>
            <Col xs="false" lg="1"/>
            <Col>
                { useRoutes(routes) }
            </Col>
            <Col xs="false" lg="1"/>
        </Row>
        <br/>
    </>
);