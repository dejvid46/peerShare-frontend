import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import QRCode from "react-qr-code";
import useWebSocket from "../../helpers/ws/UseWebSocket";
import { room } from "../../helpers/Parsers";
import ShareLink from "./ShareLink";
import gmail from "../../icons/gmail.svg";
import mail from "../../icons/mail.svg";
import twitter from "../../icons/twitter.svg";
import linkedin from "../../icons/linkedin.svg";
import whatsapp from "../../icons/whatsapp.svg";
import facebook from "../../icons/facebook.svg";

interface ShareModalPrpos {
  children: JSX.Element;
}

export default function ShareModal({ children }: ShareModalPrpos) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { lastMess } = useWebSocket(room);

  const link = `${window.location.href}?room=${lastMess?.id}&key=${lastMess?.key}`;
  const urlLink = encodeURIComponent(link);
  const shareText = "Click this link for file sharing";

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        variant="shadow"
        className="min-w-5"
        startContent={children}
      >
        Share
      </Button>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share link for file sharing
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between px-6 gap-2 sm:">
                  <div
                    style={{
                      height: "auto",
                      margin: "auto 0",
                      width: 128,
                      padding: "0.5rem",
                      borderRadius: 6,
                      backgroundColor: "white",
                    }}
                  >
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={link}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <div className="flex flex-wrap max-w-[12rem]">
                    <ShareLink
                      icon={facebook}
                      shareUrl={`https://www.facebook.com/dialog/send?link=${urlLink}&app_id=123456789`}
                    />
                    <ShareLink
                      icon={twitter}
                      shareUrl={`https://twitter.com/intent/tweet?url=${urlLink}&text=Check%20out%20this%20awesome%20page!`}
                    />
                    <ShareLink
                      icon={linkedin}
                      shareUrl={`https://www.linkedin.com/sharing/share-offsite/?url=${urlLink}`}
                    />
                    <ShareLink
                      icon={mail}
                      shareUrl={`mailto:?subject=Check%20this%20out&body=${shareText}%20${urlLink}`}
                    />
                    <ShareLink
                      icon={whatsapp}
                      shareUrl={`whatsapp://send?text=${urlLink}&app_id=123456789`}
                    />
                    <ShareLink
                      icon={gmail}
                      shareUrl={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check%20this%20out&body=${shareText}%20${urlLink}`}
                    />
                  </div>
                </div>
                <div className="w-full flex items-stretch justify-center my-3">
                  <Snippet codeString={link} symbol="" className="max-w-full">
                    {window.location.host}
                  </Snippet>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
