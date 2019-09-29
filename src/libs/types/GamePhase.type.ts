import { GameStatus } from 'src/enums';

interface GamePhase {
    statusId: GameStatus,
    playersPIDsInGamePhase: string[],
    playerPIDsTookAction: string[]
}

export default GamePhase;