import { generateId } from '@/utils/idGenerator';

export const mockArticles = [
  {
    id: generateId(),
    title: "AI Breakthrough: New Algorithm Matches Human Reasoning",
    content: "Researchers at MIT have developed a new machine learning algorithm that more closely mimics human reasoning capabilities. The algorithm, named CogniFlow, can make logical deductions and solve abstract problems with minimal training data. This represents a significant step toward artificial general intelligence (AGI), moving beyond narrow AI that excels only at specific tasks. The team demonstrated CogniFlow solving complex puzzles and adapting to new problem domains without explicit reprogramming. 'This is the closest we've come to AI that thinks like humans do,' said lead researcher Dr. Sophia Chen. The breakthrough could have applications in healthcare diagnosis, scientific discovery, and autonomous systems that need to make decisions in unpredictable environments. However, the researchers caution that many challenges remain before true human-level AI is achieved.",
    summary: "MIT researchers have created a new AI algorithm called CogniFlow that reasons more like humans, making logical deductions and solving abstract problems with minimal training data, representing a significant step toward artificial general intelligence.",
    category: "Technology",
    author: "Dr. Sophia Chen",
    publishedAt: "2 hours ago",
    imageUrl: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg",
    url: "https://example.com/ai-breakthrough"
  },
  {
    id: generateId(),
    title: "Global Climate Summit Reaches Historic Carbon Agreement",
    content: "After two weeks of intense negotiations, the Global Climate Summit has concluded with 195 nations signing a landmark agreement to cut carbon emissions by 50% before 2035. The 'Glasgow Pact' marks the most ambitious climate goal since the Paris Agreement, with binding commitments from both developed and developing nations. Key provisions include a carbon pricing mechanism, green technology transfer programs for developing countries, and a $100 billion annual climate fund. 'This is the moment we've turned the corner on climate action,' said UN Secretary-General António Guterres. The agreement came after last-minute concessions from major carbon emitters China and India, who agreed to accelerate their transitions away from coal power. Environmental activists cautiously welcomed the deal while noting that implementation will be crucial. Markets responded positively, with renewable energy stocks surging and fossil fuel companies seeing modest declines.",
    summary: "The Global Climate Summit concluded with 195 nations signing the 'Glasgow Pact,' committing to cut carbon emissions 50% by 2035, including carbon pricing mechanisms and a $100 billion climate fund.",
    category: "Politics",
    author: "Emma Rodriguez",
    publishedAt: "5 hours ago",
    imageUrl: "https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg",
    url: "https://example.com/climate-summit"
  },
  {
    id: generateId(),
    title: "Medical Breakthrough: First Successful Alzheimer's Treatment Approved",
    content: "The FDA has approved Neuroversa, the first treatment demonstrated to significantly slow the progression of Alzheimer's disease. Developed by Biogen-Merck, the drug targets the root causes of neurodegeneration rather than just symptoms. Clinical trials showed the treatment reduced cognitive decline by 47% over 18 months in early-stage patients. 'This is the breakthrough we've been waiting for decades,' said Dr. Alicia Fernandez, who led the Phase 3 trials. Neuroversa works by clearing toxic protein accumulations and promoting neural regeneration through a novel dual-action mechanism. While not a cure, experts believe it could transform Alzheimer's from a rapidly progressive disease to a manageable chronic condition. The treatment will initially be expensive at $56,000 per year, prompting debates about healthcare accessibility. Medicare is reviewing coverage options, while the developers have promised patient assistance programs. The approval comes after decades of failed attempts, with over 200 Alzheimer's drugs previously falling short in clinical trials.",
    summary: "The FDA has approved Neuroversa, the first treatment proven to significantly slow Alzheimer's progression, reducing cognitive decline by 47% in trials by targeting toxic protein accumulations and promoting neural regeneration.",
    category: "Health",
    author: "Dr. Alicia Fernandez",
    publishedAt: "1 day ago",
    imageUrl: "https://images.pexels.com/photos/139398/pexels-photo-139398.jpeg",
    url: "https://example.com/alzheimers-treatment"
  },
  {
    id: generateId(),
    title: "SpaceX Successfully Launches First Civilian Mission to Mars",
    content: "SpaceX has made history by launching Polaris Dawn, the first civilian mission to orbit Mars. The spacecraft, carrying four private citizens, will make a 6-month journey to the red planet, conduct orbital research, and return to Earth. The mission is funded by billionaire Jared Isaacman, who also participates as a crew member alongside a scientist, an engineer, and a physician. The crew has undergone intensive training for over a year, preparing for the physical and psychological challenges of deep space travel. 'Today marks the beginning of a new era in space exploration, where Mars is no longer the exclusive domain of government agencies,' said Elon Musk at the launch event. The mission will test several technologies crucial for future Mars colonization, including radiation shielding, closed-loop life support systems, and long-duration spacecraft autonomy. While in Mars orbit, the crew will deploy several scientific satellites and conduct experiments on the effects of partial gravity and radiation on the human body.",
    summary: "SpaceX launched Polaris Dawn, the first civilian mission to orbit Mars, funded by billionaire Jared Isaacman who joins three specialists on the 6-month journey to test technologies for future Mars colonization.",
    category: "Science",
    author: "Carlos Mendez",
    publishedAt: "3 days ago",
    imageUrl: "https://images.pexels.com/photos/23769/pexels-photo.jpg",
    url: "https://example.com/spacex-mars-mission"
  },
  {
    id: generateId(),
    title: "Tech Giant Unveils Revolutionary Quantum Computing Platform",
    content: "IBM has unveiled its new quantum computing platform, 'Quantum Prime,' which achieves 1,000 qubits and demonstrates quantum advantage for the first time in commercially relevant applications. The system, housed at IBM's Quantum Computation Center in New York, operates at near absolute zero temperature and incorporates breakthrough error correction techniques that allow for sustained quantum calculations. 'This is the moment quantum computing transitions from theoretical promise to practical tool,' said IBM CEO Arvind Krishna. Early access partners including pharmaceutical companies, financial institutions, and AI researchers report that Quantum Prime has solved previously intractable problems in hours that would take conventional supercomputers centuries. The platform will be accessible through cloud APIs, democratizing access to quantum computing power. While still requiring specialized expertise to program, IBM has released new development tools to simplify the creation of quantum algorithms. The breakthrough comes amid intensifying competition in the quantum computing space, with Google, Microsoft, and several startups racing to achieve similar milestones.",
    summary: "IBM unveiled 'Quantum Prime,' a 1,000-qubit quantum computing platform that demonstrates quantum advantage in commercial applications, solving problems in hours that would take supercomputers centuries to complete.",
    category: "Technology",
    author: "Arvind Krishna",
    publishedAt: "4 days ago",
    imageUrl: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
    url: "https://example.com/quantum-computing"
  },
  {
    id: generateId(),
    title: "Global Economy Enters Unprecedented Period of Growth",
    content: "The global economy has entered what economists are calling an 'innovation supercycle,' with GDP growth exceeding expectations across both developed and emerging markets. The IMF has revised its global growth forecast to 4.7% for the year, the highest sustained rate in over two decades. Key drivers include widespread adoption of AI and automation technologies, the green energy transition creating new industries, and post-pandemic productivity gains. 'We're seeing a perfect storm of positive factors converging to drive growth,' said IMF Managing Director Kristalina Georgieva. The expansion has been unusually balanced, with rising wages in developed economies and accelerating middle-class growth in developing nations. Inflation has remained controlled despite the growth, attributed to supply chain improvements and energy efficiency gains. However, challenges remain, including growing inequality within countries and environmental pressures from rapid development. Policymakers are focused on ensuring the benefits of the economic boom are widely distributed through education investments and targeted support for displaced workers.",
    summary: "The global economy has entered an 'innovation supercycle' with 4.7% GDP growth, driven by AI adoption, green energy transitions, and productivity gains, marking the highest sustained growth rate in over two decades.",
    category: "Business",
    author: "Kristalina Georgieva",
    publishedAt: "5 days ago",
    imageUrl: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg",
    url: "https://example.com/global-economy"
  },
  {
    id: generateId(),
    title: "Revolutionary Sustainable Food Technology Could End World Hunger",
    content: "A breakthrough in cellular agriculture could transform global food systems and address world hunger. Scientists at the University of California have developed a technology called 'NutriGen' that can produce protein-rich food from carbon dioxide, water, and electricity at unprecedented efficiency. The system, which occupies the space of a shipping container, can produce the protein equivalent of 10,000 chicken eggs daily while using 99% less land and water than conventional agriculture. 'This is potentially the most significant food innovation since the Green Revolution,' said lead researcher Dr. Michael Chang. Unlike previous lab-grown food, NutriGen creates complete proteins with all essential amino acids and can be textured to mimic various conventional foods. The Gates Foundation has committed $500 million to deploy the technology in food-insecure regions, with the first systems expected to be operational within 18 months. The innovation comes as climate change and population growth put increasing pressure on conventional agriculture. While promising, experts note challenges in scaling production, reducing costs, and addressing regulatory approval in different countries.",
    summary: "UC scientists developed 'NutriGen,' a cellular agriculture technology that produces protein-rich food from CO2, water, and electricity with 99% less land and water use than conventional farming, potentially transforming global food systems.",
    category: "Science",
    author: "Dr. Michael Chang",
    publishedAt: "1 week ago",
    imageUrl: "https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg",
    url: "https://example.com/food-technology"
  },
  {
    id: generateId(),
    title: "Historic Peace Agreement Ends Decades-Long Regional Conflict",
    content: "After years of negotiation, leaders from Eastern African nations have signed the Nairobi Accord, ending a complex regional conflict that has claimed over 200,000 lives in the past three decades. The comprehensive agreement addresses border disputes, resource sharing, refugee repatriation, and establishes a truth and reconciliation commission. UN Secretary-General António Guterres called it 'a triumph of diplomacy and human resilience.' The breakthrough came after months of secret talks mediated by a coalition of African Union officials and international diplomats. Key provisions include demilitarized zones monitored by UN peacekeepers, economic development funds for affected regions, and political reforms to address ethnic representation. 'Today we choose a future of peace for our children,' said Ethiopian Prime Minister Abiy Ahmed at the signing ceremony. Markets responded positively to the agreement, with regional stock exchanges and currencies strengthening on prospects for stability and investment. Implementation will be overseen by a joint commission with representatives from all signatory countries and international observers.",
    summary: "Eastern African nations signed the Nairobi Accord, ending a 30-year conflict that claimed 200,000 lives, establishing demilitarized zones, resource sharing agreements, and a truth and reconciliation commission after months of secret negotiations.",
    category: "World",
    author: "Abiy Ahmed",
    publishedAt: "1 week ago",
    imageUrl: "https://images.pexels.com/photos/1157856/pexels-photo-1157856.jpeg",
    url: "https://example.com/peace-agreement"
  },
  {
    id: generateId(),
    title: "Revolutionary Exercise Method Proven to Reverse Aging",
    content: "A groundbreaking study published in Cell Metabolism has demonstrated that a specific exercise protocol can reverse biological aging at the cellular level. The research, conducted across multiple universities, showed that a 12-week program of 'rhythmic interval training' reduced participants' biological age by an average of 3.5 years as measured by telomere length, epigenetic markers, and mitochondrial function. Unlike traditional exercise approaches, the method alternates between cardiovascular exertion and specific resistance movements in rhythmic patterns that optimize cellular stress responses. 'This isn't just slowing aging—it's actually turning back the clock,' said lead researcher Dr. Jennifer Liu. The protocol, which requires just 25 minutes three times weekly, showed benefits across all age groups but was most pronounced in participants over 50. Beyond aging markers, subjects showed improved cognitive function, insulin sensitivity, and immune response. While the researchers caution that larger studies are needed to confirm the findings, they've released the full protocol for public use rather than commercializing it. Health systems are already considering incorporating the approach into preventative care programs.",
    summary: "A groundbreaking study published in Cell Metabolism shows that 'rhythmic interval training,' requiring just 25 minutes three times weekly, reduced participants' biological age by 3.5 years by improving telomere length and cellular function.",
    category: "Health",
    author: "Dr. Jennifer Liu",
    publishedAt: "2 weeks ago",
    imageUrl: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg",
    url: "https://example.com/reverse-aging"
  },
  {
    id: generateId(),
    title: "United States and China Announce Groundbreaking Climate Partnership",
    content: "In a surprising diplomatic breakthrough, the United States and China have announced a comprehensive partnership to combat climate change, committing $1 trillion in combined resources over the next decade. The agreement includes joint development of next-generation clean energy technologies, coordinated carbon pricing mechanisms, and shared climate adaptation infrastructure. 'This partnership transforms climate action from a point of competition to a model of cooperation between our nations,' said U.S. Climate Envoy John Kerry. The centerpiece of the agreement is the creation of a jointly operated Clean Technology Development Fund that will accelerate commercialization of breakthrough technologies including advanced nuclear, green hydrogen, and carbon capture. Additionally, both countries have committed to ending government financing of new coal projects globally and accelerating their domestic transition to clean energy. The partnership represents a dramatic shift in bilateral relations that have been strained in recent years. Environmental groups have cautiously welcomed the announcement while emphasizing the need for transparent implementation and monitoring of commitments.",
    summary: "The US and China announced a landmark climate partnership committing $1 trillion over ten years for joint clean energy development, carbon pricing coordination, and shared climate adaptation infrastructure.",
    category: "Politics",
    author: "John Kerry",
    publishedAt: "2 weeks ago",
    imageUrl: "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg",
    url: "https://example.com/climate-partnership"
  },
  {
    id: generateId(),
    title: "Market Surge as Revolutionary AI Chipset Announced",
    content: "Technology stocks surged after Nvidia unveiled its next-generation AI chipset, 'Prometheus,' which delivers a 20x performance increase over previous models while consuming 60% less energy. The breakthrough architecture enables on-device artificial general intelligence capabilities previously thought to require massive data centers. 'Prometheus represents a quantum leap in AI capabilities,' said Nvidia CEO Jensen Huang during the announcement. Early partners testing the chips report the ability to run complex AI models on smartphones and IoT devices with performance matching cloud-based systems. The chipset's ability to perform advanced AI functions with minimal internet connectivity opens applications in remote healthcare, autonomous vehicles, and developing regions with limited connectivity. Analysts project the innovation could add over $500 billion to the global economy through productivity improvements and new applications. Nvidia stock jumped 25% following the announcement, triggering a broader rally in semiconductor and AI-focused companies. Competitors are scrambling to respond, with Intel and AMD announcing accelerated development timelines for their own next-generation AI solutions.",
    summary: "Nvidia unveiled 'Prometheus,' a revolutionary AI chipset delivering 20x performance with 60% less energy, enabling on-device artificial general intelligence capabilities that previously required massive data centers.",
    category: "Business",
    author: "Jensen Huang",
    publishedAt: "3 weeks ago",
    imageUrl: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
    url: "https://example.com/ai-chipset"
  },
  {
    id: generateId(),
    title: "Underdog Team Wins World Cup in Historic Upset",
    content: "Morocco has shocked the football world by winning the FIFA World Cup, defeating Brazil 2-1 in an extraordinary final match that will go down in sporting history. The victory marks the first World Cup win for an African nation and completes a remarkable tournament run that saw the team defeat several traditional powerhouses. Morocco's journey included victories over Spain, Portugal, and France before their final triumph against the heavily favored Brazilians. The winning goal came in the 89th minute from captain Hakim Ziyech, sparking nationwide celebrations across Morocco. 'We didn't just win for Morocco, we won for all of Africa and everyone who has ever been underestimated,' said coach Walid Regragui after the match. The Moroccan team's success has been attributed to their exceptional defensive organization, rapid counterattacking style, and team cohesion. The victory is expected to transform Moroccan football, with increased investment in youth development and infrastructure already announced. Global viewership for the final exceeded 2 billion, making it one of the most-watched sporting events in history.",
    summary: "Morocco made history by defeating Brazil 2-1 to win the FIFA World Cup, becoming the first African nation to claim the title after an extraordinary tournament run that included victories over Spain, Portugal, and France.",
    category: "Sports",
    author: "Walid Regragui",
    publishedAt: "1 month ago",
    imageUrl: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    url: "https://example.com/world-cup-upset"
  },
  {
    id: generateId(),
    title: "Broadway Sensation 'Firelight' Shatters Records and Redefines Musical Theatre",
    content: "The new musical 'Firelight' has become a cultural phenomenon, breaking Broadway box office records and receiving unprecedented critical acclaim. Created by first-time playwright Maya Johnson, the production innovatively blends traditional musical theatre with hip-hop, Afrobeat, and classical influences to tell a story of cultural identity and reconciliation set across three continents and two centuries. The show has won a record 13 Tony Awards and sparked widespread conversations about representation in theatre. 'We wanted to create something that honors theatrical traditions while completely reimagining what musical storytelling can be,' said Johnson. The production features groundbreaking staging that incorporates augmented reality elements visible to audience members through special glasses, creating immersive environments that transform throughout the performance. Tickets are sold out for the next 18 months, with a film adaptation already in development. The show's cast album has topped music charts, crossing over to mainstream success. Productions are planned for London, Tokyo, and Sydney next year, with a global streaming performance scheduled to make the show accessible to worldwide audiences.",
    summary: "Broadway musical 'Firelight' has become a cultural phenomenon, winning 13 Tony Awards and breaking box office records with its innovative blend of musical styles and groundbreaking augmented reality staging that's transforming theatrical storytelling.",
    category: "Entertainment",
    author: "Maya Johnson",
    publishedAt: "1 month ago",
    imageUrl: "https://images.pexels.com/photos/11861046/pexels-photo-11861046.jpeg",
    url: "https://example.com/broadway-firelight"
  }
];