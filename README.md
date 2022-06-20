# My personal/professional website
The site contains the following information
- About me
- Professional information
- Professional timeline (career projection)
- Blogs / Vlogs
- Reflections
- Guides
- How tos
- Featured contents

## Functional requirements
- Should be able to display content curated in a chosen CMS
- Design should be simple / clean / organised

**TODO**
- Content strategy / structure in the page
- Research for way to convert from CSR to SSR to lessen queries to CMS and lessen cost

## Non functional requirements
- Accessible
- Content don't need to be fresh / delays should be ok
- Speed is not really priority
- No server / github pages for deployments
- Client side rendering
- Photos stored on CMS
- CMS is vendor
- Does not need to be deployed on edges

## Data estimation
- 2 new contents per week where each content is at 100kb
- a content can have about average of 2 photos optimised for web where each photo is about 300kb each
- (2 x 100kb) x 52 weeks = 10.4mb x 5 years = 52mb for 5 years
- (4 per week x 300kb) = 62.4mb * 5 years = 312mb for 5 years
- Allotment of 10mb for static content (photos and text) for years
- 374mb for 5 years for content
