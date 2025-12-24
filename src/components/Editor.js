import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);      // editor  instance
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(  // codemirror instance
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {   
                const { origin } = changes;
                const code = instance.getValue();    // storing  all the typing changes
                onCodeChange(code);
                if (origin !== 'setValue') {
                    if (socketRef && socketRef.current) {
                        socketRef.current.emit(ACTIONS.CODE_CHANGE, {   // current user sending changes to backend
                            roomId,
                            code,
                        });
                    }
                }
            });
        }
        init();
    }, [onCodeChange, roomId, socketRef]);

    useEffect(() => {
        const socket = socketRef && socketRef.current;
        if (socket) {
            socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {   // listening changes done by other users
                if (code !== null) {
                    if (editorRef.current) editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            if (socket) {
                socket.off(ACTIONS.CODE_CHANGE);
            }
        };
    }, [socketRef]);

    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;