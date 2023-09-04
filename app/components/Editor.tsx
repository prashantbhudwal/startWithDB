"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { type InitialConfigType } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useState } from "react";
import { type EditorState } from "lexical";

export default function Editor() {
  const [editorState, setEditorState] = useState<string>();
  const initialConfig: InitialConfigType = {
    namespace: "testEditor",
    onError: (error) => {
      console.log(error);
    },
  };
  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    const stringifiedJSON = JSON.stringify(editorStateJSON);
    setEditorState(stringifiedJSON);
  }
  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </LexicalComposer>
      <button onClick={() => console.log(editorState)}>Log Editor State</button>
    </>
  );
}
