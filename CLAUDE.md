# CLAUDE.md — Premium Law Firm Website

## ROLE

You are an award-winning Creative Developer, Senior UX Designer, Art Director, and Frontend Engineer specializing in premium professional-services websites.

Your task is to create a sophisticated, credible, contemporary law-firm website inspired by the reference project:

https://www.behance.net/gallery/236479223/Website-design-for-law-firm

The reference presents the Valerón & Partners law firm website. Use it as the primary visual and UX reference. Study the available project images and descriptions before implementation. If the Behance page or some of its images cannot be accessed, do not pretend you have inspected them. Use the accessible material and the design direction documented here, and clearly identify any assumptions.

The goal is a website that feels like a carefully art-directed legal brand: calm, intelligent, discreet, authoritative, human, and premium.

Do not create a generic law-firm template. Equally, do not make the website flashy or experimental just to make it look impressive. In legal services, trust, clarity, and confidence are essential.

---

## 1. PRIMARY REFERENCE AND DESIGN PRIORITY

Reference: https://www.behance.net/gallery/236479223/Website-design-for-law-firm

Priority order:

1. Reference accuracy
2. Trustworthiness and clarity
3. Usability and information architecture
4. Typography and visual hierarchy
5. Layout, spacing, and composition
6. Responsive behavior
7. Accessibility
8. Performance
9. Motion and decorative effects

Study the reference before coding. Inspect all available screenshots and pages, not just the first screen. Analyze:

- Overall composition and page width
- Header, navigation, and call-to-action placement
- Hero layout, imagery, and headline scale
- Color palette and contrast
- Typography, weights, line lengths, and line heights
- Section spacing and transitions
- Practice-area/service presentation
- Team portraits and biography layout
- Trust signals, credentials, testimonials, and statistics if shown
- FAQ and contact/consultation flow
- Buttons, links, hover states, and mobile behavior

Recreate the reference's visual principles, layout logic, hierarchy, restraint, and user experience as closely as the available evidence allows. Do not substitute a completely different design direction because you personally prefer it.

Do not copy the reference firm's logo, exact brand identity, proprietary text, or photographs. Build an original identity for the intended law firm while taking clear design inspiration from the reference.

If the project screenshots establish a detail, follow them. If a detail is not visible or cannot be verified, make a restrained design decision consistent with the reference and keep it consistent throughout the site.

---

## 2. PROJECT TECHNOLOGY

Use ONLY:

- HTML5
- CSS3
- Vanilla JavaScript

Do not use:

- React
- Next.js
- Vue
- Angular
- TypeScript
- JSX
- Tailwind
- Bootstrap
- React Three Fiber
- Framer Motion
- npm or a build system

The core website must work directly from `index.html` without a build process. Keep HTML, CSS, and JavaScript separated into clearly named files where the existing project structure allows it. If the project already has an established file structure, inspect and preserve it rather than rebuilding it unnecessarily.

External CDN libraries may be used only when they provide clear value and remain lightweight. Prefer native browser capabilities and CSS for straightforward effects. Do not add dependencies just because they are available.

Use semantic HTML and maintainable code. Do not introduce a framework.

---

## 3. BRAND PERSONALITY

The website should communicate:

- Trust
- Professional authority
- Intelligence
- Discretion
- Calm confidence
- Human understanding
- Precision
- Long-term reliability

The visual direction is **minimalist luxury with warm strictness**: professional and structured, but not cold or intimidating.

The site should feel established and credible without relying on clichés such as gavels, courthouse columns, scales of justice, flags, or stock photos of lawyers shaking hands.

Avoid making the firm feel like:
- A generic corporate SaaS company
- A flashy luxury fashion label
- A tech startup
- An aggressive litigation advertisement
- A dated, traditional legal directory
- A dramatic cinematic agency portfolio

The design must balance contemporary sophistication with genuine usability.

---

## 4. COLOR SYSTEM

Build a small, consistent color system inspired by the reference. Start with calm, understated tones such as:

- Warm off-white or ivory for primary backgrounds
- Deep charcoal or near-black for primary text
- Muted taupe, stone, or warm grey for secondary surfaces
- One restrained accent color, only if supported by the reference and the firm's identity

These are directional suggestions, not a reason to ignore the actual reference. Sample or approximate colors from the project images when possible.

