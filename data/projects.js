// All site content lives here.
// To add a new area: add an object to `areas`. A tab appears for it automatically.
// To add a project: add an object to that area's `projects` list.
//
// Card fields:
//   id           short unique slug, used for the project page: project.html?id=<id>
//   title, year, team ("Solo" or team/studio name), role (optional)
//   summary      one or two sentences
//   highlights   2-4 short bullet points
//   tech         list of tags
//   metric       optional { value, label } shown on the card, e.g. a real number from the project
//   youtube      optional YouTube video id; the card shows its thumbnail and links to the video
//   autoplay     true plays the YouTube video muted and looping, like a GIF
//   poster       optional image shown before an autoplaying video loads
//   image        optional path to a screenshot in assets/img (used when there is no video)
//   links        list of { label, url }
//   featured     true makes the card span the full row
//
// Project page fields (all optional, under `page`):
//   intro        a paragraph about what you did on the project
//   facts        list of { label, value } shown beside the intro (duration, team size, ...)
//   sections     list of { title, text, bullets, code: { file, lang, source }, image, imageAlt, caption }
//   gallery      list of { src, alt } images shown at the end
//   lessons      a paragraph on what you learned or would do differently
//   note         a short line shown in a muted box (e.g. why there is no code)

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
          id: "gemmy-gems",
          title: "Gemmy Gems",
          year: "2025–now",
          team: "Bosphorus Games",
          role: "Lead Programmer",
          featured: true,
          summary:
            "A commercial PC game about digging up stones, working them in a workshop and selling them to customers. I lead the programming team and set the code standards that let several programmers add features without stepping on each other.",
          highlights: [
            "State machine framework (hierarchical state machine and pushdown automaton) that runs the game flow and every workshop tool",
            "Workshop tool system: cutting, molding, scale, scanner and UV tools, each with its own states",
            "Procedural gem meshes from convex hulls, with mesh clipping for the cutting mechanic",
            "Grid system, outline and gem shaders (HLSL / Shader Graph), save/load and tool upgrades"
          ],
          tech: ["Unity", "C#", "HSM", "HLSL", "Shader Graph", "Team lead"],
          metric: { value: "130+", label: "commits of ~350" },
          links: [{ label: "Bosphorus Games", url: "https://www.linkedin.com/company/bosphorus-games/" }],
          page: {
            intro:
              "I have been Lead Programmer at Bosphorus Games since the project started in autumn 2025. Besides leading the programming team, I wrote the systems the rest of the game is built on: the state machine framework, the grid, the workshop tools and the procedural gem meshes. Other programmers built features such as gravel collection, land selection and the shop on top of them.",
            facts: [
              { label: "Role", value: "Lead Programmer" },
              { label: "Started", value: "Autumn 2025" },
              { label: "My commits", value: "130+ of ~350" },
              { label: "Platform", value: "PC (Unity)" }
            ],
            sections: [
              {
                title: "State machine framework",
                text:
                  "Most of the game's logic is a question of which mode the player is in, so I wrote a hierarchical state machine with a builder to define state trees in code. It drives the top-level game flow (running, paused, appraisal, refining, using a tool) and runs inside each workshop tool. For flows that stack and unwind, such as nested screens, I added a pushdown automaton. New screens and tools plug in as states instead of adding more flags to existing scripts."
              },
              {
                title: "Workshop tool system",
                text:
                  "The workshop is where players examine and work their gems. I built the tool layer that all workshop machines share.",
                bullets: [
                  "A tool manager and a shared tool driver. The cutting, molding, scale, scanner and UV tools each have their own root state and exit conditions.",
                  "Tool upgrades and a save/load system, starting with the hand scoop.",
                  "Camera manager and workshop navigation between machines."
                ]
              },
              {
                title: "Procedural gems",
                text:
                  "Every gem is generated, so no two look the same. I generate gem meshes from the convex hull of seeded random points on a sphere (with the MIConvexHull library), so the same seed always gives the same gem, and wrote a mesh clipper that slices them for the cutting mechanic. Meshes can be exported to FBX so artists can use them as a base."
              },
              {
                title: "Grid and shaders",
                bullets: [
                  "Workbench grid with navigation, drag-and-drop placement, cell highlighting and lock switching.",
                  "Outline shader in HLSL and an edge outline subgraph in Shader Graph, plus the gem shader and the color spectrum shader for the appraisal tool."
                ]
              },
              {
                title: "Leading the programmers",
                text:
                  "I set the code structure and standards, split the work, and run the branch and merge flow between the programmers' feature branches and the build branch."
              }
            ],
            note: "Gemmy Gems is in development and closed source, so this page shows no code or footage yet."
          }
        },
        {
          id: "nana",
          title: "Nana: Into the Banana",
          year: "2025",
          featured: true,
          team: "Futuregames (team)",
          role: "Lead Programmer",
          summary:
            "A fast, chaotic, skill-based action game in bright yellow. Made in one month by a team of designers, artists, programmers and producers, and judged by developers from studios including CD Projekt Red and 11 bit studios.",
          highlights: [
            "Led the three-person programming team",
            "Combat system programmer: designed and built the combat system and core mechanics"
          ],
          tech: ["Unity", "C#", "Combat systems"],
          metric: { value: "1st", label: "place of 8 games" },
          youtube: "t95-fin-uik",
          autoplay: true,
          poster: "https://img.itch.zone/aW1nLzI1NzE5MDcwLnBuZw==/original/Gjlqhf.png",
          imageAlt: "Nana: Into the Banana key art",
          links: [{ label: "Play on itch.io", url: "https://futuregames.itch.io/nanaintothebanana" }],
          page: {
            intro:
              "Futuregames projects run for one month with a full team of designers, artists, programmers and producers. On Nana: Into the Banana I was Lead Programmer, working with two gameplay programmers, and I wrote the combat system. The game took 1st place out of 8.",
            facts: [
              { label: "Role", value: "Lead Programmer, combat" },
              { label: "Duration", value: "1 month" },
              { label: "Programmers", value: "3" },
              { label: "Result", value: "1st of 8" }
            ],
            sections: [
              {
                title: "Leading programming",
                text:
                  "I led the three programmers on the team and set up the code structure for the project's core mechanics so they could scale as the game grew during the month."
              },
              {
                title: "Combat system",
                text:
                  "As combat system programmer, I designed and built the combat system and the core mechanics around it."
              }
            ],
            gallery: [
              { src: "https://img.itch.zone/aW1hZ2UvNDI4NDUyOS8yNTY1NjA0NC5wbmc=/original/y3Q0ZY.png", alt: "Nana: Into the Banana gameplay" },
              { src: "https://img.itch.zone/aW1hZ2UvNDI4NDUyOS8yNTY1NjAxNi5wbmc=/original/SoBJUU.png", alt: "Nana: Into the Banana gameplay" }
            ]
          }
        },
        {
          id: "polar-protocol",
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
          links: [{ label: "Play on itch.io", url: "https://futuregames.itch.io/thepolarprotocol" }],
          page: {
            intro:
              "A one-month Futuregames production where I was one of two programmers. I owned the enemy AI. The game took 2nd place out of 8.",
            facts: [
              { label: "Role", value: "AI programmer" },
              { label: "Duration", value: "1 month" },
              { label: "Programmers", value: "2" },
              { label: "Result", value: "2nd of 8" }
            ],
            sections: [
              {
                title: "Enemy AI",
                text:
                  "I built the enemy AI on Unity's behavior tree package and extended it to support more complex agent logic."
              }
            ],
            gallery: [
              { src: "https://img.itch.zone/aW1hZ2UvNDA3NDc2OS8yNDMwNTkwOC5qcGc=/original/b5FVvr.jpg", alt: "The Polar Protocol gameplay" },
              { src: "https://img.itch.zone/aW1hZ2UvNDA3NDc2OS8yNDMwNTkzNy5qcGc=/original/kQmG3L.jpg", alt: "The Polar Protocol gameplay" }
            ]
          }
        },
        {
          id: "mavata",
          title: "Project Mavata",
          year: "2023–2024",
          team: "GoKo Studios",
          role: "Co-founder & programmer",
          summary:
            "A 2.5D fighting game from the studio I co-founded. I led a 5-person team and pitched the studio into a one-year incubation at BUG Lab TEKMER.",
          highlights: [
            "Fighter state machine, combo system and cancellable chain actions",
            "Node-based Fighter Blueprint editor built on Unity's GraphView",
            "Behavior-tree AI opponents with difficulty settings",
            "Touch gesture input ($1 / $Q recognizers) and Netcode for GameObjects"
          ],
          tech: ["Unity", "C#", "HFSM", "Netcode", "Blender"],
          metric: { value: "100+", label: "commits of 190" },
          links: [{ label: "Source", url: "https://github.com/GoKo-Studios/ProjectMavata" }],
          page: {
            intro:
              "I co-founded GoKo Studios with friends from university and led a 5-person team on Project Mavata, a 2.5D fighting game for mobile. I pitched the studio to BUG Lab TEKMER, Turkey's best-known game incubator, and we got a one-year incubation. On the code side, two of us wrote the game, and I made over half of the commits.",
            facts: [
              { label: "Role", value: "Co-founder, programmer" },
              { label: "Duration", value: "Feb 2023 – Jun 2024" },
              { label: "Team", value: "5 people, 2 programmers" },
              { label: "My commits", value: "100+ of 190" }
            ],
            sections: [
              {
                title: "Fighter state machine and combos",
                text:
                  "Fighters run on a hierarchical state machine with root states and sub-states, which I wrote together with the other programmer. On top of it I built the combo system and an action system with chain actions, cancellable actions (including dash cancel) and double inputs."
              },
              {
                title: "Fighter Blueprint editor",
                text:
                  "To let designers build move sets without code, I wrote a node-based editor on Unity's GraphView. A Fighter Blueprint is an asset whose nodes are actions and whose edges are the chains between them.",
                code: {
                  file: "EditableFighterActions/Editor/FighterBlueprintView.cs (excerpt)",
                  lang: "csharp",
                  source: `public class FighterBlueprintView : GraphView
{
    FighterBlueprint blueprint;
    public Action<BPNode> OnNodeSelected;

    public FighterBlueprintView(){
        Insert(0, new GridBackground());

        this.AddManipulator(new ContentZoomer());
        this.AddManipulator(new ContentDragger());
        this.AddManipulator(new SelectionDragger());
        this.AddManipulator(new RectangleSelector());
    }

    internal void PopulateView(FighterBlueprint blueprint)
    {
        this.blueprint = blueprint;

        graphViewChanged -= OnGraphViewChanged;
        DeleteElements(graphElements);
        graphViewChanged += OnGraphViewChanged;

        // To populate nodes
        blueprint.nodes.ForEach(n => CreateNodeView(n));
        ...`
                }
              },
              {
                title: "AI opponents",
                text:
                  "I wrote the fighter AI: first my own behavior tree base, then a version on the Kiwi behavior tree library. It has difficulty settings, random attacks in neutral, consecutive attacks and defensive actions."
              },
              {
                title: "Input and networking",
                bullets: [
                  "Reworked the input system around a new script communication protocol, and moved the AI onto the same input path as the player.",
                  "Touch controls: gestures recognized with the $1 and $Q recognizers (with rotation variance), and walking moved to a drag on the left side of the screen.",
                  "Online play with Netcode for GameObjects, including the server protocol, plus a tick-based simulator that records inputs and fighter state as groundwork for rollback."
                ]
              },
              {
                title: "Running the studio",
                text:
                  "I managed the team's tasks and timelines in Notion and ClickUp. When we had no animator, I learned Blender and made the in-game animations myself."
              }
            ]
          }
        },
        {
          id: "match-stranded-unity",
          title: "Match Stranded (Unity)",
          year: "2024",
          team: "Solo",
          summary: "A Match-2 puzzle game built in one week as a case study, with a custom level editor at its core.",
          highlights: [
            "Custom Unity editor window for designing levels on a visual grid",
            "Switchable object generation: dynamic spawning or object pooling",
            "Tile animations defined as ScriptableObjects with AnimationCurves"
          ],
          tech: ["Unity", "C#", "Editor window", "Object pooling"],
          image: "assets/img/matchstranded-level-editor.png",
          imageAlt: "Custom Unity level editor window showing an 8 by 8 grid of tiles",
          links: [{ label: "Source", url: "https://github.com/Cemkc/MatchStranded-Unity" }],
          page: {
            intro:
              "I built this Match-2 game in one week (11–17 November 2024) as a case study. I wrote all of it: grid, tiles, special objects, level goals, UI, audio and a level editor. I later rebuilt the same game in C++ on my own engine.",
            facts: [
              { label: "Role", value: "Solo" },
              { label: "Duration", value: "1 week" },
              { label: "Engine", value: "Unity" }
            ],
            sections: [
              {
                title: "Level editor window",
                text:
                  "Easy level design matters most for a game like this in the long run, so I built a custom editor window. It edits a Grid Blueprint ScriptableObject on a visual grid, so a level can be laid out tile by tile.",
                image: "assets/img/matchstranded-level-editor.png",
                imageAlt: "Level editor window with an 8 by 8 grid of tiles labeled by type",
                caption: "The level editor window editing an 8×8 Grid Blueprint."
              },
              {
                title: "Tiles and objects",
                bullets: [
                  "Connected-tile detection, tile drop and refill.",
                  "Special objects: rockets that can trigger each other, ducks, balloons and other hitable tiles.",
                  "Two interchangeable generators: dynamic spawning, or an object pool that pre-creates objects at level start.",
                  "Tile movement defined as ScriptableObjects with AnimationCurves, reused for falling and flying to the goal."
                ]
              }
            ],
            lessons:
              "Tile objects inherit from a TileObject base class that does not cover every behavior, so using them needs type casts. In the Tile class I went the other way and put more into the base class, which leaves some subclasses with empty methods. With more time I would extend the level editor to configure falling objects, multi-select tiles and show tile images."
          }
        },
        {
          id: "magara-jams",
          title: "Magara Jam 4 & 5",
          year: "2022",
          team: "GoKo Studios (jam team)",
          summary: "Two game jam entries made with the GoKo Studios team in a few days each.",
          highlights: ["Gameplay programming under jam time limits", "Most active committer on both projects"],
          tech: ["Unity", "C#", "Game jam"],
          links: [
            { label: "Jam 4", url: "https://github.com/GoKo-Studios/MagaraJam4" },
            { label: "Jam 5", url: "https://github.com/GoKo-Studios/MagaraJam5" }
          ],
          page: {
            intro:
              "I entered Magara Jam twice with the GoKo Studios team and made the most commits on both entries.",
            facts: [
              { label: "Duration", value: "A few days each" },
              { label: "Year", value: "2022" }
            ],
            sections: [
              {
                title: "Magara Jam 4 (February 2022)",
                text: "I wrote the enemy side: mob attacks, health and damage, and a stun mechanic. I also set up character animations and fixed player bugs."
              },
              {
                title: "Magara Jam 5 (September 2022)",
                text: "I wrote the player character: movement, dash, ground smash, skills with cooldowns and the arrow attack. I also added the camera manager and the audio manager."
              }
            ]
          }
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
          id: "match-stranded-ovis",
          title: "Match Stranded on Ovis Engine",
          year: "2024–2025",
          team: "Solo",
          featured: true,
          summary:
            "A complete Match-2 puzzle game written from scratch in C++ on my own engine, with no off-the-shelf renderer.",
          highlights: [
            "Batch renderer that draws the whole tilemap in one draw call from a single VBO",
            "Mouse picking through inverse view/projection and model matrices, then bounds tests in local space",
            "Orthographic camera that handles aspect ratio and scaling",
            "Transform hierarchy built on GLM"
          ],
          tech: ["C++", "OpenGL", "GLSL", "GLM", "GLFW", "GLAD"],
          metric: { value: "300 → 700+", label: "FPS after batching" },
          youtube: "0z34pRebRAY",
          links: [
            { label: "Watch", url: "https://www.youtube.com/watch?v=0z34pRebRAY" },
            { label: "Game source", url: "https://github.com/Cemkc/MatchStranded" }
          ],
          page: {
            intro:
              "After building Match Stranded in Unity, I rebuilt it in C++ on Ovis, my own engine, to remove the engine's \"magic\" and do the rendering, picking and game loop myself. Everything here is my own code apart from the libraries listed.",
            facts: [
              { label: "Role", value: "Solo" },
              { label: "Duration", value: "Sep 2024 – Feb 2025" },
              { label: "Result", value: "300 → 700+ FPS" }
            ],
            sections: [
              {
                title: "Batch rendering",
                text:
                  "My first renderer issued one draw call per tile and sent uniforms per object, and the CPU overhead showed. I replaced it with a batch renderer that writes every quad's vertices into one dynamic vertex buffer, binds textures to slots, and draws the whole tilemap with a single indexed draw call. The frame rate went from about 300 to over 700 FPS. I also added render statistics and profiling to measure it."
              },
              {
                title: "Picking without a physics engine",
                text:
                  "Clicking a tile needs a ray from the mouse into the world. I convert screen coordinates to normalized device coordinates, unproject them with the inverse view-projection matrix, then move the ray into each entity's local space with the inverse model matrix. A bounds check there works no matter how the quad is scaled or moved.",
                code: {
                  file: "Ovis/src/Ovis/Physics/Ray.cpp (inside Ray::Cast)",
                  lang: "cpp",
                  source: `glm::mat4 transInverse = glm::inverse(transform.GetTransformationMatrix());
glm::vec3 localOrigin = transInverse * glm::vec4(ray.m_Origin, 1.0f);
glm::vec3 localDirection = glm::normalize(transInverse * glm::vec4(ray.m_Direction, 0.0f));

// Ray-plane intersection (Z = 0 in local space)
if (glm::abs(localDirection.z) < 1e-6) continue; // Ray is parallel to the plane

float t = -localOrigin.z / localDirection.z;
if (t < 0) continue; // Intersection behind the ray

glm::vec3 localHitPoint = localOrigin + t * localDirection;

// Check if the point is within the quad bounds
glm::vec2 halfSize = glm::vec2(1.0f) * 0.5f;
if (localHitPoint.x >= -halfSize.x && localHitPoint.x <= halfSize.x &&
    localHitPoint.y >= -halfSize.y && localHitPoint.y <= halfSize.y)
{
    hitEntities.push_back(entity);
    rayHit = true;
}`
                }
              },
              {
                title: "The game on top",
                bullets: [
                  "Connected-tiles algorithm, tile refill and fall animations at a constant speed.",
                  "Rockets, ducks, bottles and the other special tiles, with an event system for the duck.",
                  "Orthographic camera that keeps the map centered and handles aspect ratio changes.",
                  "Custom GLSL shaders for the batch, flat color and snapping passes."
                ]
              }
            ]
          }
        },
        {
          id: "octree",
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
          ],
          page: {
            intro:
              "I built this in one week (20–26 August 2024) to answer a case-study question: how do you cut down distance checks in a densely populated 3D scene? The app renders the same scene with a brute-force check or with an octree, and you can switch between them at runtime.",
            facts: [
              { label: "Role", value: "Solo" },
              { label: "Duration", value: "1 week" },
              { label: "Stack", value: "C++, OpenGL, ImGui" }
            ],
            sections: [
              {
                title: "Octree",
                text:
                  "A templated octree splits space into 8 child boxes once a node holds more objects than its capacity. Only objects in the camera's node and the nodes next to it run their distance check, instead of every object in the scene.",
                code: {
                  file: "OpenGL_Optimization/src/Octree.h",
                  lang: "cpp",
                  source: `void Subdivide() {
    glm::vec3 newHalfSize = m_Bounds.halfSize / 2.0f;
    glm::vec3 offset[8] = { /* the 8 child octants */ };

    for (int i = 0; i < 8; ++i) {
        BoundingBox childBox{ m_Bounds.center + offset[i], newHalfSize };
        m_Children[i] = std::make_unique<Octree<T>>(childBox, m_Capacity);

        std::vector<OctreeData> objectData;
        for (int j = 0; j < m_Objects.size(); j++) {
            if (childBox.containsPoint((m_Objects[j].position))) {
                objectData.push_back(m_Objects[j]);
            }
        }
        m_Children[i]->m_Objects = objectData;
    }

    m_Objects.clear();
    m_Divided = true;
}`
                }
              },
              {
                title: "Making the benchmark fair",
                bullets: [
                  "Each active object runs a 10,000-iteration sqrt loop in its update, so the test is CPU-bound and measures the partitioning, not the GPU.",
                  "Objects are colored by state: red when culled, yellow when checking distance but out of range, blue when within the camera's radius.",
                  "An ImGui menu sets the number of objects, the algorithm (brute force or octree) and how objects are spawned."
                ]
              },
              {
                title: "Renderer",
                text: "A small OpenGL layer I wrote for the app: vertex arrays, index buffers, shaders, textures and error handling."
              }
            ]
          }
        },
        {
          id: "vampire-survivors-ecs",
          title: "Vampire Survivors 3D (ECS)",
          year: "2025",
          team: "Solo",
          summary:
            "A 3D horde-survival game. The course asked for standard C#; I built it on Unity ECS/DOTS instead to learn data-oriented design.",
          highlights: [
            "Entities, IComponentData and ISystem instead of MonoBehaviours",
            "Burst-compiled systems, with movement and weapons running as parallel jobs",
            "Spawning, damage and XP systems built to scale to large enemy counts"
          ],
          tech: ["Unity DOTS", "C#", "Burst", "Job System"],
          youtube: "fmzjpi9xANs",
          links: [
            { label: "Watch", url: "https://www.youtube.com/watch?v=fmzjpi9xANs" },
            { label: "Source", url: "https://github.com/Cemkc/VampireSurvivors_3D_Clone_ECS" }
          ],
          page: {
            intro:
              "The assignment was a standard C# game. A horde game is the best case for data-oriented design, so I taught myself Unity ECS and built the whole game on it, from movement to the damage numbers.",
            facts: [
              { label: "Role", value: "Solo" },
              { label: "Duration", value: "Sep – Dec 2025" },
              { label: "Stack", value: "Unity Entities, Burst, Jobs, Physics" }
            ],
            sections: [
              {
                title: "Systems",
                text: "All gameplay runs in ISystem structs over IComponentData, with Burst compilation:",
                bullets: [
                  "Mob spawning, chasing, kamikaze units and an orbiting enemy that spirals in toward the player.",
                  "Weapons, weapon collision checks and mob health.",
                  "XP coins, level-ups and pixel-art damage digits that burst out of hit enemies.",
                  "Bridge systems that pass events from ECS to the GameObject UI (HUD, level-up menu, game over)."
                ]
              },
              {
                title: "Parallel jobs",
                text:
                  "The hottest loops, unit movement and weapons, run as IJobEntity jobs scheduled in parallel across cores.",
                code: {
                  file: "Assets/Scripts/ECS/Systems/UnitMoverSystem.cs (shortened)",
                  lang: "csharp",
                  source: `[BurstCompile]
public void OnUpdate(ref SystemState state)
{
    new UnitMoverJob { deltaTime = SystemAPI.Time.DeltaTime }.ScheduleParallel();
}

[BurstCompile]
public partial struct UnitMoverJob : IJobEntity
{
    public float deltaTime;

    public void Execute(ref LocalTransform localTransform, in UnitMover unitMover,
                        ref PhysicsVelocity physicsVelocity)
    {
        float3 moveDirection = unitMover.targetPosition - localTransform.Position;
        if (math.lengthsq(moveDirection) <= UnitMoverSystem.REACHED_TARGET_POSITION_DISTANCE_SQ)
        {
            physicsVelocity.Linear = float3.zero;
            return;
        }

        moveDirection = math.normalize(moveDirection);
        if (unitMover.LookAtTarget)
            localTransform.Rotation = math.slerp(localTransform.Rotation,
                quaternion.LookRotation(moveDirection, math.up()),
                deltaTime * unitMover.rotationSpeed);

        physicsVelocity.Linear = moveDirection * unitMover.moveSpeed;
    }
}`
                }
              }
            ],
            lessons:
              "Some systems still loop on the main thread inside a Burst-compiled OnUpdate. Moving the chase and orbit logic into parallel jobs as well is the next step."
          }
        },
        {
          id: "ovis-engine",
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
          links: [{ label: "Source", url: "https://github.com/Cemkc/OvisEngine" }],
          page: {
            intro:
              "I built Ovis to learn how a game engine is put together and how to manage a large C++ codebase. I followed TheCherno's Game Engine series for the foundations, then added what Match Stranded needed: batch rendering, game entities and raycasting.",
            facts: [
              { label: "Role", value: "Solo" },
              { label: "Duration", value: "Sep 2024 – Feb 2025" },
              { label: "Build", value: "Premake, static library" }
            ],
            sections: [
              {
                title: "How it grew",
                bullets: [
                  "September 2024: application and entry point, logging (spdlog), event system, Premake with precompiled headers, GLFW window events.",
                  "October–November 2024: layers and layer stack, Dear ImGui with docking, input tied into the event system, key codes.",
                  "December 2024: renderer abstraction (buffers, buffer layouts, vertex arrays), shaders loaded from file, shader library, textures, cameras and a camera controller, Renderer2D.",
                  "January 2025: batch renderer with textures, batch splitting and render statistics, performance profiling.",
                  "February 2025: game entities with transforms, and raycasting for picking."
                ]
              }
            ],
            note: "The engine runs Match Stranded. See that project for the batch renderer and picking in detail."
          }
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
          id: "scene-generation",
          title: "Scene Generation from Images",
          year: "2023",
          team: "Capstone project",
          summary:
            "Reads a sketch of buildings (position from squares, color, height from text) and builds a matching 3D scene in Unity.",
          highlights: ["OpenCV for shape and color detection", "pytesseract to read building heights", "Unity scene built from the extracted data"],
          tech: ["Python", "OpenCV", "Tesseract", "Unity"],
          image: "assets/img/capstone-scene.png",
          imageAlt: "Generated Unity scene with colored buildings of different heights on a grid",
          links: [{ label: "Source", url: "https://github.com/Cemkc/CAPSTONE" }],
          page: {
            intro:
              "My university capstone project. You draw buildings as colored squares with a number for the height, and the tool turns the drawing into a 3D scene in Unity.",
            facts: [
              { label: "Year", value: "2023" },
              { label: "Stack", value: "Python, OpenCV, Tesseract, Unity" }
            ],
            sections: [
              {
                title: "Image to data",
                text:
                  "A Python script thresholds the image, finds each square's contour and bounding box with OpenCV, samples its color and reads the height number inside it with pytesseract."
              },
              {
                title: "Data to scene",
                text:
                  "Unity runs the script as a separate process, reads its output and spawns a building per square with the right position, color and height.",
                image: "assets/img/capstone-input.png",
                imageAlt: "Input drawing with colored squares and height numbers",
                caption: "Input drawing. The generated scene is shown on the card."
              }
            ]
          }
        },
        {
          id: "p2p-file-transfer",
          title: "P2P File Transfer",
          year: "2022",
          team: "Solo",
          summary: "Upload and download files between peers on the same local network.",
          highlights: [],
          tech: ["Python", "Sockets"],
          links: [{ label: "Source", url: "https://github.com/Cemkc/p2p-file-transfer" }],
          page: {
            intro:
              "Each peer splits the files it hosts into chunks, announces them to the network, and downloads missing chunks from whichever peer has them.",
            sections: [
              {
                title: "How it works",
                bullets: [
                  "Hosted files are split into fixed-size chunk files.",
                  "Peers announce their available chunks over UDP broadcast every minute and listen for other peers' announcements on a separate thread.",
                  "Downloads request each chunk over a TCP connection from a peer that has it, then stitch the chunks back into the original file."
                ]
              }
            ]
          }
        },
        {
          id: "galactic-invasion",
          title: "Galactic Invasion",
          year: "2022",
          team: "Solo",
          summary: "A small space shooter written with Java's GUI toolkit, with a high-score table.",
          highlights: [],
          tech: ["Java", "Swing"],
          links: [{ label: "Source", url: "https://github.com/Cemkc/GalacticInvasion" }],
          page: {
            intro:
              "A small arcade shooter in plain Java, with no game engine. I wrote the game loop, rendering, input and menus myself.",
            sections: [
              {
                title: "What's inside",
                bullets: [
                  "A game loop on its own thread, drawing to an AWT Canvas with triple buffering.",
                  "Keyboard and mouse input, a main menu and game states.",
                  "Player, enemy mobs and a high-score table saved to disk."
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};
