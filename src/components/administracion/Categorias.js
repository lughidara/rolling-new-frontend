import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Noticia from "./Noticia";

const Categorias = (props) => {
  const eliminarCategoria = (_id) => {
    console.log(_id);

    Swal.fire({
      title: "¿Estas seguro de eliminar esta categoria?",
      text: "No puedes recuperar la categoria eliminada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        //aqui tengo que eliminar el producto
        try {
          const resultado = await fetch(
            `https://rollingnewsbc.herokuapp.com/categoria/${_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(resultado);
          if (resultado.status === 200) {
            props.setRecargarCategoria(true);
            Swal.fire(
              "Categoria eliminada",
              "Su categoria fue eliminada correctamente",
              "success"
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrio un error, intentelo nuevamente",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error, intentelo nuevamente",
          });
        }
      }
    });
  };

  console.log(props)
  return (
    <article>
      <ListGroup.Item>
        <Container>
          <Row>
            <Col sm={8} className="d-flex justify-content-start">
              <p>
                <span className="font-weight-bold">
                  {props.categoriaItem.toUpperCase()}
                </span>

              </p>
            </Col>
            <Col sm={4} className="d-flex justify-content-end">
              <ButtonGroup>
                <Button disabled
                  className="btn btn-success rounded-pill mr-2"
                  to={`/administracion/editarCategoria/${props.categoriaItem._id}`}
                >
                  <FontAwesomeIcon size="sm" icon={faEdit}></FontAwesomeIcon>
                  Editar
                </Button>
                <Button
                  disabled
                  className="btn btn-danger rounded-pill mr-2"
                  type="button"
                  onClick={() => eliminarCategoria(props.categoriaItem._id)}
                >
                  <FontAwesomeIcon size="sm" icon={faTrash}></FontAwesomeIcon>
                  Eliminar
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
        {/* <Accordion defaultActiveKey="1" className="py-2">
          <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            <p className="text-primary">Ver lista de noticias</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Table striped bordered hover size="sm" responsive>
              <tbody>
                {props.noticias.map((itemNoticia) => (
                  <Noticia key={itemNoticia.id} noticiaItem={itemNoticia}
                    setRecargarNoticias={props.setRecargarNoticias}></Noticia>
                )).reverse()}
              </tbody>
            </Table>
          </Accordion.Collapse>
        </Accordion> */}
      </ListGroup.Item>
    </article>
  );
};

export default Categorias;
