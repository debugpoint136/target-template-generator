# cra-tailwind-boilerplate

Add custom CSS in styles/index.css

##### adding CSS-grid support

- tailwind.js

update - 
```
plugins: [
    require('tailwindcss/plugins/container')({
      // center: true,
      // padding: '1rem',
    }),
    require('tailwindcss/plugins/css-grid')({
      grids: [2, 3, 5, 6, 8, 10, 12],
      gaps: {
        0: '0',
        4: '1rem',
        8: '2rem',
      },
      variants: ['responsive'],
    }),
  ],
  ```
  
  #### node_modules
  
  in `tailwindcss`
  
  `lib/plugins/css-grid.js`
  
  ```const _ = require('lodash')

module.exports = function ({
    grids = _.range(1, 12),
    gaps = {},
    variants = ['responsive']
}) {
    return function ({e, addUtilities}) {
        addUtilities([
            {
                '.grid': {
                    display: 'grid'
                }
            }, {
                '.grid-dense': {
                    gridAutoFlow: 'dense'
                }
            },
            ..._.map(gaps, (size, name) => ({
                [`.grid-gap-${e(name)}`]: {
                    gridGap: size
                }
            })),
            ...grids.map(columns => ({
                [`.grid-columns-${columns}`]: {
                    gridTemplateColumns: `repeat(${columns}, 1fr)`
                }
            })),
            ..._.range(1, _.max(grids) + 1).map(span => ({
                [`.col-span-${span}`]: {
                    gridColumnStart: `span ${span}`
                }
            })),
            ..._.range(1, _.max(grids) + 2).map(line => ({
                [`.col-start-${line}`]: {
                    gridColumnStart: `${line}`
                },
                [`.col-end-${line}`]: {
                    gridColumnEnd: `${line}`
                }
            }))
        ], variants)
    }
}
```

make a new file in `tailwindcss/plugins/css-grid.js`


```
module.exports = require('../lib/plugins/css-grid')
```

Finally, 

Make a Component- 


```
import React, {Component} from 'react'

const Base = () => {
    return (
        <div
            className="grid grid-columns-3 text-center"
            style={{
            'justifyItems': 'center'
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

