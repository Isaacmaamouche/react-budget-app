
export default function MyGrid({children}){

    return (
        <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill,minmax(400px, 1fr', gap:'1rem', alignItems:"flex-start"}}>
            {children}
          </div>
    )
}