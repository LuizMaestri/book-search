import * as React from 'react';
import { Table } from 'reactstrap';

type Props = {
    headers: Array<string>,
    children: React.Node | Array<React.Node>
}

export default ({ headers, children }: Props ) => (
    <Table>
        <thead>
            <tr>
                { headers.map(header => <th key={ header }>{ header }</th>) }
            </tr>
        </thead>
        <tbody>
            { children }
        </tbody>
    </Table>
)