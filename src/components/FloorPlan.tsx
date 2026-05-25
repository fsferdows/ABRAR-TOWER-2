/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Compass, 
  Square, 
  ShieldCheck, 
  Layout, 
  ChevronRight,
  TrendingUp,
  LineChart,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Lock,
  MapPin,
  Wind,
  Sun,
  FileDown
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { FlatDetail } from '../types';

interface VisualUnit {
  id: string; // A, B, C, D
  name: string;
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  verandas: number;
  facing: string;
  idealFor: string;
  priceEstimate: string;
  basePriceNum: number; // In Lakhs BDT
  description?: string;
  highlights?: string[];
}

const ARCHITECTURAL_3D_HTML_BLOCK = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abrar Tower — Interactive 3D Modified Master Plan</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #05070f;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "JetBrains Mono", monospace;
      user-select: none;
    }
    #viewport-container {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    #ui-overlay {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(8, 11, 22, 0.95);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 6px;
      padding: 16px;
      color: #ffffff;
      width: 250px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      pointer-events: auto;
      backdrop-filter: blur(10px);
      z-index: 10;
    }
    h1 {
      font-size: 14px;
      font-weight: 700;
      margin: 0 0 2px 0;
      color: #d4af37;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .subtitle {
      font-size: 8px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 12px;
      display: block;
      border-bottom: 1px solid rgba(212, 175, 55, 0.15);
      padding-bottom: 6px;
    }
    .step-btn {
      display: block;
      width: 100%;
      background: rgba(30, 41, 59, 0.35);
      border: 1px solid rgba(255,255,255,0.05);
      color: #cbd5e1;
      padding: 8px 10px;
      margin-bottom: 6px;
      text-align: left;
      border-radius: 4px;
      cursor: pointer;
      font-size: 10px;
      font-weight: 500;
      transition: all 0.2s ease;
      font-family: monospace;
      outline: none;
    }
    .step-btn:hover {
      background: rgba(212, 175, 55, 0.15);
      color: #ffffff;
      border-color: rgba(212, 175, 55, 0.4);
    }
    .step-btn.active {
      background: #d4af37;
      color: #05070f;
      border-color: #d4af37;
      font-weight: 700;
    }
    #three-loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #05070f;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s;
    }
    .engine-spinner {
      width: 44px;
      height: 44px;
      border: 2px solid rgba(212, 175, 55, 0.12);
      border-top: 2px solid #d4af37;
      border-radius: 50%;
      animation: engine-spin 0.85s linear infinite;
      position: relative;
    }
    .engine-indicator {
      position: absolute;
      width: 22px;
      height: 22px;
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 50%;
      animation: engine-pulse 1.7s ease-in-out infinite;
    }
    @keyframes engine-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes engine-pulse {
      0%, 100% { transform: scale(0.85); opacity: 0.35; }
      50% { transform: scale(1.15); opacity: 0.85; }
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>

  <div id="three-loader">
    <div style="position: relative; display: flex; align-items: center; justify-content: center;">
      <div class="engine-spinner"></div>
      <div class="engine-indicator"></div>
    </div>
    <div style="margin-top: 18px; text-align: center;">
      <h2 style="margin: 0; color: #d4af37; font-family: serif; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">Abrar Tower 3D</h2>
      <p style="margin: 5px 0 0 0; color: #64748b; font-family: monospace; font-size: 8px; text-transform: uppercase; letter-spacing: 0.18em; line-height: 1.2;">Initializing 3D Engine...<br><span style="color: #475569; font-size: 7px;">Plot & Column Matrix Calibration</span></p>
    </div>
  </div>

  <div id="viewport-container"></div>

  <div id="ui-overlay">
    <h1>Abrar Tower 3D</h1>
    <span class="subtitle">Isolation Explorer</span>
    
    <button id="btn-all" class="step-btn active" onclick="focusStage('all', this)">[0] Full Exterior Profile</button>
    <button id="btn-step1" class="step-btn" onclick="focusStage('step1', this)">[1] 10-Katha Plot Setbacks</button>
    <button id="btn-step2" class="step-btn" onclick="focusStage('step2', this)">[2] Tapering Columns Grid</button>
    <button id="btn-step3" class="step-btn" onclick="focusStage('step3', this)">[3] Central Lift/Stairs Core</button>
    <button id="btn-step4" class="step-btn" onclick="focusStage('step4', this)">[4] Typical Floor Splitting</button>
    <button id="btn-step5" class="step-btn" onclick="focusStage('step5', this)">[5] G-Floor Covered Parking</button>
    <button id="btn-step6" class="step-btn" onclick="focusStage('step6', this)">[6] Rooftop Oasis Sanctuary</button>
  </div>

  <script>
    const container = document.getElementById('viewport-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);
    scene.fog = new THREE.FogExp2(0x05070f, 0.010);

    const initialWidth = container ? (container.clientWidth || window.innerWidth || 800) : 800;
    const initialHeight = container ? (container.clientHeight || window.innerHeight || 600) : 600;
    const camera = new THREE.PerspectiveCamera(45, initialWidth / initialHeight, 1, 1000);
    camera.position.set(55, 50, 75);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    if (container) {
      container.appendChild(renderer.domElement);
      renderer.setSize(initialWidth, initialHeight);
    }

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.01; 
    controls.target.set(0, 16, 0);
    controls.update();

    // Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffdf4, 1.35);
    sunLight.position.set(45, 90, 35);
    sunLight.castShadow = true;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const rimSkyLight = new THREE.DirectionalLight(0x38bdf8, 0.5);
    rimSkyLight.position.set(-45, 30, -35);
    scene.add(rimSkyLight);

    // Ground Plot base
    const siteGeo = new THREE.PlaneGeometry(240, 240);
    const siteMat = new THREE.MeshStandardMaterial({ color: 0x060914, roughness: 0.98 });
    const ground = new THREE.Mesh(siteGeo, siteMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Site Plot boundary for 10 Katha
    // 10 Katha is 7,200 sqft. Let's model a 36m x 33.3m plot base (width=36m, depth=33.3m)
    const plotGrid = new THREE.GridHelper(180, 45, 0xd4af37, 0x111c30);
    plotGrid.position.y = 0.01;
    scene.add(plotGrid);

    // Helper function to draw rounded pill-shaped HTML labels or Canvas Text Sprites
    function roundRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    function createTextSprite(text, color = '#d4af37', bgColor = 'rgba(8, 12, 24, 0.92)') {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      
      // Draw background rounded capsule
      ctx.fillStyle = bgColor;
      roundRect(ctx, 4, 4, 504, 112, 16);
      ctx.fill();
      
      // Border
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      roundRect(ctx, 4, 4, 504, 112, 16);
      ctx.stroke();
      
      // Core Monospace Text
      ctx.fillStyle = '#ffffff';
      ctx.font = '22px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 60);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(15, 3.5, 1);
      return sprite;
    }

    // Dimension line logic with arrows and labels
    function createDimensionLine(p1, p2, color = 0xd4af37) {
      const dimGroup = new THREE.Group();
      const points = [p1, p2];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: color, linewidth: 2 });
      const line = new THREE.Line(geometry, material);
      dimGroup.add(line);

      // Attach tiny arrowheads
      const arrowMat = new THREE.MeshBasicMaterial({ color: color });
      const arrowGeo = new THREE.ConeGeometry(0.4, 1.2, 5);
      arrowGeo.rotateX(Math.PI / 2);

      const arrowStart = new THREE.Mesh(arrowGeo, arrowMat);
      arrowStart.position.copy(p1);
      arrowStart.lookAt(p2);

      const arrowEnd = new THREE.Mesh(arrowGeo, arrowMat);
      arrowEnd.position.copy(p2);
      arrowEnd.lookAt(p1);

      dimGroup.add(arrowStart, arrowEnd);
      return dimGroup;
    }

    // Set dynamic layers
    const structuralBaseGroup = new THREE.Group();
    const columnsGroup = new THREE.Group();
    const coreGroup = new THREE.Group();
    const flatsGroup = new THREE.Group();
    const roofGroup = new THREE.Group();
    const interactiveOverlayGroup = new THREE.Group();
    const completeBuildingGroup = new THREE.Group();

    // Materials definitions with authentic architectural texture looks
    const matSetbacks = new THREE.MeshStandardMaterial({ color: 0xd4af37, transparent: true, opacity: 0.12, wireframe: true });
    const matColumns = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5, metalness: 0.4, transparent: true, opacity: 1.0 });
    const matCoreArea = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5, metalness: 0.1, transparent: true, opacity: 1.0 });
    const matFrontFlats = new THREE.MeshStandardMaterial({ color: 0xb58e2d, transparent: true, opacity: 0.75, roughness: 0.3 }); // Unit A/B Golden
    const matRearFlats = new THREE.MeshStandardMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.75, roughness: 0.3 }); // Unit C/D Purple
    const matGlassCurtain = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.45, roughness: 0.05, metalness: 0.9 });
    const matLouvers = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, transparent: true, opacity: 1.0 });
    const matOasisTurf = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.9, transparent: true, opacity: 1.0 });
    const matSetbackDanger = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.15 });

    // 4 Distinct Slab types/materials to color-code vertical tiers of the G+9 tower (Clearly Visible & Understandable)
    const matSlabGround = new THREE.MeshStandardMaterial({ color: 0x111625, roughness: 0.95, transparent: true, opacity: 1.0 }); // Ground Floor Asphalt & Pavers
    const matSlabExecutive = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.70, transparent: true, opacity: 1.0 }); // Levels 1 to 3 Executive
    const matSlabPanoramic = new THREE.MeshStandardMaterial({ color: 0x3d301b, roughness: 0.50, transparent: true, opacity: 1.0 }); // Levels 4 to 7 Panoramic (Crema Beige look)
    const matSlabPenthouse = new THREE.MeshStandardMaterial({ color: 0x5c4c23, roughness: 0.30, metalness: 0.1, transparent: true, opacity: 1.0 }); // Levels 8 to 9 Penthouse (White & Gold)

    const floorHeight = 3.2; 
    const totalStoreys = 10;

    // 1. Plot Outlines & Setbacks (Ground)
    const wireframeGeo = new THREE.BoxGeometry(36, floorHeight * totalStoreys, 34);
    const setbackBox = new THREE.Mesh(wireframeGeo, matSetbacks);
    setbackBox.position.set(0, (floorHeight * totalStoreys) / 2, 0);
    structuralBaseGroup.add(setbackBox);

    // Highlight setback limits (MGC 60% compliance)
    const marginCover = new THREE.Mesh(new THREE.BoxGeometry(40, 0.1, 38), matSetbackDanger);
    marginCover.position.set(0, 0.05, 0);
    structuralBaseGroup.add(marginCover);

    // Adding Plot setbacks Dimension arrows
    const plotWidthArrow = createDimensionLine(new THREE.Vector3(-20, 0.2, 19), new THREE.Vector3(20, 0.2, 19), 0xd4af37);
    const plotLengthArrow = createDimensionLine(new THREE.Vector3(20, 0.2, -19), new THREE.Vector3(20, 0.2, 19), 0xd4af37);
    structuralBaseGroup.add(plotWidthArrow, plotLengthArrow);

    const sprite10Katha = createTextSprite("10-KATHA PLOT: 120 FT x 60 FT", "#d4af37");
    sprite10Katha.position.set(0, 1.2, 22);
    structuralBaseGroup.add(sprite10Katha);

    const spriteSetbacks = createTextSprite("RAJUK COMPLIANCE: 20% SETBACKS (MGC 60%)", "#ef4444");
    spriteSetbacks.position.set(0, 5, 0);
    structuralBaseGroup.add(spriteSetbacks);


    // 2. Pillars Grid
    const columnBaseGrid = [
      [-12, -14], [-4, -14], [4, -14], [12, -14],
      [-12, 0],   [-4, 0],   [4, 0],   [12, 0],
      [-12, 14],  [-4, 14],  [4, 14],  [12, 14]
    ];

    for (let tier = 0; tier < totalStoreys; tier++) {
      const currentY = tier * floorHeight;

      // Structural Column Tapering logic
      let colWidth = 1.3;
      let colDepth = 0.9;
      if (tier >= 4 && tier <= 6) { colWidth = 1.0; colDepth = 0.7; }
      else if (tier >= 7) { colWidth = 0.8; colDepth = 0.5; }

      columnBaseGrid.forEach((coord, idx) => {
        const colGeo = new THREE.BoxGeometry(colWidth, floorHeight - 0.02, colDepth);
        const colMesh = new THREE.Mesh(colGeo, matColumns);
        colMesh.position.set(coord[0], currentY + floorHeight / 2, coord[1]);
        colMesh.castShadow = true;
        colMesh.receiveShadow = true;
        columnsGroup.add(colMesh);

        // Label pillar size dynamically on a few columns in step 2
        if (idx === 7 && (tier === 1 || tier === 5 || tier === 8)) {
          let labelStr = "Pillar: " + colWidth + "m x " + colDepth + "m";
          const colLabel = createTextSprite(labelStr, "#cbd5e1", "rgba(15, 23, 42, 0.85)");
          colLabel.position.set(coord[0], currentY + floorHeight, coord[1] + 1.2);
          colLabel.scale.set(6, 1.6, 1);
          columnsGroup.add(colLabel);
        }
      });

      // G-Floor elements
      if (tier === 0) {
        const foyerGeo = new THREE.BoxGeometry(16, floorHeight, 18);
        const foyerMesh = new THREE.Mesh(foyerGeo, matGlassCurtain);
        foyerMesh.position.set(0, currentY + floorHeight / 2, 0);
        columnsGroup.add(foyerMesh);

        const mechWingGeo = new THREE.BoxGeometry(32, floorHeight, 6);
        const mechWing = new THREE.Mesh(mechWingGeo, matLouvers);
        mechWing.position.set(0, currentY + floorHeight / 2, -13);
        columnsGroup.add(mechWing);
      } else {
        // Elevator & Core Shaft blocks (Circulation Core)
        const coreBoxGeo = new THREE.BoxGeometry(7, floorHeight - 0.02, 10);
        const coreBoxMesh = new THREE.Mesh(coreBoxGeo, matCoreArea);
        coreBoxMesh.position.set(0, currentY + floorHeight / 2, 0);
        coreBoxMesh.castShadow = true;
        coreGroup.add(coreBoxMesh);

        // Unit A & B (SW/SE facing - Amber style)
        const unitAGeo = new THREE.BoxGeometry(12.5, floorHeight - 0.1, 13);
        const unitAMesh = new THREE.Mesh(unitAGeo, matFrontFlats);
        unitAMesh.position.set(-10.2, currentY + floorHeight / 2, 9.5);
        unitAMesh.castShadow = true;
        flatsGroup.add(unitAMesh);

        const unitBMesh = unitAMesh.clone();
        unitBMesh.position.x = 10.2;
        flatsGroup.add(unitBMesh);

        // balconies & louvers representation
        const frontRailGeo = new THREE.BoxGeometry(32.8, floorHeight - 0.8, 0.1);
        const frontRail = new THREE.Mesh(frontRailGeo, matGlassCurtain);
        frontRail.position.set(0, currentY + floorHeight / 2, 15.5);
        flatsGroup.add(frontRail);

        // Unit C & D (NW/NE facing - Orchid style)
        const unitCGeo = new THREE.BoxGeometry(12.5, floorHeight - 0.1, 11);
        const unitCMesh = new THREE.Mesh(unitCGeo, matRearFlats);
        unitCMesh.position.set(-10.2, currentY + floorHeight / 2, -10.5);
        unitCMesh.castShadow = true;
        flatsGroup.add(unitCMesh);

        const unitDMesh = unitCMesh.clone();
        unitDMesh.position.x = 10.2;
        flatsGroup.add(unitDMesh);

        // Aesthetic Louvers
        const slatGeo = new THREE.BoxGeometry(0.1, floorHeight - 0.1, 5);
        const lLeft = new THREE.Mesh(slatGeo, matLouvers);
        lLeft.position.set(-16.6, currentY + floorHeight / 2, 0);
        const lRight = lLeft.clone();
        lRight.position.x = 16.6;
        flatsGroup.add(lLeft, lRight);
      }

      // 4-Layers Color-coded vertical tiers of floor slabs
      let slabMat = matSlabExecutive;
      if (tier === 0) slabMat = matSlabGround;
      else if (tier >= 1 && tier <= 3) slabMat = matSlabExecutive;
      else if (tier >= 4 && tier <= 7) slabMat = matSlabPanoramic;
      else if (tier >= 8) slabMat = matSlabPenthouse;

      const floorSlabGeo = new THREE.BoxGeometry(33.8, 0.12, 31.8);
      const slabMesh = new THREE.Mesh(floorSlabGeo, slabMat);
      slabMesh.position.set(0, currentY + floorHeight, 0);
      slabMesh.receiveShadow = true;
      completeBuildingGroup.add(slabMesh);
    }

    // Active flowing lift simulation inside Core Group
    const elevatorCabMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.8 });
    const elevatorCabGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    
    const elevatorCab1 = new THREE.Mesh(elevatorCabGeo, elevatorCabMat);
    elevatorCab1.position.set(-1.8, 4, 2);
    coreGroup.add(elevatorCab1);

    const elevatorCab2 = new THREE.Mesh(elevatorCabGeo, elevatorCabMat);
    elevatorCab2.position.set(1.8, 16, 2);
    coreGroup.add(elevatorCab2);

    // Anchored Sprites for elevators core
    const coreMetricsSprite = createTextSprite("CIRCULATION CORE: DUAL EXPRESS TRACTION LIFT", "#2563eb");
    coreMetricsSprite.position.set(0, 36, 6);
    coreGroup.add(coreMetricsSprite);

    // Dimensions lines inside Central core
    const liftCoreArrow = createDimensionLine(new THREE.Vector3(-3.5, 33, 5), new THREE.Vector3(3.5, 33, 5), 0x2563eb);
    coreGroup.add(liftCoreArrow);

    // Tapering Columns grid description labels
    const taperingLabel = createTextSprite("BNBC CODES: COLUMN MATRIX TAPERING (1.3m to 0.8m)", "#38bdf8");
    taperingLabel.position.set(0, 35, -16);
    columnsGroup.add(taperingLabel);


    // 4. Typical Floor Splits and specifications
    const splitTagA = createTextSprite("UNIT A (SW): 920 SQ FT | 3 BEDROOMS", "#d4af37");
    splitTagA.position.set(-16, 22, 17);
    flatsGroup.add(splitTagA);

    const splitTagB = createTextSprite("UNIT B (SE): 920 SQ FT | 3 BEDROOMS", "#d4af37");
    splitTagB.position.set(16, 22, 17);
    flatsGroup.add(splitTagB);

    const splitTagC = createTextSprite("UNIT C (NW): 880 SQ FT | 3 BEDROOMS", "#a855f7");
    splitTagC.position.set(-16, 22, -17);
    flatsGroup.add(splitTagC);

    const splitTagD = createTextSprite("UNIT D (NE): 880 SQ FT | 3 BEDROOMS", "#a855f7");
    splitTagD.position.set(16, 22, -17);
    flatsGroup.add(splitTagD);

    // 5. G-Floor Parking specifications & car lots representation
    const parkingBaseGroup = new THREE.Group();
    columnsGroup.add(parkingBaseGroup);

    // Creating 10 distinct parking bays drawn onto the ground
    const bayMat = new THREE.LineBasicMaterial({ color: 0xd4af37, linewidth: 2 });
    for (let p = 0; p < 10; p++) {
      const posX = -15 + (p * 3.3);
      const points = [
        new THREE.Vector3(posX, 0.05, -8),
        new THREE.Vector3(posX + 2.5, 0.05, -8),
        new THREE.Vector3(posX + 2.5, 0.05, -3),
        new THREE.Vector3(posX, 0.05, -3),
        new THREE.Vector3(posX, 0.05, -8)
      ];
      const bayGeo = new THREE.BufferGeometry().setFromPoints(points);
      const bayLine = new THREE.Line(bayGeo, bayMat);
      parkingBaseGroup.add(bayLine);

      // Small numbering sprite
      const bayIdxSprite = createTextSprite("P" + (p + 1), "#ffffff", "rgba(5, 5, 5, 0.9)");
      bayIdxSprite.position.set(posX + 1.25, 0.1, -5.5);
      bayIdxSprite.scale.set(1.5, 0.5, 1);
      parkingBaseGroup.add(bayIdxSprite);
    }

    const pBayLabel = createTextSprite("10 CAR PARKING BAYS (5.0m x 2.5m STANDARD)", "#d4af37");
    pBayLabel.position.set(0, 1.5, -9);
    parkingBaseGroup.add(pBayLabel);


    // 6. Rooftop Sanctuary Elements
    const roofLevelY = totalStoreys * floorHeight;
    
    const oasisTurfGeo = new THREE.BoxGeometry(33.2, 0.1, 31.2);
    const oasisTurf = new THREE.Mesh(oasisTurfGeo, matOasisTurf);
    oasisTurf.position.set(0, roofLevelY + 0.05, 0);
    roofGroup.add(oasisTurf);

    // Beautiful pergola structure with beams
    const pergolaStructuralGeo = new THREE.BoxGeometry(12, 2.8, 14);
    const pergolaMesh = new THREE.Mesh(pergolaStructuralGeo, matLouvers);
    pergolaMesh.position.set(0, roofLevelY + 1.4, 0);
    pergolaMesh.castShadow = true;
    roofGroup.add(pergolaMesh);

    // Glass Balustrades
    const safetyGlassGeo = new THREE.BoxGeometry(33, 1.2, 31);
    const safetyGlass = new THREE.Mesh(safetyGlassGeo, matGlassCurtain);
    safetyGlass.position.set(0, roofLevelY + 0.6, 0);
    roofGroup.add(safetyGlass);

    // Solar panels representations (Active sustainable energy grid)
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e1e38, roughness: 0.1, metalness: 0.9 });
    const panelGeo = new THREE.BoxGeometry(4, 0.1, 2.5);
    for (let s = 0; s < 4; s++) {
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set(-10 + (s * 6.5), roofLevelY + 0.2, -10);
      panel.rotation.x = -0.3; // Tilt solar panels
      roofGroup.add(panel);
    }

    const roofSustainSprite = createTextSprite("15KW INTEGRATED SOLAR ARRAY - COMPLIANCE", "#10b981");
    roofSustainSprite.position.set(0, roofLevelY + 3.5, -10);
    roofGroup.add(roofSustainSprite);

    const roofOasisSprite = createTextSprite("COMMUNITY ROOFTOP GARDEN OASIS", "#34d399");
    roofOasisSprite.position.set(0, roofLevelY + 4, 3);
    roofGroup.add(roofOasisSprite);


    // Compose total hierarchical groups
    completeBuildingGroup.add(structuralBaseGroup);
    completeBuildingGroup.add(columnsGroup);
    completeBuildingGroup.add(coreGroup);
    completeBuildingGroup.add(flatsGroup);
    completeBuildingGroup.add(roofGroup);
    scene.add(completeBuildingGroup);

    let autoRotateActive = true;

    // Animation loop of lifts
    let liftTime = 0;

    window.focusStage = function(stageId, element) {
      const buttons = document.querySelectorAll('.step-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      if(element) {
        element.classList.add('active');
      } else {
        const activeBtn = document.getElementById('btn-' + stageId);
        if (activeBtn) activeBtn.classList.add('active');
      }

      autoRotateActive = false;

      // Notify React parent system cleanly
      window.parent.postMessage({ type: '3d-step', step: stageId }, '*');

      // Keep all architectural groups visible for fully interconnected representation 
      structuralBaseGroup.visible = true;
      columnsGroup.visible = true;
      coreGroup.visible = true;
      flatsGroup.visible = true;
      roofGroup.visible = true;

      // Reset all opacities first to fully solid
      matColumns.opacity = 1.0;
      matCoreArea.opacity = 1.0;
      matFrontFlats.opacity = 0.75;
      matRearFlats.opacity = 0.75;
      matLouvers.opacity = 1.0;
      matGlassCurtain.opacity = 0.45;
      matOasisTurf.opacity = 1.0;
      matSlabGround.opacity = 1.0;
      matSlabExecutive.opacity = 1.0;
      matSlabPanoramic.opacity = 1.0;
      matSlabPenthouse.opacity = 1.0;

      switch(stageId) {
        case 'step1': // Plot setbacks - Dim all upper residential systems to ghost layers
          matColumns.opacity = 0.05;
          matCoreArea.opacity = 0.05;
          matFrontFlats.opacity = 0.02;
          matRearFlats.opacity = 0.02;
          matLouvers.opacity = 0.05;
          matGlassCurtain.opacity = 0.03;
          matOasisTurf.opacity = 0.05;
          matSlabGround.opacity = 0.4;
          matSlabExecutive.opacity = 0.02;
          matSlabPanoramic.opacity = 0.02;
          matSlabPenthouse.opacity = 0.02;
          smoothCameraTransition(0, 32, 65, 0, 8, 0);
          break;
        case 'step2': // Column matrix - Set columns to full strength, others to faint dust outlines
          matColumns.opacity = 1.0;
          matCoreArea.opacity = 0.1;
          matFrontFlats.opacity = 0.02;
          matRearFlats.opacity = 0.02;
          matLouvers.opacity = 0.1;
          matGlassCurtain.opacity = 0.03;
          matOasisTurf.opacity = 0.05;
          matSlabGround.opacity = 0.1;
          matSlabExecutive.opacity = 0.1;
          matSlabPanoramic.opacity = 0.1;
          matSlabPenthouse.opacity = 0.1;
          smoothCameraTransition(-35, 18, 45, 0, 16, 0);
          break;
        case 'step3': // Elevator core - Core full opacity, rest translucent
          matColumns.opacity = 0.1;
          matCoreArea.opacity = 1.0;
          matFrontFlats.opacity = 0.02;
          matRearFlats.opacity = 0.02;
          matLouvers.opacity = 0.1;
          matGlassCurtain.opacity = 0.03;
          matOasisTurf.opacity = 0.05;
          matSlabGround.opacity = 0.1;
          matSlabExecutive.opacity = 0.1;
          matSlabPanoramic.opacity = 0.1;
          matSlabPenthouse.opacity = 0.1;
          smoothCameraTransition(15, 38, 38, 0, 15, 0);
          break;
        case 'step4': // Typical floors layout
          matColumns.opacity = 0.15;
          matCoreArea.opacity = 0.25;
          matFrontFlats.opacity = 0.85;
          matRearFlats.opacity = 0.85;
          matLouvers.opacity = 0.7;
          matGlassCurtain.opacity = 0.45;
          matOasisTurf.opacity = 0.1;
          matSlabGround.opacity = 0.15;
          matSlabExecutive.opacity = 0.85;
          matSlabPanoramic.opacity = 0.85;
          matSlabPenthouse.opacity = 0.85;
          smoothCameraTransition(42, 38, 48, 0, 18, 0);
          break;
        case 'step5': // Parking levels (Ground)
          matColumns.opacity = 0.4;
          matCoreArea.opacity = 0.15;
          matFrontFlats.opacity = 0.05;
          matRearFlats.opacity = 0.05;
          matLouvers.opacity = 0.2;
          matGlassCurtain.opacity = 0.05;
          matOasisTurf.opacity = 0.05;
          matSlabGround.opacity = 1.0;
          matSlabExecutive.opacity = 0.05;
          matSlabPanoramic.opacity = 0.05;
          matSlabPenthouse.opacity = 0.05;
          smoothCameraTransition(36, 10, 30, 0, 2, 0);
          break;
        case 'step6': // Garden roofscape
          matColumns.opacity = 0.1;
          matCoreArea.opacity = 0.1;
          matFrontFlats.opacity = 0.05;
          matRearFlats.opacity = 0.05;
          matLouvers.opacity = 0.3;
          matGlassCurtain.opacity = 0.3;
          matOasisTurf.opacity = 1.0;
          matSlabGround.opacity = 0.08;
          matSlabExecutive.opacity = 0.08;
          matSlabPanoramic.opacity = 0.08;
          matSlabPenthouse.opacity = 1.0;
          smoothCameraTransition(0, 48, 40, 0, 32, 0);
          break;
        case 'all':
        default:
          autoRotateActive = true;
          smoothCameraTransition(55, 50, 75, 0, 16, 0);
          break;
      }
    }

    function smoothCameraTransition(camX, camY, camZ, tarX, tarY, tarZ) {
      camera.position.set(camX, camY, camZ);
      controls.target.set(tarX, tarY, tarZ);
      controls.update();
    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      
      if (autoRotateActive) {
        completeBuildingGroup.rotation.y += 0.0012;
      } else {
        completeBuildingGroup.rotation.y = 0; // standard view lock
      }

      // Actively animate elevators
      liftTime += 0.015;
      elevatorCab1.position.y = 3 + Math.abs(Math.sin(liftTime)) * 26;
      elevatorCab2.position.y = 3 + Math.abs(Math.cos(liftTime + 1.5)) * 26;
      
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
      const w = container ? (container.clientWidth || window.innerWidth || 800) : window.innerWidth;
      const h = container ? (container.clientHeight || window.innerHeight || 600) : window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Sync messages from React parent controls to update active focus
    window.addEventListener('message', (e) => {
      if (e.data) {
        if (e.data.type === 'trigger-step') {
          const btn = document.getElementById('btn-' + e.data.step);
          window.focusStage(e.data.step, btn);
        }
        // Explicilty update on interactions or parent message triggers
        setTimeout(() => {
          const w = container ? (container.clientWidth || window.innerWidth || 800) : window.innerWidth;
          const h = container ? (container.clientHeight || window.innerHeight || 600) : window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }, 100);
      }
    });

    // Dismiss the internal loader once setup is fully initialized and render is ready
    setTimeout(() => {
      const loaderElement = document.getElementById('three-loader');
      if (loaderElement) {
        loaderElement.style.opacity = '0';
        loaderElement.style.visibility = 'hidden';
      }
    }, 450);

    animate();
  </script>
</body>
</html>
`;

export default function FloorPlan() {
  const [selectedFloor, setSelectedFloor] = useState<number>(1); // 0 = Ground Floor, 1-9 = Residential Floors
  const [selectedUnitId, setSelectedUnitId] = useState<string>('A');
  const [layoutViewMode, setLayoutViewMode] = useState<'blueprint' | 'three3d' | 'analytics'>('three3d');
  const [selectedThreeStep, setSelectedThreeStep] = useState<string>('all');
  const [isFullScreen3D, setIsFullScreen3D] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Available' | 'Reserved' | 'Sold'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredFlatId, setHoveredFlatId] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringUnit, setIsHoveringUnit] = useState(false);
  const [hoveredUnitData, setHoveredUnitData] = useState<VisualUnit | null>(null);
  const [hoveredStatus, setHoveredStatus] = useState<string>('');
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [isLoading3D, setIsLoading3D] = useState<boolean>(true);
  const [isLoading3DFullscreen, setIsLoading3DFullscreen] = useState<boolean>(true);

  // Generate a robust Blob URL of our 3D model template to guarantee successful browser parsing
  useEffect(() => {
    const blob = new Blob([ARCHITECTURAL_3D_HTML_BLOCK], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setIframeUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);
  
  // Interactive graph hover states
  const [activeLandSegment, setActiveLandSegment] = useState<number | null>(null);
  const [activePriceBar, setActivePriceBar] = useState<number | null>(null);

  const triggerIframeStep = (stepId: string) => {
    setSelectedThreeStep(stepId);
    
    // Dispatch to ordinary 3D canvas iframe
    const iframeNormal = document.getElementById('abrar-3d-iframe') as HTMLIFrameElement;
    if (iframeNormal && iframeNormal.contentWindow) {
      iframeNormal.contentWindow.postMessage({ type: 'trigger-step', step: stepId }, '*');
    }
    
    // Dispatch to fullscreen popup iframe
    const iframeFull = document.getElementById('abrar-3d-iframe-fullscreen') as HTMLIFrameElement;
    if (iframeFull && iframeFull.contentWindow) {
      iframeFull.contentWindow.postMessage({ type: 'trigger-step', step: stepId }, '*');
    }
  };

  // Monitor orbital visual step updates loaded securely
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === '3d-step') {
        setSelectedThreeStep(event.data.step);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Keyboard listener for escape shortcut to close immersion modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullScreen3D(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [liftState, setLiftState] = useState<{
    currentFloor: number;
    targetFloor: number;
    direction: 'up' | 'down' | 'idle';
    isMoving: boolean;
  }>({
    currentFloor: 1,
    targetFloor: 1,
    direction: 'idle',
    isMoving: false,
  });

  // Handle lift logic when floor changes
  useEffect(() => {
    if (selectedFloor !== liftState.currentFloor && !liftState.isMoving) {
      const direction = selectedFloor > liftState.currentFloor ? 'up' : 'down';
      setLiftState({
        currentFloor: liftState.currentFloor,
        targetFloor: selectedFloor,
        direction,
        isMoving: true,
      });

      // Animated movement simulation
      const duration = Math.abs(selectedFloor - liftState.currentFloor) * 350 + 350;
      const timer = setTimeout(() => {
        setLiftState({
          currentFloor: selectedFloor,
          targetFloor: selectedFloor,
          direction: 'idle',
          isMoving: false,
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [selectedFloor, liftState.currentFloor, liftState.isMoving]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 4 Unit templates matching the 10 Katha landscape design
  const bespokeUnits: VisualUnit[] = [
    {
      id: 'A',
      name: 'Residence Unit A',
      sizeSqFt: 920,
      bedrooms: 3,
      bathrooms: 2,
      verandas: 2,
      facing: 'South-West (Front Corner)',
      idealFor: 'Families desiring high front-exposure daylight and rich cross breezes',
      priceEstimate: '৳85 Lakh',
      basePriceNum: 85
    },
    {
      id: 'B',
      name: 'Residence Unit B',
      sizeSqFt: 920,
      bedrooms: 3,
      bathrooms: 2,
      verandas: 2,
      facing: 'South-East (Front Corner)',
      idealFor: 'Morning-light lovers holding high priority for sunrise and deep windflow',
      priceEstimate: '৳85 Lakh',
      basePriceNum: 85
    },
    {
      id: 'C',
      name: 'Residence Unit C',
      sizeSqFt: 880,
      bedrooms: 3,
      bathrooms: 2,
      verandas: 1,
      facing: 'North-West (Rear Privacy Corner)',
      idealFor: 'Privacy-oriented buyers requiring acoustic isolation and thermal calmness',
      priceEstimate: '৳79 Lakh',
      basePriceNum: 79
    },
    {
      id: 'D',
      name: 'Residence Unit D',
      sizeSqFt: 880,
      bedrooms: 3,
      bathrooms: 2,
      verandas: 1,
      facing: 'North-East (Rear Privacy Corner)',
      idealFor: 'Professionals seeking serene northern skylights and pleasant layouts',
      priceEstimate: '৳79 Lakh',
      basePriceNum: 79
    }
  ];

  // Static determinism for the 36 flats status & pricing (9 floors * 4 units = 36 flats)
  const getFlatStatus = (floor: number, unitCode: string): 'Available' | 'Reserved' | 'Sold' => {
    const sum = floor * 3 + unitCode.charCodeAt(0);
    const hash = sum % 7;
    if (hash === 1 || hash === 4) return 'Reserved';
    if (hash === 0 || hash === 3 || hash === 5) return 'Sold';
    return 'Available';
  };

  const getFlatReservedDates = (floor: number, unitCode: string): string[] => {
    const status = getFlatStatus(floor, unitCode);
    if (status === 'Available') return [];
    const day = ((floor * 7 + unitCode.charCodeAt(0)) % 20) + 5;
    const month = ((floor + unitCode.charCodeAt(0)) % 3) + 6; // June, July, August 2026
    return [
      `2026-0${month}-${day < 10 ? '0' + day : day}`,
      `2026-0${month}-${(day + 1) < 10 ? '0' + (day + 1) : (day + 1)}`,
      `2026-0${month}-${(day + 2) < 10 ? '0' + (day + 2) : (day + 2)}`
    ];
  };

  const getFlatPriceNum = (floor: number, basePrice: number): number => {
    // Floor premium rises by ৳0.5 Lakh per floor for level 2-5, and ৳0.8 Lakh per floor for level 6-9
    let premium = 0;
    if (floor > 1 && floor <= 5) {
      premium = (floor - 1) * 0.50;
    } else if (floor > 5) {
      premium = 4 * 0.50 + (floor - 5) * 0.85;
    }
    return Math.round((basePrice + premium) * 100) / 100;
  };

  // Generate the full database of all 36 flats
  const allFlats: FlatDetail[] = [];
  for (let floor = 1; floor <= 9; floor++) {
    const units = ['A', 'B', 'C', 'D'];
    units.forEach((u) => {
      const template = bespokeUnits.find(bu => bu.id === u)!;
      const flatIdNum = `${floor}0${units.indexOf(u) + 1}`;
      const finalPrice = getFlatPriceNum(floor, template.basePriceNum);
      const status = getFlatStatus(floor, u);
      allFlats.push({
        id: flatIdNum,
        floor,
        unitCode: u,
        flatName: `Flat #${flatIdNum}`,
        sizeSqFt: template.sizeSqFt,
        bedrooms: template.bedrooms,
        bathrooms: template.bathrooms,
        verandas: template.verandas,
        facing: template.facing,
        priceBDT: `৳${finalPrice.toFixed(2)} Lakh`,
        priceNum: finalPrice,
        status: status,
        idealFor: template.idealFor,
        ReservedDates: getFlatReservedDates(floor, u)
      });
    });
  }

  const activeUnit = bespokeUnits.find(u => u.id === selectedUnitId) || bespokeUnits[0];
  const activeFlatPrice = getFlatPriceNum(selectedFloor === 0 ? 1 : selectedFloor, activeUnit.basePriceNum);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Color definitions
    const cCharcoal = [15, 23, 42]; // #0f172a
    const cGold = [212, 175, 55]; // #d4af37
    const cSoftGray = [241, 245, 249];
    const cTextDark = [30, 41, 59];
    const cTextMuted = [100, 116, 139];

    // Page styling & margins
    const marginX = 20;
    
    // Draw charcoal header block
    doc.setFillColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
    doc.rect(0, 0, 210, 45, 'F');

    // Header Content
    doc.setTextColor(cGold[0], cGold[1], cGold[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('ABRAR TOWER - II', marginX, 18);

    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('BESPOKE ARCHITECTURAL LANDMARK // PRE-LAUNCH BROCHURE', marginX, 25);
    doc.text('LOCATION: EAST FAYDABAD, UTTARA RAJUK BOUNDS, DHAKA', marginX, 30);

    // Decorative gold line divider
    doc.setFillColor(cGold[0], cGold[1], cGold[2]);
    doc.rect(marginX, 43, 170, 0.8, 'F');

    // Apartment details
    doc.setTextColor(cTextDark[0], cTextDark[1], cTextDark[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(`Flat #${selectedFloor}0${['A', 'B', 'C', 'D'].indexOf(selectedUnitId) + 1}`, marginX, 60);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(cTextMuted[0], cTextMuted[1], cTextMuted[2]);
    doc.text(`Level 0${selectedFloor} // Unit Category ${selectedUnitId}`, marginX, 67);

    // Grid details box
    doc.setFillColor(cSoftGray[0], cSoftGray[1], cSoftGray[2]);
    doc.rect(marginX, 75, 170, 35, 'F');

    doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('KEY SPECIFICATIONS', marginX + 6, 82);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(cTextDark[0], cTextDark[1], cTextDark[2]);
    doc.text(`• Total Area: ${activeUnit.sizeSqFt} SQ FT`, marginX + 6, 89);
    doc.text(`• Bed Tiers: ${activeUnit.bedrooms} BHK Arrangement`, marginX + 6, 95);
    doc.text(`• Bathroom Suites: ${activeUnit.bathrooms} Luxury Baths`, marginX + 6, 101);

    doc.text(`• Orientation: ${activeUnit.facing}`, marginX + 85, 89);
    doc.text(`• Premium Slabs: Italian Statuario & Greek Marble`, marginX + 85, 95);
    doc.text(`• Natural Daylight Vent Index: Guaranteed Corner`, marginX + 85, 101);

    // Subtitle section
    doc.setFont('Helvetica', 'oblique');
    doc.setFontSize(11);
    doc.setTextColor(cGold[0], cGold[1], cGold[2]);
    doc.text(`"Recommended for: ${activeUnit.idealFor}"`, marginX, 122);

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, 128, 190, 128);

    // Architectural description header
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
    doc.text('ARCHITECTURAL SYNTHESIS', marginX, 137);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(cTextDark[0], cTextDark[1], cTextDark[2]);
    
    const textDesc = activeUnit.description || `Residence Category ${activeUnit.id} is a meticulously planned luxury residential apartment featuring premium layout details. Configured with a ${activeUnit.bedrooms} BHK spacious plan, ${activeUnit.bathrooms} bathrooms, and anti-skid premium floor finishes, this unit offers maximum space efficiency matching Dhaka RAJUK standards on a 10 Katha core plot footprint. Highly recommended for families seeking long-term quality, safety, and comfort.`;
    
    const splitDescription = doc.splitTextToSize(
      textDesc,
      170
    );
    doc.text(splitDescription, marginX, 144);

    // Highlights list
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
    doc.text('INTERIOR SPACE LAYOUT EXTRA HIGHLIGHTS', marginX, 170);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(cTextDark[0], cTextDark[1], cTextDark[2]);
    let currentY = 177;
    
    const listHighlights = activeUnit.highlights || [
      'Stator-equipped high capacity structural safety core layers',
      'Dual high-speed residential lift circulation core portals',
      'Fully compliant double-staircase emergency exit systems',
      'Anti-skid premium basalt flooring and wooden deck balconies'
    ];
    
    listHighlights.forEach((h: string) => {
      doc.text(`- ${h}`, marginX + 4, currentY);
      currentY += 6;
    });

    // Pricing & Reservation Estimate Box (Gold highlighted)
    doc.setFillColor(253, 250, 242);
    doc.setDrawColor(cGold[0], cGold[1], cGold[2]);
    doc.rect(marginX, 210, 170, 24, 'FD');

    doc.setTextColor(cGold[0], cGold[1], cGold[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('EXCLUSIVE RESERVATION VALUATION (Q2 2026 ESTIMATE)', marginX + 6, 216);

    doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(15);
    doc.text(`BDT ৳${activeFlatPrice.toFixed(2)} Lakhs`, marginX + 6, 225);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cTextMuted[0], cTextMuted[1], cTextMuted[2]);
    doc.text('* Exclusive of car parking spaces, gas/power connections, and central registry fees.', marginX + 6, 230);

    // Footer Block
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, 255, 190, 255);

    doc.setTextColor(cTextMuted[0], cTextMuted[1], cTextMuted[2]);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('This sheet is a digital specification card issued on behalf of Abrar Tower-2 Development, Chittagong & Dhaka Registry Office.', marginX, 262);
    doc.text('Official RAJUK registry coordinates are maintained under standard delta 10 katha plots codes. Double-glazing and structural standards apply.', marginX, 266);
    doc.text('PRE-LAUNCH REGISTRATION SECURED • STAMP CODE: ATX-2026-DHAKA', marginX, 273);

    // Save PDF
    doc.save(`Abrar_Tower_Flat_${selectedFloor}0${['A', 'B', 'C', 'D'].indexOf(selectedUnitId) + 1}_Brochure.pdf`);
  };

  // Filter & Search all 36 flats for the matrix & spreadsheet list
  const filteredFlats = allFlats.filter(flat => {
    const matchesStatus = filterStatus === 'All' || flat.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      flat.id.includes(searchQuery) || 
      flat.unitCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flat.facing.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getFloorName = (lvl: number) => {
    if (lvl === 0) return 'Ground Floor';
    return `Level ${lvl} (${lvl === 9 ? 'Top Residential' : 'Typical Floor'})`;
  };

  // 10 Katha land utilization details for data visualization
  const landAllocation = [
    { id: 1, label: '60% Building Footprint (MGC)', size: '4,320 sq ft', percentage: 60, color: '#d4af37', desc: 'Main tower frame, fire doors lobby, and elevators structural column core.' },
    { id: 2, label: '20% Side & Rear Permitted Setbacks', size: '1,440 sq ft', percentage: 20, color: '#16a34a', desc: 'Sufficient setbacks maintaining passive thermal insulation corridor breezes.' },
    { id: 3, label: '10% Gated Driveway & Pavers', size: '720 sq ft', percentage: 10, color: '#2563eb', desc: 'Entry vehicular bay leading to G-floor covered parking allotments.' },
    { id: 4, label: '10% Outdoor Peripheral Green Courtyard', size: '720 sq ft', percentage: 10, color: '#eab308', desc: 'Rainwater recharging grass bedding and peripheral flower boxes.' },
  ];

  const totalLandSqFt = 7200; // 10 Katha = 7,200 sq ft or 668.9 sqm

  // Count availability stats for our 36 flats
  const totalFlatsCount = allFlats.length; // 36
  const availableCount = allFlats.filter(f => f.status === 'Available').length;
  const reservedCount = allFlats.filter(f => f.status === 'Reserved').length;
  const soldCount = allFlats.filter(f => f.status === 'Sold').length;

  return (
    <section id="floorplan" className="py-24 md:py-32 bg-neutral-950 text-white relative border-t border-neutral-900 overflow-hidden">
      {/* FULLSCREEN 3D CINEMATIC IMMERSION MODAL */}
      <AnimatePresence>
        {isFullScreen3D && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#05070f] z-[99999] flex flex-col md:flex-row overflow-hidden font-sans text-white"
          >
            {/* Immersive Overlay Sidebar Panel */}
            <div className="w-full md:w-[360px] bg-neutral-950/95 border-r border-[#1a1a1a] md:h-screen p-6 flex flex-col justify-between z-10 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-900">
                  <div>
                    <h2 className="font-serif text-lg text-gold-400">Abrar Tower 3D</h2>
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block mt-0.5">Architectural Portal</span>
                  </div>
                  <button 
                    onClick={() => setIsFullScreen3D(false)}
                    className="p-1.5 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-850 rounded border border-neutral-800 transition-all cursor-pointer flex items-center justify-center"
                    title="Exit Fullscreen"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-[#777] uppercase block mb-3">
                      Operational Layers
                    </span>
                    <div className="space-y-2">
                      {[
                        { id: 'all', title: '[0] Exterior Profile', d: 'Complete 10-storey landmark representation in WebGL 3D, showcasing natural Dhaka delta light and building facades.' },
                        { id: 'step1', title: '[1] 10-Katha Setbacks', d: 'Analyze the plot bounds dimensions: 120 ft x 60 ft. Highlights maximum ground coverage (MGC 60%) to meet RAJUK standards.' },
                        { id: 'step2', title: '[2] Structural Columns Grid', d: 'Inspect Cast-In-Situ pillars matrix with tapering logic of lower Level 1-3 pillars (1.3m x 0.9m), typical ones, down to upper Level 7 (0.8m).' },
                        { id: 'step3', title: '[3] Elevator & Stairs Core', d: 'Circulation hub with dual high-speed express elevators moving lift locations up/down with animated glowing indicator lights.' },
                        { id: 'step4', title: '[4] Typical Floor Splitting', d: 'Only 4 corner apartments per level to secure personal privacy, sizing 920 & 880 sqft and their spatial dimensions.' },
                        { id: 'step5', title: '[5] Parking Layout Bay', d: 'Ground floor covered garage featuring exactly 10 parking slots labeled P1 to P10 with standard spacing layouts.' },
                        { id: 'step6', title: '[6] Rooftop Green Oasis', d: 'Premium communal sky lawn cooling the building structures, complete with shading pergolas and integrated solar cell panels.' },
                      ].map((s) => {
                        const isSel = selectedThreeStep === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => triggerIframeStep(s.id)}
                            className={`w-full p-2.5 rounded text-left transition-all cursor-pointer border flex flex-col gap-1 ${
                              isSel 
                                ? 'bg-neutral-900 border-gold-400/40 text-gold-300' 
                                : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-mono text-xs font-semibold">{s.title}</span>
                              {isSel && <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />}
                            </div>
                            <p className="text-[10px] text-neutral-400 font-light leading-relaxed font-sans">{s.d}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-900 mt-6 text-2xs font-mono text-neutral-500 flex justify-between items-center">
                <span>DRAG ROTATE • ZOOM</span>
                <span className="text-gold-400 font-bold">ABRAR TOWER-2</span>
              </div>
            </div>

            {/* Immersive 3D Render Host inside Fullscreen overlay */}
            <div className="flex-1 h-full bg-[#05070f] relative">
              {isLoading3DFullscreen && (
                <div className="absolute inset-0 z-40 bg-[#05070f] flex flex-col items-center justify-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-solid border-gold-400 border-t-transparent rounded-full animate-spin"></div>
                    <Compass className="absolute text-gold-400 animate-pulse" size={24} />
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-serif text-gold-300 font-semibold tracking-wide">Cinematic Immersion Portal</h4>
                    <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Booting 10-Storey Landmark Visualization...</p>
                  </div>
                </div>
              )}
              <iframe
                id="abrar-3d-iframe-fullscreen"
                title="3D Cinematic Walkthrough"
                className="w-full h-full border-none bg-[#05070f] block"
                referrerPolicy="no-referrer"
                srcDoc={ARCHITECTURAL_3D_HTML_BLOCK}
                onLoad={(e) => {
                  setIsLoading3DFullscreen(false);
                  try {
                    const iframe = e.currentTarget;
                    if (iframe.contentWindow) {
                      iframe.contentWindow.dispatchEvent(new Event('resize'));
                    }
                  } catch (err) {
                    console.warn(err);
                  }
                }}
              />
              
              <div className="absolute bottom-5 right-5 pointer-events-none bg-neutral-950/80 border border-neutral-800 text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded text-neutral-400">
                Press [Esc] or click Close to Return
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background grids & elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-neutral-800/10 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-900" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs text-gold-400 tracking-[0.3em] uppercase block mb-3">
            ARCHITECTURAL DESIGN & ANALYTICS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-none mb-4">
            The 36-Flat Tower Matrix
          </h2>
          <div className="w-16 h-[1px] bg-gold-400 mb-6" />
          <p className="font-sans text-neutral-400 font-light text-sm md:text-base leading-relaxed">
            Abrar Tower-2 is strategically seated over a **10 Katha (7,200 sq ft)** premium land plot. The tower comprises exactly **36 family flats** across 9 residential floors, maintaining a highly exclusive footprint of **4 corner flats per floor**. Select between typical floor drawings or our interactive statistics chart below.
          </p>
        </div>

        {/* View Mode Switch Row */}
        <div className="mb-10 flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center border-b border-neutral-900 pb-6">
          <div className="p-1 bg-neutral-900/80 rounded-lg inline-flex flex-wrap gap-1 border border-neutral-850">
            <button
              onClick={() => setLayoutViewMode('three3d')}
              className={`px-4 py-2 rounded text-xs font-mono transition-all uppercase tracking-wider cursor-pointer flex items-center gap-2 ${
                layoutViewMode === 'three3d'
                  ? 'bg-gold-400 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building2 size={13} />
              Interactive 3D Model
            </button>
            <button
              onClick={() => setLayoutViewMode('blueprint')}
              className={`px-4 py-2 rounded text-xs font-mono transition-all uppercase tracking-wider cursor-pointer flex items-center gap-2 ${
                layoutViewMode === 'blueprint'
                  ? 'bg-gold-400 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layout size={13} />
              Floor Blueprint (CAD)
            </button>
            <button
              onClick={() => setLayoutViewMode('analytics')}
              className={`px-4 py-2 rounded text-xs font-mono transition-all uppercase tracking-wider cursor-pointer flex items-center gap-2 ${
                layoutViewMode === 'analytics'
                  ? 'bg-gold-400 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <TrendingUp size={13} />
              36-Flat & 10 Katha Analytics
            </button>
          </div>

          <div className="flex gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span>{availableCount} Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500" />
              <span>{reservedCount} Reserved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-neutral-700" />
              <span>{soldCount} Sold</span>
            </div>
          </div>
        </div>

        {/* VIEW 0: 3D INTERACTIVE BUILD MASTER MODEL */}
        {layoutViewMode === 'three3d' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start duration-500 animate-in fade-in mb-16">
            {/* 3D CANVAS PORT */}
            <div className="lg:col-span-8 bg-neutral-900/40 rounded-xl border border-neutral-850 overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-500">
              {/* HUD Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-850 bg-neutral-950/70">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                    MODEL RENDER PORT // ISOLATED 3D
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex text-[9px] font-mono text-neutral-500 uppercase tracking-widest items-center gap-1.5">
                    <Compass size={11} className="text-gold-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                    DRAG TO ROTATE • ZOOM
                  </div>
                  <button 
                    onClick={() => setIsFullScreen3D(true)}
                    className="p-1.5 px-3 rounded bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-xs"
                    title="Engage Cinematic Screen"
                  >
                    <svg className="w-3 h-3 text-gold-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
                    </svg>
                    Cinematic Fullscreen
                  </button>
                </div>
              </div>

              {/* WebGL Hosting */}
              <div className="w-full relative h-[600px] bg-neutral-950">
                {isLoading3D && (
                  <div className="absolute inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center space-y-4">
                    <div className="relative flex items-center justify-center">
                      <div className="w-16 h-16 border-2 border-solid border-gold-400 border-t-transparent rounded-full animate-spin"></div>
                      <Compass className="absolute text-gold-400 animate-pulse" size={24} />
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-serif text-gold-300 font-semibold tracking-wide">Initializing 3D Engine</h4>
                      <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Readying WebGL Shaders & Canvas Matrix...</p>
                    </div>
                  </div>
                )}
                <iframe
                  id="abrar-3d-iframe"
                  title="3D Architectural Model"
                  className="w-full h-full border-none bg-neutral-950 block"
                  referrerPolicy="no-referrer"
                  srcDoc={ARCHITECTURAL_3D_HTML_BLOCK}
                  onLoad={(e) => {
                    setIsLoading3D(false);
                    try {
                      const iframe = e.currentTarget;
                      if (iframe.contentWindow) {
                        iframe.contentWindow.dispatchEvent(new Event('resize'));
                      }
                    } catch (err) {
                      console.warn(err);
                    }
                  }}
                />
              </div>
            </div>

            {/* SIDEBAR DESCRIPTION CONTROLS */}
            <div className="lg:col-span-4 bg-neutral-900/30 p-6 rounded-xl border border-neutral-850 self-stretch flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles size={11} className="text-gold-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest leading-none">
                    3D SPECIFICATION LOG
                  </span>
                </div>

                {/* Dynamic Content based on selectedThreeStep */}
                {selectedThreeStep === 'all' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-serif text-xl font-normal text-white mb-3">Full Master Plan Grid</h3>
                    <div className="text-xs text-neutral-400 font-sans leading-relaxed space-y-3 font-light mb-4">
                      <p>
                        Abrar Tower-2 stands as an architectural pride in East Faydabad, designed meticulously to accommodate exactly **36 families** (9 typical residential levels with 4 units each).
                      </p>
                      <p>
                        Strategically seated on a premier **10 Katha (7,200 sqft)** real estate base, the structural outline maximizes daylight penetration and natural Dhaka delta ventilation.
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-950/80 rounded border border-neutral-850 text-[11px] font-mono space-y-1.5 text-neutral-400">
                      <div className="flex justify-between">
                        <span>STOREYS:</span>
                        <span className="text-white font-bold">10 STOREYS (G+9)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FAMILY FLATS:</span>
                        <span className="text-white font-bold">36 Corner Apartments</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PLOT REGISTRY:</span>
                        <span className="text-white font-bold">10 Katha / 7,200 SQ FT</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedThreeStep === 'step1' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-serif text-xl font-normal text-white mb-3">Plot Boundaries & Setbacks</h3>
                    <div className="text-xs text-neutral-400 font-sans leading-relaxed space-y-3 font-light mb-4">
                      <p>
                        Displays the true 10-Katha plot wireframe boundary. Rajuk building compliance mandates a **maximum ground coverage (MGC) of 60%**.
                      </p>
                      <p>
                        An intentional **20% side & rear setback** of 1,440 sq ft acts as a natural wind microclimate, driving cross breezes and securing clear emergency exit passageways.
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-950/80 rounded border border-neutral-850 text-[11px] font-mono space-y-1.5 text-neutral-400">
                      <div className="flex justify-between">
                        <span>MAX COVERAGE (60%):</span>
                        <span className="text-white font-semibold">4,320 SQ FT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PLOT SETBACKS (20%):</span>
                        <span className="text-emerald-400 font-semibold font-bold">1,440 SQ FT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>COMPLIANCE INDEX:</span>
                        <span className="text-white font-mono">100% RAJUK STANDARD</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedThreeStep === 'step2' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-serif text-xl font-normal text-white mb-3">Tapering Structure Matrix</h3>
                    <div className="text-xs text-neutral-400 font-sans leading-relaxed space-y-3 font-light mb-4">
                      <p>
                        Witness the core cast-in-situ columns grid. Columns taper inward dynamically from **1.3m on Level 1-3** down to **0.8m limit above Level 7**.
                      </p>
                      <p>
                        This advanced tapering ensures supreme heavy-load seismic dampening on lower layers, while expanding the net habitable room volumes for upper-level buyers.
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-950/80 rounded border border-neutral-850 text-[11px] font-mono space-y-1.5 text-neutral-400">
                      <div className="flex justify-between">
                        <span>LOWER PILLARS (L1-L3):</span>
                        <span className="text-white">1.3m Depth Frame</span>
                      </div>
                      <div className="flex justify-between">
                        <span>UPPER PILLARS (L7+):</span>
                        <span className="text-white">0.8m Light Frame</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SEISMIC LEVEL:</span>
                        <span className="text-gold-400 font-semibold font-bold">BNBC Zone-2 Dhaka</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedThreeStep === 'step3' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-serif text-xl font-normal text-white mb-3">Concrete Circulation Hub</h3>
                    <div className="text-xs text-neutral-400 font-sans leading-relaxed space-y-3 font-light mb-4">
                      <p>
                        The building's mechanical and central vertical circulation spine, styled here in bright commercial Royal Blue.
                      </p>
                      <p>
                        Guards dual high-speed elevators (Express Lifts), pressurized backup fire escape stairs, and utility riser ducts, providing 40dB acoustic containment.
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-950/80 rounded border border-neutral-850 text-[11px] font-mono space-y-1.5 text-neutral-400">
                      <div className="flex justify-between">
                        <span>ELEVATOR COPIES:</span>
                        <span className="text-white">2 x High-Speed Traction</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ACOUSTIC SHIELD:</span>
                        <span className="text-white">9-inch Concrete Wall</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EMERGENCY ACCESS:</span>
                        <span className="text-gold-400 font-semibold font-bold">Fire-Rated Stairs</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedThreeStep === 'step4' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-serif text-xl font-normal text-white mb-3">Bespoke Floor Splitting</h3>
                    <div className="text-xs text-neutral-400 font-sans leading-relaxed space-y-3 font-light mb-4">
                      <p>
                        Abrar Tower-2 maintains the absolute limit in privacy by featuring only 4 units per level, with zero shared common suite walls.
                      </p>
                      <div className="space-y-2 pt-2 text-[11px] font-mono border-t border-neutral-800">
                        <div className="flex gap-2 items-center">
                          <span className="w-2.5 h-2.5 rounded bg-[#d4af37] shrink-0" />
                          <span className="text-neutral-300">Units A & B (920 sqft): South Facing</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="w-2.5 h-2.5 rounded bg-[#a855f7] shrink-0" />
                          <span className="text-neutral-300">Units C & D (880 sqft): Quiet North Corner</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedThreeStep === 'step5' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-serif text-xl font-normal text-white mb-3">Parking & Utility Bays</h3>
                    <div className="text-xs text-neutral-400 font-sans leading-relaxed space-y-3 font-light mb-4">
                      <p>
                        Designed as a highly secure entrance bay. Features exactly 10 spacious car parking slots, heavy security gated barriers, and a professional reception lobby.
                      </p>
                      <p>
                        Features a dedicated fire substation segment and high-voltage generator zone isolated to the rear plot quadrant.
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-950/80 rounded border border-neutral-850 text-[11px] font-mono space-y-1.5 text-neutral-400">
                      <div className="flex justify-between">
                        <span>COVERED PARKING:</span>
                        <span className="text-white">10 Allowed Bays</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SUBSTATION:</span>
                        <span className="text-white">100 KVA Generator Room</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedThreeStep === 'step6' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-serif text-xl font-normal text-white mb-3">Roof Green Oasis</h3>
                    <div className="text-xs text-neutral-400 font-sans leading-relaxed space-y-3 font-light mb-4">
                      <p>
                        An exquisite community sky sanctuary designed with dense botanical setups that naturally cool the entire building's structure.
                      </p>
                      <p>
                        Equipped with elegant timber pergolas, beautiful surrounding tempered glass protective panels, and seating spaces for community socials.
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-950/80 rounded border border-neutral-850 text-[11px] font-mono space-y-1.5 text-neutral-400">
                      <div className="flex justify-between">
                        <span>ROOF TURF LAYER:</span>
                        <span className="text-[#10b981] font-bold">Insulated Thermal Lawn</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PROTECTIVE BALUSTRADE:</span>
                        <span className="text-white">Tempered Safety Glass</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <a 
                  href="#contact"
                  className="w-full text-center block px-4 py-3 bg-neutral-950 hover:bg-neutral-900 border border-gold-400/20 hover:border-gold-400/50 rounded font-mono text-2xs uppercase tracking-widest text-gold-300 font-semibold transition-all cursor-pointer"
                >
                  Book A Consult Now
                </a>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 1: INTERACTIVE BLUEPRINT PANEL */}
        {layoutViewMode === 'blueprint' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* LIFT CONTROL & VERTICAL STACK */}
            <div className="xl:col-span-3 bg-neutral-900/30 p-5 rounded-xl border border-neutral-850 flex flex-col gap-6">
              
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#777] uppercase block mb-3">
                  VERTICAL ELEVATION SHAFT
                </span>
                {/* Virtual Lift HUD */}
                <div className="bg-neutral-950/90 rounded-lg border border-neutral-850 p-4 font-mono text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gold-400/50 animate-pulse" />
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-neutral-400 uppercase">ELEVATOR CAR</span>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SYSTEM READY
                    </span>
                  </div>
                  
                  {/* Virtual elevator motion block */}
                  <div className="my-4 flex items-center justify-center gap-4">
                    <ArrowUp 
                      size={20} 
                      className={`transition-all duration-300 ${
                        liftState.direction === 'up' ? 'text-gold-400 translate-y-[-4px] animate-pulse' : 'text-neutral-800'
                      }`} 
                    />
                    <div className="bg-neutral-900 px-4 py-2 border border-neutral-800 rounded font-serif text-3xl font-extrabold tracking-widest text-white min-w-[70px]">
                      {liftState.isMoving ? (
                        <span className="animate-pulse">{liftState.targetFloor === 0 ? 'GF' : `0${liftState.targetFloor}`}</span>
                      ) : (
                        selectedFloor === 0 ? 'GF' : `0${selectedFloor}`
                      )}
                    </div>
                    <ArrowDown 
                      size={20} 
                      className={`transition-all duration-300 ${
                        liftState.direction === 'down' ? 'text-gold-400 translate-y-[4px] animate-pulse' : 'text-neutral-800'
                      }`} 
                    />
                  </div>

                  <div className="text-[9px] text-neutral-500 uppercase tracking-widest">
                    {liftState.isMoving ? 'Ascending/Descending Shaft...' : 'Locked At Floor Lobby'}
                  </div>
                </div>
              </div>

              {/* Vertical level selector stack */}
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-neutral-850 pb-2">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
                    SELECT BUILDING LAYER
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-mono text-neutral-400">JUMP:</span>
                    <select
                      value={selectedFloor}
                      onChange={(e) => setSelectedFloor(Number(e.target.value))}
                      className="bg-neutral-950 border border-neutral-800 rounded px-1.5 py-0.5 text-[10px] font-mono text-gold-300 focus:outline-none focus:border-gold-400 cursor-pointer"
                    >
                      {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((lvl) => (
                        <option key={lvl} value={lvl} className="bg-neutral-900 text-white">
                          {lvl === 0 ? 'Ground' : `Level 0${lvl}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((lvl) => {
                    const isActive = selectedFloor === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedFloor(lvl)}
                        className={`w-full py-2 px-3 rounded text-left font-mono text-xs transition-all duration-200 flex items-center justify-between cursor-pointer border ${
                          isActive
                            ? 'bg-gold-400 text-neutral-950 font-semibold border-gold-400 shadow-md'
                            : 'bg-neutral-950/40 text-neutral-400 border-neutral-900 hover:text-white hover:border-neutral-800 hover:bg-neutral-900/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building2 size={12} className={isActive ? 'text-neutral-950' : 'text-neutral-500'} />
                          <span>{lvl === 0 ? 'Ground level (GF)' : `Level 0${lvl}`}</span>
                        </div>
                        <span className={`text-[9px] uppercase font-sans ${isActive ? 'text-neutral-900 font-bold' : 'text-gold-400/80'}`}>
                          {lvl === 0 ? 'Lobby / Park' : '4 Corner Flats'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* INTERACTIVE CAD BLUEPRINT CANVAS */}
            <div className="xl:col-span-6 bg-neutral-900/60 p-6 rounded-xl border border-neutral-850 flex flex-col justify-between self-stretch relative">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-neutral-850 pb-4">
                  <div>
                    <h3 className="font-serif text-lg text-white font-medium">
                      {getFloorName(selectedFloor)} Blueprint View
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-mono mt-0.5 uppercase tracking-wider">
                      10 Katha Land Footprint // Rajuk Code Compliant
                    </p>
                  </div>
                  <span className="text-[9px] bg-neutral-950 text-neutral-400 px-2.5 py-1 rounded font-mono border border-neutral-850 uppercase tracking-widest">
                    Typical CAD Layout
                  </span>
                </div>

                {/* SVG Blueprint Design */}
                <div 
                  onMouseMove={handleMouseMove}
                  className="relative border border-neutral-850 bg-neutral-950 rounded-lg p-6 max-w-[460px] mx-auto overflow-hidden transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 500 500"
                    className="w-full h-auto text-neutral-300 select-none transition-transform duration-500 origin-center"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  >
                    <defs>
                      <pattern id="card-blueprint-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#161616" strokeWidth="0.8" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#card-blueprint-grid)" />

                    {/* Outer building boundaries */}
                    <rect x="20" y="20" width="460" height="460" fill="none" stroke="#333" strokeWidth="2.5" />

                    {/* Central Lift & Stairs Circulation Hub */}
                    <g id="blueprint-stairs-lift">
                      <rect x="180" y="180" width="140" height="140" fill="#141414" stroke="#444" strokeWidth="1.5" />
                      
                      {/* Double elevator system */}
                      <rect x="190" y="190" width="23" height="50" fill={liftState.isMoving ? '#211d17' : '#181818'} stroke={liftState.isMoving ? '#d4af37' : '#555'} strokeWidth="1" />
                      <line x1="201" y1="190" x2="201" y2="240" stroke="#444" strokeWidth="0.5" />
                      <text x="201" y="220" textAnchor="middle" className="font-mono text-[7px]" fill={liftState.isMoving ? '#d4af37' : '#666'}>L1</text>

                      <rect x="217" y="190" width="23" height="50" fill={liftState.isMoving ? '#211d17' : '#181818'} stroke={liftState.isMoving ? '#d4af37' : '#555'} strokeWidth="1" />
                      <text x="228" y="220" textAnchor="middle" className="font-mono text-[7px]" fill={liftState.isMoving ? '#d4af37' : '#666'}>L2</text>

                      {/* Main Emergency Stairwell */}
                      <rect x="255" y="190" width="55" height="50" fill="#1c1c1c" stroke="#555" strokeWidth="1" />
                      {[196, 203, 210, 217, 224, 231, 238].map((sy, i) => (
                        <line key={i} x1="255" y1={sy} x2="310" y2={sy} stroke="#333" strokeWidth="0.8" />
                      ))}
                      <text x="282" y="218" textAnchor="middle" className="font-mono text-[5px]" fill="#666">STAIRWELL</text>

                      {/* Corridor lobby walkway */}
                      <rect x="180" y="280" width="140" height="40" fill="#1b1b1b" stroke="#333" strokeWidth="1" />
                      <text x="250" y="303" textAnchor="middle" className="font-mono text-[8px]" fill="#888">COMMON LOBBY</text>
                    </g>

                    {/* Ground Floor visual details */}
                    {selectedFloor === 0 && (
                      <g id="gf-parking-spots">
                        <rect x="28" y="28" width="130" height="130" fill="rgba(212,175,55,0.02)" stroke="#b8946f" strokeWidth="1" strokeDasharray="3,3" />
                        <text x="93" y="90" textAnchor="middle" className="font-serif text-[10px]" fill="#d4af37">RECEPTION DESK</text>
                        <text x="93" y="105" textAnchor="middle" className="font-mono text-[6px]" fill="#666">Common Entrance Lounge</text>

                        {/* Covered parking spaces representing 10 slots */}
                        <rect x="340" y="28" width="130" height="130" fill="#171717" stroke="#444" strokeWidth="1" />
                        <text x="405" y="93" textAnchor="middle" className="font-serif text-[10px]" fill="#ccc">Substation Hub</text>

                        {/* Left & Right driveways on the 10 Katha layout */}
                        <rect x="28" y="325" width="132" height="132" fill="#111" stroke="#333" strokeWidth="1" />
                        <text x="94" y="390" textAnchor="middle" className="font-mono text-[8px]" fill="#555">PARKING SPOTS P1-P4</text>

                        <rect x="340" y="325" width="132" height="132" fill="#111" stroke="#333" strokeWidth="1" />
                        <text x="406" y="390" textAnchor="middle" className="font-mono text-[8px]" fill="#555">PARKING SPOTS P5-P8</text>
                      </g>
                    )}

                    {/* Residential Levels 1 to 9 (4 corners: A, B, C, D) */}
                    {selectedFloor > 0 && (
                      <g id="residential-apartment-cores">
                        {/* Unit A: South-West Corner (Front) */}
                        <g 
                          onClick={() => setSelectedUnitId('A')}
                          onMouseEnter={() => {
                            setHoveredZone('A');
                            setIsHoveringUnit(true);
                            const dat = bespokeUnits.find(u => u.id === 'A')!;
                            setHoveredUnitData(dat);
                            setHoveredStatus(getFlatStatus(selectedFloor, 'A'));
                          }}
                          onMouseLeave={() => {
                            setHoveredZone(null);
                            setIsHoveringUnit(false);
                            setHoveredUnitData(null);
                          }}
                          className="cursor-pointer transition-all duration-300 transform hover:scale-[1.015] origin-bottom-left"
                        >
                          <rect 
                            x="25" 
                            y="320" 
                            width="145" 
                            height="145" 
                            fill={selectedUnitId === 'A' ? 'rgba(212,175,55,0.12)' : hoveredZone === 'A' ? 'rgba(212,175,55,0.04)' : '#161616'} 
                            stroke={selectedUnitId === 'A' ? '#d4af37' : hoveredZone === 'A' ? '#b8946f' : '#2e2e2e'} 
                            strokeWidth="1.5"
                          />
                          {/* CAD Room Partitions for Unit A */}
                          <g stroke={selectedUnitId === 'A' ? 'rgba(212,175,55,0.45)' : '#2d2d2d'} strokeWidth="0.8" fill="none">
                            <line x1="25" y1="390" x2="90" y2="390" />
                            <line x1="90" y1="390" x2="90" y2="465" />
                            <line x1="25" y1="360" x2="65" y2="360" />
                            <line x1="65" y1="360" x2="65" y2="390" />
                            <line x1="90" y1="410" x2="135" y2="410" />
                            <line x1="135" y1="410" x2="135" y2="465" />
                            <line x1="65" y1="320" x2="65" y2="350" />
                            <line x1="25" y1="350" x2="95" y2="350" />
                            <line x1="135" y1="395" x2="170" y2="395" />
                            <line x1="135" y1="320" x2="135" y2="355" />
                          </g>
                          <g fill={selectedUnitId === 'A' ? '#d4af37' : '#777'} fontSize="4.5" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                            <text x="57" y="425" fontWeight="bold">M. BED</text>
                            <text x="45" y="377">TOILET 1</text>
                            <text x="112" y="440">BED 2</text>
                            <text x="152" y="415">KITCHEN</text>
                            <text x="132" y="340" fontSize="5" fontWeight="bold">LIV / DINING</text>
                            <text x="80" y="337">TOILET 2</text>
                            <text x="17" y="425" fontSize="3.5">BALC</text>
                          </g>

                          <text x="97" y="365" textAnchor="middle" className="font-serif text-[9px] font-bold" fill={selectedUnitId === 'A' ? '#d4af37' : '#aaa'}>
                            Flat {selectedFloor}A
                          </text>
                          <text x="97" y="375" textAnchor="middle" className="font-mono text-[5px]" fill="#555">
                            920 SQ FT // 3 Bed 2 Bath
                          </text>

                          {/* Unit status tag visual circle */}
                          <circle cx="45" cy="340" r="3" fill={
                            getFlatStatus(selectedFloor, 'A') === 'Available' ? '#10b981' : 
                            getFlatStatus(selectedFloor, 'A') === 'Reserved' ? '#f59e0b' : '#3f3f46'
                          } />
                          <text x="52" y="342" className="font-mono text-[5.5px]" fill="#777">{getFlatStatus(selectedFloor, 'A')}</text>
                        </g>

                        {/* Unit B: South-East Corner (Front) */}
                        <g 
                          onClick={() => setSelectedUnitId('B')}
                          onMouseEnter={() => {
                            setHoveredZone('B');
                            setIsHoveringUnit(true);
                            const dat = bespokeUnits.find(u => u.id === 'B')!;
                            setHoveredUnitData(dat);
                            setHoveredStatus(getFlatStatus(selectedFloor, 'B'));
                          }}
                          onMouseLeave={() => {
                            setHoveredZone(null);
                            setIsHoveringUnit(false);
                            setHoveredUnitData(null);
                          }}
                          className="cursor-pointer transition-all duration-300 transform hover:scale-[1.015] origin-bottom-right"
                        >
                          <rect 
                            x="330" 
                            y="320" 
                            width="145" 
                            height="145" 
                            fill={selectedUnitId === 'B' ? 'rgba(212,175,55,0.12)' : hoveredZone === 'B' ? 'rgba(212,175,55,0.04)' : '#161616'} 
                            stroke={selectedUnitId === 'B' ? '#d4af37' : hoveredZone === 'B' ? '#b8946f' : '#2e2e2e'} 
                            strokeWidth="1.5"
                          />
                          {/* CAD Room Partitions for Unit B */}
                          <g stroke={selectedUnitId === 'B' ? 'rgba(212,175,55,0.45)' : '#2d2d2d'} strokeWidth="0.8" fill="none">
                            <line x1="410" y1="390" x2="475" y2="390" />
                            <line x1="410" y1="390" x2="410" y2="465" />
                            <line x1="435" y1="360" x2="475" y2="360" />
                            <line x1="435" y1="360" x2="435" y2="390" />
                            <line x1="365" y1="410" x2="410" y2="410" />
                            <line x1="365" y1="410" x2="365" y2="465" />
                            <line x1="405" y1="320" x2="405" y2="350" />
                            <line x1="405" y1="350" x2="475" y2="350" />
                            <line x1="330" y1="395" x2="365" y2="395" />
                            <line x1="365" y1="320" x2="365" y2="355" />
                          </g>
                          <g fill={selectedUnitId === 'B' ? '#d4af37' : '#777'} fontSize="4.5" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                            <text x="443" y="425" fontWeight="bold">M. BED</text>
                            <text x="455" y="377">TOILET 1</text>
                            <text x="388" y="440">BED 2</text>
                            <text x="348" y="415">KITCHEN</text>
                            <text x="368" y="340" fontSize="5" fontWeight="bold">LIV / DINING</text>
                            <text x="420" y="337">TOILET 2</text>
                            <text x="482" y="425" fontSize="3.5">BALC</text>
                          </g>

                          <text x="402" y="365" textAnchor="middle" className="font-serif text-[9px] font-bold" fill={selectedUnitId === 'B' ? '#d4af37' : '#aaa'}>
                            Flat {selectedFloor}B
                          </text>
                          <text x="402" y="375" textAnchor="middle" className="font-mono text-[5px]" fill="#555">
                            920 SQ FT // 3 Bed 2 Bath
                          </text>

                          {/* Unit status tag visual circle */}
                          <circle cx="350" cy="340" r="3" fill={
                            getFlatStatus(selectedFloor, 'B') === 'Available' ? '#10b981' : 
                            getFlatStatus(selectedFloor, 'B') === 'Reserved' ? '#f59e0b' : '#3f3f46'
                          } />
                          <text x="357" y="342" className="font-mono text-[5.5px]" fill="#777">{getFlatStatus(selectedFloor, 'B')}</text>
                        </g>

                        {/* Unit C: North-West Corner (Rear) */}
                        <g 
                          onClick={() => setSelectedUnitId('C')}
                          onMouseEnter={() => {
                            setHoveredZone('C');
                            setIsHoveringUnit(true);
                            const dat = bespokeUnits.find(u => u.id === 'C')!;
                            setHoveredUnitData(dat);
                            setHoveredStatus(getFlatStatus(selectedFloor, 'C'));
                          }}
                          onMouseLeave={() => {
                            setHoveredZone(null);
                            setIsHoveringUnit(false);
                            setHoveredUnitData(null);
                          }}
                          className="cursor-pointer transition-all duration-300 transform hover:scale-[1.015] origin-top-left"
                        >
                          <rect 
                            x="25" 
                            y="35" 
                            width="145" 
                            height="145" 
                            fill={selectedUnitId === 'C' ? 'rgba(212,175,55,0.12)' : hoveredZone === 'C' ? 'rgba(212,175,55,0.04)' : '#161616'} 
                            stroke={selectedUnitId === 'C' ? '#d4af37' : hoveredZone === 'C' ? '#b8946f' : '#2e2e2e'} 
                            strokeWidth="1.5"
                          />
                          {/* CAD Room Partitions for Unit C */}
                          <g stroke={selectedUnitId === 'C' ? 'rgba(212,175,55,0.45)' : '#2d2d2d'} strokeWidth="0.8" fill="none">
                            <line x1="25" y1="110" x2="90" y2="110" />
                            <line x1="90" y1="35" x2="90" y2="110" />
                            <line x1="25" y1="145" x2="65" y2="145" />
                            <line x1="65" y1="110" x2="65" y2="145" />
                            <line x1="90" y1="90" x2="135" y2="90" />
                            <line x1="135" y1="35" x2="135" y2="90" />
                            <line x1="65" y1="145" x2="65" y2="180" />
                            <line x1="25" y1="145" x2="95" y2="145" />
                            <line x1="135" y1="110" x2="170" y2="110" />
                            <line x1="135" y1="145" x2="135" y2="180" />
                          </g>
                          <g fill={selectedUnitId === 'C' ? '#d4af37' : '#777'} fontSize="4.5" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                            <text x="57" y="70" fontWeight="bold">M. BED</text>
                            <text x="45" y="128">TOILET 1</text>
                            <text x="112" y="62">BED 2</text>
                            <text x="152" y="88">KITCHEN</text>
                            <text x="132" y="160" fontSize="5" fontWeight="bold">LIV / DINING</text>
                            <text x="80" y="162">TOILET 2</text>
                            <text x="17" y="52" fontSize="3.5">BALC</text>
                          </g>

                          <text x="97" y="100" textAnchor="middle" className="font-serif text-[9px] font-bold" fill={selectedUnitId === 'C' ? '#d4af37' : '#aaa'}>
                            Flat {selectedFloor}C
                          </text>
                          <text x="97" y="110" textAnchor="middle" className="font-mono text-[5px]" fill="#555">
                            880 SQ FT // 3 Bed 2 Bath
                          </text>

                          {/* Unit status tag visual circle */}
                          <circle cx="45" cy="55" r="3" fill={
                            getFlatStatus(selectedFloor, 'C') === 'Available' ? '#10b981' : 
                            getFlatStatus(selectedFloor, 'C') === 'Reserved' ? '#f59e0b' : '#3f3f46'
                          } />
                          <text x="52" y="57" className="font-mono text-[5.5px]" fill="#777">{getFlatStatus(selectedFloor, 'C')}</text>
                        </g>

                        {/* Unit D: North-East Corner (Rear) */}
                        <g 
                          onClick={() => setSelectedUnitId('D')}
                          onMouseEnter={() => {
                            setHoveredZone('D');
                            setIsHoveringUnit(true);
                            const dat = bespokeUnits.find(u => u.id === 'D')!;
                            setHoveredUnitData(dat);
                            setHoveredStatus(getFlatStatus(selectedFloor, 'D'));
                          }}
                          onMouseLeave={() => {
                            setHoveredZone(null);
                            setIsHoveringUnit(false);
                            setHoveredUnitData(null);
                          }}
                          className="cursor-pointer transition-all duration-300 transform hover:scale-[1.015] origin-top-right"
                        >
                          <rect 
                            x="330" 
                            y="35" 
                            width="145" 
                            height="145" 
                            fill={selectedUnitId === 'D' ? 'rgba(212,175,55,0.12)' : hoveredZone === 'D' ? 'rgba(212,175,55,0.04)' : '#161616'} 
                            stroke={selectedUnitId === 'D' ? '#d4af37' : hoveredZone === 'D' ? '#b8946f' : '#2e2e2e'} 
                            strokeWidth="1.5"
                          />
                          {/* CAD Room Partitions for Unit D */}
                          <g stroke={selectedUnitId === 'D' ? 'rgba(212,175,55,0.45)' : '#2d2d2d'} strokeWidth="0.8" fill="none">
                            <line x1="410" y1="110" x2="475" y2="110" />
                            <line x1="410" y1="35" x2="410" y2="110" />
                            <line x1="435" y1="145" x2="475" y2="145" />
                            <line x1="435" y1="110" x2="435" y2="145" />
                            <line x1="365" y1="90" x2="410" y2="90" />
                            <line x1="365" y1="35" x2="365" y2="90" />
                            <line x1="405" y1="145" x2="405" y2="180" />
                            <line x1="405" y1="145" x2="475" y2="145" />
                            <line x1="330" y1="110" x2="365" y2="110" />
                            <line x1="365" y1="145" x2="365" y2="180" />
                          </g>
                          <g fill={selectedUnitId === 'D' ? '#d4af37' : '#777'} fontSize="4.5" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                            <text x="443" y="70" fontWeight="bold">M. BED</text>
                            <text x="455" y="128">TOILET 1</text>
                            <text x="388" y="62">BED 2</text>
                            <text x="348" y="88">KITCHEN</text>
                            <text x="368" y="160" fontSize="5" fontWeight="bold">LIV / DINING</text>
                            <text x="420" y="162">TOILET 2</text>
                            <text x="482" y="52" fontSize="3.5">BALC</text>
                          </g>

                          <text x="402" y="100" textAnchor="middle" className="font-serif text-[9px] font-bold" fill={selectedUnitId === 'D' ? '#d4af37' : '#aaa'}>
                            Flat {selectedFloor}D
                          </text>
                          <text x="402" y="110" textAnchor="middle" className="font-mono text-[5px]" fill="#555">
                            880 SQ FT // 3 Bed 2 Bath
                          </text>

                          {/* Unit status tag visual circle */}
                          <circle cx="350" cy="55" r="3" fill={
                            getFlatStatus(selectedFloor, 'D') === 'Available' ? '#10b981' : 
                            getFlatStatus(selectedFloor, 'D') === 'Reserved' ? '#f59e0b' : '#3f3f46'
                          } />
                          <text x="357" y="57" className="font-mono text-[5.5px]" fill="#777">{getFlatStatus(selectedFloor, 'D')}</text>
                        </g>

                        {/* Balconies CAD Lines Outlines */}
                        <path d="M 25 35 L 10 35 L 10 65 L 25 65" fill="none" stroke="#555" strokeWidth="0.8" />
                        <path d="M 475 35 L 490 35 L 490 65 L 475 65" fill="none" stroke="#555" strokeWidth="0.8" />
                        <path d="M 25 440 L 10 440 L 10 410 L 25 410" fill="none" stroke="#555" strokeWidth="0.8" />
                        <path d="M 475 440 L 490 440 L 490 410 L 475 410" fill="none" stroke="#555" strokeWidth="0.8" />
                      </g>
                    )}

                    {/* VISUAL DIMENSION LINES (SVG lines) FOR SELECTED UNIT */}
                    {selectedFloor > 0 && selectedUnitId && (
                      <g id="dimension-lines">
                        {/* Render dimension lines based on active selected Unit */}
                        {(() => {
                          let hLine = { x1: 0, y1: 0, x2: 0, y2: 0, extY1: 0, extY2: 0, labelX: 0, labelY: 0, labelText: "" };
                          let vLine = { x1: 0, y1: 0, x2: 0, y2: 0, extX1: 0, extX2: 0, labelX: 0, labelY: 0, labelText: "" };
                          
                          if (selectedUnitId === 'A') {
                            hLine = { x1: 25, y1: 475, x2: 170, y2: 475, extY1: 465, extY2: 479, labelX: 97, labelY: 478, labelText: "29.0 FT WIDTH" };
                            vLine = { x1: 15, y1: 320, x2: 15, y2: 465, extX1: 25, extX2: 11, labelX: 11, labelY: 392, labelText: "29.0 FT DEPTH" };
                          } else if (selectedUnitId === 'B') {
                            hLine = { x1: 330, y1: 475, x2: 475, y2: 475, extY1: 465, extY2: 479, labelX: 402, labelY: 478, labelText: "29.0 FT WIDTH" };
                            vLine = { x1: 485, y1: 320, x2: 485, y2: 465, extX1: 475, extX2: 489, labelX: 489, labelY: 392, labelText: "29.0 FT DEPTH" };
                          } else if (selectedUnitId === 'C') {
                            hLine = { x1: 25, y1: 15, x2: 170, y2: 15, extY1: 35, extY2: 11, labelX: 97, labelY: 12, labelText: "29.0 FT WIDTH" };
                            vLine = { x1: 15, y1: 35, x2: 15, y2: 180, extX1: 25, extX2: 11, labelX: 11, labelY: 107, labelText: "29.0 FT DEPTH" };
                          } else if (selectedUnitId === 'D') {
                            hLine = { x1: 330, y1: 15, x2: 475, y2: 15, extY1: 35, extY2: 11, labelX: 402, labelY: 12, labelText: "29.0 FT WIDTH" };
                            vLine = { x1: 485, y1: 35, x2: 485, y2: 180, extX1: 475, extX2: 489, labelX: 489, labelY: 107, labelText: "29.0 FT DEPTH" };
                          }

                          return (
                            <g className="transition-opacity duration-300">
                              {/* Horizontal Dimension Line */}
                              {/* Extension side lines */}
                              <line x1={hLine.x1} y1={hLine.extY1} x2={hLine.x1} y2={hLine.extY2} stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" strokeDasharray="1,2" />
                              <line x1={hLine.x2} y1={hLine.extY1} x2={hLine.x2} y2={hLine.extY2} stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" strokeDasharray="1,2" />
                              
                              {/* Main Horiz line */}
                              <line x1={hLine.x1} y1={hLine.y1} x2={hLine.x2} y2={hLine.y2} stroke="#d4af37" strokeWidth="1" />
                              
                              {/* Slanted ticks */}
                              <line x1={hLine.x1 - 3} y1={hLine.y1 + 3} x2={hLine.x1 + 3} y2={hLine.y1 - 3} stroke="#d4af37" strokeWidth="1" />
                              <line x1={hLine.x2 - 3} y1={hLine.y2 + 3} x2={hLine.x2 + 3} y2={hLine.y2 - 3} stroke="#d4af37" strokeWidth="1" />
                              
                              {/* Shield Background for label */}
                              <rect x={hLine.labelX - 25} y={hLine.y1 - 4} width="50" height="8" rx="1.5" fill="#090909" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                              <text x={hLine.labelX} y={hLine.y1 + 2.2} fill="#d4af37" textAnchor="middle" className="font-mono text-[5.5px] font-bold tracking-wider">
                                {hLine.labelText}
                              </text>

                              {/* Vertical Dimension Line */}
                              {/* Extension side lines */}
                              <line x1={vLine.extX1} y1={vLine.y1} x2={vLine.extX2} y2={vLine.y1} stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" strokeDasharray="1,2" />
                              <line x1={vLine.extX1} y1={vLine.y2} x2={vLine.extX2} y2={vLine.y2} stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" strokeDasharray="1,2" />

                              {/* Main Vert line */}
                              <line x1={vLine.x1} y1={vLine.y1} x2={vLine.x2} y2={vLine.y2} stroke="#d4af37" strokeWidth="1" />

                              {/* Slanted ticks */}
                              <line x1={vLine.x1 - 3} y1={vLine.y1 + 3} x2={vLine.x1 + 3} y2={vLine.y1 - 3} stroke="#d4af37" strokeWidth="1" />
                              <line x1={vLine.x2 - 3} y1={vLine.y2 + 3} x2={vLine.x2 + 3} y2={vLine.y2 - 3} stroke="#d4af37" strokeWidth="1" />

                              {/* Shield Background for vertical label */}
                              <g transform={`translate(${vLine.x1}, ${vLine.labelY}) rotate(-90)`}>
                                <rect x="-25" y="-4" width="50" height="8" rx="1.5" fill="#090909" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                                <text x="0" y="2.2" fill="#d4af37" textAnchor="middle" className="font-mono text-[5.5px] font-bold tracking-wider">
                                  {vLine.labelText}
                                </text>
                              </g>
                            </g>
                          );
                        })()}
                      </g>
                    )}
                  </svg>

                  {/* Wind / Compass Visualizer badge */}
                  <div className="absolute bottom-3 right-3 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-[8px] font-mono text-neutral-400 flex items-center gap-1.5 shadow-md">
                    <Compass size={8} className="text-gold-400 animate-spin" style={{ animationDuration: '8s' }} />
                    <span>TRUE NORTH ALIGNED</span>
                  </div>
                </div>
              </div>

              {/* Cursor hover tooltip card */}
              <AnimatePresence>
                {isHoveringUnit && hoveredUnitData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute pointer-events-none bg-neutral-950/95 border border-gold-400/30 w-52 p-3 rounded shadow-2xl z-50 flex flex-col gap-1.5 backdrop-blur-md"
                    style={{
                      left: mousePos.x + 15,
                      top: Math.min(mousePos.y + 15, 390),
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-[11px] font-bold text-white">
                        Flat {selectedFloor === 0 ? 'GF' : selectedFloor}{hoveredUnitData.id}
                      </span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${
                        hoveredStatus === 'Available'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : hoveredStatus === 'Reserved'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                      }`}>
                        {hoveredStatus}
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-neutral-900" />
                    <div className="font-mono text-[9px] text-neutral-400 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">BUILD SIZE:</span>
                        <span>{hoveredUnitData.sizeSqFt} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">FACING DIRECTION:</span>
                        <span className="text-neutral-200 truncate max-w-[110px]">{hoveredUnitData.facing}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Selection HUD bar */}
              <div className="mt-6 p-4 rounded bg-neutral-950/80 border border-neutral-850 min-h-[50px] flex items-center">
                {hoveredZone ? (
                  <div className="font-sans text-xs">
                    <span className="font-mono text-[9px] text-gold-400 tracking-wider block uppercase mb-0.5">INSIGHT HOVER DETAIL</span>
                    <p className="text-neutral-200">
                      <strong>Flat {selectedFloor}{hoveredZone}:</strong> Sized at {selectedFloor > 0 && bespokeUnits.find(bu=>bu.id===hoveredZone)?.sizeSqFt} sq ft. Enjoying clean structural alignments as 100% Corner layout.
                    </p>
                  </div>
                ) : selectedFloor === 0 ? (
                  <p className="text-neutral-400 text-xs font-sans">
                    <strong>Ground Floor Plan:</strong> Designed to harbor our executive lobby, substation room, and driveways covering 10 Katha land base securely.
                  </p>
                ) : (
                  <p className="text-neutral-400 text-xs font-sans">
                    Click on an apartment unit block in the CAD vector diagram to view its individual layout details and pricing estimates instantly.
                  </p>
                )}
              </div>

            </div>

            {/* DYNAMIC BLUEPRINT DETAILED PROPERTY SHEET */}
            <div className="xl:col-span-3 flex flex-col justify-between self-stretch gap-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedFloor}-${selectedUnitId}`}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.15 }}
                  className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-850 flex-grow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Sparkles size={11} className="text-gold-400" />
                      <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest leading-none">
                        CONSTRUCT SPECIFICATION SHEET
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-white mb-2">
                      {selectedFloor === 0 ? 'Ground Floor Amenities' : `Penthouse Suite ${selectedFloor}${selectedUnitId}`}
                    </h3>

                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gold-300 uppercase bg-neutral-950 px-2.5 py-0.5 rounded border border-gold-400/10">
                        {selectedFloor === 0 ? '10 Katha Plot Base' : `Level 0${selectedFloor} Corner`}
                      </span>
                      {selectedFloor > 0 && (
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${
                          getFlatStatus(selectedFloor, selectedUnitId) === 'Available'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : getFlatStatus(selectedFloor, selectedUnitId) === 'Reserved'
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                              : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                        }`}>
                          {getFlatStatus(selectedFloor, selectedUnitId)}
                        </span>
                      )}
                    </div>

                    {selectedFloor === 0 ? (
                      <div className="space-y-4 text-xs font-sans text-neutral-400">
                        <p>
                          Our ground floor represents the security check gate, fire escape assemblies, covered secure car slots, and luxurious entry lounges.
                        </p>
                        <div className="space-y-2 border-t border-neutral-800/80 pt-3 font-mono text-[10px]">
                          <div className="flex justify-between">
                            <span className="text-neutral-500">COVERED PARKING:</span>
                            <span className="text-white font-bold">10 ALLOTTED SLOTS</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">POWER SUBSTATION:</span>
                            <span className="text-white">100 KVA SILENT GEN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">ENTRY ROAD:</span>
                            <span className="text-white">60.0 FT FRONTAGE</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 text-xs font-sans text-neutral-400 animate-fadeIn">
                        <div>
                          <span className="block text-neutral-500 text-[8px] font-mono uppercase mb-0.5">TARGET HOME PROFILE</span>
                          <p className="text-neutral-200 leading-relaxed font-light">{activeUnit.idealFor}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-y border-neutral-800 py-3 font-mono text-[10px]">
                          <div>
                            <span className="text-neutral-500 block text-[8px] font-sans">NET USEABLE AREA</span>
                            <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                              <Square size={10} className="text-gold-400" />
                              {activeUnit.sizeSqFt} SQ FT
                            </span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[8px] font-sans">COMPASS DIRECTION</span>
                            <span className="text-white truncate block mt-0.5" title={activeUnit.facing}>
                              {activeUnit.facing}
                            </span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[8px] font-sans">BED/BATH COMBO</span>
                            <span className="text-neutral-300 font-bold block mt-0.5">{activeUnit.bedrooms} Beds / {activeUnit.bathrooms} Baths</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[8px] font-sans">TOTAL VERANDAS</span>
                            <span className="text-neutral-300 font-bold block mt-0.5">{activeUnit.verandas} Attached Bays</span>
                          </div>
                        </div>

                        {/* SPECIFIC ROOM FLOORINGS & FINISHES */}
                        <div className="p-3 bg-neutral-950/60 rounded border border-neutral-850/60 space-y-2">
                          <span className="text-neutral-500 block text-[8px] font-mono uppercase tracking-widest">FLOOR SELECTIONS & SPECIFICATIONS</span>
                          <div className="space-y-1 text-[9.5px] font-mono text-neutral-300 border-t border-neutral-900 pt-1.5">
                            <div className="flex justify-between">
                              <span className="text-neutral-500 font-sans">LIV & DINING:</span>
                              <span className="text-neutral-200 text-right">Greek Pentelikon Marble slab</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500 font-sans">MASTER M.BED:</span>
                              <span className="text-neutral-200 text-right">Italian Statuario White Marble</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500 font-sans">SECONDARY BED:</span>
                              <span className="text-neutral-200 text-right">RAK Vitrified 800x800mm Slabs</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500 font-sans">KITCHEN CENTRE:</span>
                              <span className="text-gold-300 text-right">Galaxy Black Granite finish</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500 font-sans">BATH TOILETS:</span>
                              <span className="text-neutral-200 text-right">Anti-skid Matte Basalt tile</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500 font-sans">ATTACHED BALC:</span>
                              <span className="text-neutral-200 text-right">Brazilian Teak Wood Decking</span>
                            </div>
                          </div>
                        </div>

                        {/* 10 KATHA LAND PLOT OPTIMIZATION & MAX BUILDING EXPANSION */}
                        <div className="p-3 bg-neutral-900/30 rounded border border-neutral-850/40 space-y-1.5">
                          <span className="text-neutral-500 block text-[8px] font-mono uppercase tracking-widest">10 KATHA SPACE MAXIMIZATION</span>
                          <p className="text-[10px] text-neutral-400 font-light leading-relaxed font-sans">
                            The net building footprint is fully expanded to **60% Maximum Ground Coverage (MGC)** of the **7,200 sq ft (10 Katha)** land plot. This results in an optimized floor plate built of **4,320 sq ft** per level, maximizing saleable carpet area in complete compliance with Dhaka RAJUK building code.
                          </p>
                        </div>

                        <div className="p-3 bg-neutral-950/90 rounded border border-neutral-850">
                          <span className="text-neutral-500 block text-[8px] font-mono uppercase tracking-widest mb-1">TOTAL VALUATION</span>
                          <div className="flex justify-between items-baseline">
                            <span className="font-serif text-lg text-gold-300 font-semibold">
                              ৳{activeFlatPrice.toFixed(2)} Lakh
                            </span>
                            <span className="text-[8px] text-neutral-500 font-mono">BDT Estimate</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 space-y-2">
                    {selectedFloor > 0 && (
                      <button
                        onClick={handleDownloadPDF}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900/50 hover:bg-neutral-900/90 border border-neutral-800 hover:border-gold-400/40 rounded font-mono text-[9px] uppercase tracking-widest text-neutral-300 hover:text-gold-300 font-bold transition-all cursor-pointer"
                      >
                        <FileDown size={11} className="text-gold-400" />
                        Download PDF Brochure
                      </button>
                    )}
                    <a 
                      href="#contact"
                      className="w-full text-center block px-4 py-3 bg-neutral-950 hover:bg-neutral-900 border border-gold-400/20 hover:border-gold-400/50 rounded font-mono text-2xs uppercase tracking-widest text-gold-300 font-semibold transition-all cursor-pointer"
                    >
                      Reserve {selectedFloor === 0 ? 'GF Slot' : `Suite ${selectedFloor}${selectedUnitId}`}
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Safety notification card */}
              <div className="p-4 rounded-lg bg-neutral-900/20 border border-neutral-850/80 text-[10px] text-neutral-400 flex items-start gap-2.5">
                <ShieldCheck size={14} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-300 font-mono block mb-0.5">100% RAJUK Code Security</strong>
                  Double staircases with fire door gaskets prevent smoke. Cast-in-situ pillars carry heavy seismic buffer capability.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: INTERACTIVE ANALYTICS & GRAPH PANEL */}
        {layoutViewMode === 'analytics' && (
          <div className="space-y-12">
            
            {/* TWO GRAPHS ROW representing full 36 flats & 10 katha plot footprint */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* GRAPH A: 10 Katha Land Footprint Space Allocation Donut Block */}
              <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-850 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-mono text-[9px] text-gold-400 tracking-wider block mb-1">SPACE GRAPH A</span>
                      <h4 className="font-serif text-lg text-white font-normal">10 Katha Land plot Distribution</h4>
                    </div>
                    <span className="font-mono text-[10px] bg-neutral-950 text-neutral-400 px-2 py-0.5 rounded border border-neutral-850">
                      7,200 SQ FT Total
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-6 font-light">
                    How the 10 Katha (7,200 sq ft) plot is leveraged. Hover over the quadrants of the interactive graph below to inspect the architectural and green setbacks.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* SVG Circular Donut Chart */}
                    <div className="md:col-span-6 flex justify-center relative">
                      <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                        {/* Segment 1: Building Footprint 60% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="transparent"
                          stroke={activeLandSegment === 1 ? '#e8c962' : '#d4af37'}
                          strokeWidth={activeLandSegment === 1 ? '22' : '16'}
                          strokeDasharray="263.89 439.82" // 60% of 439.82 circumference
                          strokeDashoffset="0"
                          className="cursor-pointer transition-all duration-300"
                          onMouseEnter={() => setActiveLandSegment(1)}
                          onMouseLeave={() => setActiveLandSegment(null)}
                        />
                        {/* Segment 2: Side & Rear Setbacks 20% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="transparent"
                          stroke={activeLandSegment === 2 ? '#22c55e' : '#16a34a'}
                          strokeWidth={activeLandSegment === 2 ? '22' : '16'}
                          strokeDasharray="87.96 439.82" // 20%
                          strokeDashoffset="-263.89"
                          className="cursor-pointer transition-all duration-300"
                          onMouseEnter={() => setActiveLandSegment(2)}
                          onMouseLeave={() => setActiveLandSegment(null)}
                        />
                        {/* Segment 3: Gated Driveway 10% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="transparent"
                          stroke={activeLandSegment === 3 ? '#3b82f6' : '#2563eb'}
                          strokeWidth={activeLandSegment === 3 ? '22' : '16'}
                          strokeDasharray="43.98 439.82" // 10%
                          strokeDashoffset="-351.85"
                          className="cursor-pointer transition-all duration-300"
                          onMouseEnter={() => setActiveLandSegment(3)}
                          onMouseLeave={() => setActiveLandSegment(null)}
                        />
                        {/* Segment 4: Green buffer 10% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="transparent"
                          stroke={activeLandSegment === 4 ? '#facc15' : '#eab308'}
                          strokeWidth={activeLandSegment === 4 ? '22' : '16'}
                          strokeDasharray="43.98 439.82" // 10%
                          strokeDashoffset="-395.83"
                          className="cursor-pointer transition-all duration-300"
                          onMouseEnter={() => setActiveLandSegment(4)}
                          onMouseLeave={() => setActiveLandSegment(null)}
                        />
                      </svg>
                      
                      {/* Central Legend display info */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                        <span className="font-serif text-3xl font-bold text-white leading-none">60%</span>
                        <span className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-widest block mt-0.5">Built Max</span>
                      </div>
                    </div>

                    {/* Right column detailed legend listings */}
                    <div className="md:col-span-6 flex flex-col gap-2.5">
                      {landAllocation.map((item) => {
                        const isHovered = activeLandSegment === item.id;
                        return (
                          <div
                            key={item.id}
                            onMouseEnter={() => setActiveLandSegment(item.id)}
                            onMouseLeave={() => setActiveLandSegment(null)}
                            className={`p-2 rounded border transition-all duration-200 cursor-pointer ${
                              isHovered 
                                ? 'bg-neutral-900 border-neutral-750 scale-[1.012]' 
                                : 'bg-neutral-950/40 border-neutral-900'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="font-mono text-[9px] text-neutral-300 font-bold uppercase">{item.percentage}% // {item.label.split(' ')[1]}</span>
                            </div>
                            <div className="flex justify-between font-mono text-[10px] text-neutral-400 pl-3.5 mt-0.5">
                              <span>ALLOCATED SIZ:</span>
                              <span className="text-white font-bold">{item.size}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>

                {/* Legend details card block */}
                <div className="mt-4 p-3 rounded bg-neutral-950/90 border border-neutral-850 font-sans text-xs text-neutral-400">
                  <span className="text-2xs text-[#777] font-mono uppercase tracking-widest block mb-1">SELECTED COMPARTMENT FUNCTION</span>
                  <p className="leading-relaxed">
                    {activeLandSegment 
                      ? landAllocation.find(la => la.id === activeLandSegment)?.desc 
                      : 'Hover over individual pie blocks or metrics above to study the 10 Katha land conservation setup details.'
                    }
                  </p>
                </div>
              </div>

              {/* GRAPH B: Heights Pricing Multiplier Cascade Bar Chart */}
              <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-850 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-mono text-[9px] text-gold-400 tracking-wider block mb-1">VALUATION GRAPH B</span>
                      <h4 className="font-serif text-lg text-white font-normal">Height-Based Price Escalation</h4>
                    </div>
                    <span className="font-mono text-[10px] bg-neutral-950 text-[#10b981] px-2.5 py-0.5 rounded border border-neutral-850">
                      ৳79L - ৳93.10L
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-6 font-light">
                    Value trends across Levels 1 to 9. Higher levels claim scenic vistas, cooler ambient winds, and high clearance noise isolating safety, raising core square feet value.
                  </p>

                  {/* Manual Interactive Column Chart */}
                  <div className="pt-6 pb-2 px-2 flex justify-between items-end gap-2.5 h-[170px] border-b border-neutral-850/60 relative">
                    
                    {/* Horizontal marking bars */}
                    <div className="absolute left-0 right-0 top-[20%] border-t border-neutral-900 pointer-events-none" />
                    <div className="absolute left-0 right-0 top-[50%] border-t border-neutral-900 pointer-events-none" />
                    <div className="absolute left-0 right-0 top-[80%] border-t border-neutral-900 pointer-events-none" />

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => {
                      const lvlPriceAvg = getFlatPriceNum(lvl, 82); // average representing Unit A/B price on lvl
                      // scale height from 79L to 93L
                      const pctHeight = ((lvlPriceAvg - 70) / (95 - 70)) * 100;
                      const isHovered = activePriceBar === lvl;
                      const isSelected = selectedFloor === lvl;

                      return (
                        <div key={lvl} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                          
                          {/* Tooltip on individual bar hover */}
                          {isHovered && (
                            <div className="absolute bottom-[108%] bg-neutral-950 border border-gold-400/30 px-2 py-1.5 rounded text-center z-50 font-mono text-[9px] shadow-2xl min-w-[100px]">
                              <span className="text-neutral-500 block">LEVEL 0{lvl} AVE</span>
                              <span className="text-gold-300 font-bold block">৳{lvlPriceAvg.toFixed(2)} Lakh</span>
                            </div>
                          )}

                          <div
                            onMouseEnter={() => setActivePriceBar(lvl)}
                            onMouseLeave={() => setActivePriceBar(null)}
                            onClick={() => setSelectedFloor(lvl)}
                            className="w-full rounded-t transition-all duration-300 relative"
                            style={{
                              height: `${pctHeight}%`,
                              backgroundColor: isSelected ? '#d4af37' : isHovered ? '#b8946f' : 'rgba(212,175,55,0.25)',
                              borderLeft: isSelected || isHovered ? '1px solid rgba(255,255,255,0.1)' : 'none',
                              borderRight: isSelected || isHovered ? '1px solid rgba(255,255,255,0.1)' : 'none',
                            }}
                          >
                            {isSelected && (
                              <div className="absolute top-0 left-0 right-0 h-1 bg-white rounded-full animate-pulse" />
                            )}
                          </div>
                          
                          <span className={`text-[8px] font-mono mt-2 transition-colors duration-300 ${isSelected ? 'text-gold-400 font-bold' : 'text-neutral-500'}`}>
                            L0{lvl}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chart B details explanation */}
                <div className="mt-4 p-3 rounded bg-neutral-950/90 border border-neutral-850 font-sans text-xs text-neutral-400">
                  <span className="text-2xs text-[#777] font-mono uppercase tracking-widest block mb-1">FLOOR LEVEL IMPACT RANGE</span>
                  <p className="leading-relaxed">
                    Our pricing incorporates Level Premium calculations. Select an elevation level bar to dynamically update your primary explorer view and activate the high-speed traction elevator simulator.
                  </p>
                </div>
              </div>

            </div>

            {/* HIGH-LUXURY 36 APARTMENT DATABASE MASTER LIST */}
            <div className="bg-neutral-900/40 rounded-xl border border-neutral-850 p-6">
              
              {/* Table search and filters */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                <div>
                  <h4 className="font-serif text-lg text-white font-normal">36-Flat Complete Inventory Matrix</h4>
                  <p className="text-[10px] text-neutral-500 font-mono tracking-wider mt-0.5">
                    EXCEL INTEGRITY SHEET // EAST FAYDABAD RESIDENCES
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                  {/* Text search query */}
                  <div className="relative flex-grow md:flex-grow-0">
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Search Flat #, facing..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-neutral-950/80 border border-neutral-850 rounded px-2.5 py-1.5 pl-8 text-xs font-mono text-white focus:outline-none focus:border-gold-450 placeholder-neutral-600 min-w-[200px]"
                    />
                  </div>

                  {/* Booking status select dropdown */}
                  <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-850 px-2 py-1.5 rounded">
                    <Filter size={10} className="text-neutral-500" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="bg-transparent border-none text-xs font-mono text-neutral-300 focus:outline-none cursor-pointer"
                    >
                      <option value="All" className="bg-neutral-900 text-white">Status: All</option>
                      <option value="Available" className="bg-neutral-900 text-emerald-400">Status: Available</option>
                      <option value="Reserved" className="bg-neutral-900 text-amber-400">Status: Reserved</option>
                      <option value="Sold" className="bg-neutral-900 text-neutral-500">Status: Sold</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dynamic spreadsheet matrix of all 36 flats */}
              <div className="overflow-x-auto border border-neutral-850 rounded-lg">
                <table className="w-full text-left font-sans text-xs text-neutral-300 border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-neutral-950 border-b border-neutral-850 font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                      <th className="p-3">FLAT INDX</th>
                      <th className="p-3">ELEVATION</th>
                      <th className="p-3">UNIT TYPE</th>
                      <th className="p-3">NET CARPET</th>
                      <th className="p-3">ORIENTATION & COMPASS</th>
                      <th className="p-3">BED/BATHS</th>
                      <th className="p-3">VALUATION RANGE</th>
                      <th className="p-3">BOOKING STATUS</th>
                      <th className="p-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 bg-[#121212]/30">
                    {filteredFlats.length > 0 ? (
                      filteredFlats.map((flat) => {
                        const isHovered = hoveredFlatId === flat.id;
                        const isSelected = selectedFloor === flat.floor && selectedUnitId === flat.unitCode;
                        
                        return (
                          <tr
                            key={flat.id}
                            onMouseEnter={() => setHoveredFlatId(flat.id)}
                            onMouseLeave={() => setHoveredFlatId(null)}
                            className={`transition-colors duration-150 ${
                              isSelected 
                                ? 'bg-gold-500/5 text-white border-y border-gold-400/20' 
                                : isHovered 
                                  ? 'bg-neutral-900/60' 
                                  : 'hover:bg-neutral-900/35'
                            }`}
                          >
                            <td className="p-3 font-mono font-bold text-white">#{flat.id}</td>
                            <td className="p-3 font-mono text-neutral-400">Level 0{flat.floor}</td>
                            <td className="p-3 font-mono text-gold-400">Corner Suite {flat.unitCode}</td>
                            <td className="p-3 font-mono">{flat.sizeSqFt} SQ FT</td>
                            <td className="p-3 font-sans text-neutral-400">{flat.facing}</td>
                            <td className="p-3 font-mono text-[10px]">{flat.bedrooms} Beds / {flat.bathrooms} Baths</td>
                            <td className="p-3 font-serif font-bold text-gold-300">{flat.priceBDT}</td>
                            <td className="p-3">
                              <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                                flat.status === 'Available'
                                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                  : flat.status === 'Reserved'
                                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                    : 'bg-neutral-800 border-neutral-750 text-neutral-500'
                              }`}>
                                {flat.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedFloor(flat.floor);
                                  setSelectedUnitId(flat.unitCode);
                                  setLayoutViewMode('blueprint');
                                  // Smooth scroll to top of floorplan section container
                                  const container = document.getElementById('floorplan');
                                  if (container) {
                                    window.scrollTo({
                                      top: container.offsetTop - 80,
                                      behavior: 'smooth'
                                    });
                                  }
                                }}
                                className="px-2.5 py-1 rounded bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-[9px] font-mono uppercase text-neutral-300 hover:text-white hover:border-gold-400/40 tracking-wider transition-colors cursor-pointer"
                              >
                                LOAD CAD
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-neutral-500 font-sans">
                          No flats matching your current search parameters. Clear query or status selectors and retry.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Data disclaimer note */}
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-neutral-500 font-mono">
                <span>* Values represent updated Q2 2026 pre-registration launch quotes.</span>
                <span>DATA INTEGRITY SECURED • DHAKA REGISTRY</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
