import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface IFrameProps {
  children?: React.ReactNode;
  [x: string]: any; // Allows passing any other props to the iframe
}

const IFrame: React.FC<IFrameProps> = ({ children, ...props }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);


  const injectScript = async () =>{
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const script =
        iframeRef.current.contentWindow.document.createElement("script");
      // script.textContent = `document.querySelector(".btn-apply").removeAttribute("target")`;
      script.textContent = `alert(document.querySelector(".btn-apply"))`;
      iframeRef.current.contentWindow.document.body.appendChild(script);
    }
  }

  // useEffect(() => {
  //   injectScript();
  // }, [,iframeRef]);

  return (
    <iframe
      ref={iframeRef}
      {...props}
      style={{ border: 0 }}
      onLoad={() =>injectScript()}
      about="block"
      allow="*"
    >
      {iframeRef.current?.contentWindow?.document?.body &&
        ReactDOM.createPortal(
          <>{children}</>,
          iframeRef.current.contentWindow.document.body
        )}
    </iframe>
  );
};

export default IFrame;
