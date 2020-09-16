import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Inicio from "./components/Principal/Inicio";
import Actualidad from "./components/Categorias/Actualidad";
import Deporte from "./components/Categorias/Deporte";
import Economia from "./components/Categorias/Economia";
import Espectaculo from "./components/Categorias/Espectaculo";
import Fotografia from "./components/Categorias/Fotografia";
import Politica from "./components/Categorias/Politica";
import Salud from "./components/Categorias/Salud";
import Tecnologia from "./components/Categorias/Tecnologia";
import Error404 from "./components/common/Error404";
import Contacto from "./components/Layout/Contacto";
import Nosotros from "./components/Layout/Nosotros";
import Login from "./components/Layout/Login";
////import administracion...
import PrincipalAdmin from "./components/administracion/common/PrincipalAdmin";
import NuevaNoticia from "./components/administracion/NuevaNoticia";
import ListaNoticias from "./components/administracion/ListaNoticias";
import EditarNoticias from "./components/administracion/EditarNoticias";
import Categorias from "./components/administracion/Categorias";
import NuevaCategoria from "./components/administracion/NuevaCategoria";
import DetalleNoticia from "./components/Layout/DetalleNoticia";

function App() {
  //creamos un arreglo con las categorias
  const _categorias = [
    "actualidad",
    "deporte",
    "economia",
    "espectaculo",
    "fotografia",
    "politica",
    "salud",
    "tecnologia",
  ];
  //inicializamos el state de las categorias
  const [categorias, setCategorias] = useState(_categorias);
  console.log(setCategorias);

  const [noticias, setNoticias] = useState([]);
  const [recargarNoticias, setRecargarNoticias] = useState(true);

  useEffect(() => {
    consultarAPI();
    setRecargarNoticias(false);
  }, [recargarNoticias]);

  const consultarAPI = async () => {
    try {
      // obtengo la lista de noticias
      const consulta = await fetch("http://localhost:4000/noticia");
      console.log(consulta);
      const respuesta = await consulta.json();
      console.log(respuesta);
      if ((await consulta.status) !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error, intentelo nuevamente",
        });
      }
      // guardo en el state
      setNoticias(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path="/categorias/actualidad">
          <Actualidad categorias={categorias}></Actualidad>
        </Route>
        <Route exact path="/categorias/deporte">
          <Deporte categorias={categorias}></Deporte>
        </Route>
        <Route exact path="/categorias/economia">
          <Economia categorias={categorias}></Economia>
        </Route>
        <Route exact path="/categorias/espectaculo">
          <Espectaculo categorias={categorias}></Espectaculo>
        </Route>
        <Route exact path="/categorias/fotografia">
          <Fotografia categorias={categorias}></Fotografia>
        </Route>
        <Route exact path="/categorias/politica">
          <Politica categorias={categorias}></Politica>
        </Route>
        <Route exact path="/categorias/salud">
          <Salud categorias={categorias}></Salud>
        </Route>
        <Route exact path="/categorias/tecnologia">
          <Tecnologia categorias={categorias}></Tecnologia>
        </Route>
        <Route exact path="/noticias/nueva">
          <NuevaNoticia
            setRecargarNoticias={setRecargarNoticias}
          ></NuevaNoticia>
        </Route>
        <Route exact path="/noticias">
          <ListaNoticias
            noticias={noticias}
            setRecargarNoticias={setRecargarNoticias}
          ></ListaNoticias>
        </Route>
        <Route
          exact
          path="/noticias/editar/:id"
          render={(props) => {
            // codigo a ejecutar antes de renderizar el componente
            // obtengo el id de la lista
            const idNoticia = parseInt(props.match.params.id);
            console.log(idNoticia);
            // buscar el producto que coincida con el id
            const noticiaSelecionada = noticias.find(
              (noticia) => noticia.id === idNoticia
            );
            console.log(noticiaSelecionada);
            // muestro el componente editarNoticias
            return (
              <EditarNoticias
                noticia={noticiaSelecionada}
                setRecargarNoticias={setRecargarNoticias}
              ></EditarNoticias>
            );
          }}
        ></Route>
        <Route exact path="/administracion">
          <PrincipalAdmin></PrincipalAdmin>
        </Route>
        <Route exact path="/administracion/categoria">
          <Categorias></Categorias>
        </Route>
        <Route exact path="/administracion/nuevacategoria">
          <NuevaCategoria></NuevaCategoria>
        </Route>
        <Route exact path="/contacto">
          <Contacto></Contacto>
        </Route>
        <Route exact path="/nosotros">
          <Nosotros></Nosotros>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/detalle">
          <DetalleNoticia></DetalleNoticia>
        </Route>
        <Route exact path="*">
          <Error404></Error404>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
