import { Html } from '@react-three/drei'

const ToolTip = ({ position, text}) => {

    return (
        <Html position={position} center>
        <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid black',
            padding: '5px',
            borderRadius: '5px',
            textAlign: 'center',
            fontSize: '11px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            userSelect: 'none'
        }}>
            { text }
        </div>
    </Html>
)}

export default ToolTip;