import React from 'react'
import './PlaygroundCon.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import Prompt from "../../components/Prompt/Prompt";
import DropdownButtonsss from "../../components/DropdownButton/DropdownButton";
import TModels from "../../components/Turbo Models/TModels";
import PBoxes from '../../components/PBoxes/PBoxes';
function PlaygroundCon() {
    return (
        <>
            <div className="PlaygroundContainer">
                <div className="PlaygroundSidebar">
                    <Sidebar />
                </div>
                <div className="PlaygroundPrompt">
                    <Prompt />
                </div>
                <div className="PlaygroundDropdownButtons">
                    <DropdownButtonsss />
                </div>
                <div className="PlaygroundTerboModels">
                    <TModels />
                </div>
                <div className="PlaygroundOnPageFunction">
                    <PBoxes />
                </div>
            </div>
        </>
    )
}

export default PlaygroundCon