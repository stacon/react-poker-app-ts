import { InformationalMessageType } from "src/enums";
import { ModalButton } from '.';

type Modal = {
  type: InformationalMessageType,
  messages: string[],
  buttons: ModalButton[]
}

export default Modal