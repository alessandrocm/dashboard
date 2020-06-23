import { IEvent } from "fabric/fabric-impl";

export interface IFabricEvent extends IEvent {
  path?: fabric.Path
}

export enum PathEvents {
  PATH_CREATED = 'path:created',
};

export enum MouseEvents {
  MOUSE_DOWN = 'mouse:down',
  MOUSE_MOVE = 'mouse:move',
  MOUSE_UP = 'mouse:up',
}

export enum ToolEvents {
  TOOL_DRAWING = 'tool:drawing',
}
