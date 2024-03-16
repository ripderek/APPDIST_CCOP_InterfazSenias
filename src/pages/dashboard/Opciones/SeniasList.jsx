import {
  PlusCircleIcon,
  FilmIcon,
  PlayIcon,
  TrashIcon,
  PlusIcon,
  PencilIcon,
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
} from "@material-tailwind/react";

import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente
import { useRouter } from "next/router";

import { useEffect, useState, useRef } from "react";

import axios from "axios";

export default function SeniasList() {
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

    try {
      //alert("Buscando");
      const response = await axios.post("http://localhost:4000", {
        jsonrpc: "2.0",
        method: "listar_carpetas",
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
  //eliminar Senia
  const Eliminar_Senia = async (nombreSenia) => {
    //alert(id_pregunta + " " + buscar + " " + id_nivel);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000", {
        jsonrpc: "2.0",
        method: "eliminar_carpeta",
        params: [nombreSenia],
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

  return (
    <Card className="h-full w-full mt-2 bg-transparent shadow-none">
      {Loading && <Loader />}

      <>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none mb-0 bg-transparent"
        >
          <div className=" flex justify-between gap-8 ">
            <div className="   p-1 rounded-xl">
              <Typography variant="h2" color="black" className="font-bold">
                Lista de Señas
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {/*Lista de las senias*/}
          <Collapse open={true}>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                {/* Recorrer la lista*/}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-2">
                  {Lista.map(({ nombre }, index) => (
                    <div
                      key={index}
                      className="rounded-2xl cursor-pointer p-4 hover:shadow-2xl"
                    >
                      <Typography variant="h3" color="black">
                        {nombre}
                      </Typography>
                      <Tooltip content="Eliminar">
                        <Button
                          className=" bg-red-700 w-auto rounded-full p-1"
                          onClick={() => Eliminar_Senia(nombre)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Agregar">
                        <Button className=" bg-green-300 ml-2 w-auto rounded-full p-1">
                          <PlusCircleIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Editar">
                        <Button
                          className=" bg-blue-700 ml-2 w-auto rounded-full p-1"
                          onClick={() =>
                            Router.push(`/dashboard/Editar/${nombre}`)
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
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
