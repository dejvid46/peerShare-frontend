import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React, { useEffect } from "react";
import refresh from "../../icons/refresh.svg";
import useWebSocket from "../../helpers/ws/UseWebSocket";

export default function FullQueue() {
  const { state } = useWebSocket();
  const {isOpen, onOpen} = useDisclosure();

  useEffect(() => {
    if (state == -1) {
      onOpen()
    }
    if (state == 2) {
      location.reload()
    }
  }, [state])

  return (
    <>
      <Modal hideCloseButton isOpen={isOpen}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">This page is overloaded 😿</ModalHeader>
          <ModalBody>
            <p> 
              Too many users are using this page at once, please try it again later. Thank you
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={() => location.reload()} endContent={<img src={refresh} alt="refresh" />}>
              Try again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
