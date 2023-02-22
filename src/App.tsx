// Styling
import "./App.css";

// React Import
import React from "react";
import { useState, useEffect } from "react";

// Plugins
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

function App() {
  // Variables
  const [element, setElement] = useState<string[]>([]);
  const [filebase, setFileBase] = useState<string>("");

  // Handlers
  const handleOnDrag = (e: React.DragEvent, elementType: string) => {
    e.dataTransfer.setData("elementType", elementType);
  };

  const handleOnDrop = (e: React.DragEvent) => {
    const elementType = e.dataTransfer.getData("elementType") as string;
    setElement([...element, elementType]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    console.log("it worked");
  };

  const formSubmit = (e: any) => {
    e.preventDefault();
    console.log({ filebase });
  };

  const onImageUpload = (files: FileList | null) => {
    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";
      console.log("This file upload is of type:", fileType);
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        // convert it to base64
        setFileBase(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
    }
  };

  return (
    <div className="app">
      <div className="elements">
        <div
          className="element"
          draggable
          onDragStart={(e) => handleOnDrag(e, "Text")}
        >
          TEXT
        </div>
        <div
          className="element"
          draggable
          onDragStart={(e) => handleOnDrag(e, "Image")}
        >
          IMAGE
        </div>
      </div>

      <div className="page" onDrop={handleOnDrop} onDragOver={handleDragOver}>
        {element.map((element, index) => (
          <div className="dropped-element" key={index}>
            {element.includes("Text") ? (
              <textarea
                placeholder="Enter Text"
                rows={3}
                wrap="soft"
              ></textarea>
            ) : (
              <div className="img-container">
                <FontAwesomeIcon icon={faRocket} size="2x" className="icon" />
                <form onSubmit={formSubmit}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => onImageUpload(e.target.files)}
                  />
                  {filebase.indexOf("image/") > -1 && (
                    <img
                      src={filebase}
                      width={100}
                      style={{
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
