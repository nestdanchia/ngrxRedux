// arbol de estado cada rama tendra su propio reducer
export interface Global {
	userToken: string;
	userMessage: string;
}

export const globalInitialState: Global = {
	userToken: "",
	userMessage: ""
};
