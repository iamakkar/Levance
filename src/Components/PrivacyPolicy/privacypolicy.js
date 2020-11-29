import React from "react"
import PDFViewer from 'pdf-viewer-reactjs'
import {privacyPolicy} from "../../Config/config.json"
const privacy = () =>{
    return (
        <>
        <PDFViewer
            document={{
                base64: privacyPolicy
            }}
            style={{margin:"auto"}}
        />
        </>
    )
}

export default privacy;