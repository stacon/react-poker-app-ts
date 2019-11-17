import { GameStatus } from 'src/enums';

/** Represents currents round's state
 * Status id hold the round status (e.g. First Betting phase).
 * Players' PID in game phase keeps an array of players who haven't folded - passed - left yet
 * Players' PIDs that took actions hold an array of players that took action
 */
type RoundState = {
    statusId: GameStatus,
    playersPIDsInGamePhase: string[],
    playerPIDsTookAction: string[]
}

export default RoundState;