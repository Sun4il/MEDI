import * as THREE from "three";

const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, 1.75);

export const createIntroCapsuleScene = (container) => {
  if (!container) {
    return null;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050814);
  scene.fog = new THREE.Fog(0x050814, 7.5, 18);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.08, 7.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(getPixelRatio());
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.localClippingEnabled = true;
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";

  container.replaceChildren(renderer.domElement);

  const capsuleGroup = new THREE.Group();
  capsuleGroup.position.set(0, 0.18, 0);
  capsuleGroup.rotation.set(-0.12, -0.32, 0.18);
  scene.add(capsuleGroup);

  const capsuleGeometry = new THREE.CapsuleGeometry(0.9, 2.35, 16, 32);
  const topPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.01);
  const bottomPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.01);

  const topMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf3f6fb,
    roughness: 0.18,
    metalness: 0.06,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    sheen: 0.16,
    sheenColor: new THREE.Color(0x9ef3ff),
    emissive: new THREE.Color(0x06121f),
    emissiveIntensity: 0.2,
    clippingPlanes: [topPlane],
    envMapIntensity: 1.1,
  });

  const bottomMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x7fd7ff,
    roughness: 0.2,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    sheen: 0.18,
    sheenColor: new THREE.Color(0x9cffd6),
    emissive: new THREE.Color(0x0a2742),
    emissiveIntensity: 0.26,
    clippingPlanes: [bottomPlane],
    envMapIntensity: 1.15,
  });

  const topMesh = new THREE.Mesh(capsuleGeometry, topMaterial);
  const bottomMesh = new THREE.Mesh(capsuleGeometry, bottomMaterial);
  capsuleGroup.add(topMesh, bottomMesh);

  const seamGlow = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 2.3, 0.12),
    new THREE.MeshBasicMaterial({
      color: 0x8cfef6,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  seamGlow.position.set(0, 0, 0);
  capsuleGroup.add(seamGlow);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.8, 64),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, -1.75, -0.9);
  shadow.scale.set(1.18, 0.34, 1);
  scene.add(shadow);

  const ambient = new THREE.AmbientLight(0x8fb8ff, 0.62);
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
  keyLight.position.set(4, 5, 7);
  const fillLight = new THREE.PointLight(0x29e8a1, 2.0, 20, 2);
  fillLight.position.set(-2.2, 1.2, 4.2);
  const rimLight = new THREE.PointLight(0x3d8eff, 1.8, 20, 2);
  rimLight.position.set(2.6, -1.4, 4.4);
  const pulseLight = new THREE.PointLight(0x78fff0, 1.1, 10, 2);
  pulseLight.position.set(0, 0, 2.3);
  scene.add(ambient, keyLight, fillLight, rimLight, pulseLight);

  const state = { split: 0 };
  const clock = new THREE.Clock();
  let animationFrame = 0;

  const resizeRenderer = () => {
    const { clientWidth, clientHeight } = container;

    if (!clientWidth || !clientHeight) {
      return;
    }

    renderer.setPixelRatio(getPixelRatio());
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  };

  const handleResize = () => {
    resizeRenderer();
  };

  const render = () => {
    const elapsed = clock.getElapsedTime();
    const split = state.split;

    capsuleGroup.position.y = 0.18 + Math.sin(elapsed * 0.95) * 0.06;
    capsuleGroup.rotation.x = -0.12 + Math.sin(elapsed * 0.42) * 0.05;
    capsuleGroup.rotation.y = -0.32 + elapsed * 0.08;
    capsuleGroup.rotation.z = 0.18 + Math.sin(elapsed * 0.33) * 0.03;

    topMesh.position.y = split * 0.72;
    bottomMesh.position.y = -split * 0.72;
    topMesh.rotation.z = -split * 0.08;
    bottomMesh.rotation.z = split * 0.08;
    topMesh.scale.setScalar(1 - split * 0.015);
    bottomMesh.scale.setScalar(1 - split * 0.015);

    seamGlow.scale.set(1 + split * 0.1, 1 + split * 1.15, 1 + split * 0.5);
    seamGlow.material.opacity = Math.max(0, 0.68 - split * 0.7);
    shadow.material.opacity = Math.max(0, 0.34 - split * 0.12);

    fillLight.intensity = 1.9 + Math.sin(elapsed * 1.3) * 0.18;
    rimLight.intensity = 1.7 + Math.sin(elapsed * 1.15 + 1) * 0.16;
    pulseLight.intensity = 0.9 + Math.max(split, 0.2) * 1;

    renderer.render(scene, camera);
    animationFrame = window.requestAnimationFrame(render);
  };

  resizeRenderer();
  window.addEventListener("resize", handleResize);
  render();

  return {
    state,
    dispose() {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      capsuleGeometry.dispose();
      topMaterial.dispose();
      bottomMaterial.dispose();
      seamGlow.geometry.dispose();
      seamGlow.material.dispose();
      shadow.geometry.dispose();
      shadow.material.dispose();
      renderer.dispose();
      container.replaceChildren();
    },
  };
};