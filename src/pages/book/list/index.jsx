import React, { useState, useEffect } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import ReactPaginate from 'react-paginate';
// $FlowFixMe
import { useGlobalState } from 'state';
import { Row, Col } from 'reactstrap';
import { Table } from 'components';
import Line from './Line';
import axios from 'axios'

type Props = {
    isbn?: string | number
}

const mapBook = ({
    id,
    volumeInfo: {
        title,
        authors,
        publisher,
        industryIdentifiers: identifiers,
        publishedDate: year,
    }
}) => ({
    id,
    title,
    authors,
    publisher,
    year,
    isbn: (identifiers||[{}])[(identifiers||[{}]).length -1].identifier
});

const formatter = new Intl.NumberFormat('pr-BR');

var timeoutId;

export default ({ isbn }: Props) => {
    const [ books, setBooks ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const [ isbnState , setIsbnState ] = useState(isbn);
    const [{ search, dateStart, dateEnd }] = useGlobalState();
    useEffect(
        () => {
            if(!!timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(async () => {
                if(!!search|| isbn){
                    setBooks([])
                    setLoading(true);
                    // $FlowFixMe
                    const url = `https://www.googleapis.com/books/v1/volumes?q=${search||''}${isbn? `+isbn:${isbn}`: ''}&startIndex=${page*10}&printType=books&key=${process.env.REACT_APP_GOOGLE_KEY}`;
                    const { data: { totalItems, items }} = await axios.get(url);
                    setBooks(items.map(mapBook));
                    setTotal(totalItems);
                    setLoading(false);
                    setTimeout(() => setIsbnState(''), 500);
                    window.history.pushState(null, 'Title of the page', '/');
                }
            }, 1000);
            return () => {
                if(!!timeoutId) clearTimeout(timeoutId);
            }
        },
        [ search, dateStart, dateEnd, page, isbn ]
    );
    const Pagination = () => (
        <Row>
            <Col md="4">
                Apresentando {formatter.format(page * 10 + 1)} à {formatter.format((page +1) * 10)} de { formatter.format(total) }
            </Col>
            <Col xs="12" md="4">
                <ReactPaginate pageCount={total/10} pageRangeDisplayed={8} marginPagesDisplayed={2} onPageChange={({ selected }) => setPage(selected)}
                    containerClassName="pagination" pageClassName="page-item pointer" activeClassName="active" pageLinkClassName="page-link"
                    previousLabel="<" nextLabel=">" previousClassName="page-item pointer" nextClassName="page-item pointer"
                    previousLinkClassName="page-link" nextLinkClassName="page-link" forcePage={page}/>
            </Col>
        </Row>
    );
    return (
        <>
            <Pagination/>
            <Row>
                <Col style={{ overflow: 'auto' }}>
                    <Table headers={ ['Livro', 'Autor', 'Editora', 'Ano'] }>
                        <>
                            {
                                loading && (
                                    <tr>
                                        <td colSpan="4">
                                            <BeatLoader/>
                                        </td>
                                    </tr>
                                )
                            }
                            { books.map(book => <Line { ...book } key={ book.id } open={!!isbnState}/>)  }
                        </>
                    </Table>
                </Col>
            </Row>
            <Pagination/>
        </>
    );
};