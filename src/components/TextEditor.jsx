// TextEditor.jsx
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import SlashCommands from './SlashCommands';
import CommandMenu from './CommandMenu';

const TextEditor = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const commands = [
    { title: 'Bold', action: () => editor.chain().focus().toggleBold().run() },
    { title: 'Italic', action: () => editor.chain().focus().toggleItalic().run() },
    // Add more commands as needed
  ];

  const editor = useEditor({
    extensions: [StarterKit, SlashCommands(setShowMenu, setMenuPosition)],
    content: '<p>Hello World!</p>',
  });

  const handleCommandSelected = (command) => {
    command.action();
    setShowMenu(false);
  };

  return (
    <>
      <EditorContent editor={editor} />
      {showMenu && <CommandMenu commands={commands} onCommandSelected={handleCommandSelected} position={menuPosition} />}
    </>
  );
};

export default TextEditor;
