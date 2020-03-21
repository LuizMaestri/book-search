import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BeatLoader from "react-spinners/BeatLoader";
// $FlowFixMe
import { getCountryName } from 'utils';
import useAxios from 'axios-hooks';

type Props = {
    toggle: Function,
    id: string
};

const mapBook = ({
    id,
    volumeInfo: {
        title,
        authors,
        publisher,
        dimensions,
        publishedDate: year,
        imageLinks: { smallThumbnail: image },
        industryIdentifiers: [ , { identifier: isbn } ]
    },
    accessInfo: { country }
}) => ({
    id,
    title,
    authors,
    publisher,
    year,
    isbn,
    image,
    country,
    height: (dimensions||{}).height,
    width: (dimensions||{}).width,
    thickness: (dimensions||{}).thickness
});

const initialBook = {
    authors: [],
    dimensions: {},
    publisher: '',
    year: '',
    country: '',
    title: '',
    isbn: '',
    image: null
};

type ItemProps = {
    label: string,
    value: string
};

const Item = ({ label, value }: ItemProps) => (
    <Col>
        <b>{ label }:</b> { value }
    </Col>
);

const formatter = new Intl.NumberFormat('pr-BR');

const format = value => formatter.format(parseFloat(value));

export default ({ toggle, id }: Props) => {
    const [{ data, loading, error }] = useAxios(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const [ book, setBook ] = useState(initialBook);
    useEffect(() => setBook((data && mapBook(data)) || initialBook), [ data ]);
    const loader = (
        <span className="text-center">
            <BeatLoader/>
        </span>
    );
    const Header = () => (
        <>
            {book.title}
            <br/>
            <small>
                isbn: {book.isbn}
            </small>
        </>
    );
    return (
        <Modal isOpen={true} toggle={toggle} style={{ maxWidth: '800px' }}>
            <ModalHeader toggle={toggle}>{loading? loader: !error ? <Header/>: 'Não Encontrado'}</ModalHeader>
            <ModalBody>
                { error && <b className="text-center">Não foi possivel recuperar dados solicitados</b>}
                {
                    !error &&
                    <Row>
                        <Col md="2">
                            { loading && loader }
                            { !loading &&  <img src={book.image} alt="capa"/> }
                        </Col>
                        <Col>
                            { loading && loader }
                            {
                                !loading &&
                                <>
                                    <Row>
                                        <Item label={`Autor${book.authors.length > 1 ? 'es': ''}`} 
                                            value={book.authors.reduce((acc, curr) => `${acc}${!!acc ? ',': ''} ${curr}`, '')}/>
                                    </Row>
                                    <Row>
                                        <Item label="Editora" value={book.publisher}/>
                                    </Row>
                                    <Row>
                                        <Item label="Ano de publicação" value={book.year}/>
                                        <Item label="País" value={getCountryName(book.country)}/>
                                    </Row>
                                    <Row>
                                        <Item label="Dimensões" value={
                                            !!book.width? 
                                                `${format(book.width)}cm x ${format(book.height)}cm x ${format(book.thickness)}cm`:
                                                'Não especificado'
                                            }/>
                                    </Row>
                                </>
                            }
                        </Col>
                    </Row>
                }
            </ModalBody>
            <ModalFooter>
                { /*error && <Button color="primary" onClick={refetch}>Recarregar</Button> */}
                <Button color="secondary" onClick={toggle}>Fechar</Button>
            </ModalFooter>
        </Modal>
    )
};