Rules:
- Define colors as CSS custom properties in `:root`.
- Reuse the same tokens across every page.
- Maintain strong text contrast.
- Avoid random accent colors, loud gradients, neon colors, and unnecessary glassmorphism.
- Avoid using a different palette for each section.
- Use color to establish hierarchy and calm confidence, not decoration.

---

## 5. TYPOGRAPHY

Typography is one of the main design features. It should feel editorial, confident, highly legible, and carefully controlled.

Inspect the reference and choose a suitable type pairing. A refined serif for selected headlines paired with a clean sans-serif for body text may work if it matches the reference. Do not choose fonts arbitrarily.

Rules:
- Establish global typography tokens and use them across every page.
- Define consistent styles for H1, H2, H3, body copy, labels, metadata, buttons, and navigation.
- All H1 elements across the site must follow the same design system; the same applies to H2, H3, body text, and other repeated elements.
- Use `clamp()` where useful for responsive type sizes.
- Control line length, line height, font weight, letter spacing, and text wrapping.
- Headlines may be expressive, but they must remain readable and must not overpower essential information.
- Body copy should be comfortable to read, especially for legal topics.
- Never shrink text excessively to fit a layout.
- Avoid too many font families or inconsistent weights.

Create reusable CSS variables for type sizes, for example `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`, `--heading-md`, and `--heading-xl`. Set exact values based on the reference and validate them visually.

---

## 6. LAYOUT, SPACING, AND COMPOSITION

Use disciplined composition and consistent spacing. Premium design comes from proportion, alignment, typography, whitespace, and execution—not from adding effects.

Create a consistent layout system:
- Shared maximum content width
- Consistent page gutters
- Reusable spacing scale
- Consistent section padding
- Clear grid rules
- Consistent border and divider treatments
- Shared button heights and alignment
- Predictable relationships between headings, paragraphs, and CTAs

Prefer spacious editorial layouts, considered asymmetry where the reference uses it, clean alignment, and strong negative space. Do not force asymmetry if the reference is more structured.

Avoid:
- Too many cards
- Excessive rounded corners
- Random floating elements
- Unnecessary shadows
- Overlapping content that harms readability
- Dense blocks of text without hierarchy
- Inconsistent section widths
- Different spacing values used without a clear reason

Do not make every section look identical. Create variation through composition while preserving one coherent design system.

---

## 7. NAVIGATION AND USER EXPERIENCE

Navigation must be simple, predictable, and accessible.

- Use clear, descriptive navigation labels.
- Keep the primary contact or consultation action easy to find.
- Ensure the header works on desktop, tablet, and mobile.
- If the reference uses a sticky header, reproduce its behavior carefully; do not make the header sticky without a reason.
- Make active, hover, focus, and open states visually clear.
- Ensure every navigation link leads to a real page or a valid section.
- Do not leave placeholder links such as `href="#"` in the finished site.
- Mobile navigation must work with keyboard and touch, close appropriately, and not trap the user.
- Do not hide essential information behind decorative interactions.

The user should understand what the firm does, who it helps, and how to contact it without having to search.

---

## 8. CONTENT AND INFORMATION ARCHITECTURE

Build the pages and sections that are supported by the supplied brief and the reference. At minimum, consider the following structure where appropriate:

### Home
- Clear introduction to the firm and its value
- Primary call to action, such as requesting a consultation
- Overview of key practice areas
- Brief explanation of the firm's approach
- Team introduction or portraits
- Relevant credibility indicators, if real information is available
- Answers to common client questions, if appropriate
- Clear contact section and footer

### Practice Areas / Services
- Present each service in clear, plain language.
- Explain who the service is for and the kind of help offered.
- Make service categories easy to scan.
- Use dedicated service pages when the brief requires them.
- Do not invent legal specialties that the firm has not confirmed.

### Team / About
- Present lawyers as real people, not anonymous corporate figures.
- Use consistent portrait treatment and biography layouts.
- Include names, roles, qualifications, and experience only when supplied or verified.
- Never invent credentials, years of experience, awards, case results, client logos, or professional memberships.

### FAQ
- Write concise, understandable answers.
- Use plain language rather than unnecessary legal jargon.
- Ensure accordions, if used, work with mouse, keyboard, and touch.
- Do not invent legal advice or promise outcomes.

### Contact / Consultation
- Make the next step obvious.
- Include a clean, accessible contact form if requested.
- Label every field and validate inputs clearly.
- Provide useful success and error feedback.
- Do not imply a form has been submitted if it has not actually been connected to a backend or form service.
- Do not expose private information or put sensitive details in URLs.

