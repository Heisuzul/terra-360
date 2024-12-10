# Terra-360

Terra-360 is an interactive web application designed to raise awareness about critical environmental issues such as deforestation, biodiversity loss, and soil erosion. The platform provides educational content on these topics and includes a final quiz to test users' knowledge and understanding.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Terra-360 aims to educate users about the pressing environmental issues that affect our planet. By exploring the topics of deforestation, biodiversity loss, and soil erosion, users can gain a deeper understanding of the impact of these issues and learn how to contribute to a more sustainable future.

## Features

- **Educational Content**: Learn about deforestation, biodiversity loss, and soil erosion through interactive content.
- **Interactive Quiz**: Test your knowledge with a final quiz accessible from the homepage.
- **Shareable Links**: Share the platform with others to spread awareness.

## Installation

To run Terra-360 locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/terra-360.git
   ```

2. Navigate to the project directory:
   ```bash
   cd terra-360
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once the development server is running, you can access the application in your web browser at `http://localhost:3000`. From the homepage, you can navigate to different sections to learn about deforestation, biodiversity loss, and soil erosion. After exploring the content, you can take the final quiz to test your knowledge.

## Project Structure

```
terra-360
├─ .git
├─ .gitattributes
├─ .github
│  └─ workflows
│     ├─ preview.yaml
│     └─ production.yaml
├─ .gitignore
├─ eslint.config.js
├─ firebase.config.js
├─ index.html
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ public
│  ├─ 3d-models
│  │  ├─ canyon_cliff_face_low_poly.glb
│  │  ├─ low_poly_farm.glb
│  │  ├─ low_poly_forest.glb
│  │  ├─ low_poly_rocks_hills_trees.glb
│  │  ├─ pine_tree_low_poly.glb
│  │  ├─ tree_without_leaves_low_poly.glb
│  │  └─ tumbleweed.glb
│  ├─ cubemap
│  │  └─ erosion
│  │     └─ sunset
│  │        ├─ nx.png
│  │        ├─ ny.png
│  │        ├─ nz.png
│  │        ├─ px.png
│  │        ├─ py.png
│  │        └─ pz.png
│  ├─ fonts
│  │  ├─ TiltWarp-Regular-Variable.ttf
│  │  ├─ TiltWarp-Regular.json
│  │  └─ TiltWarp-Regular.ttf
│  ├─ google_icon.svg
│  ├─ hdris
│  │  ├─ deforestation
│  │  │  ├─ alps_2k.hdr
│  │  │  ├─ rooitou_park_2k.hdr
│  │  │  └─ sunflowers_2k.hdr
│  │  └─ erosion
│  │     ├─ citrus_orchard_road_2k.hdr
│  │     ├─ dikhololo_night_2k.hdr
│  │     ├─ industrial_sunset_2k.hdr
│  │     └─ qwantani_dusk_2_1k.hdr
│  ├─ images
│  │  ├─ backgrounds
│  │  │  ├─ biodiversity-background.jpg
│  │  │  ├─ consequences-background.gif
│  │  │  └─ consequences-background.jpg
│  │  └─ buttons
│  │     ├─ biodiversity.png
│  │     ├─ deforestation.png
│  │     └─ erosion.png
│  ├─ low-poly-tree.svg
│  ├─ materials
│  │  ├─ deforestation
│  │  │  ├─ terrain-aomap.jpg
│  │  │  ├─ terrain-aomap.png
│  │  │  ├─ terrain-aomap1.jpg
│  │  │  ├─ terrain-aomap1.png
│  │  │  ├─ terrain-heightmap.jpg
│  │  │  ├─ terrain-heightmap.png
│  │  │  ├─ terrain-heightmap1.png
│  │  │  ├─ terrain-normal.png
│  │  │  └─ terrain-specular.png
│  │  ├─ pine-texture
│  │  │  ├─ pine_bark_ao_1k.jpg
│  │  │  ├─ pine_bark_arm_1k.jpg
│  │  │  ├─ pine_bark_diff_1k.jpg
│  │  │  ├─ pine_bark_disp_1k.png
│  │  │  ├─ pine_bark_nor_gl_1k.jpg
│  │  │  └─ pine_bark_rough_1k.jpg
│  │  ├─ rock-texture
│  │  │  ├─ rock_boulder_cracked_ao_1k.jpg
│  │  │  ├─ rock_boulder_cracked_arm_1k.jpg
│  │  │  ├─ rock_boulder_cracked_diff_1k.jpg
│  │  │  ├─ rock_boulder_cracked_disp_1k.png
│  │  │  ├─ rock_boulder_cracked_nor_gl_1k.jpg
│  │  │  └─ rock_boulder_cracked_rough_1k.jpg
│  │  ├─ rocky-terrain
│  │  │  ├─ rocky_terrain_02_ao_1k.jpg
│  │  │  ├─ rocky_terrain_02_arm_1k.jpg
│  │  │  ├─ rocky_terrain_02_diff_1k.jpg
│  │  │  ├─ rocky_terrain_02_disp_1k.png
│  │  │  ├─ rocky_terrain_02_nor_gl_1k.jpg
│  │  │  └─ rocky_terrain_02_rough_1k.jpg
│  │  └─ terrain-soil-erosion
│  │     ├─ rock_face_ao_1k.jpg
│  │     ├─ rock_face_arm_1k.jpg
│  │     ├─ rock_face_diff_1k.jpg
│  │     ├─ rock_face_disp_1k.png
│  │     ├─ rock_face_nor_gl_1k.jpg
│  │     └─ rock_face_rough_1k.jpg
│  ├─ models-3d
│  │  ├─ biodiversity
│  │  │  ├─ bee
│  │  │  │  ├─ bee.bin
│  │  │  │  ├─ bee.gltf
│  │  │  │  └─ textures
│  │  │  │     └─ Atlas_Alpha_baseColor.png
│  │  │  ├─ butterflies
│  │  │  │  ├─ butterflies.glb
│  │  │  │  └─ butterflies2.glb
│  │  │  ├─ condor
│  │  │  │  └─ condor.glb
│  │  │  ├─ crocodile
│  │  │  │  └─ crocodile.glb
│  │  │  ├─ flowers
│  │  │  │  └─ flowers.glb
│  │  │  ├─ forest
│  │  │  │  ├─ forest.bin
│  │  │  │  ├─ forest.gltf
│  │  │  │  └─ textures
│  │  │  │     ├─ PP_Standard_Material_baseColor.png
│  │  │  │     └─ PP_Standard_Material_metallicRoughness.png
│  │  │  ├─ frog
│  │  │  │  └─ frog.glb
│  │  │  ├─ orchid
│  │  │  │  └─ orchid.glb
│  │  │  └─ wolf
│  │  │     └─ wolf.glb
│  │  ├─ deforestation
│  │  │  ├─ back-next-arrows-sign.glb
│  │  │  ├─ back-next-wood-sign.glb
│  │  │  ├─ bag-seeds.glb
│  │  │  ├─ bed-desk.glb
│  │  │  ├─ big-irregular-wood-sign.glb
│  │  │  ├─ chainsaw-animated.glb
│  │  │  ├─ circular-blade.glb
│  │  │  ├─ clippit.glb
│  │  │  ├─ desk.glb
│  │  │  ├─ laptop-sq-buttons.glb
│  │  │  ├─ laptop.glb
│  │  │  ├─ office-chair.glb
│  │  │  ├─ orange-bird.glb
│  │  │  ├─ paths-sign.glb
│  │  │  ├─ phone-body.glb
│  │  │  ├─ phone-handle.glb
│  │  │  ├─ printer.glb
│  │  │  ├─ red-valve.glb
│  │  │  ├─ small-table.glb
│  │  │  ├─ wood-column.glb
│  │  │  ├─ wood-platform.glb
│  │  │  ├─ wood-sign.glb
│  │  │  └─ wood-sign2.glb
│  │  └─ homepage
│  │     └─ earth.glb
│  ├─ sounds
│  │  ├─ bird-chirp-1.mp3
│  │  ├─ bird-chirp-2.mp3
│  │  ├─ falling-in-dirt.mp3
│  │  ├─ metal-hit.mp3
│  │  ├─ muffled-sound-of-falling.mp3
│  │  ├─ nature.mp3
│  │  ├─ nature2.mp3
│  │  ├─ naturesounds.mp3
│  │  ├─ stormsounds.mp3
│  │  └─ waves.mp3
│  ├─ Terra360 Logo-01.svg
│  ├─ Terra360 Logo-02.svg
│  ├─ Terra360 Logo-03.svg
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ DAO
│  │  └─ UserDAO.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ biodiversity
│  │  │  ├─ Biodiversity.jsx
│  │  │  ├─ Biodiversity.module.css
│  │  │  └─ components
│  │  │     ├─ controllers
│  │  │     │  ├─ cameraController.jsx
│  │  │     │  └─ keyboardControls.jsx
│  │  │     └─ navbar
│  │  │        ├─ navbar.jsx
│  │  │        └─ navbar.module.css
│  │  ├─ deforestation
│  │  │  ├─ Deforestation.css
│  │  │  ├─ Deforestation.jsx
│  │  │  ├─ InstructionsOverlay.css
│  │  │  ├─ InstructionsOverlay.jsx
│  │  │  ├─ Loading.css
│  │  │  ├─ Loading.jsx
│  │  │  ├─ navbar
│  │  │  │  ├─ Navbar.jsx
│  │  │  │  └─ Navbar.module.css
│  │  │  ├─ ShareOverlay.css
│  │  │  ├─ ShareOverlay.jsx
│  │  │  ├─ SolutionsOverlay.css
│  │  │  └─ SolutionsOverlay.jsx
│  │  ├─ Erosion
│  │  │  ├─ erosion.css
│  │  │  └─ erosion.jsx
│  │  └─ login
│  │     ├─ InstructionsOverlay.css
│  │     ├─ InstructionsOverlay.jsx
│  │     ├─ Login.jsx
│  │     ├─ Login.module.css
│  │     └─ Scene.jsx
│  ├─ r3f
│  │  ├─ biodiversity
│  │  │  ├─ bee
│  │  │  │  └─ Bee.jsx
│  │  │  ├─ butterflies
│  │  │  │  ├─ Butterflies.jsx
│  │  │  │  └─ Butterflies2.jsx
│  │  │  ├─ condor
│  │  │  │  └─ Condor.jsx
│  │  │  ├─ crocodile
│  │  │  │  └─ Crocodile.jsx
│  │  │  ├─ dust
│  │  │  │  └─ DustParticles.jsx
│  │  │  ├─ flowers
│  │  │  │  └─ Flowers.jsx
│  │  │  ├─ forest
│  │  │  │  ├─ Forest.jsx
│  │  │  │  ├─ Plane.jsx
│  │  │  │  └─ Tree.jsx
│  │  │  ├─ frog
│  │  │  │  └─ Frog.jsx
│  │  │  ├─ orchid
│  │  │  │  └─ Orchid.jsx
│  │  │  └─ wolf
│  │  │     └─ Wolf.jsx
│  │  ├─ deforestation
│  │  │  ├─ controllers
│  │  │  │  └─ CameraController.jsx
│  │  │  ├─ data
│  │  │  │  └─ treePositions.js
│  │  │  ├─ lights
│  │  │  │  ├─ AmbientLight.jsx
│  │  │  │  └─ DirectionalLight.jsx
│  │  │  ├─ meshes
│  │  │  │  ├─ AutoSurfaceText.jsx
│  │  │  │  ├─ BackNextArrows.jsx
│  │  │  │  ├─ BackNextSign.jsx
│  │  │  │  ├─ BagSeeds.jsx
│  │  │  │  ├─ BigIrregularSign.jsx
│  │  │  │  ├─ Desk.jsx
│  │  │  │  ├─ FloatingText.jsx
│  │  │  │  ├─ InteractiveBlade.jsx
│  │  │  │  ├─ Laptop.jsx
│  │  │  │  ├─ LaptopButtons.jsx
│  │  │  │  ├─ OneWoodSign.jsx
│  │  │  │  ├─ OrangeBird.jsx
│  │  │  │  ├─ PathsSign.jsx
│  │  │  │  ├─ PhoneBody.jsx
│  │  │  │  ├─ PhoneHandle.jsx
│  │  │  │  ├─ Platform.jsx
│  │  │  │  ├─ Printer.jsx
│  │  │  │  ├─ RedValve.jsx
│  │  │  │  ├─ SmallTable.jsx
│  │  │  │  ├─ SurfaceText.jsx
│  │  │  │  ├─ Terrain.jsx
│  │  │  │  ├─ ThreeWoodSign.jsx
│  │  │  │  ├─ ToggleButton.jsx
│  │  │  │  ├─ Tree.jsx
│  │  │  │  ├─ Trees.jsx
│  │  │  │  ├─ WoodColumn.jsx
│  │  │  │  └─ WoodPlatform.jsx
│  │  │  ├─ scenes
│  │  │  │  ├─ Scene.jsx
│  │  │  │  └─ Scene.module.css
│  │  │  └─ staging
│  │  │     └─ Staging.jsx
│  │  ├─ Erosion
│  │  │  ├─ camera-control
│  │  │  │  └─ camera-control.jsx
│  │  │  ├─ lights
│  │  │  │  └─ lights.jsx
│  │  │  ├─ meshes
│  │  │  │  ├─ desert-forest.jsx
│  │  │  │  ├─ desert-low-poly.jsx
│  │  │  │  ├─ farm-low-poly.jsx
│  │  │  │  ├─ forest-with-river.jsx
│  │  │  │  ├─ pine-without-leaves.jsx
│  │  │  │  ├─ rocks.jsx
│  │  │  │  ├─ terrain.jsx
│  │  │  │  ├─ tree-without-leaves.jsx
│  │  │  │  └─ tumble-weed.jsx
│  │  │  ├─ scenes
│  │  │  │  ├─ scene.css
│  │  │  │  └─ scene.jsx
│  │  │  ├─ staging
│  │  │  │  └─ staging.jsx
│  │  │  └─ Texts-and-buttons
│  │  │     ├─ causes-text-erosion.jsx
│  │  │     ├─ causes-text-erosion.module.css
│  │  │     ├─ description-text-erosion.jsx
│  │  │     ├─ description-text-erosion.module.css
│  │  │     ├─ home-button.jsx
│  │  │     ├─ home-button.module.css
│  │  │     ├─ instructions.jsx
│  │  │     └─ instructions.module.css
│  │  ├─ homepage
│  │  │  ├─ controllers
│  │  │  │  └─ CameraController.jsx
│  │  │  ├─ meshes
│  │  │  │  ├─ Floor.jsx
│  │  │  │  ├─ Leaf.jsx
│  │  │  │  ├─ LittleWorld.jsx
│  │  │  │  ├─ Mountain.jsx
│  │  │  │  └─ Tree.jsx
│  │  │  ├─ scenes
│  │  │  │  ├─ World.jsx
│  │  │  │  └─ World.module.css
│  │  │  └─ staging
│  │  │     └─ Staging.jsx
│  │  └─ utils
│  │     └─ CameraLogger.jsx
│  └─ stores
│     └─ use-auth-store.js
├─ vercel.json
└─ vite.config.js

```

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create an issue or submit a pull request.

## License

This project is licensed under the GNU License. See the [LICENSE](LICENSE) file for details.