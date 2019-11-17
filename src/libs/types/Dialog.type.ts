import { InformationalMessageType } from "src/enums";
import { ModalButton } from '.';

/**
 * Represents a dialog pop up
 * @param {InformationalMessageType} type attribute that is CSS class related.
 * @param {string[]} messages a list of messages that will be shown in a single dialog
 * @param {ModalButton[]} buttons a list of buttons that will sit together on the dialogs bottom
 */
type Dialog = {
  type: InformationalMessageType,
  messages: string[],
  buttons: ModalButton[]
}

export default Dialog