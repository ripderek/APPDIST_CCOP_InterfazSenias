import {
  PlusCircleIcon,
  FilmIcon,
  PlayIcon,
  TrashIcon,
  PlusIcon,
  PencilIcon,
  ArrowPathIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Collapse,
  Tooltip,
  Input,
} from "@material-tailwind/react";

import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente
import { useRouter } from "next/router";

import { useEffect, useState, useRef } from "react";

import axios from "axios";
import Head from "next/head";

export default function EditarSeniaOP({ nombreSenia }) {
  const Router = useRouter();

  //constante para cargar la lista en el usefect
  const [Loading, setLoading] = useState(false);
  const [Lista, setLista] = useState([]);

  useEffect(() => {
    ObtenerListaDocumentos();
    //else buscar_por_id
  }, []);
  const ObtenerListaDocumentos = async () => {
    //alert(id_pregunta + " " + buscar + " " + id_nivel);
    setLoading(true);
    SetNombreSenia(nombreSenia);
    try {
      const response = await axios.post("http://localhost:4000", {
        jsonrpc: "2.0",
        method: "listar_imagenes_en_carpeta",
        params: [nombreSenia],
        id: 1,
      });
      const resultados = await JSON.parse(response.data.result);
      setLista(resultados);
      console.log(resultados);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error");
      console.log(error);
    }
  };
  const [NombreSenia, SetNombreSenia] = useState("");

  //Funcion para eliminar una imagen skere modo diablo
  const EliminarImagen = async (NombreImagen) => {
    //alert(id_pregunta + " " + buscar + " " + id_nivel);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000", {
        jsonrpc: "2.0",
        method: "eliminar_imagen",
        params: [NombreImagen, nombreSenia],
        id: 1,
      });
      console.log(response);
      setLoading(false);
      ObtenerListaDocumentos();
    } catch (error) {
      setLoading(false);
      alert("Error");
      console.log(error);
    }
  };

  //funcion para renombrar la senia, se tiene que redirigir a la nueva paguina con la nueva senia skere
  const CambiarName = async (NombreImagen) => {
    //alert(id_pregunta + " " + buscar + " " + id_nivel);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000", {
        jsonrpc: "2.0",
        method: "renombrar_carpeta",
        params: [nombreSenia, NombreSenia],
        id: 1,
      });
      console.log(response);
      setLoading(false);
      //ObtenerListaDocumentos();
      //enviar a la nueva paguina con la nueva senia skere modo diablo
      Router.push(`/dashboard/Editar/${NombreSenia}`);
    } catch (error) {
      setLoading(false);
      alert("Error");
      console.log(error);
    }
  };
  return (
    <Card className="h-full w-full mt-2 bg-transparent shadow-none">
      {Loading && <Loader />}
      <Head>
        <title>Editar Senia</title>
      </Head>
      <>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none mb-0 bg-transparent"
        >
          <div className=" flex justify-between gap-8 ">
            <div className="   p-1 rounded-xl">
              <Typography variant="h2" color="black" className="font-bold">
                Lista de imagenes de la Seña {nombreSenia}
              </Typography>

              <Tooltip content="Recargar">
                <Button
                  className=" bg-light-blue-900 w-auto rounded-full p-2"
                  onClick={ObtenerListaDocumentos}
                >
                  <ArrowPathIcon className="h-7 w-7" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {/* Para los datos principales de las senias */}
          {Lista.length !== 0 && (
            <Collapse open={true}>
              <Card className="my-4 mx-auto w-full">
                <CardBody className="flex flex-col gap-4">
                  <Input
                    label="Nombre"
                    value={NombreSenia}
                    onChange={(e) => SetNombreSenia(e.target.value)}
                    size="lg"
                    required
                  />
                  <Tooltip content="Cambiar Nombre">
                    <Button
                      className=" bg-light-blue-900  rounded-full p-2 w-10"
                      onClick={CambiarName}
                    >
                      <ArrowRightCircleIcon className="h-7 w-7 " />
                    </Button>
                  </Tooltip>
                </CardBody>
              </Card>
            </Collapse>
          )}

          {/*Lista de las senias*/}
          <Collapse open={true}>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                {/* Recorrer la lista*/}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-2">
                  {Lista.map(({ nombreImagen, base64 }, index) => (
                    <div
                      key={index}
                      className="rounded-2xl cursor-pointer p-4 hover:shadow-2xl"
                    >
                      {/*<Typography variant="h3" color="black">
                        {nombreImagen}
                      </Typography> */}
                      <img
                        key={index}
                        src={`data:image/png;base64,${base64}`}
                        alt={`Imagen ${index}`}
                      />
                      <Tooltip content="Eliminar imagen">
                        <Button
                          className=" bg-red-700 w-auto rounded-full p-1"
                          onClick={() => EliminarImagen(nombreImagen)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  ))}
                </div>
                <></>
              </CardBody>
            </Card>
          </Collapse>
          {/* 
            <Card className=" mx-auto w-full h-full">
              <CardBody>
                <Card className="my-4 mx-auto w-full shadow-none">
                  <CardBody className="flex gap-4">
                    <Button className=" bg-light-blue-900 w-auto rounded-full">
                      <PlayIcon className="h-7 w-7" />
                    </Button>
                    <div className="mx-auto">
                      <Typography variant="h3" color="black" className="mx-auto">
                        Oracion
                      </Typography>
                    </div>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
  */}
        </CardBody>
      </>
      {/* 
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button className=" bg-red-700 w-auto rounded-full">
            <TrashIcon className="h-7 w-7" />
          </Button>
        </CardFooter>
        */}
    </Card>
  );
}
