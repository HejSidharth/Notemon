// SlashCommands.js
import { Extension } from '@tiptap/react';
import { Plugin, PluginKey } from 'prosemirror-state';

const SlashCommands = (setShowMenu, setPosition) => {
  return Extension.create({
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('slashCommands'),
          view(editorView) {
            return {
              update: (view, prevState) => {
                const { state } = view;
                const { selection } = state;
                const { $from } = selection;

                if (selection.empty && $from.parentOffset === 1) {
                  const previousChar = $from.textBefore.slice(-1);
                  if (previousChar === '/') {
                    setShowMenu(true);
                    const coords = view.coordsAtPos($from.pos);
                    setPosition({ top: coords.top, left: coords.left });
                  }
                } else {
                  setShowMenu(false);
                }
              },
            };
          },
        }),
      ];
    },
  });
};

export default SlashCommands;
