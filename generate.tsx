// import React from "react";
import React from "react";
import { renderToStream } from '@react-pdf/renderer';
import fs from 'fs';
import { DefaultResumeData, ResumeSchema } from './resumeData';

// import resume template, this is the template that will be used to generate the pdf
import { 
    Template
 } from './newTemplate';
//======//


const resumeData: ResumeSchema = DefaultResumeData;
 async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}
async function generatePdf() {
    try {
        let stream = await renderToStream(<Template data={resumeData} />)
        let pdfBuffer: Buffer = await streamToBuffer(stream);
        // Write the buffer to the file system
        fs.writeFileSync('resume.pdf', pdfBuffer);

    } catch (err) {
        console.error(err)
    }
}
generatePdf().then(() => {
    console.log("PDF generated")
}).catch((err) => {
    console.error(err)
})