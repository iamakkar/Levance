import React from "react"
import PDFViewer from 'pdf-viewer-reactjs'
import {terms_conditions} from "../../Config/config.json"

const terms = () =>{
    
    return (
        <div>
        <PDFViewer
            document={{
                base64: terms_conditions
            }}
            style={{height:"60vh"}}
            
        />
        </div>
    )
}

export default terms;