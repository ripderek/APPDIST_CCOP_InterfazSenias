import React from "react";
import Lottie from "lottie-react";
import anim from "../../public/anim/loader2.json";
import { Dialog, DialogHeader } from "@material-tailwind/react";

export function Loader() {
  return (
    <Dialog open={true} className="w-9" size="sm">
      <DialogHeader>
        <div className="mx-auto">
          <Lottie animationData={anim} className="w-auto mx-auto" />
        </div>
      </DialogHeader>
    </Dialog>
  );
}

export default Loader;
