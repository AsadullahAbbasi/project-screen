import React from 'react';

function ImageDragAndDrop() {
  return (
    <div>
      <div
        id="drop-area"
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{
          width: '300px',
          height: '300px',
          border: '2px dashed gray',
          borderRadius: '10px',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        Drop Image Here
      </div>
      <img
        id="drag-image"
        src="https://via.placeholder.com/150"
        alt="Draggable Image"
        draggable="true"
        onDragStart={onDragStart}
        style={{ width: '150px', marginTop: '20px' }}
      />
    </div>
  );
}

// Define event handlers outside of the component
function onDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function onDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  const draggableElement = document.getElementById(data);
  e.target.appendChild(draggableElement);
}

function onDragOver(e) {
  e.preventDefault();
}

export default ImageDragAndDrop;
