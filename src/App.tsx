import React, { MutableRefObject, useRef } from "react";
import Overlay from "./components/Overlay";

import "./App.scss";

const App: React.FC = () => {
    const overlayRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    return (
        <div className="App">
            <Overlay overlayRef={overlayRef} />
        </div>
    );
};

export default App;
