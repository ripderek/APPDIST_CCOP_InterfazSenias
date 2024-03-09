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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [concepto, setConcepto] = useState({
    definiciones: [],
    links_youtube: [],
    links_pdf: [],
  });
  const [load, setLoader] = useState(false);
  //Conceptos
  useEffect(() => {
    ObtenerPreguntas();
    Simon();
  }, []);
  const [socket, setsocket] = useState(null);

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
  /** PARA LA WEBCAM */
  const [videoElement, setVideoElement] = useState(); //
  //Funcion para obtener los resultados del procesamiento de mediapipe
  const [canvasIsReady, setCanvasIsReady] = useState(false);
  const [canvasHaveLandmarks, setcanvasHaveLandmarks] = useState(false);
  const [canvasCtx1, setcanvasCtx1] = useState(null);
  const [canvasElement1, setcanvasElement1] = useState(null);
  const Simon = () => {
    const videoElement = document.getElementsByClassName("input_video")[0];
    const canvasElement = document.getElementsByClassName("output_canvas")[0];
    const canvasCtx = canvasElement.getContext("2d");
    setcanvasCtx1(canvasCtx);
    setcanvasElement1(canvasElement);
    //let canvasIsReady = false;
    //let canvasHaveLandmarks = false;
    //FUEnviarSocker();
    function setCanvaMediaVideoSize() {
      //Obtener las dimensiones (ancho y alto) del video
      let videoWidth = videoElement.videoWidth;
      let videoHeight = videoElement.videoHeight;

      //Calcular la proporción entre ancho y alto para mantener el aspecto
      let aspectRatio = videoWidth / videoHeight;

      //Ajustar las dimensiones del canvas para mantener el aspecto del video
      let canvasWidth = canvasElement.offsetWidth;
      let canvasHeight = canvasWidth / aspectRatio;

      //En caos de que el tamanio no se acople, utilizar el aspecto calculado
      //para evitar malos redimensionamientos
      if (canvasHeight > canvasElement.offsetHeight) {
        canvasHeight = canvasElement.offsetHeight;
        canvasWidth = canvasHeight * aspectRatio;
      }

      //Redimensionando el canvas para que coincida con las dimensiones calculadas
      canvasElement.width = canvasWidth;
      canvasElement.height = canvasHeight;
    }
    function onResults(results) {
      setCanvaMediaVideoSize();

      //Redimensionar el canva al video captado en por la cámara
      setCanvaMediaVideoSize();

      //Limpiar el canvas
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      //canvasElement.style.border = "1px solid red";

      //Llenar el canvas con el color de fondo negro y el tamanio total al que corresponde
      canvasCtx.fillStyle = "#FFFFFF";

      //Si se quiere mantener el mismo video de fondo, descomentar la linea con drawImage()
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      //canvasCtx.drawImage(videoElement, 0, 0);

      //Factores para auto ajuste de tamanio
      const baseAutosizeFactor = 5;
      const movementAutosizeFactor = 5;
      // var canvasHaveLandmarks;
      //setcanvasHaveLandmarks(false);
      if (results.multiHandLandmarks) {
        if (results.multiHandLandmarks.length > 0) setcanvasHaveLandmarks(true);

        for (const landmarks of results.multiHandLandmarks) {
          //Obtener la coordenada z (profundidad) de todos los puntos
          let zCoordinates = landmarks.map((landmark) => Math.abs(landmark.z));

          //Obtener la minima coordenada z
          let minZ = Math.min(...zCoordinates);
          //let maxZ = Math.max(...zCoordinates);

          //Normalizar el valor minimo de z a un valor positio o negativo
          let movementDirection = minZ < 0 ? -1 : 1;

          //Recalcular el autoajuste utilizando los factores
          let lineWidth =
            baseAutosizeFactor + movementDirection * movementAutosizeFactor;

          //Dibujar las lineas y puntos por la captacion de la mano
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#000000",
            lineWidth: lineWidth,
          });

          //Si se requiere dibujar los puntos, modificar la division del radio
          drawLandmarks(canvasCtx, landmarks, {
            color: "#000000",
            lineWidth: lineWidth / 2,
            radius: lineWidth / 4,
          });
        }
      }

      setCanvasIsReady(true);
    }

    //Cargar la libreria para usar mediapipe
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    //Establecer los parametros utilizados para la configuracion de mediapipe
    hands.setOptions({
      maxNumHands: 2, //Número máximo de manos aceptables o que se captaran
      modelComplexity: 1, //1 prioriza la captación antes que la velocidad, menor valor prioriza velocidad
      minDetectionConfidence: 0.6, //Menor valor prioriza detección menos optima, mayor valor prioriza la detección
      minTrackingConfidence: 0.6, //Menor valor prioriza el seguimiento menos optimo, mayor valor prioriza el seguimiento correcto
    });

    //Definir el metodo de los resultados que equivale a la captacion del video
    hands.onResults(onResults);

    //Definir la captacion de video de la camara y empezarla
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });
    camera.start();

    //Adaptar el canvas cuando cargue la camara
    videoElement.addEventListener("loadedmetadata", () => {
      const videoDimensions = videoElement.getBoundingClientRect();
      canvasElement.style.width = videoDimensions.width + "px";
      canvasElement.style.height = videoDimensions.height + "px";
    });
  };
  const [EnviarSocket, setEnviarSocket] = useState(false);
  const FUEnviarSocker = (value) => {
    //Cuando el socket este disponible o abierto se procede a enviar las imagenes
    socket.binaryType = "arraybuffer";
    if (value === false) {
      socket.close();
      alert("Cerrando");
      return null;
    }
    if (socket) {
      socket.onopen = function (event) {
        console.log("Connected to the web socket.");
        alert("Abriendo");
        //Cantidad de frames por segndo a enviar
        const FPS = 1;
        //Crear un ciclo encargado de enviar los frames al servidor por el web socket
        if (value) {
          setInterval(() => {
            if (canvasCtx1 && canvasIsReady && canvasHaveLandmarks) {
              setcanvasHaveLandmarks(false);

              //Transformar el contenido dle canva a una URL
              var dataURL = canvasElement1.toDataURL();

              //Crear una imagen y asignarle el buffer de la imagen
              var img = new Image();
              img.src = dataURL;

              //Cuando la imagen este lista
              img.onload = function () {
                //Redimensionar el lienzo (canva)
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");

                // Redimensionar la imagen a 512x512
                canvas.width = 512;
                canvas.height = 512;
                ctx.drawImage(img, 0, 0, 512, 512);

                //Transformar el canva a su data para obtener el buffer de bytes
                var dataURL = canvas.toDataURL();
                fetch(dataURL)
                  .then((res) => res.blob())
                  .then((blob) => {
                    blob.arrayBuffer().then(function (buffer) {
                      //Enviar el buffer por el web socket
                      console.log(buffer);
                      socket.send(buffer);
                    });
                  });
              };
            }
          }, 1000 / FPS);
        }
      };
    }
  };
  //Enivar = true
  const CambiarEnviar = (value) => {
    setEnviarSocket(value);
    if (value) {
      const socket1 = new WebSocket("ws://26.48.208.162:8080/socket");
      alert("Aparece");
      setsocket(socket1);
      FUEnviarSocker(value);
    }
  };
  return (
    <Card className="h-full w-full mt-2 bg-transparent shadow-none">
      <>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
          crossorigin="anonymous"
        ></script>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                  <div
                    key={1}
                    className="rounded-2xl  shadow-2xl cursor-pointer"
                  >
                    <Typography variant="h3" color="black">
                      Cámara
                    </Typography>
                    <video className="input_video" ref={videoRef}></video>
                  </div>
                  <div
                    key={1}
                    className="rounded-2xl  shadow-2xl cursor-pointer"
                  >
                    <Typography variant="h3" color="black">
                      Procesado
                    </Typography>

                    <canvas
                      className="output_canvas border-4 border-black w-auto"
                      ref={canvasRef}
                    />
                  </div>
                </div>
                <>
                  {EnviarSocket ? (
                    <Button
                      className="ml-auto flex gap-1 mt-4 mx-auto bg-light-blue-900 h-11"
                      onClick={() => CambiarEnviar(false)}
                    >
                      <PlusCircleIcon className="h-7 w-7" />
                      <p className="mt-1">"Dejar de enviar"</p>
                    </Button>
                  ) : (
                    <Button
                      className="ml-auto flex gap-1 mt-4 mx-auto bg-light-blue-900 h-11"
                      onClick={() => CambiarEnviar(true)}
                    >
                      <PlusCircleIcon className="h-7 w-7" />
                      <p className="mt-1">"Enviar Imagenes"</p>
                    </Button>
                  )}
                </>
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
