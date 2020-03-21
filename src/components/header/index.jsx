import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Input, Collapse  } from 'reactstrap';
// $FlowFixMe
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';
// $FlowFixMe
import { useGlobalState } from 'state';
// $FlowFixMe
import { SEARCH } from 'reducers';
import Filter from '../filter';
import logo from 'assets/supero.svg';
import sytles from './style.module.sass';

export default () => {
    const [ { isMobile }, dispatch ] = useGlobalState();
    const [ isOpen , setIsOpen ] = useState(false);
    return (
        <Row>
            <Col xs="12"  md="3">
                <img src={logo} alt="supero logo" width="100%"/>
            </Col>
            { 
                isMobile &&
                    <Col xs="12">
                        { !isOpen && <FaCaretRight onClick={() => setIsOpen(true)}/> }
                        { isOpen && <FaCaretDown onClick={() => setIsOpen(false)}/> }
                    </Col>
            }
            <Col xs="12" md="9">
                <Collapse isOpen={!isMobile ||isOpen}>
                    <Row>
                        <Col xs="12" md="10">
                            <Form className={sytles.search} onSubmit={e => e.preventDefault()}>
                                <FormGroup inline>
                                    <Input onChange={
                                        ({ target: { value: payload } }) =>
                                            dispatch({
                                                type: SEARCH,
                                                payload
                                            })
                                    }/>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col xs="12" md="1">
                            <Filter className={`${sytles.search}`}/>
                        </Col>
                    </Row>
                </Collapse>
            </Col>
        </Row>
    )
};