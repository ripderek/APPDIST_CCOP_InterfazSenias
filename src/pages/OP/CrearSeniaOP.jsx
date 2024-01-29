import {
  PlusCircleIcon,
  DocumentTextIcon,
  CogIcon,
  FilmIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
  Checkbox,
} from "@material-tailwind/react";

import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente
import { tasks } from "../../Data/Conceptos";
//IMPORT DE LA WEBCAM
import Webcam from "react-webcam";
//const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];
import { useEffect, useState, useRef } from "react";
export default function CrearSeniaOP({ id_seccion }) {
  const webcamRef = useRef(null);

  const [concepto, setConcepto] = useState({
    definiciones: [],
    links_youtube: [],
    links_pdf: [],
  });
  const [load, setLoader] = useState(false);
  //Conceptos
  useEffect(() => {
    ObtenerPreguntas();
  }, []);

  // Función para obtener los datos de manera asíncrona
  const ObtenerPreguntas = async () => {
    setLoader(true);
    try {
      // Filtrar los datos con id === 0 y extraer título y concepto
      const conceptoConIdCero = await tasks.find(
        (task) => task.id === id_seccion
      );
      // Establecer el estado con el concepto encontrado
      setConcepto(conceptoConIdCero || {});
      setLoader(false);
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
      setLoader(false);
    }
  };

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  const [openRecursos, setOpenRecursos] = useState(false);
  const toggleOpenRecursos = () => setOpenRecursos((cur) => !cur);
  //collapse para abrir la calculadora xdxdxd skere modo diablo
  const [openCalculadora, setOpenCalculadora] = useState(false);
  const toggleOpenCalculadora = () => setOpenCalculadora((cur) => !cur);
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    //enviar a la API POR EJEMPLO xd
    console.log(imageSrc);
  };
  return (
    <Card className="h-full w-full mt-2 bg-transparent shadow-none">
      <>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none mb-0 bg-transparent"
        >
          <div className=" flex justify-between gap-8 ">
            <div className="   p-1 rounded-xl">
              <Typography variant="h1" color="black" className="font-bold">
                Crear Seña
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {/* Datos de la senia */}
          <Button
            onClick={toggleOpen}
            variant="filled"
            color="white"
            className="w-full text-black text-lg capitalize flex items-center justify-center"
          >
            <DocumentTextIcon className="h-7 w-7 mr-2" />
            <p className="mt-1">Datos de la seña</p>
          </Button>

          <Collapse open={open}>
            <Card className="my-4 mx-auto w-full">
              <CardBody className="flex flex-col gap-4">
                <Input label="Dato1" size="lg" required />
                <Input label="Dato2" size="lg" required />
                <Input label="Dato3" size="lg" required />
              </CardBody>
            </Card>
          </Collapse>
          {/*PROCESADO DE LA IMAGEN*/}
          <Button
            onClick={toggleOpenRecursos}
            variant="filled"
            color="white"
            className="w-full text-black text-lg capitalize flex items-center justify-center mt-3"
          >
            <FilmIcon className="h-7 w-7 mr-2" />
            <p className="mt-1">Procesado de imagen</p>
          </Button>

          <Collapse open={openRecursos}>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                {/* PARA LOS VIDEOS*/}

                <div className="grid grid-cols-2 md:grid-cols-2 gap-1 p-2">
                  <Tooltip content="Camara">
                    <div
                      key={1}
                      className="rounded-2xl  shadow-2xl cursor-pointer"
                    >
                      <Typography variant="h3" color="black">
                        Cámara
                      </Typography>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip content="Camara">
                    <div
                      key={1}
                      className="rounded-2xl  shadow-2xl cursor-pointer"
                    >
                      <Typography variant="h3" color="black">
                        Procesado
                      </Typography>
                      {/* 
                          <Typography variant="lead" color="deep-purple">
                            {item.video}
                          </Typography>
                          */}
                      <img
                        src={"/img/Home/pdf_bernouli.png"}
                        alt=""
                        className="h-auto"
                      />
                      {/*
                          <li>{item.miniatura}</li>
                          <li>{item.link}</li>
                           */}
                    </div>
                  </Tooltip>
                </div>
              </CardBody>
            </Card>
          </Collapse>
          {/* OPCIONES DE LA SENIA*/}
          <Button
            onClick={toggleOpenCalculadora}
            variant="filled"
            color="white"
            className="w-full text-black text-lg capitalize flex items-center justify-center mt-3"
          >
            <CogIcon className="h-7 w-7 mr-2" />
            <p className="mt-1">Opciones</p>
          </Button>

          <Collapse open={openCalculadora}>
            <Card className="my-4 mx-auto w-full h-full">
              <CardBody>
                <Card className="my-4 mx-auto w-full">
                  <CardBody className="flex flex-col gap-4">
                    <Input label="Captacion" size="lg" required />
                    <Input label="Seguimiento" size="lg" required />
                    <Input
                      label="Capturar cada (n)segundos"
                      size="lg"
                      required
                    />
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Collapse>
        </CardBody>
      </>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          .
        </Typography>
        <div className="flex gap-2">
          <Button className="ml-auto flex gap-1 md:mr-4 md:ml-6 bg-light-blue-900 h-11">
            <PlusCircleIcon className="h-7 w-7" />
            <p className="mt-1"> Guardar</p>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
