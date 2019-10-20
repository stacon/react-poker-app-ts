import { InformationalMessageType } from "src/enums";
import { ModalButton } from '.';

type Dailog = {
  type: InformationalMessageType,
  messages: string[],
  buttons: ModalButton[]
}

export default Dailog