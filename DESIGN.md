# RathiOS design direction

This is a preservation redesign of a personal developer portfolio. The desktop workspace, eight app views, dock, window controls, project architecture explorer, wallpapers, and recruiter tour remain its identity.

## Audit

The original interface uses dark navy surfaces, cyan/blue accents, Inter and Fira Code, glass panels, small labels, and colorful app icons. Content is local to `resumeData.ts`, although some views repeat it. The entry point mounts a desktop rather than the retained scrolling portfolio components. Important paths are Projects, Resume, Contact, and the guided recruiter tour. URL structure and navigation labels remain stable.

The main friction is competing glows, repeated profile/social summaries, small controls, double-click discovery on mobile, content-wide window dragging, hardcoded status claims, and windows whose layouts do not adapt to their actual size. The build previously shipped all app content in the initial JavaScript bundle.

## Direction

Design variance 6, motion intensity 4, visual density 4. Keep the established dark desktop identity. Use native system typography, graphite/navy materials, ice-blue interactive accents, and subdued colors for app identity. Glass is reserved for the desktop shell. Content windows favor solid, readable surfaces. Corners follow a 6/9/12/18px scale.

The workspace has a clear welcome area, real project previews with direct navigation, and useful profile highlights. Small screens prioritize the welcome and app launcher, then stack supporting widgets. Windows fill available space on mobile. Search, keyboard focus, window controls, reduced motion, persistence, and honest external actions are part of the design.

## Implementation

`src/index.css` owns shared materials and desktop layout. `shell.css` owns system controls. `windows/windows.css` owns app content. All three share `--os-*` surface, text, border, and accent tokens. Wallpapers are decorative CSS layers. No external font request is needed. App contents load on demand.

The Resume app displays pages rendered from the original PDF, with zoom and direct PDF links. After replacing the PDF, run `python scripts/render_resume_preview.py` with pypdfium2 and Pillow installed to refresh its page images and generated manifest.
