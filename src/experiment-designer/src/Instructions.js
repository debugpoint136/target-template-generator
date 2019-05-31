import React, { Component } from 'react'

const Instructions = (props) => {
    return (
        <div>
            <a href="https://submit.targetepigenomics.org/dashboard">Home</a>
            <hr/>
            Your unique Submission Id is: 
            <CodeBlock>{props.submissionId}</CodeBlock>
            <hr/>
            <h2 className='p-8'>Data upload instructions</h2>
            <hr/>
            <h3>Steps:</h3>
            <p>1. On your local computer/server</p>
            <p>using terminal/command line, cd into the directory where the data files to be
                uploaded are available</p>
            <p>2. Start SFTP connection to the submission server from command line </p>
            <CodeBlock>sftp targetdcc@target.wustl.edu:upload1</CodeBlock>
            <br/>
            <p>Password is <strong>{props.dccPassword}</strong></p>
            <p>3. Upon successful connection you should be logged on to the sftp terminal on the TaRGET DCC server, and you should see </p>

            <CodeBlock>Connected to target.wustl.edu</CodeBlock>
            <br/>
            <br/>
            <CodeBlock>Changing to: /upload1</CodeBlock>
            <br/>
            <br/>
            <p>4. Change to your unique submission directory </p>
            <CodeBlock>sftp> cd raw-data/{props.submissionId}</CodeBlock> 
            <p><strong>Important Note: </strong> the above command will take you to the unique folder set up for your submission (based on your unique submission id displayed at top of this page) </p>
            <div className='text-md max-w-md p-2 bg-red-light text-white'>Please upload all files declared in this registration to this folder ONLY. </div> 
            <br/>
            <p>Files uploaded elsewhere will not be tracked by the system</p>
            <br/>
            <label className="tiny">if you see this message - </label>
            <br/>
            <CodeBlock>Couldn't stat remote file: No such file or directory</CodeBlock>
            <br/>
            <label>Please wait for 1 minute, and try again</label>

            <br/>
            <p>Finally,</p>
            <p>5. To start the bulk upload, type</p>
            <CodeBlock>put -r * </CodeBlock>

            <br/>
            <p>If there is a disconnection, you can use </p> <CodeBlock>reput -r * </CodeBlock> <p>to resume upload of files that were left off</p>
            <p>6. To conclude SFTP session  </p>
            <CodeBlock>sftp> bye</CodeBlock>
            <hr/>
            {(props.data_phase === 'production') ?
            <div>
            <div className='text-md max-w-md mb-8 p-8 bg-red-light text-white'>PRODUCTION METADATA : <strong>PENDING</strong></div>
            <h3>Please follow through and submit complete Production metadata</h3>
            <div className='text-md max-w-md mb-8 p-8 bg-grey-lighter'>
                <p>Submission will not be considered complete unless complete metadata is submitted and approved by your Data Wrangler</p>
            </div>
            </div>
            : null }
        </div>
    )
}

export default Instructions

const CodeBlock = (props) => {
    return (
        <div className='font-mono font-thin text-md max-w-md p-2 bg-grey-light'>{props.children}</div>
    )
}
