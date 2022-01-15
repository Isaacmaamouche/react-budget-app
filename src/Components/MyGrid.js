import React from 'react';

export default function MyGrid({children}){

    return (
        <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill,minmax(350px, 1fr', gap:'1rem', alignItems:"stretch"}}>
            {children}
          </div>
    )
}