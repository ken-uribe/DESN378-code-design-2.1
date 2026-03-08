README

You need:

1. Description

Attempting to redo Signal & State.

2. Design Decisions

Shifts in dark mode for contrast

System preference respected by default

3. Accessibility

aria-labels

keyboard support

reduced motion


## Theme System Reflection

### Icon Rationale

The theme selector uses three icons to visually represent Light, Dark, and System modes. The sun icon represents light mode because it is a widely recognized metaphor for brightness and daytime interfaces. The moon icon represents dark mode because it is associated with nighttime and reduced brightness. The system icon uses a monitor shape to represent that the interface will follow the user’s operating system preference.

### System Logic Explanation

The theme system stores the user’s preference in `localStorage`. When the page loads, the script checks for a saved value. If a theme has been selected previously, that value is applied. If the stored value is `"system"`, the script checks the system preference using `window.matchMedia('(prefers-color-scheme: dark)')` and applies the corresponding theme. The page also listens for system theme changes and updates automatically if the system preference changes while the site is open.

### Unexpected Learning

One unexpected thing I learned was how useful `currentColor` is when styling SVG icons. Instead of manually changing fill colors for each theme, the icons automatically inherit the color from the surrounding element. This made the theme system much easier to maintain.

### What the viewBox Attribute Controls

The `viewBox` attribute defines the internal coordinate system of an SVG. It determines how the shapes inside the SVG scale and fit within the width and height of the element. By standardizing the icons to `viewBox="0 0 24 24"`, the icons scale consistently and align properly when displayed together.

### Why currentColor is Flexible

`currentColor` allows SVG elements to inherit the text color from their parent container. This makes icons automatically adapt to light and dark themes without needing separate color values. When the theme changes, the text color changes, and the icons update automatically.

### What the d Attribute Describes

The `d` attribute in an SVG `<path>` element defines the shape of the path using a sequence of drawing commands and coordinates. These commands describe how the line should move, curve, and connect to create the final shape. For example, the moon icon uses a `<path>` element where the `d` value contains the instructions that draw the curved crescent shape.
