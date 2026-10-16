(() => {
  const projects = {
    inspektai: {
      index: "01 / 06", category: "INSPECTION · PDI REPORT · INSPECTOR APP", title: "Make a car’s condition<br /><em>easy to believe.</em>",
      summary: "I connected the customer promise to the inspection work behind it: a clear path in, a repeatable process for the inspector, and a report a buyer can actually use.",
      role: "Product design · UX/UI", surfaces: "Landing · inspector · report", status: "Live service", period: "2025—26",
      hero: "report", stamp: ["300+", "inspection points · one clear report"],
      problem: "A high-stakes purchase needs proof people can understand.",
      challenge: "For a new or used car, the buyer needs confidence before committing. The inspector needs a repeatable checklist that captures enough detail without turning every vehicle into a paperwork exercise.",
      tension: "A long inspection can feel overwhelming; an over-simplified summary can feel untrustworthy. Both sides need the same information, presented at the right level.",
      screens: [
        { type: "report", title: "Customer report", source: "PDI REPORT", note: "Turn a dense inspection into a quick, decision-ready summary." },
        { type: "inspection", title: "Inspector checklist", source: "INSPECTOR APP", note: "Keep the on-site flow structured, scannable and easy to complete." },
        { type: "landing", title: "Service entry page", source: "PDI LANDING PAGE", note: "Introduce the service with visible proof and a clear next step." }
      ],
      decisions: [
        ["01 · TRUST", "Show the evidence", "Put the overall condition, key findings and supporting detail in a hierarchy a buyer can scan, then inspect further."],
        ["02 · FIELD WORK", "Make capture repeatable", "Break a broad PDI into smaller checks so inspectors can move through a vehicle systematically and record exceptions in context."],
        ["03 · HAND-OFF", "Design for both sides", "Use consistent language and status cues so the inspection process and customer report feel like one service." ]
      ],
      steps: [["Understand", "Map the customer question to the inspector’s on-site task."], ["Structure", "Group checks and give important exceptions more visual weight."], ["Prototype", "Explore report and checklist patterns as a connected flow."], ["Ship & learn", "Carry the experience into a live service and refine the touchpoints." ]],
      liveLabel: "InspektAI · vehicle inspection", liveUrl: "https://www.inspektai.in/", liveCta: "Open InspektAI",
      lesson: "A report is part of the product, not the receipt at the end. The way findings are framed can either reduce uncertainty or create more of it.", next: "assist", nextLabel: "A clearer way to book"
    },
    assist: {
      index: "02 / 06", category: "BOOKING · BUYER GUIDANCE · INSPEKTAI ASSIST", title: "Help buyers choose<br /><em>the right next step.</em>",
      summary: "A buyer often arrives with a car in mind, not a service vocabulary. Assist turns that uncertainty into a small sequence of understandable choices, leading to the right inspection and a faster booking.",
      role: "Product design · UX/UI", surfaces: "Guided flow · landing", status: "Live entry point", period: "2025—26",
      hero: "booking", stamp: ["01 → 03", "choose · confirm · book"],
      problem: "The first booking decision should feel straightforward.",
      challenge: "The entry point has to serve different moments: a buyer checking a used car, an owner arranging a new-car PDI, or someone unsure what to book at all.",
      tension: "Too many choices ask customers to understand the operation before they know what it does. Too few choices can send a customer into the wrong service path.",
      screens: [
        { type: "booking", title: "Choose an inspection", source: "ASSIST · STEP 01", note: "Start with the customer’s situation, then recommend a service." },
        { type: "landing", title: "Set expectations", source: "PDI LANDING PAGE", note: "Use the live landing-page presentation to show how trust and the booking action work together." },
        { type: "booking-confirm", title: "Review the booking", source: "ASSIST · STEP 02", note: "Summarize the selected service before asking for the next detail." }
      ],
      decisions: [
        ["01 · GUIDANCE", "Ask one useful question at a time", "A focused choice reduces the mental load of comparing unfamiliar inspection services."],
        ["02 · CLARITY", "Show what happens next", "Progress, short explanations and a review step make the commitment feel predictable."],
        ["03 · TRUST", "Keep proof close to the decision", "Inspection coverage, the report and service expectations sit near the action they help explain." ]
      ],
      steps: [["Audit", "Review the live entry experience and identify where people need to guess."], ["Map", "Connect customer intent to the relevant inspection route."], ["Reduce", "Keep each screen focused on one clear decision."], ["Refine", "Use live service questions to keep the journey understandable." ]],
      liveLabel: "InspektAI Assist · guided booking", liveUrl: "https://assist.inspektai.in/start", liveCta: "Open the booking flow",
      lesson: "A good service funnel does useful work before a person clicks the final button: it translates, sets expectations and removes the wrong choices.", next: "inspektai", nextLabel: "The inspection behind it"
    },
    motodoc: {
      index: "03 / 06", category: "GARAGE MANAGEMENT · GMS · TECDOC", title: "Give the garage<br /><em>a clearer workday.</em>",
      summary: "MotoDoc brings service jobs, vehicle information and workshop administration into a more legible operating flow, with TecDoc collaboration supporting parts and vehicle data.",
      role: "Product design · UX/UI · operations", surfaces: "GMS · admin · mechanic", status: "Live product", period: "2025—26",
      hero: "garage", stamp: ["ONE VIEW", "jobs · people · vehicle context"],
      problem: "Workshop work moves quickly; scattered information does not.",
      challenge: "Garage teams coordinate appointments, mechanics, parts, vehicle history and customer updates. When each step sits in a different place, the hand-offs become the work.",
      tension: "Operators need a complete view to manage capacity; mechanics need a focused view that is quick to use between jobs. One dense screen cannot serve both equally well.",
      screens: [
        { type: "garage", title: "Workshop overview", source: "GMS", note: "Bring today’s jobs, capacity and status into a useful operational view." },
        { type: "mechanic", title: "Manage mechanic", source: "ADMIN · MECHANIC SETUP", note: "A Figma working-file form showing how garage access and mechanic details are configured." },
        { type: "vehicle-profile", title: "Vehicle context", source: "LIVE MOTODOC VISUAL", note: "A live product visual for the vehicle profile and maintenance context." }
      ],
      decisions: [
        ["01 · OPERATIONS", "Keep status visible", "Give managers a quick read on what is booked, underway, waiting and ready to hand back."],
        ["02 · ROLE FIT", "Separate overview from task", "The owner’s dashboard and the mechanic’s next action need different levels of detail."],
        ["03 · DATA", "Make vehicle context useful", "Connect a vehicle and its parts information to the service job instead of making staff repeat lookups." ]
      ],
      steps: [["Follow the work", "Trace the hand-offs from appointment through completion."], ["Name the roles", "Separate manager oversight from mechanic task entry."], ["Shape the system", "Design the job list, configuration and vehicle surfaces as one workflow."], ["Support operations", "Carry the product into the changing needs of real service teams." ]],
      liveLabel: "MotoDoc · garage management", liveUrl: "https://motodoc.in/", liveCta: "Explore MotoDoc",
      lesson: "Internal software is customer experience at one remove. A smoother workshop hand-off changes how quickly and confidently the service reaches the driver.", next: "club", nextLabel: "From the workshop to the community"
    },
    club: {
      index: "04 / 06", category: "COMMUNITY · MOTO365 CLUB WEBAPP", title: "Make room for<br /><em>the people behind the cars.</em>",
      summary: "Moto365 Club brings enthusiasts together around builds, questions, local drives and shared knowledge. The product needed to feel like a useful community, not another feed to scroll past.",
      role: "Product design · UX/UI", surfaces: "Club web app · feed · events", status: "Live web app", period: "2025—26",
      hero: "club", stamp: ["ONE CLUB", "builds · people · drives"],
      problem: "Car enthusiasm is social; useful places to share it are fragmented.",
      challenge: "People want to show a build, learn from another owner, and find the next meet or route. Those needs span content, connection and real-world activity.",
      tension: "A generic feed can bury the thing someone came for. The experience needs enough structure to surface useful content and enough personality to make people want to contribute.",
      screens: [
        { type: "club", title: "Community feed", source: "CLUB WEBAPP", note: "Balance member stories with a clear, recognisable community context." },
        { type: "club-events", title: "Local drives", source: "EVENTS & MEETUPS", note: "Make events feel easy to discover, understand and join." },
        { type: "club-profile", title: "Owner profile", source: "MEMBER SPACE", note: "Give enthusiasts a home for their vehicles, identity and interests." }
      ],
      decisions: [
        ["01 · IDENTITY", "Start with what members care about", "Vehicles, builds and local culture are the context; community mechanics should support them."],
        ["02 · DISCOVERY", "Make activity legible", "Separate stories, questions and meet-ups so a member can find a relevant next step."],
        ["03 · PARTICIPATION", "Give contribution a place", "Profiles and lightweight reactions help people build connections around the subject they already love." ]
      ],
      steps: [["Listen for jobs", "Understand what an enthusiast wants to share, learn and do together."], ["Group content", "Distinguish a build story from a question or a weekend plan."], ["Prototype the feed", "Explore hierarchy, member identity and the event preview."], ["Learn in community", "Keep improving the experience as the live group grows." ]],
      liveLabel: "Moto365 Club · enthusiast community", liveUrl: "https://www.moto365.club/app/dashboard", liveCta: "Visit the club",
      lesson: "Belonging is created by what people can do with one another, not by a community badge. The interaction model should make meaningful participation easier.", next: "rebrand", nextLabel: "The identity that holds it together"
    },
    rebrand: {
      index: "05 / 06", category: "REBRAND · IDENTITY · DESIGN SYSTEM", title: "A new identity<br /><em>for what came next.</em>",
      summary: "When the business separated, Moto365 needed a distinct identity that could carry the product family forward while Automoto continued as a separate company.",
      role: "Brand design · product design", surfaces: "Logo · system · product touchpoints", status: "Live brand system", period: "2026",
      hero: "identity", stamp: ["ONE BRAND", "a family of connected products"],
      problem: "A name change needs more than a new logo file.",
      challenge: "The company split in April 2026. Moto365 continued with the existing products and services; Automoto became a separate company. The new identity had to make that distinction clear without breaking recognition across the ecosystem.",
      tension: "A parent brand should feel coherent across inspection, service, community and commerce, while each product still needs a voice that fits its job.",
      screens: [
        { type: "identity", title: "Identity principles", source: "BRANDING & DESIGN SYSTEM", note: "A responsive identity study built from the new Moto365 mark and product family." },
        { type: "brand-applications", title: "Product architecture", source: "BRAND APPLICATIONS", note: "Show how the parent identity and individual product names work as one family." },
        { type: "brand-before-after", title: "From Automoto to Moto365", source: "REBRAND", note: "Separate the companies clearly while preserving the product story." }
      ],
      decisions: [
        ["01 · OWNERSHIP", "Make Moto365 stand on its own", "A distinctive parent mark helps establish the company that continues after the split."],
        ["02 · FLEXIBILITY", "Design for many surfaces", "The identity needs to work in a header, on a report, inside a dashboard and as a compact app mark."],
        ["03 · ARCHITECTURE", "Keep products related, not identical", "Consistent rules connect the family while each product remains recognisable in its context." ]
      ],
      steps: [["Clarify the story", "Separate Automoto and Moto365 in the company timeline and product language."], ["Build the mark", "Create an identity that carries the new name across sizes and surfaces."], ["Set the rules", "Bring colour, type and product naming into a repeatable system."], ["Apply & refine", "Use the brand across the live parent and product experiences." ]],
      liveLabel: "Moto365 · parent company", liveUrl: "https://moto365.in/", liveCta: "Visit Moto365",
      lesson: "A rebrand works when it makes the next chapter easier to understand. The useful output is the system teams can keep applying after the launch moment.", next: "marketplace", nextLabel: "A new place to find the right fit"
    },
    marketplace: {
      index: "06 / 06", category: "ECOMMERCE · AUTOMOTIVE MARKETPLACE", title: "Find the right fit<br /><em>for your car.</em>",
      summary: "An automotive marketplace needs to help people browse by what they drive and what they need, while giving the team a dependable way to manage the products behind the storefront.",
      role: "Product design · UX/UI · operations", surfaces: "Storefront · catalogue · admin", status: "Product direction", period: "2025—26",
      hero: "market", stamp: ["SHOP SMARTER", "products that fit the vehicle"],
      problem: "An automotive catalogue is only useful when the fit is clear.",
      challenge: "Parts and services are difficult to compare when every listing starts with a different label. A customer needs to find relevant options; an operator needs reliable catalogue and inventory tools.",
      tension: "More discovery choices can help exploration but slow the decision. The experience has to make fitment, compatibility and the next purchase action easy to scan.",
      screens: [
        { type: "market", title: "Product discovery", source: "ECOM · STOREFRONT", note: "A catalogue direction with categories, product cues and a light purchase interaction." },
        { type: "market-ops", title: "Manage inventory", source: "ECOM · ADMIN", note: "Connect the customer-facing catalogue to the operational work behind it." },
        { type: "mechanic", title: "Configure service partners", source: "ECOM · OPERATIONS", note: "The working file also includes operational setup patterns such as mechanic management." }
      ],
      decisions: [
        ["01 · RELEVANCE", "Lead with the vehicle and the need", "A useful browse path starts with context a driver understands, not internal catalogue taxonomy."],
        ["02 · CONFIDENCE", "Keep compatibility visible", "The fit between a product and a vehicle belongs in the decision, not behind a final surprise."],
        ["03 · OPERATIONS", "Design the storefront and its tools together", "Catalogue clarity depends on the people who add, organise and maintain the products." ]
      ],
      steps: [["Map discovery", "Trace how a driver moves from a vehicle need to a relevant product."], ["Structure the catalogue", "Group products in a way that supports comparison and vehicle fit."], ["Connect operations", "Consider the admin surfaces that keep listings dependable."], ["Prototype the loop", "Make browse, shortlist and bag interactions feel immediate and clear." ]],
      liveLabel: "Moto365 product ecosystem", liveUrl: "https://moto365.in/", liveCta: "Visit Moto365",
      lesson: "The quality of a marketplace is shaped by the work behind the listing. Useful discovery starts with sound operations and clear product information.", next: "inspektai", nextLabel: "Back to the inspection experience"
    }
  };

  const params = new URLSearchParams(window.location.search);
  const key = params.get("case") || "inspektai";
  const project = projects[key] || projects.inspektai;
  const main = document.querySelector("#project-detail");
  const projectURL = id => `./project.html?case=${encodeURIComponent(id)}`;

  function renderArtifact(type) {
    if (type === "report") return `<div class="ui-window"><div class="ui-browser-bar"><i></i><i></i><i></i><span>report.moto365.in / pdi / 1048</span></div><div class="ui-body"><div class="ui-topline"><span class="ui-wordmark">inspekt<span style="color:#f35f38">ai</span></span><span class="ui-pill">REPORT READY · VERIFIED</span></div><div class="report-intro"><div><h3>Know the car<br />before you commit.</h3><p>Independent vehicle inspection · Report ID 365-1048</p></div><div class="score-medallion">87<small>/100</small></div></div><div class="report-content"><div class="report-car"><small>2021 · MID-SIZE SUV · 42,800 KM</small><div class="report-car-art"><i></i><b></b></div><div class="report-vehicle-data"><span>ENGINE<b>2.0 L</b></span><span>FUEL<b>Petrol</b></span><span>GEARBOX<b>Automatic</b></span></div></div><div class="finding-list"><div class="finding-head"><span>INSPECTION AREA</span><span>CONDITION</span></div><div class="finding-row"><i></i><span>Exterior &amp; body</span><b>Good</b></div><div class="finding-row"><i></i><span>Engine &amp; transmission</span><b>Good</b></div><div class="finding-row"><i class="warn"></i><span>Tyres &amp; brakes</span><b class="warn">Review</b></div><div class="finding-row"><i></i><span>Interior &amp; electronics</span><b>Good</b></div></div></div></div></div>`;
    if (type === "inspection") return `<div class="ui-window inspection-ui"><aside class="inspection-sidebar"><span class="ui-wordmark">INSP<span style="color:#ff7047">·</span>AI</span><div class="inspection-nav"><span class="active">01&nbsp; Vehicle details</span><span>02&nbsp; Exterior</span><span>03&nbsp; Engine bay</span><span>04&nbsp; Interior</span><span>05&nbsp; Road test</span></div><div class="inspection-user">INSPECTOR · RAHUL K.</div></aside><div class="inspection-main"><div class="inspection-title"><div><h3>Exterior inspection</h3><small>2021 SUV · VIN ending 8241</small></div><span class="ui-pill">IN PROGRESS</span></div><div class="inspection-progress"><span>04 / 08 sections</span><i></i><span>52%</span></div><div class="inspection-checks"><label class="inspection-check"><input type="checkbox" checked /><span>Body panels<small>Paint · dents · alignment</small></span></label><label class="inspection-check"><input type="checkbox" checked /><span>Glass &amp; lighting<small>Windscreen · lamps</small></span></label><label class="inspection-check"><input type="checkbox" /><span>Tyres<small>Tread depth · wear pattern</small></span></label><label class="inspection-check"><input type="checkbox" /><span>Wheels<small>Rim · balance · damage</small></span></label></div><div class="inspection-foot"><small>Autosaved · 10:42 AM</small><button class="ui-action" data-next-step>Next section&nbsp; →</button></div></div></div>`;
    if (type === "booking" || type === "booking-confirm") return `<div class="ui-window"><div class="ui-browser-bar"><i></i><i></i><i></i><span>assist.inspektai.in / start</span></div><div class="booking-ui"><div class="ui-topline"><span class="ui-wordmark">InspektAI <i style="color:#f35f38;font-style:normal">Assist</i></span><span class="ui-muted" style="font-size:7px">NEED HELP? &nbsp; ↗</span></div><div class="booking-progress"><i class="active"></i><i class="${type === "booking-confirm" ? "active" : ""}"></i><i></i><i></i></div><div class="booking-content"><div><h3>${type === "booking-confirm" ? "Review your inspection" : "What are you looking at today?"}</h3><p>${type === "booking-confirm" ? "A quick check before we collect your details." : "Choose a service and we’ll guide you from here."}</p><div class="booking-options"><button class="booking-option ${type === "booking-confirm" ? "selected" : "selected"}" data-select-option><i>⌕</i><span><b>Used car inspection</b><small>Understand condition before you buy</small></span><em>›</em></button><button class="booking-option" data-select-option><i>✳</i><span><b>New car PDI</b><small>Check the vehicle before delivery</small></span><em>›</em></button></div></div><aside class="booking-summary"><small>YOUR INSPECTION</small><h4>Independent PDI</h4><p>On-site inspection · digital report</p><strong>300+<span style="font-size:7px;color:#838880;font-weight:400"> checks</span></strong><button class="ui-action" data-next-step>${type === "booking-confirm" ? "Continue to details" : "See what’s included"}&nbsp; →</button></aside></div></div></div>`;
    if (type === "landing") return `<div class="ui-window landing-ui"><div class="ui-browser-bar"><i></i><i></i><i></i><span>www.inspektai.in</span></div><img src="./assets/pdi-landing-context.webp" alt="InspektAI PDI landing-page presentation, desktop and mobile layouts" loading="lazy" /><div class="landing-ui-caption"><b>CHECK BEFORE YOU COMMIT.</b><small>Transparent vehicle inspection · 300+ checkpoints</small></div></div>`;
    if (type === "garage") return `<div class="ui-window garage-screen"><aside class="garage-rail"><b>⌘</b><i></i><i></i><i></i><i></i></aside><div class="garage-workspace"><div class="garage-title"><div><h3>Workshop overview</h3><span class="ui-muted" style="font-size:6px">Tuesday · 12 active jobs</span></div><button>+ NEW JOB</button></div><div class="garage-stats"><article><small>IN PROGRESS</small><b>08</b></article><article><small>WAITING PARTS</small><b>02</b></article><article><small>READY TO COLLECT</small><b>03</b></article><article><small>MECHANICS</small><b>06</b></article></div><div class="garage-table head"><span>VEHICLE / JOB</span><span>ASSIGNED TO</span><span>STATUS</span><span>TIME</span></div><div class="garage-table"><b>Honda City · 2021</b><span>R. Kumar</span><span class="tag">In bay</span><span>09:20</span></div><div class="garage-table"><b>Hyundai Creta · 2023</b><span>S. Joseph</span><span class="tag ok">Ready</span><span>10:05</span></div><div class="garage-table"><b>Maruti Baleno · 2020</b><span>A. Khan</span><span class="tag">Waiting</span><span>10:40</span></div><div class="garage-table"><b>VW Taigun · 2022</b><span>R. Kumar</span><span class="tag">In bay</span><span>11:15</span></div></div></div>`;
    if (type === "mechanic") return `<div class="ui-window mechanic-ui"><div class="mechanic-bar"><i>←</i><h3>Manage mechanic</h3></div><form class="mechanic-form" data-preview-form><label>User<input placeholder="Select a user" /></label><label>Name<input value="Ravi Kumar" /></label><label>Email<input value="ravi@workshop.in" /></label><label>Phone number<input value="+91 98••• ••824" /></label><label>Specialization<input value="Diagnostics &amp; service" /></label><button type="submit">Save changes</button></form></div>`;
    if (type === "vehicle-profile") return `<div class="ui-window vehicle-ui"><div class="ui-browser-bar"><i></i><i></i><i></i><span>motodoc.in / vehicles / profile</span></div><div class="vehicle-profile-head"><div><small>VEHICLE PROFILE</small><h3>Honda City <span>2021</span></h3><p>KA 03 · AB 8241 &nbsp; · &nbsp; 42,800 km</p></div><span class="ui-pill">ACTIVE</span></div><img src="./assets/motodoc-vehicle-profile.avif" alt="Vehicle profile visual from the live MotoDoc product" loading="lazy" /><div class="vehicle-profile-foot"><span><small>LAST SERVICE</small><b>12 Aug 2025</b></span><span><small>NEXT SERVICE</small><b>Due in 2,200 km</b></span><span><small>VEHICLE DATA</small><b>Verified</b></span></div></div>`;
    if (type === "club" || type === "club-events" || type === "club-profile") return `<div class="ui-window club-screen"><div class="club-screen-header"><span class="ui-wordmark">moto<span style="color:#f35f38">365</span> club</span><span>Discover</span><span>Community</span><span>Events</span><span class="ui-pill">R</span></div><div class="club-main"><article class="club-feed-card"><div class="club-feed-image"><small>${type === "club-events" ? "WEEKEND DRIVE · BENGALURU" : type === "club-profile" ? "MEMBER GARAGE · SINCE 2021" : "OWNER STORY · FEATURED BUILD"}</small></div><div class="club-feed-copy"><div class="club-author"><i>${type === "club-profile" ? "A" : "R"}</i><span><b>${type === "club-profile" ? "Arjun’s Garage" : "Rhea’s Garage"}</b><small>${type === "club-events" ? "Community host · Bengaluru" : "Enthusiast · Bengaluru"}</small></span><span>♡ 128</span></div><h3>${type === "club-events" ? "Saturday, above the city." : type === "club-profile" ? "A place for every road story." : "The long way home is the right way."}</h3><p>${type === "club-events" ? "A relaxed morning drive, a coffee stop and a few familiar faces." : "Sharing the small upgrades, the first drive and everything learned along the way."}</p><div class="club-feed-actions"><span>♡ Appreciate</span><span>◯ Comment</span><span>↗ Share</span></div></div></article><aside class="club-side-card"><h4>${type === "club-profile" ? "IN THE GARAGE" : "UP NEXT NEAR YOU"}</h4><div class="club-event"><i>07<br />JUN</i><span><b>Coastal morning run</b><small>Sunday · 7:30 AM · 18 drivers</small></span></div><div class="club-event"><i>14<br />JUN</i><span><b>Cars &amp; coffee</b><small>Saturday · 9:00 AM · 32 going</small></span></div><button class="ui-action" data-next-step>Explore community</button></aside></div></div>`;
    if (type === "identity" || type === "brand-applications" || type === "brand-before-after") return `<div class="ui-window identity-screen"><div class="identity-screen-head"><span>MOTO365 · IDENTITY SYSTEM</span><span>${type === "brand-before-after" ? "01 — 02" : "MARK / WORD / SYSTEM"}</span></div><div class="identity-lockup"><img class="mark" src="./assets/moto365-mark.avif" alt="Moto365 symbol" /><span>moto<em>365</em></span></div><div class="identity-palette"><article><i></i><small>INK / 181917</small></article><article><i></i><small>ROAD / FC5C2E</small></article><article><i></i><small>MINT / B8D5CB</small></article><article><i></i><small>STONE / A5ACA3</small></article><article><i></i><small>NIGHT / 343B36</small></article></div><div class="identity-products"><span>INSPEKTAI</span><span>MOTODOC</span><span>MOTO365 CLUB</span><span>MARKETPLACE</span></div></div>`;
    if (type === "market" || type === "market-ops") return `<div class="ui-window market-screen"><div class="market-screen-head"><span class="ui-wordmark">moto<span>365</span></span><span>Shop</span><span>Services</span><span>Support</span><div class="market-search">Search by product, service or vehicle</div><span>♡</span><span data-cart-count>Bag · 0</span></div>${type === "market" ? `<div class="market-hero"><small>MADE FOR THE ROAD AHEAD</small><h3>Find the right fit<br />for your car.</h3><a href="#interfaces">Explore the collection&nbsp; ↗</a></div><div class="market-categories"><button class="active" data-filter="all">All products</button><button data-filter="parts">Parts</button><button data-filter="care">Care</button><button data-filter="accessories">Accessories</button></div><div class="market-grid"><article class="market-item" data-category="care"><div class="market-item-art"></div><h4>Engine care kit</h4><span>Everyday care <b>₹899</b></span><button aria-label="Add engine care kit to bag" data-add-to-bag>+</button></article><article class="market-item" data-category="parts"><div class="market-item-art"></div><h4>Road-ready wheel</h4><span>Vehicle matched <b>₹4,500</b></span><button aria-label="Add road-ready wheel to bag" data-add-to-bag>+</button></article><article class="market-item" data-category="accessories"><div class="market-item-art"></div><h4>Weekend detail set</h4><span>Curated collection <b>₹1,250</b></span><button aria-label="Add weekend detail set to bag" data-add-to-bag>+</button></article></div>` : `<div class="ui-body"><div class="ui-topline"><b>Product catalogue</b><button class="ui-action" data-next-step>+ Add product</button></div><div class="garage-stats"><article><small>ACTIVE LISTINGS</small><b>248</b></article><article><small>NEEDS REVIEW</small><b>07</b></article><article><small>LOW STOCK</small><b>12</b></article><article><small>VEHICLE FIT</small><b>96%</b></article></div><div class="garage-table head"><span>PRODUCT</span><span>VEHICLE FIT</span><span>STOCK</span><span>STATUS</span></div><div class="garage-table"><b>Engine care kit</b><span>Universal</span><span>38</span><span class="tag ok">Live</span></div><div class="garage-table"><b>Road-ready wheel</b><span>City · 2021—24</span><span>12</span><span class="tag ok">Live</span></div><div class="garage-table"><b>Weekend detail set</b><span>Universal</span><span>04</span><span class="tag">Review</span></div></div>`}</div>`;
    return `<div class="ui-window"><div class="ui-body"><span class="ui-wordmark">moto<span style="color:#f35f38">365</span></span></div></div>`;
  }

  function render() {
    const heroScreen = renderArtifact(project.hero);
    const next = projects[project.next];
    document.title = `Moto365 — ${project.category.split(" · ")[0]} case study`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", project.summary);
    main.innerHTML = `
      <section class="project-hero" id="top">
        <div class="project-hero-copy project-entry">
          <p class="project-kicker"><i></i>${project.category}</p>
          <h1>${project.title}</h1>
          <p class="project-lede">${project.summary}</p>
          <div class="project-hero-links"><a class="pill-button pill-dark" href="#interfaces">Explore the screens <span aria-hidden="true">↓</span></a><a class="project-outline-link" href="${project.liveUrl}" target="_blank" rel="noreferrer">See it live <span aria-hidden="true">↗</span></a></div>
        </div>
        <div class="project-hero-art project-entry"><div class="hero-art-orbit" aria-hidden="true"></div><div class="hero-screen-card"><div class="interface-stage"><div class="interface-caption"><span>${project.category.split(" · ")[0]} / SELECTED SURFACE</span><b>${project.index}</b></div>${heroScreen}</div></div><div class="project-stamp"><b>${project.stamp[0]}</b><small>${project.stamp[1]}</small></div></div>
        <div class="project-hero-bottom"><span>PRODUCT DESIGN · LIVE SYSTEM · SELECTED INTERFACE STUDY</span><span>${project.index}</span></div>
      </section>
      <div class="project-wrap detail-meta project-entry"><article><small>ROLE</small><b>${project.role}</b></article><article><small>SURFACES</small><b>${project.surfaces}</b></article><article><small>STATUS</small><b>${project.status}</b></article><article><small>PERIOD</small><b>${project.period}</b></article></div>
      <section class="detail-section project-wrap" id="overview">
        <div class="section-label"><span>01</span><span>THE CONTEXT</span></div>
        <div class="detail-heading"><h2>${project.problem}</h2><p>${project.challenge}</p></div>
        <div class="problem-band"><div class="problem-lead"><small>THE DESIGN TENSION</small><b>${project.tension}</b><i>↗</i></div><article class="problem-point"><span>01 / USER NEED</span><h3>Know what to do next</h3><p>Make the immediate decision visible in language a customer, operator or member already understands.</p></article><article class="problem-point"><span>02 / SYSTEM NEED</span><h3>Keep the service moving</h3><p>Connect the surface someone sees to the people and tools that need to deliver on its promise.</p></article></div>
      </section>
      <section class="detail-section project-wrap" id="interfaces">
        <div class="section-label"><span>02</span><span>SELECTED INTERFACES</span></div>
        <div class="interfaces-layout"><div class="interfaces-copy"><p class="eyebrow">A FLOW YOU CAN EXPLORE</p><h2>Small decisions.<br /><em>Clearer journeys.</em></h2><p>Move between the key surfaces. Each preview is a focused study of the work in context, with a few interactions you can try directly.</p><div class="screen-tabs" role="tablist" aria-label="Choose an interface preview">${project.screens.map((screen,i)=>`<button class="screen-tab" type="button" role="tab" aria-selected="${i===0}" data-screen-index="${i}"><span>0${i+1}</span><b>${screen.title}</b><i aria-hidden="true">↗</i></button>`).join("")}</div><p class="screen-note">${project.screens[0].source} · ${project.screens[0].note} <br />Interface studies are recreated responsively from the project’s working design boards; live product visuals are identified in their captions.</p></div><div class="interface-stage screen-stage" id="screen-stage"><div class="interface-caption"><span>${project.screens[0].source}</span><b>SCREEN 01 / 0${project.screens.length}</b></div><div id="screen-content">${renderArtifact(project.screens[0].type)}</div></div></div>
        ${project.screens.some(screen=>screen.type==="landing") ? `<figure class="source-visual"><img src="./assets/pdi-landing-context.webp" alt="InspektAI PDI customer landing page presentation, desktop and mobile layouts" loading="lazy" /><figcaption><span>LIVE LANDING PAGE · DESKTOP + MOBILE</span><span>EXISTING PROJECT VISUAL</span></figcaption></figure>` : ""}
      </section>
      <section class="detail-section project-wrap" id="decisions">
        <div class="section-label"><span>03</span><span>DESIGN DECISIONS</span></div>
        <div class="detail-heading"><h2>Good design is<br /><em>work made visible.</em></h2><p>The choices below show how I moved from a service problem to interface patterns that help the next action feel clear.</p></div>
        <div class="design-decisions">${project.decisions.map(([tag,title,body])=>`<article class="decision-card project-entry"><span>${tag}</span><div><h3>${title}</h3><p>${body}</p></div><i>↗</i></article>`).join("")}</div>
        <div class="process-strip" style="margin-top:18px">${project.steps.map(([title,body],i)=>`<article><span>0${i+1} / ${["UNDERSTAND","SHAPE","PROTOTYPE","DELIVER"][i]}</span><h3>${title}</h3><p>${body}</p></article>`).join("")}</div>
      </section>
      <section class="detail-section project-wrap" id="outcomes">
        <div class="section-label"><span>04</span><span>IMPACT &amp; REFLECTION</span></div>
        <div class="outcome-panel"><div class="outcome-title"><small>TEAM-REPORTED · ECOSYSTEM-WIDE</small><h2>More clarity.<br /><em>More momentum.</em></h2></div><div class="outcome-list"><article class="outcome-stat"><b>45–60%</b><small>increase in sales across key services</small></article><article class="outcome-stat"><b>20%</b><small>less time to complete a booking</small></article><article class="outcome-stat"><b>40%</b><small>faster admin and operations flow</small></article><p class="outcome-note">Reported outcomes shared by the project team across the connected service and operations work. They reflect the combined effort and are not attributed to a single screen or design alone.</p></div></div>
        <div class="reflection-box"><h3>What this changed in my practice</h3><p>${project.lesson}</p></div>
        <div class="detail-live-row"><div><span class="live-mark">✓</span><span><b>${project.liveLabel}</b><small>This product is live; the link opens the current public experience.</small></span></div><a href="${project.liveUrl}" target="_blank" rel="noreferrer">${project.liveCta}<span>↗</span></a></div>
      </section>
      <section class="detail-next-project project-wrap"><div><small>NEXT IN THE ECOSYSTEM · ${project.next.toUpperCase()}</small><b>${project.nextLabel || next.title.replace(/<[^>]*>/g, " ")}</b></div><a href="${projectURL(project.next)}" aria-label="Next project: ${next.category.split(" · ")[0]}">→</a></section>
    `;

    const screenContent = document.querySelector("#screen-content");
    const caption = document.querySelector(".screen-stage .interface-caption");
    const screenNote = document.querySelector(".screen-note");
    document.querySelectorAll("[data-screen-index]").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.screenIndex);
      const screen = project.screens[index];
      document.querySelectorAll("[data-screen-index]").forEach(tab => tab.setAttribute("aria-selected", String(tab === button)));
      if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.gsap.to(screenContent, { opacity: 0, y: 7, duration: .16, onComplete: () => {
          screenContent.innerHTML = renderArtifact(screen.type);
          caption.innerHTML = `<span>${screen.source}</span><b>SCREEN 0${index+1} / 0${project.screens.length}</b>`;
          screenNote.innerHTML = `${screen.source} · ${screen.note}<br />Interface studies are recreated responsively from the project’s working design boards; live product visuals are identified in their captions.`;
          bindPrototypeActions();
          window.gsap.to(screenContent, { opacity: 1, y: 0, duration: .24, ease: "power2.out" });
        } });
      } else {
        screenContent.innerHTML = renderArtifact(screen.type);
        caption.innerHTML = `<span>${screen.source}</span><b>SCREEN 0${index+1} / 0${project.screens.length}</b>`;
        screenNote.innerHTML = `${screen.source} · ${screen.note}<br />Interface studies are recreated responsively from the project’s working design boards; live product visuals are identified in their captions.`;
        bindPrototypeActions();
      }
    }));
    bindPrototypeActions();
    document.body.classList.add("project-ready");
    if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.gsap.fromTo(".project-entry", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .75, stagger: .09, ease: "power3.out", delay: .08 });
    } else document.querySelectorAll(".project-entry").forEach(item => { item.style.opacity="1"; item.style.transform="none"; });
  }

  function showToast(message) {
    document.querySelector(".prototype-toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "prototype-toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.append(toast);
    window.setTimeout(() => toast.remove(), 2600);
  }

  function bindPrototypeActions() {
    document.querySelectorAll("[data-select-option]").forEach(button => button.onclick = () => {
      document.querySelectorAll("[data-select-option]").forEach(option => option.classList.toggle("selected", option === button));
    });
    document.querySelectorAll("[data-next-step]").forEach(button => button.onclick = () => {
      button.textContent = "Next step ready ✓";
      showToast("Preview only — no booking was submitted.");
    });
    document.querySelectorAll("[data-add-to-bag]").forEach(button => button.onclick = () => {
      const badge = document.querySelector("[data-cart-count]");
      const count = Number(badge.dataset.count || 0) + 1;
      badge.dataset.count = String(count);
      badge.textContent = `Bag · ${count}`;
      button.textContent = "✓";
      button.setAttribute("aria-label", "Added to bag");
      showToast("Added to the preview bag.");
    });
    document.querySelectorAll("[data-filter]").forEach(button => button.onclick = () => {
      document.querySelectorAll("[data-filter]").forEach(filter => filter.classList.toggle("active", filter === button));
      const category = button.dataset.filter;
      document.querySelectorAll("[data-category]").forEach(item => item.hidden = category !== "all" && item.dataset.category !== category);
    });
    document.querySelectorAll("[data-preview-form]").forEach(form => form.onsubmit = event => {
      event.preventDefault();
      showToast("Preview saved — no live garage record was changed.");
    });
  }

  const menuButton = document.querySelector("#menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navScrim = document.querySelector("#nav-scrim");
  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  };
  menuButton?.addEventListener("click", () => {
    const opened = document.body.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(opened));
    menuButton.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
  });
  navScrim?.addEventListener("click", closeMenu);
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  const progress = document.querySelector("#scroll-meter-fill");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  render();
  updateProgress();
})();
