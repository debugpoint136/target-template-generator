## Button

 ```
 <button
  className="bg-purple hover:bg-purple-light text-white font-bold py-8 px-8 border-b-4 border-purple-dark hover:border-purple rounded">
  Button
</button>
```
              
## Buttons in a col

```
 <div className="flex">
   <div
     className="px-8 py-4 w-1/4 bg-grey-lighter h-screen flex items-center justify-center">
     <div className="flex-col text-center">
       <div
         className="bg-teal max-w-md mb-8 hover:bg-purple-light text-white text-2xl font-thin py-24 px-48 border-b-4 border-purple-dark hover:border-purple rounded">
         PRODUCTION
       </div>
       <div
         className="bg-grey-darkest max-w-md mb-8 hover:bg-pink-light text-white text-2xl font-thin py-24 px-48 border-b-4 border-pink-dark hover:border-pink rounded">
         PILOT
       </div>
    </div>
</div>
```


## CSS-grid example

```
import React, {Component} from 'react'

const Base = () => {
    return (
        <div
            className="grid grid-columns-3 text-center"
            style={{
            'justifyItems': 'center' // https://alligator.io/css/align-justify/
        }}>

            <div className='text-md max-w-sm mb-8 p-8 bg-pink-lighter'>
                <p>PRODUCTION</p>
            </div>

            <div className='text-md max-w-sm mb-8 p-8 bg-red-lighter'>
                <p>PRODUCTION</p>
            </div>
            <div className='text-md max-w-sm mb-8 p-8 bg-red-lighter'>
                <p>PRODUCTION</p>
            </div>
        </div>
    )
}

export default Base;
```
