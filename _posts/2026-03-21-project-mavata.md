---
layout: post
title:  "Project Mavata Dev Blog"
date:   2024-07-20
permalink: /project-mavata/
---

Hello, in this blog I will be talking about the technical details, challenges I faced and my insights on founding a game development venture based on the game that me and my team have been developing for over 1.5 years. Considering this was a team effort, I will primarily discuss the modules to which I made significant contributions.

## About Project Mavata

Project Mavata is a 2.5D Fighting Game exclusively designed for mobile platforms. Project Mavata utilizes the touch gesture feature of mobile screens and aims to present highly immersive gameplay. 

### Gameplay Video
<iframe width="100%" height="400" src="https://www.youtube.com/embed/yf4h-3U8xMc" title="Project Mavata Gameplay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

<div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 30px; margin-top: 30px;">
  <div style="flex: 1;">
    <h3 style="margin-top: 0;">Gesture based Input</h3>
    <p style="font-size: 0.9em; opacity: 0.9;">Touch gestures we use in Project Mavata are limited to basic gestures which are swipe, tap, hold and double variants of these. These gestures are not easier or consistent to perform but we think they are more immersive. We tried to find the balance while implementing this input method and create a great feeling input mechanism in general.</p>
  </div>
  
  <div style="color: #48C9B0; font-size: 28px; font-weight: bold; font-family: sans-serif; padding-top: 45px;">
    VS
  </div>
  
  <div style="flex: 1;">
    <h3 style="margin-top: 0;">Virtual Button based Input</h3>
    <p style="font-size: 0.9em; opacity: 0.9;">Virtual buttons are the most commonly used input method on mobile platforms. They mimic the buttons found on physical controller devices and bring them to the touchscreen. This makes virtual buttons responsive, easy to perform and consistent.</p>
  </div>
</div>

<div style="text-align: center; max-width: 600px; margin: 40px auto 0 auto;">
  <h3>Breaking the Formula</h3>
  <p style="font-size: 0.9em; opacity: 0.9;">Going back to the root of Fighting Games, the Arcade, we aim to capture the feeling of being the fighter itself. Instead of relying on button controls. Project Mavata makes full use of the mobile platform, favoring touch controls which offers a more immersive solution.</p>
</div>

<br>

### Screen Alignment

**Double touch interaction:** All of the actions that are listed on each side can be performed concurrently resulting in a different action.
*Examples: Double Hold = Block, Double Swipe Down = Grab*

![Screen Alignment](/assets/images/Project_Mavata_Controls.png)

**Left Side:** Left side of the screen is dedicated for actions that are more related with movement, change of position of the fighter.
*Examples: Drag Left = Walk Left, Swipe Right = Dash Right*

**Right Side:** Right side of the screen is dedicated for attack actions.
*Examples: Swipe Up = Uppercut, Tap = Direct Punch*

## Technical Details

### AI Solution
In a fighting game that also implements a single player experience AI is one of the most crucial development point. For the AI behaviour we needed an expandable, adaptable and readable model. Behavior Tree is a commonly used AI model when it comes to designing AI and it checks the criteria we defined for our model. So I implemented this technique to our AI related code.

![Fighter BT](/assets/images/Project_Mavata_BT.png)
*Image 1: Behaviour Tree UI in Unity Editor*

AI Behaviour Tree Editor allows us to create more complex and adjustable fighter behaviour using nodes and branches. Referring to Image 1; Red and Yellow nodes are logic nodes and they contain a fixed logic like logic gates. On the other hand Green boxes stand for behaviour nodes which are editable code containers. They contain the behaviour code of a fighter. Thus, Logic nodes, define the flow of decision making mechanism that is inside the behaviour nodes. 

### Creating Fighters
When working on a Fighting game we needed a fast and reusable way to create and edit fighters. We developed a code infrastructure that allows fighters' moves to be interchanged along with, any move to be easily removed from a fighter's move-set, and new moves to be seamlessly added. This system is supported by a UI. Additionally, we built a framework where the moves dictate the animation. Animation duration is adjusted by manipulating the animation speed to achieve the required timing, rather than the animation determining the move's duration. Consequently, we can create and modify fighters without writing extra code, using only the UI we developed. 

![Fighter Blueprint UI](/assets/images/Project_Mavata_Combo_Nodes.png)
*Image 2: Fighter Blueprint UI in Unity Editor (A section from a Fighter's move-set)*

### Netcode Solution
Fighting games is one of the game genre which do not tolerate input delay well. The whole gameplay concept is heavily relied on frame advantage and timing based counter play. When this is the case the network solution that a fighting game implement should be a strong one.

There is a netcode solution that heavily frame and timing sensitive game called rollback netcoding. What it essentially does is to try and make the game run on your local device with least possible dependency on the network. How it does that is by making assumptions on network input and if the assumption is wrong "rolling" the game back to the frame/state that the wrong network input is listened.

Rollback netcoding is not a must have if the project will not connect clients that are considerably far away from each other. So delay based netcode solution which offers an experience where, if the input has not reached to a client, the game freezes, can be considered if the matchmaking system will only match people that are within a close range to each other. Since the distance between clients are not above a certain threshold, server delay will not cause any freezes on the game. Lastly the trade-off between these two solutions besides from the gameplay experience is rollback netcode being harder to implement.

For Project Mavata we decided to implement rollback netcode but it was not our priority. So we tried to write our code as deterministic as possible to be able to implement rollback netcode in the future. As of the latest version, our project establishes communication between devices using Netcode For Gameobjects which is an official Unity package. Our netcode only sends input data which is suitable for rollback netcoding but the netcode development is still a work in progress and as of the latest version netcode solution is a delay based one. 

## State of the Project

Due to the inability of the development team to fill the gap in the art department over a span of 1.5 years, Project Mavata could not progress beyond a certain point. During this period, it expanded to up to 5 members and experienced its most productive phase; however, even during this peak period, it failed to secure a 3D animator. Animation being a crucial aspect in a fighting game, the absence of a 3D Animator significantly hindered the project's advancement. Project Mavata, couldn't have gone beyond being the project that got me into BUG Lab TEKMER's incubation program, and has now been shelved.

Here are the significant things I gained from this whole process:
* I learned many aspects of team and project management.
* Developing a project on a large scale advanced my coding style to be more manageable, scalable and readable.
* Due to our lack of animators, I learned a lot about animation and the Blender-Unity workflow to do animations myself.
* I presented the project at various events and had people test it. The feedback I received highlighted to me how crucial the testing phase of a project is.
* I took over 10 courses from BUG Lab TEKMER, primarily focused on project marketing and game development.

##### Thank you for reading.
