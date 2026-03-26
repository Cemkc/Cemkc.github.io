---
layout: post
title:  "Ovis Game Engine & Match Stranded"
date:   2026-03-24
---

[![Ovis Engine & Match Stranded Showcase](https://img.youtube.com/vi/0z34pRebRAY/maxresdefault.jpg)](https://www.youtube.com/watch?v=0z34pRebRAY)
*Click the image above to watch the full technical breakdown and Unity engine comparison.*

## 📌 Project Overview
**Match Stranded** is a complete Match-2 puzzle game developed entirely from scratch using my own custom C++ framework, the **Ovis Engine**. 

Rather than relying on off-the-shelf tools like Unity's 2D renderer, I built Ovis Engine to deepen my expertise in low-level graphics programming, linear algebra, and engine architecture. The engine abstracts OpenGL primitives into a robust, object-oriented API, proving its viability by successfully handling the complete game logic, rendering loop, and input systems required for a commercial-style puzzle game.

## 🛠️ Tech Stack
* **Language:** C++
* **Graphics API:** OpenGL / GLSL
* **Mathematics:** GLM (OpenGL Mathematics)
* **Windowing & Input:** GLFW
* **Extension Loader:** GLAD
* **Build System:** Premake

## 🚀 Technical Highlights & Engine Architecture

### High-Performance Batch Rendering
In the initial development phase, issuing individual draw calls for every tile on the grid caused significant CPU overhead. To optimize the rendering pipeline:
* Implemented a **Batch Rendering** system that packs all quad vertex data into a single Vertex Buffer Object (VBO) in VRAM.
* Eliminated the bottleneck of sending uniform data per object each frame.
* Scaled rendering performance massively, increasing the framerate from ~300 FPS to over 700 FPS by rendering the entire tilemap in a single draw call.

### Custom Coordinate Space & Raycasting Systems
Without a built-in physics engine to handle mouse-click collisions, I engineered a custom raycasting system utilizing complex matrix inversion:
* **Coordinate Conversion Pipeline:** Captured raw screen-space mouse coordinates, converted them to Normalized Device Coordinates (NDC), and multiplied them by the inverse of the View and Projection matrices to accurately determine the exact World Space position.
* **Local Space Bounds Checking:** To handle collision detection on scaled or translated quads, the raycast is multiplied by the inverse of the Entity's Model Matrix. This translates the ray into the quad's local space, allowing for hyper-accurate, computationally cheap AABB (Axis-Aligned Bounding Box) intersection tests.

### Matrix Transformations & Camera Architecture
* Utilized **GLM** to architect a robust transform hierarchy, allowing Game Entities to store and calculate their own Model matrices (Translation * Rotation * Scale).
* Engineered a custom Orthographic Camera system that handles dynamic aspect ratio adjustments, scaling, and view transformations by pushing inverse translation matrices to the GPU shader pipeline.

## 💡 Why I Built This
Developing Ovis Engine alongside Match Stranded was a deliberate exercise in removing the "magic" of modern game engines. It required solving fundamental graphics challenges—like writing custom GLSL shaders, handling state machine context via GLFW, and orchestrating rendering pipelines—from the ground up. The result is a highly performant, scalable foundation that demonstrates my capability to write hardware-efficient C++ code.

## 🔗 Links
* **Source Code:** [View the Repository](https://github.com/Cemkc/MatchStranded)
* **LinkedIn:** [Cem Koç](https://www.linkedin.com/in/cem-ko%C3%A7/)
