// import { HOCFunctionalComponent } from "@/types/component";
// import React from "react";


// const MyComponent: HOCFunctionalComponent<JSX.IntrinsicElements["iframe"]> = (
//   props
// ) => {


//   return <iframe {...props} />;
// };

// export default MyComponent;
// https://careerjet.co.uk/jobad/gb38ea43c92736afd87c1f9ef400562bab

import React, { useEffect, useRef, useState } from 'react';
// import './App.css'; // Assuming you have a CSS file for styling

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeLoad =  async () => {
      setLoading(false);
      if (iframeRef.current) {
        const iframeContent = iframeRef.current.contentWindow;
        if (iframeContent) {
          console.log(iframeContent);
          // Access the iframe's DOM here
          // Example: Get all anchor tags
          const anchors = iframeContent.document.getElementsByTagName('a');
          console.log(anchors); // Log the anchors for demonstration
        }
      }
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [loading]);

  return (
    <div className="App">
      {loading? <div>Loading...</div> : null}
      <iframe
        title="Example Iframe"
        ref={iframeRef}
        src="https://careerjet.co.uk/jobad/gb38ea43c92736afd87c1f9ef400562bab"
        width="100%"
        height="500px"
        frameBorder="0"
      />
    </div>
  );
};

export default App;
