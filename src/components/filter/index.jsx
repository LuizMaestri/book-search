import React from 'react'
import { Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, UncontrolledTooltip } from 'reactstrap';
// $FlowFixMe
import { DATE_START, DATE_END } from 'reducers';
// $FlowFixMe
import { FaCalendar } from 'react-icons/fa';
// $FlowFixMe
import { useGlobalState } from 'state';
import Number from '../number';

type Props = { className?: string };

export default ({ className = '' }: Props) => {
    const [ { isMobile }, dispatch ] = useGlobalState();
    return (
        <UncontrolledDropdown direction="left" className={`${className} ${isMobile && 'float-right'}`}>
            <DropdownToggle id="filter">
                <FaCalendar/>
            </DropdownToggle>
            <UncontrolledTooltip placement="left" target="filter">
                Filtrar por data de publicação
            </UncontrolledTooltip>
            <DropdownMenu>
                <Form style={{ padding: '5px' }}>
                    <Number placeholder="de" onChange={payload => payload > 999 && dispatch({ type: DATE_START, payload })}/>
                    <Number placeholder="até" onChange={payload => payload > 999 && dispatch({ type: DATE_END, payload })}/>
                </Form>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
};