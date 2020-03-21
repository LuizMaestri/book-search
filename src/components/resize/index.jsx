import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
// $FlowFixMe
import { useGlobalState } from 'state';
// $FlowFixMe
import { RESIZE } from 'reducers';

export default () => {
    const [ , dispatch ] = useGlobalState();
    return <ReactResizeDetector handleWidth handleHeight onResize={width => dispatch({ type: RESIZE, payload:  width <= 768 })} />;
}