import { InformationalMessageType } from "src/enums";

type ModalButton = {
  type: InformationalMessageType,
  text: string,
  callBack: Function,
}

export default ModalButton;