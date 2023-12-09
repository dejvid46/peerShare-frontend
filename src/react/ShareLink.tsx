import { Button } from "@nextui-org/react";
import React, { MouseEventHandler } from "react";

interface ShareLinkPrpos {
  icon: string;
  shareUrl: string;
}

export default function ShareLink({ icon, shareUrl }: ShareLinkPrpos) {
  return (
    <div className="flex-grow m-2">
      <Button isIconOnly onClick={() => (window.location.href = shareUrl)}>
        <img className="h-auto w-[70%]" src={icon} alt="share" />
      </Button>
    </div>
  );
}
