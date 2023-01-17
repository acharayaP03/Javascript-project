export type HTMLElemetEvent<T extends HTMLElement> = Event & { target: T }
export type Button<T extends NodeList> = T