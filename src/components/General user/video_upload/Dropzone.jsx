import React from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SmallText from './SmallText';

export default function Dropzone(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({    
    maxFiles:2
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
   return (
     <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => <li key={e.code}>{e.message}</li>)}
         </ul>

     </li>
   ) 
  });
  

  return (
    <section className="container px-5 py-10">
      <div {...getRootProps({ className: 'dropzone border border-dashed rounded-lg border-3 border-gray-300 p-10 flex flex-col items-center text-center' })}>
        <input {...getInputProps()} />
        <CloudUploadIcon className='w-1/5 h-1/5 text-gray-200'/>
        <p><u><b>Click to Upload</b></u> or drag and drop</p>
        <p className='text-[12px] font-medium mb-16 text-gray-400'>(Maximum File Size: 5MB)</p>
        <SmallText text={"Your videos will be private to you till you submit them"} />
      </div>
      <aside>
        {/* <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul> */}
      </aside>
    </section>
  );
}
