# Build 4-1 // symbols -- Theme Dropdown with Custom SVG Icons

## Theme System Reflection

### Icon Rationale

I used three icons to represent Light, Dark, and System modes. The sun icon represents light mode and the moon icon represents dark mode, which are common visual metaphors used across many interfaces. The system option uses a monitor icon to represent that the website will follow the operating system’s theme preference.

I also used a three-line menu icon in the trigger button to communicate that the theme options are inside a dropdown menu. This helps users recognize that the control is interactive and contains additional options.

### System Logic Explanation

The theme system stores the user’s preference in `localStorage`. When the page loads, the script checks if a theme has been previously saved. If a saved preference exists, that value is applied.

If the stored value is `"system"`, the script checks the user’s operating system preference using `window.matchMedia('(prefers-color-scheme: dark)')`. Based on that result, the site applies either the dark or light theme.

The system also listens for changes in the system preference, so if the operating system switches between light and dark mode while the page is open, the theme updates automatically when the user is using the system option.

### Unexpected Learning

Originally I used separate variables to control the colors of the SVG icons. However, it was easy to forget to update the correct variable, and changing colors across themes became harder to manage.

After learning about `currentColor`, I switched to using it for the SVG fills and strokes. This allowed the icons to automatically inherit the text color from their parent container. Because the text color changes when the theme changes, the icons automatically adapt as well.

One challenge I ran into was that some of my SVGs used strokes while another used a fill. This made the icons behave slightly differently until I standardized how the colors were applied.

### What the viewBox Attribute Controls

The `viewBox` attribute defines the coordinate system used inside an SVG. It determines how the shapes and paths inside the SVG scale to fit the element’s width and height.

While working on the icons, I noticed that some of my SVG files had different `viewBox` values. This made it harder to keep the icons visually consistent in the dropdown. Standardizing them to the same `viewBox` size helped the icons scale and align more consistently.

### Why currentColor is Flexible

`currentColor` allows SVG elements to inherit the text color from their parent container. This makes the icons automatically adapt to light and dark themes without needing separate color values for each theme.

Because the text color changes depending on the theme, the icons automatically update as well. This makes the system easier to maintain and keeps the icons visually consistent.

### What the d Attribute Describes

The `d` attribute inside an SVG `<path>` element defines the shape of the path using a sequence of drawing commands and coordinates. These commands tell the browser how the line should move, curve, and connect in order to create the final shape.

For example, the moon icon uses a `<path>` element where the `d` value contains the instructions that draw the curved crescent shape.
