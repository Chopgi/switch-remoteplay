import {WithStyles} from '@material-ui/core/styles'
import {ControllerState} from './components/Controller/ControllerState'

// Define the signature for the sendCommand function used across components
export type SendCommand = (
    command: string,
    controllerState?: ControllerState,
    updateGivenState?: boolean
) => void;

// Interface for the PlayGame component State
export interface PlayGameState {
    connectButtonText: string;
    serverAddress: string;
    connectionStatus?: string;
    isInSendMode: boolean;
    sendCommandsButtonText: string;
    sendModeStatus?: string;
    status?: string;
    mixerChannel: string | null | undefined;
    socket: any;
    inputMethod: any;
    inputMethodOptions: any[];
    controllerState: ControllerState | undefined;
}

export interface PlayGameProps extends Partial<WithStyles<any>> {
    name?: string;
    sendCommand?: SendCommand;
    controllerState?: ControllerState;

    classes?: any;
    className?: string;          // Added ?
    children?: React.ReactNode;
}

// Global Prop helper for React 18 (adds children to any interface)
export interface BaseProps {
    children?: React.ReactNode;
}