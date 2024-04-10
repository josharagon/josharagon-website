import React, { useEffect, useRef, useState } from 'react';
import './Dashboard.scss'; // Import the CSS file for styling
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing//GlitchPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';




const createSnowflakes = (scene) => {
    const snowflakes = [];
    const snowflakeGeometry = new THREE.BoxGeometry(0.03, 0.021, 0.021);
    const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 100; i++) {
        const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
        snowflake.position.set(
            Math.random() * 10 - 5,
            Math.random() * 10,
            Math.random() * 10 - 5
        );
        snowflakes.push(snowflake);
        scene.add(snowflake);
    }

    return snowflakes;
};

const animateSnowfall = (snowflakes) => {
    snowflakes.forEach(snowflake => {
        snowflake.position.y -= 0.0125;
        if (snowflake.position.y < -5) {
            snowflake.position.set(
                Math.random() * 10 - 5,
                10,
                Math.random() * 10 - 5
            );
        }
    });
};


const Dashboard = (props) => {
    const refContainer = useRef(null);
    const [speed, setSpeed] = useState(0); // Speed state
    const [engineStarted, setEngineStarted] = useState(false);
    const engineStartBufferRef = useRef(null);
    const revBuffersRef = useRef(null);
    const downShiftBufferRef = useRef(null);
    const speedFactorRef = useRef(0);
    const lastDownshiftTimeRef = useRef(0); // Ref to track the last time downshift sound was played
    const downshiftCooldown = 1000;
    // Deferred creation of AudioContext and loading of sounds
    let audioContext;
    let idleEngineBuffer, mediumSpeedEngineBuffer, fastSpeedEngineBuffer;
    let idleSource, mediumSource, fastSource;
    let idleGainNode, mediumGainNode, fastGainNode;

    const getAudioContext = () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    };

    // Function to load sound
    const loadEngineSound = async (url) => {
        const context = getAudioContext();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(arrayBuffer);
        return audioBuffer;
    };

    // Adjusted to not immediately invoke playEngineSounds
    const loadEngineSounds = async () => {
        const engineStartBuffer = await loadEngineSound('/audio/engine-start.mp3');
        const downShiftBuffer = await loadEngineSound('/audio/downshift.mp3');
        const revBuffer1 = await loadEngineSound('/audio/rev1.mp3');
        idleEngineBuffer = await loadEngineSound('/audio/idle.mp3');
        mediumSpeedEngineBuffer = await loadEngineSound('/audio/medium.mp3');
        fastSpeedEngineBuffer = await loadEngineSound('/audio/fast.mp3'); // Load fast speed sound
        engineStartBufferRef.current = engineStartBuffer;
        downShiftBufferRef.current = downShiftBuffer;
        revBuffersRef.current = [revBuffer1]
    };

    useEffect(() => {
        loadEngineSounds();
    }, []);

    const playEngineSounds = () => {
        // Play idle engine sound
        const context = getAudioContext();
        idleSource = context.createBufferSource();
        idleSource.buffer = idleEngineBuffer;
        idleSource.loop = true;
        const idleGainNode = context.createGain();
        idleGainNode.gain.value = 1; // Start with idle sound at full volume
        idleSource.connect(idleGainNode).connect(context.destination);
        idleSource.start(0);

        // Play medium engine sound
        mediumSource = context.createBufferSource();
        mediumSource.buffer = mediumSpeedEngineBuffer;
        mediumSource.loop = true;
        const mediumGainNode = context.createGain();
        mediumGainNode.gain.value = 0; // Start with medium speed sound muted
        mediumSource.connect(mediumGainNode).connect(context.destination);
        mediumSource.start(0);


        fastSource = context.createBufferSource();
        fastSource.buffer = fastSpeedEngineBuffer;
        fastSource.loop = true;
        fastGainNode = context.createGain();
        fastGainNode.gain.value = 0; // Start with fast speed sound muted
        fastSource.connect(fastGainNode).connect(context.destination);
        fastSource.start(0);

        return { idleGainNode, mediumGainNode, fastGainNode }; // Return gain nodes for later control
    };
    const playEngineStartSound = () => {
        if (!engineStarted) {
            const context = getAudioContext();
            const source = context.createBufferSource();
            source.buffer = engineStartBufferRef.current;
            source.connect(context.destination);
            source.start(0);
            setEngineStarted(true); // Update state to indicate engine has started
            // Optional: Call method to play idle engine sound here
        }
    };

    const playRandomRevSound = () => {
        const context = getAudioContext();
        const source = context.createBufferSource();
        const randomIndex = Math.floor(Math.random() * revBuffersRef.current.length);
        source.buffer = revBuffersRef.current[randomIndex];
        source.connect(context.destination);
        source.start(0);
    };

    const playDownShiftSound = () => {
        const context = getAudioContext();
        const source = context.createBufferSource();
        source.buffer = downShiftBufferRef.current
        source.connect(context.destination);
        source.start(0);
    };

    const updateEngineSoundVolumes = (speedFactor) => {
        const idleVolume = speedFactor === 0 ? .5 : 0;
        const mediumVolume = speedFactor > 0 && speedFactor < 0.5 ? speedFactor * 2 : speedFactor >= 0.5 && speedFactor < 0.75 ? 1 - (speedFactor - 0.5) * 4 : 0;
        const fastVolume = speedFactor >= 0.5 ? (speedFactor - 0.5) * 2 : 0;
        if (idleGainNode) idleGainNode.gain.value = idleVolume;
        if (mediumGainNode) mediumGainNode.gain.value = mediumVolume;
        if (fastGainNode) fastGainNode.gain.value = fastVolume;
    };

    const initiateAudioAndStartEngine = async () => {
        playEngineStartSound();
        await getAudioContext().resume(); // This resumes the context if needed
        await loadEngineSounds();
        const gainNodes = playEngineSounds(); // Assign the returned gain nodes
        idleGainNode = gainNodes.idleGainNode;
        mediumGainNode = gainNodes.mediumGainNode;
        fastGainNode = gainNodes.fastGainNode;
    };

    useEffect(() => {
        if (engineStarted) {
            const handleKeyDown = (event) => {
                if (event.key === 'e') {
                    playRandomRevSound();
                }
                if (event.key === 'w') {
                    setSpeed((prevSpeed) => Math.min(prevSpeed + 1, 296));
                } else if (event.key === 's') {
                    setSpeed((prevSpeed) => {
                        const newSpeed = Math.max(prevSpeed - 4, 0);
                        const now = Date.now();
                        // Play downshift sound if speed is above 0, we're slowing down, 
                        // and it's been at least downshiftCooldown ms since the last downshift sound
                        if (prevSpeed > 0 && newSpeed < prevSpeed &&
                            (now - lastDownshiftTimeRef.current > downshiftCooldown)) {
                            playDownShiftSound();
                            lastDownshiftTimeRef.current = now; // Update the last downshift time
                        }
                        return newSpeed;
                    }); // Brake, min speed 0
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [engineStarted]);

    useEffect(() => {
        speedFactorRef.current = speed / 296;
    }, [speed]);


    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed(prevSpeed => Math.max(prevSpeed - 1, 0)); // Increment speed for demonstration
        }, 1000); // Update speed every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        // === THREE.JS CODE START ===
        var scene = new THREE.Scene();
        const bgLoader = new RGBELoader();
        bgLoader.load(
            '/textures/snow-sky.hdr', // e.g., '/textures/environment.hdr'
            function (texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.background = texture;
                scene.environment = texture;
            },
            undefined, // onProgress callback not supported from r104
            function (err) {
                console.error('An error occurred loading the HDR:', err);
            }
        );

        // Define camera parameters
        const fov = 90; // Field of view
        const aspect = window.innerWidth / window.innerHeight; // Aspect ratio
        const near = 0.1; // Near clipping plane
        const far = 1000; // Far clipping plane

        // Create a new PerspectiveCamera
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        // Set camera position
        camera.position.set(0, 1.5, -5); // Adjust position as needed
        // Set camera look-at position (optional)
        const target = new THREE.Vector3(0, .6, 0); // Change (0, 0, 0) to your desired target position
        camera.lookAt(target);

        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Color, Intensity
        scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4); // Color, Intensity
        directionalLight.position.set(1, 1, 1); // Set light direction
        scene.add(directionalLight);
        scene.background = new THREE.Color(0x333333);
        // Create a WebGLRenderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        refContainer.current && refContainer.current.appendChild(renderer.domElement);
        renderer.toneMappingExposure = 0.5; // Adjust tone mapping exposure



        // Add OrbitControls to enable user interaction
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smoothly decelerate when dragging
        controls.dampingFactor = 0.25; // Damping factor for damping inertia
        controls.screenSpacePanning = false; // Enable/disable screen space panning
        controls.enablePan = false; // Disable panning
        controls.enableZoom = false; // Disable zooming


        // Set up post-processing for glow effect
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        // Add GlitchPass for glow effect
        const glitchPass = new GlitchPass();
        composer.addPass(glitchPass);


        const snowflakes = createSnowflakes(scene);

        // Create road geometry
        const roadWidth = 10;
        const roadLength = 200;
        const roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength);

        // Load road texture
        const textureLoader = new THREE.TextureLoader();
        const roadTexture = textureLoader.load('/textures/snow-road.jpg');
        roadTexture.wrapS = THREE.RepeatWrapping;
        roadTexture.wrapT = THREE.RepeatWrapping;
        roadTexture.repeat.set(1, 10); // Adjust repeat values to fit road size

        // Create material with texture
        const roadMaterial = new THREE.MeshBasicMaterial({ map: roadTexture });

        // Create road mesh
        const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
        scene.add(roadMesh);

        // Position road mesh
        roadMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat on the ground
        roadMesh.position.y = -0.1; // Adjust to avoid z-fighting with ground



        // Function to create buildings
        const buildings = [];

        const buildingGeometry = new THREE.BoxGeometry(5, 50, 5);
        const highriseTexture = new THREE.TextureLoader().load('/textures/highrise.jpg');
        highriseTexture.wrapS = highriseTexture.wrapT = THREE.RepeatWrapping;
        highriseTexture.repeat.set(1, 6);
        const buildingMaterial = new THREE.MeshPhongMaterial({ map: highriseTexture });


        const highriseMaterial = new THREE.MeshPhongMaterial({ map: highriseTexture });

        function createBuilding(position, size, highriseMaterial) {
            // Use the shared geometry and material
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
            building.position.copy(position);
            scene.add(building);
            buildings.push(building);
        }

        // Define variables for building generation
        const buildingSpacing = 15; // Adjust spacing between buildings as needed
        const totalBuildingSegments = Math.ceil(roadLength / buildingSpacing); // Calculate total building segments needed

        // Function to generate buildings
        function generateBuildings() {
            const startingZ = -roadLength / 2;
            for (let i = 0; i < totalBuildingSegments; i++) {
                // Position buildings on both sides of the road
                createBuilding(new THREE.Vector3(-10, 5, startingZ + i * buildingSpacing));
                createBuilding(new THREE.Vector3(10, 5, startingZ + i * buildingSpacing));
            }
        }

        // Call the generateBuildings function to initially populate the scene
        generateBuildings();

        // Load guard rail texture
        const guardRailTexture = textureLoader.load('/textures/guardrail.jpg');

        guardRailTexture.wrapS = THREE.RepeatWrapping;
        guardRailTexture.wrapT = THREE.RepeatWrapping;
        guardRailTexture.repeat.set(200, 1);

        // Create material with guard rail texture
        const guardRailMaterial = new THREE.MeshBasicMaterial({ map: guardRailTexture, color: 0xBABABA });

        // Function to create a guard rail
        function createGuardRail(position, size, material) {
            const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
            const guardRail = new THREE.Mesh(geometry, material);
            guardRail.position.copy(position);
            return guardRail;
        }

        // Create and add guard rails to the scene
        const guardRailSize = new THREE.Vector3(0.1, 1, roadLength); // Adjust size as needed
        const leftGuardRailPosition = new THREE.Vector3(-roadWidth / 2, guardRailSize.y / 3, 0);
        const rightGuardRailPosition = new THREE.Vector3(roadWidth / 2, guardRailSize.y / 3, 0);

        const leftGuardRail = createGuardRail(leftGuardRailPosition, guardRailSize, guardRailMaterial);
        const rightGuardRail = createGuardRail(rightGuardRailPosition, guardRailSize, guardRailMaterial);

        scene.add(leftGuardRail, rightGuardRail);



        const wheels = [];
        // Define variables for animation
        const wheelRotationSpeed = 0.0003; // Adjust rotation speed as needed


        const calculateWheelRotationSpeed = () => {
            // Example calculation: Adjust the multiplier for desired sensitivity
            // This could be a simple linear mapping or more complex based on your needs
            return speedFactorRef.current * 0.001;
        };
        let wheelRotationAngle = 0;
        function animateWheels(speedFactor) {
            const dynamicWheelRotationSpeed = calculateWheelRotationSpeed(); // Adjust multiplier for noticeable effect
            wheels.forEach((wheel) => {
                wheel.rotateX(dynamicWheelRotationSpeed);
            });

            wheelRotationAngle += dynamicWheelRotationSpeed;

            requestAnimationFrame(animateWheels);
        }

        const calculateMovementSpeed = (type) => {
            // This function returns a dynamic movement speed based on the current speedFactorRef
            // Adjust the multiplier to scale the speed as needed for visual realism
            switch (type) {
                case 'road':
                    return speedFactorRef.current * 0.00003; // Adjust speed as needed
                case 'building':
                    return speedFactorRef.current * 0.9; // Adjust speed as needed
                case 'guardrail':
                    return speedFactorRef.current * 0.9;  // Adjust speed as needed
                default:
                    return 0;
            }
        };

        // Define variables for road texture animation
        const roadTextureSpeed = 0.00001; // Adjust texture speed as needed
        let roadTextureOffset = 0;

        // Function to animate the road texture
        function animateRoadTexture() {
            const movementSpeed = calculateMovementSpeed('road');
            // Calculate the new texture offset based on car movement speed
            roadTextureOffset -= movementSpeed;

            // Update the texture offset
            roadMaterial.map.offset.y = roadTextureOffset;

            // Call the function recursively for smooth animation
            requestAnimationFrame(animateRoadTexture);
        }

        // Define variables for animation speed
        const buildingSpeed = 0.15; // Adjust speed as needed
        const guardRailSpeed = 0.2; // Adjust speed as needed

        // Animate the movement of guard rails
        function animateGuardRails() {
            const movementSpeed = calculateMovementSpeed('guardrail');
            leftGuardRail.position.z -= movementSpeed;
            rightGuardRail.position.z -= movementSpeed;
            // Reset guard rail positions when they move out of view
            if (leftGuardRail.position.z < -roadLength / 6) {
                leftGuardRail.position.z = roadLength / 6;
            }
            if (rightGuardRail.position.z < -roadLength / 6) {
                rightGuardRail.position.z = roadLength / 6;
            }
        }


        // Animate the movement of buildings
        function animateBuildings() {
            const movementSpeed = calculateMovementSpeed('building');
            buildings.forEach((building) => {
                building.position.z -= movementSpeed;
                // Reset building position when it moves out of view
                if (building.position.z < -roadLength / 2) {
                    building.position.z = roadLength / 2; // Reposition buildings to the end of the road
                }
            });
        }

        // Load GLTF model
        var loader = new GLTFLoader();
        loader.load(
            '/models/scene.gltf',
            function (gltf) {
                scene.add(gltf.scene);
                const carModel = gltf.scene.children[0].children[0].children[0];
                carModel.traverse((child) => {
                    if (child.isMesh) {
                        switch (child.material.name) {
                            case 'TwiXeR_992_taillight_running.001':
                                // Apply settings for taillight
                                child.material.color.setHex(0xff0000);
                                child.material.emissive.setHex(0xff0000);
                                child.material.emissiveIntensity = 10000000;
                                break;
                            case 'TwiXeR_992_headlight_high.001':
                                // Apply settings for headlight
                                child.material.color.setHex(0xffffff);
                                child.material.emissive.setHex(0xcccccc);
                                child.material.emissiveIntensity = 10000;
                                break;
                            case 'TwiXeR_992_glass_int.001':
                                // Apply settings for glass
                                child.material.color.setHex(0x000000);
                                child.material.opacity = 1;
                                break;
                            // Add more cases as needed
                        }
                    }
                });
                wheels.push(
                    carModel.getObjectByName('TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9'),
                    carModel.getObjectByName('TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9001'),
                    carModel.getObjectByName('TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9002'),
                    carModel.getObjectByName('TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9003'),
                    carModel.getObjectByName('Object_4001'),
                    carModel.getObjectByName('Object_4002'),
                    carModel.getObjectByName('Object_4003'),
                    carModel.getObjectByName('Object_4004')
                );
            },
            undefined,
            function (error) {
                console.error('Error loading GLTF model:', error);
            }
        );


        var animate = function () {
            animateWheels(speedFactorRef.current);
            animateRoadTexture();
            animateBuildings();
            animateSnowfall(snowflakes);
            animateGuardRails();
            updateEngineSoundVolumes(speedFactorRef.current); // Update engine sound volumes based on speedFactorRef
            requestAnimationFrame(animate);
            composer.render();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            try { if (idleSource) idleSource.stop(); } catch (error) { console.log('Idle source stopping error', error); }
            try { if (mediumSource) mediumSource.stop(); } catch (error) { console.log('Medium source stopping error', error); }
            try { if (fastSource) fastSource.stop(); } catch (error) { console.log('Fast source stopping error', error); }

            if (idleGainNode) idleGainNode.disconnect();
            if (mediumGainNode) mediumGainNode.disconnect();
            if (fastGainNode) fastGainNode.disconnect();

            // Dispose of THREE.js resources
            buildings.forEach(building => {
                scene.remove(building);
                // No need to dispose of geometry and material here if they are shared and used elsewhere
            });

            // Additional cleanup for other THREE.js resources as needed
            renderer.dispose();
            buildingGeometry.dispose();
            buildingMaterial.dispose();
            // Repeat for road and guardrails if they're not used elsewhere
        };
    }, []);
    return <div style={{ position: 'relative' }}>

        <button onClick={() => {
            props.onExitClick();
        }} className="exit-dashboard-btn">
            Exit Dashboard
        </button>
        <div ref={refContainer} style={{ width: '100vw', height: '100vh' }}></div>
        {!engineStarted && <button className="start-engine-button" onClick={initiateAudioAndStartEngine}>Start Engine</button>}
        <div id="speedometer">
            Speed: {speed} km/h
        </div>
        <div id="map">
            <div id="playerDot"></div>
        </div>
    </div >;
};

export default Dashboard;
