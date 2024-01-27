import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Info() {
  return (
    <Card className="w-full max-w-[65rem] flex-row mx-auto mt-4 bg-transparent shadow-none">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src="/img/Home/29183_landscape.webp"
          alt="card-image"
          className="h-full w-full object-cover mx-auto"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h1" className="mb-2 text-blue-800">
          Senias APP
        </Typography>
        <Typography variant="h4" color="black" className="mb-8">
          Prepara a un ordenador para que reconozca tus imágenes
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          Una forma rápida y sencilla de crear modelos de aprendizaje automático
          para tus sitios web, aplicaciones y mucho más, sin necesidad de
          conocimientos especializados ni de programar.
        </Typography>
        <Button className="flex items-center gap-2 bg-light-blue-800">
          <Typography variant="h4" color="white" className="">
            Empezar
          </Typography>
        </Button>
      </CardBody>
    </Card>
  );
}