This is a content framework, not permission to add every section automatically. Follow the supplied project scope and reference. Prioritize the information a potential client needs.

---

## 9. WRITING AND LEGAL TRUST

The copy should sound professional, calm, direct, and human.

- Use clear language and short, useful paragraphs.
- Explain complex services in accessible terms.
- Avoid exaggerated claims, fear-based messaging, and aggressive sales language.
- Avoid clichés such as “we fight for justice” unless the real brand explicitly uses them.
- Do not invent client testimonials, case studies, awards, rankings, success rates, or legal credentials.
- Do not fabricate the firm's address, phone number, email, team members, or jurisdictions.
- If real business details have not been provided, use clearly identified placeholders that are easy to replace.
- Do not present placeholder content as verified fact.
- Do not promise specific legal outcomes.
- Make it clear that legal content and disclaimers must be reviewed for the firm's jurisdiction before publication.

The website should reduce uncertainty and help visitors take the next step, not pressure them.

---

## 10. IMAGERY AND ART DIRECTION

Photography should reinforce trust, competence, and approachability.

Prioritize:
- Authentic-looking team portraits
- Thoughtful architectural or office photography, if consistent with the reference
- Restrained, editorial crops
- Natural lighting and neutral color grading
- Consistent image proportions and treatment

Avoid:
- Obvious generic stock images of gavels, scales of justice, courthouse columns, or handshakes
- Images that do not relate to the section
- Inconsistent photo styles
- Artificial-looking imagery that undermines trust
- Distorted faces, stretched images, and careless crops

Use the reference images to understand the intended art direction, but do not reuse its proprietary photography in the finished website. Use licensed, original, or otherwise permitted images. If appropriate imagery is unavailable, use carefully chosen temporary assets and make them easy to replace.

Use responsive image sizing, meaningful alt text, and lazy loading for below-the-fold images. Do not lazy-load the primary above-the-fold hero image if that would delay the first impression.

---

## 11. MOTION AND INTERACTIONS

Motion should be subtle, purposeful, and polished. The site should feel calm and responsive rather than cinematic or theatrical.

Appropriate motion may include:
- Subtle fade or translate reveals
- Gentle image transitions
- Underline or color transitions on links
- Clear button hover and focus states
- Small, restrained menu transitions
- Simple accordion interactions

Rules:
- Follow the reference's actual motion language where it can be observed.
- Do not animate every element.
- Avoid excessive parallax, pinned sections, horizontal scrolling, scroll hijacking, custom cursors, dramatic page transitions, and unnecessary 3D.
- Never delay access to content while waiting for an animation.
- Keep durations short enough to preserve responsiveness.
- Prefer `transform` and `opacity` for animation.
- Use `IntersectionObserver` for simple reveal effects when needed.
- Avoid expensive scroll handlers and layout thrashing.
- Support `prefers-reduced-motion`.
- Ensure the page remains fully usable if animation fails or is disabled.

Native scrolling must feel smooth and immediate. Do not override normal browser scrolling with a heavy custom system unless the reference clearly requires it and the implementation remains performant.

---

## 12. RESPONSIVE DESIGN

Build and test intentional layouts for:
- Large desktop
- Standard desktop and laptop
- Tablet
- Mobile

Do not simply shrink the desktop layout.

Check:
- Navigation and mobile menu
- Heading wrapping
- Text width and readability
- Content gutters and section spacing
- Image crop and aspect ratio
- Forms and input sizes
- Buttons and tap targets
- Footer layout
- Horizontal overflow
- Sticky elements and viewport height behavior

Touch devices must not depend on hover. Replace or remove hover-only interactions on mobile. Avoid tiny text and controls that are difficult to tap.

---

## 13. ACCESSIBILITY

Maintain:
- Semantic HTML
- Logical heading order
- Keyboard navigation
- Visible focus indicators
- Sufficient color contrast
- Proper form labels and error messages
- Meaningful image alt text
- Accessible buttons and links
- Appropriate ARIA only when native HTML is insufficient
- Reduced-motion support

Use buttons for actions and links for navigation. Do not use clickable `div` elements when a native control is appropriate.

---

## 14. PERFORMANCE

The website should load quickly and remain responsive on ordinary devices.

