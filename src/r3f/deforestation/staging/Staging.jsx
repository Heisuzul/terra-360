import { Environment } from "@react-three/drei";

const Staging = () => {
    return (
        <Environment 
            ground={{
                height: 30,
                radius: 200,
                scale: 100,
            }} 
            files={"/hdris/deforestation/sunflowers_2k.hdr"}
            background={true}
        />
    );
};

export default Staging;