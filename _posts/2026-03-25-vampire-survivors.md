---
layout: post
title:  "Vampire Survivors 3D Clone (Unity ECS)"
date:   2025-10-01
permalink: /vampire-survivors/
---

<iframe width="100%" height="400" src="https://www.youtube.com/embed/fmzjpi9xANs" title="Vampire Survivors ECS Showcase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 📌 Project Overview
This project is a 3D, top-down survival game engineered entirely using **Unity's Entity Component System (ECS)**. 

The goal of this project was to move away from traditional Object-Oriented Programming (OOP) and `MonoBehaviour` workflows, and instead implement strict **Data-Oriented Programming (DOP)** principles. By utilizing ECS, the Burst Compiler, and the C# Job System, the game is capable of rendering and updating massive, high-density enemy swarms simultaneously without dropping frame rates or bottlenecking the main thread.

## 🛠️ Tech Stack
* **Engine:** Unity 3D
* **Language:** C#
* **Architecture:** Entity Component System (ECS)
* **Optimization:** Burst Compiler, C# Job System

## 🚀 Technical Highlights

### Data-Oriented Architecture
* Stripped away the overhead of traditional GameObjects by converting the core game loop to utilize strictly packed data arrays (Components) and isolated logic processors (Systems).
* Significantly increased cache locality, allowing the CPU to process movement, collision, and health calculations for thousands of entities in a fraction of the time it would take a traditional `Update()` loop.

### High-Density Swarm Management
* Leveraged the C# Job System to multi-thread enemy AI and pathing calculations across all available CPU cores.
* Utilized the Burst Compiler to translate C# code into highly optimized native machine code, pushing the technical limits of how many active, hostile entities can exist on-screen simultaneously in a 3D environment.

## 🔗 Links
* **Source Code:** [View the Repository on GitHub](https://github.com/Cemkc/VampireSurvivors_3D_Clone_ECS)
