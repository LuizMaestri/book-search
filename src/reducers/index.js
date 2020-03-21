export const SEARCH: string = 'SEARCH';
export const DATE_START: string = 'DATE_START';
export const DATE_END: string = 'DATE_END';
export const RESIZE: string = 'RESIZE';

export default (state: any,  { type, payload } : Action) => {
    switch (type) {
        case SEARCH: return { ...state, search: payload };
        case RESIZE: return { ...state, isMobile: payload };
        case DATE_START: return { ...state, dateStart: payload }
        case DATE_END: return { ...state, dateEnd: payload }
        default: return state;
    }
};
