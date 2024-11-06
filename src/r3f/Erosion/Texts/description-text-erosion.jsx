import React from 'react';
import { Html } from '@react-three/drei';
import styles from './description-text-erosion.module.css';

const DescriptionTextErosion = () => {
    return (
        <Html position={[0.5, 0.4, 0.2]} center>
            <div className={styles.introductionDiv}> 
                <p className={styles.introductionText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis repellat consequatur soluta, sapiente aut, fugit velit ipsum autem incidunt dolorum atque veritatis. Itaque enim quisquam accusamus at sunt, libero reiciendis.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, natus porro accusamus doloremque quis culpa officiis alias esse modi, suscipit explicabo inventore? Possimus, in. Quam inventore eveniet illum magnam voluptas.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, esse porro illum tempora aut optio laborum quisquam facere rerum suscipit, itaque dolorum et est impedit doloribus? Illum ut laborum doloremque?
                </p>
            </div>
        </Html>
    );
};

export default DescriptionTextErosion;