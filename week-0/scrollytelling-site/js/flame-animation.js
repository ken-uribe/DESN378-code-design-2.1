/**
 * Flame Animation - SVG Path Distortion with Scroll Velocity
 * Animates the top and bottom edges of the heroBlob SVG path
 * to simulate organic flame-like movement
 */

document.addEventListener('DOMContentLoaded', function () {
	// ================================
	// Configuration
	// ================================
	const config = {
		baseSpeed: 1, // Base animation speed multiplier
		distortionAmount: 30, // Maximum distortion in pixels
		waveFrequency: 0.015, // Controls how many waves (higher = more waves)
		waveCount: 3, // Number of waves along the path
		scrollMultiplier: 2, // How much scroll affects speed
		speedEaseDown: 0.985 // How quickly speed eases back to base (0-1, lower = faster ease)
	};

	// ================================
	// State Management
	// ================================
	const state = {
		originalPath: null,
		pathElement: null,
		animationSpeed: config.baseSpeed,
		scrollVelocity: 0,
		lastScrollY: 0,
		time: 0,
		isInitialized: false
	};

	// ================================
	// Utility Functions
	// ================================

	/**
	 * Parse SVG path string into commands and points
	 */
	function parsePathData(pathData) {
		const commands = [];
		const pathRegex = /([MLHVCSQTAZmlhvcsqtaz])\s*([-\d.,\s]*)/g;
		let match;

		while ((match = pathRegex.exec(pathData)) !== null) {
			const cmd = match[1];
			const argsStr = match[2].trim();
			const args = argsStr ? argsStr.split(/[\s,]+/).map(Number) : [];
			commands.push({ cmd, args });
		}

		return commands;
	}

	/**
	 * Convert path commands back to path string
	 */
	function commandsToPath(commands) {
		let pathString = '';
		for (const cmd of commands) {
			pathString += cmd.cmd;
			if (cmd.args.length > 0) {
				pathString += ' ' + cmd.args.join(' ');
			}
		}
		return pathString;
	}

	/**
	 * Extract coordinates from path commands
	 */
	function extractCoordinates(commands) {
		const coordinates = [];
		let currentX = 0,
			currentY = 0;

		for (const cmd of commands) {
			const { cmd: c, args } = cmd;
			const upperCmd = c.toUpperCase();
			const isRelative = c !== upperCmd;

			switch (upperCmd) {
				case 'M':
				case 'L': {
					for (let i = 0; i < args.length; i += 2) {
						const x = isRelative ? currentX + args[i] : args[i];
						const y = isRelative ? currentY + args[i + 1] : args[i + 1];
						coordinates.push({ x, y, original: { x, y } });
						currentX = x;
						currentY = y;
					}
					break;
				}
				case 'Q': {
					for (let i = 0; i < args.length; i += 4) {
						// Control point
						const cpx = isRelative ? currentX + args[i] : args[i];
						const cpy = isRelative ? currentY + args[i + 1] : args[i + 1];
						// End point
						const x = isRelative ? currentX + args[i + 2] : args[i + 2];
						const y = isRelative ? currentY + args[i + 3] : args[i + 3];
						coordinates.push({ x, y, original: { x, y } });
						currentX = x;
						currentY = y;
					}
					break;
				}
				case 'T': {
					for (let i = 0; i < args.length; i += 2) {
						const x = isRelative ? currentX + args[i] : args[i];
						const y = isRelative ? currentY + args[i + 1] : args[i + 1];
						coordinates.push({ x, y, original: { x, y } });
						currentX = x;
						currentY = y;
					}
					break;
				}
				case 'C': {
					for (let i = 0; i < args.length; i += 6) {
						const x = isRelative ? currentX + args[i + 4] : args[i + 4];
						const y = isRelative ? currentY + args[i + 5] : args[i + 5];
						coordinates.push({ x, y, original: { x, y } });
						currentX = x;
						currentY = y;
					}
					break;
				}
				case 'Z': {
					// Close path - handled in command
					break;
				}
			}
		}

		return coordinates;
	}

	/**
	 * Calculate which points are on top and bottom edges
	 */
	function identifyEdges(coordinates) {
		if (coordinates.length === 0) return { topEdges: [], bottomEdges: [] };

		const yValues = coordinates.map((c) => c.y);
		const minY = Math.min(...yValues);
		const maxY = Math.max(...yValues);
		const midY = (minY + maxY) / 2;
		const edgeThreshold = (maxY - minY) * 0.25; // 25% from edges

		const topEdges = [];
		const bottomEdges = [];

		coordinates.forEach((coord, index) => {
			const distFromTop = coord.y - minY;
			const distFromBottom = maxY - coord.y;

			if (distFromTop < edgeThreshold) {
				topEdges.push(index);
			}
			if (distFromBottom < edgeThreshold) {
				bottomEdges.push(index);
			}
		});

		return { topEdges, bottomEdges };
	}

	/**
	 * Apply flame-like distortion to coordinates
	 */
	function distortEdges(coordinates, topEdges, bottomEdges, time) {
		const distorted = coordinates.map((c) => ({ ...c }));

		// Distort top edges
		topEdges.forEach((index) => {
			const normalizedX = distorted[index].original.x / 1920;
			const waveValue = Math.sin(time * config.waveFrequency + normalizedX * config.waveCount * Math.PI * 2);
			distorted[index].y = distorted[index].original.y + waveValue * config.distortionAmount;
		});

		// Distort bottom edges
		bottomEdges.forEach((index) => {
			const normalizedX = distorted[index].original.x / 1920;
			const waveValue = Math.cos(time * config.waveFrequency + normalizedX * config.waveCount * Math.PI * 2);
			distorted[index].y = distorted[index].original.y - waveValue * config.distortionAmount;
		});

		return distorted;
	}

	/**
	 * Update path based on distorted coordinates
	 */
	function updatePath(commands, distortedCoords) {
		const updated = [...commands];
		let coordIndex = 0;

		for (let i = 0; i < updated.length; i++) {
			const cmd = updated[i];
			const upperCmd = cmd.cmd.toUpperCase();
			const isRelative = cmd.cmd !== upperCmd;

			switch (upperCmd) {
				case 'M':
				case 'L': {
					for (let j = 0; j < cmd.args.length; j += 2) {
						if (coordIndex < distortedCoords.length) {
							const coord = distortedCoords[coordIndex];
							if (isRelative && coordIndex > 0) {
								const prevCoord = distortedCoords[coordIndex - 1];
								cmd.args[j] = Math.round(coord.x - prevCoord.x);
								cmd.args[j + 1] = Math.round(coord.y - prevCoord.y);
							} else {
								cmd.args[j] = Math.round(coord.x);
								cmd.args[j + 1] = Math.round(coord.y);
							}
							coordIndex++;
						}
					}
					break;
				}
				case 'Q':
				case 'T':
				case 'C': {
					// Skip control points, only update endpoints
					const step = upperCmd === 'Q' ? 4 : upperCmd === 'T' ? 2 : 6;
					for (let j = 0; j < cmd.args.length; j += step) {
						if (coordIndex < distortedCoords.length) {
							const endPointIdx = j + (upperCmd === 'C' ? 4 : step - 2);
							const coord = distortedCoords[coordIndex];
							cmd.args[endPointIdx] = Math.round(coord.x);
							cmd.args[endPointIdx + 1] = Math.round(coord.y);
							coordIndex++;
						}
					}
					break;
				}
			}
		}

		return updated;
	}

	/**
	 * Detect scroll velocity
	 */
	function updateScrollVelocity() {
		const currentScrollY = window.scrollY || document.documentElement.scrollTop;
		state.scrollVelocity = Math.abs(currentScrollY - state.lastScrollY);
		state.lastScrollY = currentScrollY;

		// Apply scroll velocity to animation speed
		const scrollInfluence = state.scrollVelocity * config.scrollMultiplier;
		state.animationSpeed = config.baseSpeed + scrollInfluence;

		// Ease speed back down when not scrolling
		state.animationSpeed *= config.speedEaseDown;
		state.animationSpeed = Math.max(state.animationSpeed, config.baseSpeed);
	}

	/**
	 * Animation loop using GSAP ticker
	 */
	function animationLoop() {
		if (!state.isInitialized) return;

		updateScrollVelocity();

		state.time += state.animationSpeed;

		// Get updated coordinates
		const commands = parsePathData(state.originalPath);
		const coordinates = extractCoordinates(commands);
		const { topEdges, bottomEdges } = identifyEdges(coordinates);

		// Apply distortion
		const distorted = distortEdges(coordinates, topEdges, bottomEdges, state.time);

		// Update path commands
		const updatedCommands = updatePath(commands, distorted);

		// Apply to SVG
		state.pathElement.setAttribute('d', commandsToPath(updatedCommands));
	}

	// ================================
	// Initialization
	// ================================

	/**
	 * Initialize the flame animation
	 */
	function initFlameAnimation() {
		state.pathElement = document.getElementById('heroBlob');

		if (!state.pathElement) {
			console.warn('heroBlob path element not found');
			return;
		}

		// Store the original path
		state.originalPath = state.pathElement.getAttribute('d');

		if (!state.originalPath) {
			console.warn('heroBlob path data not found');
			return;
		}

		state.isInitialized = true;

		// Start animation loop with GSAP ticker
		gsap.ticker.add(animationLoop);

		// Track scroll events
		window.addEventListener('scroll', updateScrollVelocity, { passive: true });
	}

	// Initialize on DOM ready
	initFlameAnimation();
});