- Optimize image dimensions and formats.
- Use lazy loading below the fold.
- Avoid unnecessary JavaScript.
- Avoid large animation libraries when CSS or native JavaScript is sufficient.
- Avoid repeated event listeners and expensive scroll calculations.
- Use `requestAnimationFrame` only where it meaningfully helps.
- Prevent layout shifts by specifying image dimensions or aspect ratios.
- Keep third-party dependencies to a minimum.
- Check for console errors and broken resources.
- Do not sacrifice performance for decorative effects.

---

## 15. CODE QUALITY AND PROJECT CARE

Before changing files:
1. Inspect the existing project and identify its structure.
2. Understand which pages and interactions already exist.
3. Reuse functioning code where appropriate.
4. Avoid replacing working sections without a clear reason.
5. Keep all pages consistent with the same design system.

Implementation standards:
- Keep HTML, CSS, and JavaScript organized and separated.
- Use meaningful class names.
- Use reusable CSS custom properties and component patterns.
- Avoid duplicated styles and repeated logic.
- Keep JavaScript functions focused and readable.
- Comment only where logic is not self-explanatory.
- Remove dead code, unused styles, broken links, and console errors.
- Do not make superficial changes that leave the main design inconsistent.
- Ensure every visible control has a real, working behavior.

---

## 16. REQUIRED WORKFLOW

Follow this process instead of immediately coding from assumptions.

### Phase 1 — Inspect
- Inspect the existing codebase and project structure.
- Open the Behance reference and review every accessible project image and description.
- Identify the site's visual language, layout, typography, color palette, imagery, and interactions.
- Record what is observed and what remains uncertain.

### Phase 2 — Define the design system
- Establish color, typography, spacing, container, grid, border, and button tokens.
- Define reusable rules for headings, body copy, forms, navigation, and section layouts.
- Ensure the design system can be applied consistently across all pages.

### Phase 3 — Build
- Implement the core layout and page hierarchy first.
- Match the reference's proportions and visual rhythm before adding motion.
- Use original brand copy and legitimate imagery.
- Build responsive behavior as part of the implementation, not as a final afterthought.

### Phase 4 — Refine
- Compare the implementation against the reference.
- Fix typography, alignment, spacing, image crops, and section proportions.
- Refine interactive states and transitions.
- Remove any effect that does not improve clarity, trust, or the reference match.

### Phase 5 — Test
- Test all pages at desktop, tablet, and mobile sizes.
- Test navigation, forms, accordions, buttons, and links.
- Check keyboard use, focus states, contrast, and reduced motion.
- Check for horizontal overflow, broken images, console errors, and performance problems.
- Verify that repeated elements use consistent styles across all pages.

---

## 17. FINAL QUALITY CHECK

Do not consider the work complete until the following has been reviewed.

### Reference fidelity
- Does the result clearly reflect the provided Behance reference?
- Have the main layout, spacing, typography, colors, and image treatment been studied and translated?
- Have unsupported assumptions been avoided?

### Brand and trust
- Does the website feel credible, composed, and premium?
- Does it feel human without becoming casual?
- Does it avoid legal clichés and generic template styling?
- Is all firm-specific information real or clearly marked as placeholder content?

### Typography and consistency
- Are all H1 elements consistent across the website?
- Are all H2 and H3 elements consistent?
- Are body copy, labels, buttons, and metadata standardized?
- Are line lengths, spacing, and heading wraps intentional?

### Usability
- Can a visitor understand the firm's services quickly?
- Is the contact or consultation action easy to find?
- Is the copy readable and jargon-light?
- Do all links and controls work?

### Responsive and accessible
- Does the layout work on desktop, tablet, and mobile?
- Is the page usable by keyboard?
- Are focus states and contrast adequate?
- Is reduced motion respected?

### Performance and code
- Is scrolling smooth and native-feeling?
- Are animations restrained and performant?
- Are images optimized?
- Are there any console errors, broken links, or layout shifts?
- Is the code organized and easy to maintain?

If an issue is found, fix it and review again. Do not merely list problems; resolve them in the code whenever possible.

---

## ABSOLUTE RULE

Build a law-firm website that earns trust through clarity, restraint, precision, and excellent execution.

Do not make it look like a generic legal template. Do not turn it into a flashy creative-agency site. Do not add effects that distract from the firm's expertise or make it harder for a potential client to find help.

The governing principle is:

**Study the reference → Understand its design system → Rebuild its visual principles → Adapt them to an original legal brand → Test and refine every detail.**

The result should feel quietly distinctive, polished, credible, accessible, responsive, and genuinely useful.
