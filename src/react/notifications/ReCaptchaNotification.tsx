import React from "react";
import type { ReCaptcha } from "../../helpers/Parsers";
import xSvg from "../../icons/x.svg";
import RecaptchaLogo from "../../icons/RecaptchaLogo.svg";
import { Button, Card, CardBody, Link } from "@nextui-org/react";

interface InvitePrpos {
  item: ReCaptcha;
  remove: (item: ReCaptcha) => void;
}

export default function NotificationContainer({ item, remove }: InvitePrpos) {
  return (
    <>
      <Card shadow="none" className="h-full">
        <CardBody className="flex flex-col p-3 bg-default-100">
          <div className="flex w-full justify-between">
            <div className="flex sm:flex-col w-full justify-between sm:mr-1">
              <div className="w-16 h-16 sm:hidden">
                <img src={RecaptchaLogo} alt="Recaptcha" />
              </div>
              <div className="w-full leading-5">
                <span className="text-sm leading-3">
                  This site is protected by reCAPTCHA and the Google
                </span>
                <br />
                <Link
                  className="text-xs leading-3"
                  href="https://policies.google.com/privacy"
                >
                  Privacy Policy
                </Link>
                <span className="text-xs leading-3"> and </span>
                <Link
                  className="text-xs leading-3"
                  href="https://policies.google.com/terms"
                >
                  Terms of Service
                </Link>
                <span className="text-xs leading-3"> apply.</span>
              </div>
            </div>
            <div className="flex flex-col justify-center sm:justify-start">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                size="sm"
                onClick={() => {
                  remove(item);
                }}
              >
                <div className="w-4 h-4">
                  <img
                    className="fill-default-300/50"
                    src={xSvg}
                    alt="Hide icon"
                  />
                </div>
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
