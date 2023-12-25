// CommandMenu.jsx
import React from 'react';

const CommandMenu = ({ commands, onCommandSelected, position }) => {
  if (!commands.length) return null;

  const style = {
    position: 'absolute',
    top: position.top,
    left: position.left,
  };

  return (
    <ul style={style} className="command-menu">
      {commands.map((command, index) => (
        <ul>
        <li key={index} onClick={() => onCommandSelected(command)}>
          {command.title}
        </li>
        </ul>
      ))}
    </ul>
    
  );
};

export default CommandMenu;
