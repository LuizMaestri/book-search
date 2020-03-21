import React from 'react';
import usePortal from 'react-useportal';
import Detail from '../detail';

type Props = {
    id: string,
    title: string,
    isbn: string|number,
    authors: Array<string>,
    publisher: string,
    year: number,
    open: bool
}; 

export default ({ id, title, isbn, authors, publisher, year, open }: Props) => {
    var [ openPortal, closePortal, isOpen, Portal ] = usePortal({
        bindTo: document && document.getElementById('san-francisco')
    });
    if(open) setTimeout(openPortal, 500);
    return (
        <>
            <tr onClick={openPortal} style={{ cursor: 'pointer' }}>
                <td style={{ width: '700px'}}>
                    <b>{ title }</b>
                    <br/>
                    { isbn }
                </td>
                <td style={{ width: '350px'}}>{ (authors||[]).reduce((acc, curr) => `${acc}${!!acc ? ',': ''} ${curr}`, '') }</td>
                <td style={{ width: '350px'}}>{ publisher }</td>
                <td style={{ width: '70px'}}>{ year }</td>
            </tr>
            <Portal>
                { isOpen && <Detail toggle={closePortal} id={id}/> }
            </Portal>
        </>
    );
};