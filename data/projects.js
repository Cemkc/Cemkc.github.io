// All site content lives here.
// To add a new area: add an object to `areas`. A tab appears for it automatically.
// To add a project: add an object to that area's `projects` list.
//
// Project fields:
//   title, year, team ("Solo" or team/studio name), role (optional)
//   summary      one or two sentences
//   highlights   2-4 short bullet points
//   tech         list of tags
//   metric       optional { value, label } shown on the card, e.g. a real number from the project
//   youtube      optional YouTube video id; the card shows its thumbnail and links to the video
//   image        optional path to a screenshot in assets/img (used when there is no video)
//   links        list of { label, url }
//   featured     true makes the card span the full row

window.PORTFOLIO = {
  profile: {
    name: "Cem Koç",
    role: "Game & Graphics Programmer · Warsaw, Poland",
    intro:
      "I build gameplay systems, the editor tools that make them easy to design for, and the rendering code underneath. Lead Programmer at Bosphorus Games and studying Game Programming at Futuregames Warsaw.",
    links: [
      { label: "GitHub", url: "https://github.com/Cemkc" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/cem-ko%C3%A7/" },
      { label: "YouTube", url: "https://www.youtube.com/@cemkoc-351" },
      { label: "ArtStation", url: "https://www.artstation.com/gem351" }
    ],
    email: "cemkoc132@gmail.com", // shown in the header when set
    cv: null     // e.g. "assets/Cem-Koc-CV.pdf"; shown as a button when set
  },

  areas: [
    {
      id: "game-dev",
      label: "Game Development",
      tone: "amber",
      pitch:
        "Gameplay programming and tools in Unity and C#. I like systems that stay readable as a game grows: hierarchical state machines for game flow and characters, custom editor windows that let designers build content without touching code, and data set up in ScriptableObjects.",
      skills: ["Unity", "C#", "Hierarchical state machines", "Custom editor tools", "ScriptableObject workflows", "Behavior trees", "HLSL / Shader Graph", "Netcode", "Object pooling"],
      projects: [
        {
          title: "Gemmy Gems",
          year: "2025–now",
          team: "Bosphorus Games",
          role: "Lead Programmer",
          featured: true,
          summary:
            "A commercial PC game about digging up stones, working them in a workshop and selling them to customers. I lead the programming team and set the code standards that let several programmers add features without stepping on each other.",
          highlights: [
            "Workshop tool suite (cutting, molding, scale, scanner, UV light), each tool driven by its own state machine",
            "Hierarchical state machine for game states, plus a pushdown automaton for stacked UI and flow",
            "Editor tooling for the team: gravel debugger, land selection tools, tutorial debugger",
            "Technical art: custom shaders in Shader Graph and HLSL"
          ],
          tech: ["Unity", "C#", "HSM", "HLSL", "Shader Graph", "Team lead"],
          metric: { value: "130+", label: "commits of ~350" },
          links: [{ label: "Bosphorus Games", url: "https://www.linkedin.com/company/bosphorus-games/" }]
        },
        {
          title: "Nana: Into the Banana",
          year: "2025",
          featured: true,
          team: "Futuregames (team)",
          role: "Programming lead",
          summary:
            "A fast, chaotic, skill-based action game in bright yellow. Made in one month by a team of designers, artists, programmers and producers, and judged by developers from studios including CD Projekt Red and 11 bit studios.",
          highlights: [
            "Led programming on the team",
            "Combat system programmer: designed and built the combat system and core mechanics"
          ],
          tech: ["Unity", "C#", "Combat systems"],
          metric: { value: "1st", label: "place of 8 games" },
          youtube: "t95-fin-uik",
          autoplay: true,
          poster: "https://img.itch.zone/aW1nLzI1NzE5MDcwLnBuZw==/original/Gjlqhf.png",
          imageAlt: "Nana: Into the Banana key art",
          links: [{ label: "Play on itch.io", url: "https://futuregames.itch.io/nanaintothebanana" }]
        },
        {
          title: "Polar Protocol",
          year: "2025",
          team: "Futuregames (team)",
          role: "AI programmer",
          summary:
            "A short, fast top-down arcade shooter: a robotic snowman fights Heat Inc. to save the polar ice caps. One of two programmers on a one-month team production.",
          highlights: [
            "Enemy AI built on Unity's behavior tree package, extended for complex agent logic"
          ],
          tech: ["Unity", "C#", "Behavior trees", "Game AI"],
          metric: { value: "2nd", label: "place of 8 games" },
          youtube: "GdHAlfl6nn0",
          autoplay: true,
          poster: "https://img.itch.zone/aW1nLzMwMDU5MzEyLnBuZw==/original/pfs49r.png",
          imageAlt: "The Polar Protocol key art",
          links: [{ label: "Play on itch.io", url: "https://futuregames.itch.io/thepolarprotocol" }]
        },
        {
          title: "Project Mavata",
          year: "2023–2024",
          team: "GoKo Studios",
          role: "Co-founder & programmer",
          summary:
            "A 2.5D fighting game from the studio I co-founded. I led a 5-person team and pitched the studio into a one-year incubation at BUG Lab TEKMER.",
          highlights: [
            "Fighter logic built on a hierarchical FSM with a combo system and hitboxes",
            "Touch gesture recognition ($1 / $Q recognizers) plus an editor for authoring strokes",
            "Editor tooling for fighters and an animation preview window",
            "Netcode work on the server protocol, plus custom 3D animations made in Blender"
          ],
          tech: ["Unity", "C#", "HFSM", "Netcode", "Blender"],
          metric: { value: "100", label: "commits of 190" },
          links: [{ label: "Source", url: "https://github.com/GoKo-Studios/ProjectMavata" }]
        },
        {
          title: "Match Stranded (Unity)",
          year: "2024–2025",
          team: "Solo",
          summary: "A Match-2 puzzle game built as a case study, with a custom level editor at its core.",
          highlights: [
            "Custom Unity editor window for designing levels on a visual grid",
            "Switchable object generation: dynamic spawning or object pooling",
            "Tile animations defined as ScriptableObjects with AnimationCurves"
          ],
          tech: ["Unity", "C#", "Editor window", "Object pooling"],
          image: "assets/img/matchstranded-level-editor.png",
          imageAlt: "Custom Unity level editor window showing an 8 by 8 grid of tiles",
          links: [{ label: "Source", url: "https://github.com/Cemkc/MatchStranded-Unity" }]
        },
        {
          title: "Magara Jam 4 & 5",
          year: "2022",
          team: "GoKo Studios (jam team)",
          summary: "Two game jam entries made with the GoKo Studios team in a weekend each.",
          highlights: ["Gameplay programming under jam time limits", "Most active committer on both projects"],
          tech: ["Unity", "C#", "Game jam"],
          links: [
            { label: "Jam 4", url: "https://github.com/GoKo-Studios/MagaraJam4" },
            { label: "Jam 5", url: "https://github.com/GoKo-Studios/MagaraJam5" }
          ]
        }
      ]
    },

    {
      id: "graphics",
      label: "Graphics Programming",
      tone: "cyan",
      pitch:
        "I want to know what the engine is doing for me. I wrote a 2D engine in C++ and OpenGL and shipped a full game on it, benchmarked spatial partitioning in a 3D scene, and rebuilt a horde game in Unity DOTS to keep thousands of entities at frame rate.",
      skills: ["C++", "OpenGL / GLSL", "GLM", "Batch rendering", "Spatial partitioning", "Unity ECS / DOTS", "Burst & Jobs", "Premake"],
      projects: [
        {
          title: "Match Stranded on Ovis Engine",
          year: "2024–2025",
          team: "Solo",
          featured: true,
          summary:
            "A complete Match-2 puzzle game written from scratch in C++ on my own engine, with no off-the-shelf renderer.",
          highlights: [
            "Batch renderer that draws the whole tilemap in one draw call from a single VBO",
            "Mouse picking through inverse view/projection and model matrices, then AABB tests in local space",
            "Orthographic camera that handles aspect ratio and scaling",
            "Transform hierarchy built on GLM"
          ],
          tech: ["C++", "OpenGL", "GLSL", "GLM", "GLFW", "GLAD"],
          metric: { value: "300 → 700+", label: "FPS after batching" },
          youtube: "0z34pRebRAY",
          links: [
            { label: "Watch", url: "https://www.youtube.com/watch?v=0z34pRebRAY" },
            { label: "Game source", url: "https://github.com/Cemkc/MatchStranded" }
          ]
        },
        {
          title: "Octree Spatial Partitioning",
          year: "2024",
          team: "Solo",
          summary:
            "A C++/OpenGL benchmark that compares brute-force distance checks against an octree in a dense 3D scene, switchable at runtime.",
          highlights: [
            "Templated octree that subdivides space into 8 children when a node fills up",
            "Heavy per-object CPU work so the test measures the CPU, not the GPU",
            "Color-coded debug view of culled, active and in-range objects"
          ],
          tech: ["C++", "OpenGL", "GLM", "Dear ImGui"],
          youtube: "ZJ1vbPq08L4",
          links: [
            { label: "Watch", url: "https://www.youtube.com/watch?v=ZJ1vbPq08L4" },
            { label: "Source", url: "https://github.com/Cemkc/Octree_OpenGL" }
          ]
        },
        {
          title: "Vampire Survivors 3D (ECS)",
          year: "2025",
          team: "Solo",
          summary:
            "A 3D horde-survival game. The course asked for standard C#; I built it on Unity ECS/DOTS instead to learn data-oriented design.",
          highlights: [
            "Entities, IComponentData and ISystem instead of MonoBehaviours",
            "Burst-compiled jobs for movement, swarming and damage across many cores",
            "Spawning and damage systems built to scale to large enemy counts"
          ],
          tech: ["Unity DOTS", "C#", "Burst", "Job System"],
          youtube: "fmzjpi9xANs",
          links: [
            { label: "Watch", url: "https://www.youtube.com/watch?v=fmzjpi9xANs" },
            { label: "Source", url: "https://github.com/Cemkc/VampireSurvivors_3D_Clone_ECS" }
          ]
        },
        {
          title: "Ovis Engine",
          year: "2024–2025",
          team: "Solo",
          summary:
            "My C++ game engine, started from TheCherno's engine series and extended to run Match Stranded.",
          highlights: [
            "Renderer abstraction over OpenGL buffers, shaders and textures",
            "Layered application, event and input systems",
            "Premake build with GLFW, GLAD and Dear ImGui"
          ],
          tech: ["C++", "OpenGL", "Premake", "ImGui"],
          links: [{ label: "Source", url: "https://github.com/Cemkc/OvisEngine" }]
        }
      ]
    },

    {
      id: "other",
      label: "Other Projects",
      tone: "violet",
      pitch: "Work outside games: image processing, networking and smaller experiments.",
      skills: ["Python", "OpenCV", "Java", "Networking"],
      projects: [
        {
          title: "Scene Generation from Images",
          year: "2025",
          team: "Capstone project",
          summary:
            "Reads a sketch of buildings (position from squares, color, height from text) and builds a matching 3D scene in Unity.",
          highlights: ["OpenCV for shape and color detection", "pytesseract to read building heights", "Unity scene built from the extracted data"],
          tech: ["Python", "OpenCV", "Tesseract", "Unity"],
          image: "assets/img/capstone-scene.png",
          imageAlt: "Generated Unity scene with colored buildings of different heights on a grid",
          links: [{ label: "Source", url: "https://github.com/Cemkc/CAPSTONE" }]
        },
        {
          title: "P2P File Transfer",
          year: "2022",
          team: "Solo",
          summary: "Upload and download files between peers on the same local network.",
          highlights: [],
          tech: ["Python", "Sockets"],
          links: [{ label: "Source", url: "https://github.com/Cemkc/p2p-file-transfer" }]
        },
        {
          title: "Galactic Invasion",
          year: "2022",
          team: "Solo",
          summary: "A small space shooter written with Java's GUI toolkit, with a high-score table.",
          highlights: [],
          tech: ["Java", "Swing"],
          links: [{ label: "Source", url: "https://github.com/Cemkc/GalacticInvasion" }]
        }
      ]
    }
  ]
};
