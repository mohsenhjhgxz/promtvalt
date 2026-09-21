export const samplePrompts = [
  {
    id: "vid-quantum-nanobots",
    domain: "video",
    title: "Quantum Nanocomputer Assembly",
    description: "Ultra-high-fidelity macro simulation of quantum nanobots wiring glowing circuits at sub-atomic scale with volumetric lighting and anamorphic lens flares.",
    model: "Runway Gen-3 Alpha / Sora",
    difficulty: "expert",
    copies: 3840,
    tags: ["Quantum", "Nanotech", "Macro", "60fps", "Anamorphic"],
    cameraDirectives: ["[Smooth Forward Dolly Zoom]", "[Macro 100mm]", "[Shallow Depth of Field]", "[Anamorphic 35mm Flare]", "[60fps Ultra Smooth]"],
    aspectRatio: "16:9",
    fps: "60fps",
    motionScore: "High Dynamic",
    promptText: "Cinematic hyper-realistic macro shot inside a quantum nano-computer, glowing [nanobot_color] and emerald nanobots assembling microscopic circuits, volumetric dust particles, anamorphic lens flare, shallow depth of field, 8k resolution, smooth forward dolly zoom, 60fps, [lighting_mood].",
    defaultVariables: {
      nanobot_color: "gold",
      lighting_mood: "subtle volumetric rays and cyan edge highlights"
    },
    systemInstructions: "Designed for Runway Gen-3 Alpha and OpenAI Sora. Use high motion slider (6-8) with camera path locked to forward dolly.",
    previewImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "vid-cyberpunk-fpv",
    domain: "video",
    title: "FPV Drone Dive: Rain-Slick Metropolis",
    description: "High-speed first-person aerial dive between towering neon skyscrapers with rain-slick asphalt reflections and flickering multi-language holograms.",
    model: "OpenAI Sora / Runway Gen-3",
    difficulty: "expert",
    copies: 5120,
    tags: ["FPV Drone", "Cyberpunk", "Rain", "Speed", "Metropolis"],
    cameraDirectives: ["[FPV Drone Dive]", "[Dynamic Motion Blur]", "[Wide Angle 14mm]", "[Roll & Pitch Drift]", "[Hyper-lapse Transition]"],
    aspectRatio: "16:9",
    fps: "60fps",
    motionScore: "Ultra High",
    promptText: "First-person FPV drone dive through a futuristic neon cyberpunk metropolis during [weather_condition], neon reflections on wet asphalt, holographic billboards flickering in [languages_script], cinematic motion blur, photorealistic, [speed_intensity].",
    defaultVariables: {
      weather_condition: "heavy torrential rain and rising steam",
      languages_script: "Japanese, Persian, and English scripts",
      speed_intensity: "supersonic dive with near-miss building edge pass"
    },
    systemInstructions: "Target Sora or Kling v1.5. Enable continuous perspective shifting. Specify motion vector: downward 45-degree angle.",
    previewImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "img-iridescent-beetle",
    domain: "image",
    title: "Iridescent Titanium Nano-Beetle",
    description: "Extreme macro photograph of an intricate robotic beetle crafted from polished titanium and optical glass with glowing nano-circuitry etched in its wings.",
    model: "Midjourney v6.1 / Flux.1 Schnell",
    difficulty: "intermediate",
    copies: 6420,
    tags: ["Macro", "Biomechanical", "Titanium", "Octane Render", "8K"],
    aspectRatio: "16:9",
    parameters: "--ar 16:9 --v 6.1 --style raw --stylize 350",
    promptText: "Extreme macro photograph of an iridescent [creature_type] crafted from [chassis_material] and optical glass, nano-scale circuitry etched into its translucent wings, studio lighting, octane render, 8k, Unreal Engine 5 aesthetic, photorealistic --ar 16:9 --v 6.1 --stylize 350",
    defaultVariables: {
      creature_type: "robotic scarab beetle",
      chassis_material: "polished aerospace titanium and iridescent crystal"
    },
    systemInstructions: "Midjourney v6.1 works best with `--style raw` to avoid generic smoothing. Use `--stylize 350` to enhance the microscopic etching realism.",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "img-nanotech-lab",
    domain: "image",
    title: "Bioluminescent Quantum Nanotech Lab",
    description: "Architectural Digest photography of a minimalist futuristic research cleanroom where floating glowing nano-particles assemble into geometric constellations.",
    model: "Midjourney v6.1 / SDXL",
    difficulty: "intermediate",
    copies: 4180,
    tags: ["Minimalism", "Laboratory", "Cyan/Amber", "Architecture", "Particles"],
    aspectRatio: "3:2",
    parameters: "--ar 3:2 --chaos 8 --v 6.1",
    promptText: "A futuristic high-tech laboratory where floating nano-particles form glowing [particle_shape], bioluminescent [color_palette] lighting, clean architectural minimalism, architectural digest photography, shot on Hasselblad H6D-100c --ar 3:2 --v 6.1",
    defaultVariables: {
      particle_shape: "geometric constellations and holographic DNA helixes",
      color_palette: "cyan and warm amber"
    },
    systemInstructions: "Pairs well with wide lens prompts. Specify Hasselblad sensor model to induce realistic physical camera sensor dynamic range.",
    previewImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "web-saas-dashboard",
    domain: "webdev",
    title: "Production SaaS Analytics Dashboard",
    description: "Complete blueprint for a responsive SaaS dashboard in React and Tailwind CSS with collapsible sidebar, dynamic Recharts metrics, and dark/light switching.",
    model: "React 19 / Next.js 15 / Tailwind v4",
    difficulty: "expert",
    copies: 8930,
    tags: ["React", "Tailwind", "Recharts", "SaaS", "Dashboard"],
    techStack: ["React 19", "Next.js 15", "Tailwind CSS", "Recharts", "Lucide React"],
    systemPrompt: "You are a Principal Frontend Architect. Output modular, type-safe, accessible (WCAG AAA) React code using modern Tailwind CSS. Avoid monolithic single-file dumps; structure components with clean props interfaces, custom hooks for state, and responsive layouts.",
    promptText: "Create a responsive, production-ready SaaS dashboard in [framework] and [css_library] featuring a collapsible sidebar, real-time analytics chart with [charting_tool], user activity table with pagination and sorting, [theme_options], and mobile-first drawer navigation with [icon_library]. Include mock data and full TypeScript types.",
    defaultVariables: {
      framework: "React 19 & Next.js 15 App Router",
      css_library: "Tailwind CSS",
      charting_tool: "Recharts",
      theme_options: "dark/light theme switcher with system preference detection",
      icon_library: "Lucide React"
    },
    expectedOutput: "A multi-component modular architecture containing Sidebar, TopNavbar, MetricCard, RevenueChart, UserTable, and ThemeProvider with zero external UI library bloat.",
    previewCode: `<DashboardLayout sidebar={<Sidebar />}>
  <MetricsGrid stats={kpis} />
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <RevenueChart className="lg:col-span-2" />
    <ActivityFeed className="lg:col-span-1" />
  </div>
  <UserTable data={users} paginate sortable />
</DashboardLayout>`
  },
  {
    id: "web-threejs-hero",
    domain: "webdev",
    title: "Interactive 3D Particle Sphere Landing Page",
    description: "Three.js and React Three Fiber interactive hero section with physics-driven glowing particle field reacting to cursor proximity and scroll velocities.",
    model: "Three.js / React Three Fiber / Drei",
    difficulty: "expert",
    copies: 4890,
    tags: ["Three.js", "R3F", "WebGL", "Shaders", "Interactive"],
    techStack: ["React Three Fiber", "@react-three/drei", "Three.js", "Tailwind CSS"],
    systemPrompt: "Act as a WebGL creative technologist. Write optimized React Three Fiber shaders and particle point clouds that maintain steady 60 FPS on mobile and desktop by using InstancedMesh and Float32Array buffers.",
    promptText: "Generate a complete interactive 3D landing page using [three_library] and [react_wrapper] with an interactive glowing particle sphere of [particle_count] vertices that reacts to mouse hover and scroll physics, including sleek typography overlay, CTA buttons, and smooth [transition_effect].",
    defaultVariables: {
      three_library: "Three.js",
      react_wrapper: "React Three Fiber with @react-three/drei",
      particle_count: "15,000 glowing neon points",
      transition_effect: "depth of field blur and camera dolly on scroll"
    },
    expectedOutput: "A high-performance Canvas scene with custom point cloud shader, mouse interaction raycaster, and sleek glassmorphism HTML UI overlay.",
    previewCode: `<Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
  <ambientLight intensity={0.5} />
  <ParticleSphere count={15000} color="#00f5ff" />
  <OrbitControls enableZoom={false} />
</Canvas>`
  },
  {
    id: "agent-ux-architect",
    domain: "agents",
    title: "Senior UX & Frontend Code Reviewer",
    description: "System prompt for an elite frontend auditor to review React components for WCAG accessibility, rendering bottlenecks, memory leaks, and clean design systems.",
    model: "Claude 3.5 Sonnet / GPT-4o",
    difficulty: "intermediate",
    copies: 7210,
    tags: ["System Prompt", "Code Review", "Accessibility", "Performance", "Clean Code"],
    systemPrompt: "Role: Senior UX/UI & Principal Frontend Architect. Tone: Precise, constructive, uncompromising on accessibility and performance. Provide concrete code diffs for any critique.",
    promptText: "Act as a world-class frontend engineer and UX specialist. Review the provided [framework_component] for:\n1. Accessibility (a11y - aria labels, keyboard navigation, screen reader flow)\n2. Performance re-renders and unnecessary state updates\n3. Clean code principles and separation of concerns\n4. [styling_critique]\nProvide an executive summary, score out of 10, and a fully refactored, production-ready replacement component.",
    defaultVariables: {
      framework_component: "React 19 component",
      styling_critique: "Tailwind CSS styling refactoring and class grouping"
    },
    expectedOutput: "Categorized audit report with Severity levels (Critical, High, Minor), a before/after code diff, and WCAG 2.1 compliance checklist.",
    instructions: "Feed this system prompt directly into Claude 3.5 Sonnet Artifacts or GPT-4o custom instructions for stellar, actionable code reviews."
  },
  {
    id: "3d-spline-glass-card",
    domain: "3d",
    title: "Glassmorphic Holographic Card 3D",
    description: "3D scene prompt for interactive glass credit card with iridescent caustic dispersion, embedded microchips, and realistic mouse gyro tilt physics.",
    model: "Spline 3D / Blender 4.2",
    difficulty: "intermediate",
    copies: 2950,
    tags: ["Spline", "Glassmorphism", "Caustics", "Hologram", "3D UI"],
    aspectRatio: "1:1",
    promptText: "Create a 3D glassmorphic [card_type] featuring [surface_texture], embedded glowing microcircuits, iridescent holographic foil that reflects ambient lights, interactive mouse gyroscope tilt physics, and [lighting_rig]. Export with WebGL embed code.",
    defaultVariables: {
      card_type: "futuristic quantum access pass card",
      surface_texture: "frosted optical quartz with 0.8 roughness and 1.52 IOR index",
      lighting_rig: "3-point studio lights with cyan rim and magenta fill"
    },
    systemInstructions: "Configure physically based transmission in Blender or Spline 3D. Set Index of Refraction (IOR) to 1.52 for accurate optical quartz refraction.",
    previewImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "audio-synthwave-cyberpunk",
    domain: "audio",
    title: "Cyberpunk Synthwave Driving Anthem",
    description: "Structure-precise musical prompt for Suno v3.5 and Udio generating an 80s analog synthwave track with soaring lead guitars and driving arpeggiated basslines.",
    model: "Suno v3.5 / Udio 1.5",
    difficulty: "beginner",
    copies: 3310,
    tags: ["Synthwave", "Cyberpunk", "128 BPM", "Analog Synths", "Guitar Solo"],
    promptText: "Cinematic synthwave / cyberpunk anthem with [bass_instrument], punchy 80s gated drums, emotional electric guitar solo, soaring female vocals about [lyrical_theme], [tempo_bpm], high fidelity studio mix, [mixing_style] --style synthwave, dark synth, retrowave",
    defaultVariables: {
      bass_instrument: "driving analog Moog arpeggios and pulsing sub-bass",
      lyrical_theme: "racing through rain-slick neon cityscapes at 3 AM",
      tempo_bpm: "128 BPM",
      mixing_style: "warm tape saturation and spacious stereo reverb"
    },
    systemInstructions: "In Suno v3.5, wrap verse/chorus in bracket tags: [Verse 1], [Pre-Chorus], [Chorus], [Guitar Solo], [Outro Fade] for best structural coherence.",
    previewImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "vid-hyper-canyon-chase",
    domain: "video",
    title: "Supersonic Hovercraft Canyon Orbit",
    description: "High-octane dynamic camera orbit around a supersonic cyber hovercraft navigating tight crystalline canyon turns at breakneck speeds.",
    model: "Runway Gen-3 Alpha / Kling AI",
    difficulty: "expert",
    copies: 2840,
    tags: ["High Speed", "Canyon", "Hovercraft", "Orbit", "120fps"],
    cameraDirectives: ["[360 Orbit Tracking]", "[Low Angle 24mm]", "[120fps Slow-Mo Burst]", "[Atmospheric Heat Distortion]", "[Volumetric Light Rays]"],
    aspectRatio: "2.39:1",
    fps: "120fps",
    motionScore: "Maximum",
    promptText: "High-octane camera orbit tracking a supersonic [vehicle_type] banking sharply through a canyon of [environment_crystals], lens dirt, atmospheric haze, chromatic aberration, 4k 120fps slow motion, [exhaust_color] particle trails, cinematic action movie framing.",
    defaultVariables: {
      vehicle_type: "cybernetic anti-gravity racing craft",
      environment_crystals: "bioluminescent purple and cyan crystal spires",
      exhaust_color: "ionized plasma turquoise"
    },
    systemInstructions: "Set camera trajectory to continuous orbital spiral tracking the vehicle anchor point.",
    previewImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "img-translucent-android",
    domain: "image",
    title: "Synaptic Neural Android Portrait",
    description: "Translucent cybernetic android bust revealing glowing golden neural axons, floating AR interface HUD rings, and studio beauty lighting.",
    model: "Flux.1 Dev / Midjourney v6.1",
    difficulty: "expert",
    copies: 5670,
    tags: ["Android", "Neural", "Hasselblad", "Subsurface Scattering", "Cyberpunk"],
    aspectRatio: "4:5",
    parameters: "--ar 4:5 --v 6.1 --stylize 400",
    promptText: "Translucent cybernetic android bust displaying glowing synaptic neural pathways in [neural_colors], floating holographic UI rings, hyper-detailed subsurface scattering, shot on Hasselblad 100mm portrait lens, [lighting_setup] --ar 4:5 --v 6.1",
    defaultVariables: {
      neural_colors: "golden amber and deep electric indigo",
      lighting_setup: "dramatic chiaroscuro studio lighting with cyan backlight rim"
    },
    systemInstructions: "Use Flux.1 Dev or Midjourney v6.1. Specify 'subsurface scattering' to achieve human-like light penetration through translucent synthetic skin.",
    previewImage: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "agent-fullstack-spec",
    domain: "agents",
    title: "Autonomous Full-Stack Product Architect",
    description: "Comprehensive system instruction to transform high-level app ideas into database ER diagrams, API route specifications, and component wireframes.",
    model: "Claude 3.5 Sonnet / GPT-4o",
    difficulty: "expert",
    copies: 4620,
    tags: ["Specification", "System Architecture", "PostgreSQL", "PRD", "API Design"],
    systemPrompt: "You are a Principal Product Engineer and Enterprise Solutions Architect. Output exhaustive technical specifications including SQL DDL, OpenAPI 3.0 route tables, security policies, and performance budgets.",
    promptText: "Architect an end-to-end technical specification for [app_idea]. Provide:\n1. PostgreSQL relational database schema with indexed foreign keys and RLS rules\n2. RESTful API route table with HTTP methods, request payloads, and status codes\n3. Authentication flow using [auth_provider]\n4. State management architecture with [frontend_state]\n5. Edge caching and rate limiting strategy with Redis.",
    defaultVariables: {
      app_idea: "an AI-powered video generation and collaboration platform",
      auth_provider: "Supabase Auth with Multi-Factor Authentication",
      frontend_state: "TanStack Query + Zustand"
    },
    expectedOutput: "A complete Technical Design Document (TDD) ready for engineers to immediately begin sprint implementation.",
    instructions: "Directly copy this into Claude 3.5 Sonnet for instant comprehensive PRDs and database models."
  }
];
