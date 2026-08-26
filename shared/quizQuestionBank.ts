export type GradeBand = "6-7" | "8-9" | "10-12";
export type QuizLevel = "Easy" | "Medium" | "Hard";
export type QuizActivitySlug = "science-quiz" | "mathematics-quiz" | "stem-quiz" | "pe-quiz" | "geography-quiz" | "ict-display-challenge" | "digital-technology-or-not";

export type QuizQuestion = {
  id: string;
  level: QuizLevel;
  prompt: string;
  options: string[];
  answer: string;
};

type QuestionSeed = Omit<QuizQuestion, "id" | "level">;
type QuestionBank = Record<QuizActivitySlug, Record<GradeBand, Record<QuizLevel, QuestionSeed[]>>>;

const seed = (prompt: string, options: string[], answer: string): QuestionSeed => ({ prompt, options, answer });

const bank: QuestionBank = {
  "science-quiz": {
    "6-7": {
      Easy: [seed("What planet do we live on?", ["A) Mars", "B) Earth", "C) Venus", "D) Jupiter"], "B) Earth"), seed("Which object gives us light and heat during the day?", ["A) The Moon", "B) A cloud", "C) The Sun", "D) A starfish"], "C) The Sun")],
      Medium: [seed("What gas do humans need to breathe?", ["A) Carbon dioxide", "B) Oxygen", "C) Hydrogen", "D) Nitrogen"], "B) Oxygen"), seed("Which state of matter keeps its own shape?", ["A) Gas", "B) Liquid", "C) Solid", "D) Steam"], "C) Solid")],
      Hard: [seed("What is the process by which plants convert sunlight into energy?", ["A) Respiration", "B) Digestion", "C) Photosynthesis", "D) Evaporation"], "C) Photosynthesis"), seed("Which part of a plant takes in water from the soil?", ["A) Petals", "B) Roots", "C) Leaves", "D) Fruit"], "B) Roots")],
    },
    "8-9": {
      Easy: [seed("Which cell structure controls the activities of a cell?", ["A) Nucleus", "B) Cell wall", "C) Vacuole", "D) Membrane"], "A) Nucleus"), seed("Which organ pumps blood around the body?", ["A) Lung", "B) Stomach", "C) Heart", "D) Kidney"], "C) Heart")],
      Medium: [seed("Which gas do plants take in for photosynthesis?", ["A) Oxygen", "B) Carbon dioxide", "C) Nitrogen", "D) Helium"], "B) Carbon dioxide"), seed("What type of energy is stored in food?", ["A) Chemical energy", "B) Sound energy", "C) Light energy", "D) Nuclear energy"], "A) Chemical energy")],
      Hard: [seed("In a food chain, what is a producer?", ["A) An animal that eats meat", "B) A plant that makes its own food", "C) A decomposer", "D) A predator"], "B) A plant that makes its own food"), seed("Which change is chemical rather than physical?", ["A) Melting ice", "B) Tearing paper", "C) Rusting iron", "D) Freezing water"], "C) Rusting iron")],
    },
    "10-12": {
      Easy: [seed("What is the atomic number of an element?", ["A) Number of neutrons", "B) Number of protons", "C) Number of shells", "D) Total mass"], "B) Number of protons"), seed("Which organelle is the main site of aerobic respiration?", ["A) Mitochondrion", "B) Ribosome", "C) Chloroplast", "D) Nucleus"], "A) Mitochondrion")],
      Medium: [seed("Which equation represents photosynthesis?", ["A) Oxygen + glucose → carbon dioxide + water", "B) Carbon dioxide + water → glucose + oxygen", "C) Nitrogen + water → protein", "D) Glucose + oxygen → sunlight"], "B) Carbon dioxide + water → glucose + oxygen"), seed("Which factor would most directly increase the rate of photosynthesis until another factor becomes limiting?", ["A) More light", "B) Less chlorophyll", "C) Lower temperature", "D) Less carbon dioxide"], "A) More light")],
      Hard: [seed("What is homeostasis?", ["A) Movement of organisms", "B) Keeping internal conditions stable", "C) Reproduction by cells", "D) Breakdown of rocks"], "B) Keeping internal conditions stable"), seed("Why are enzymes important in living organisms?", ["A) They stop all reactions", "B) They speed up specific reactions", "C) They create new atoms", "D) They remove all energy"], "B) They speed up specific reactions")],
    },
  },
  "mathematics-quiz": {
    "6-7": {
      Easy: [seed("What is 8 × 7?", ["A) 54", "B) 56", "C) 64", "D) 48"], "B) 56"), seed("What is 144 ÷ 12?", ["A) 10", "B) 11", "C) 12", "D) 13"], "C) 12")],
      Medium: [seed("What is 25% of 200?", ["A) 25", "B) 40", "C) 50", "D) 75"], "C) 50"), seed("A book costs AED 36. You pay with AED 50. How much change do you receive?", ["A) AED 12", "B) AED 14", "C) AED 16", "D) AED 18"], "B) AED 14")],
      Hard: [seed("If 3x + 7 = 22, what is x?", ["A) 3", "B) 5", "C) 7", "D) 9"], "B) 5"), seed("What is the perimeter of a rectangle that is 9 cm long and 4 cm wide?", ["A) 13 cm", "B) 26 cm", "C) 36 cm", "D) 72 cm"], "B) 26 cm")],
    },
    "8-9": {
      Easy: [seed("What is 3/4 written as a decimal?", ["A) 0.25", "B) 0.5", "C) 0.75", "D) 1.25"], "C) 0.75"), seed("What is the square root of 81?", ["A) 7", "B) 8", "C) 9", "D) 10"], "C) 9")],
      Medium: [seed("Simplify 5a + 3a − 2.", ["A) 8a − 2", "B) 15a − 2", "C) 8a + 2", "D) 5a + 1"], "A) 8a − 2"), seed("A ratio is 2:3. If the first part is 14, what is the second part?", ["A) 18", "B) 20", "C) 21", "D) 24"], "C) 21")],
      Hard: [seed("Solve 4x − 9 = 19.", ["A) 5", "B) 7", "C) 9", "D) 11"], "B) 7"), seed("What is the area of a triangle with base 12 cm and height 7 cm?", ["A) 19 cm²", "B) 42 cm²", "C) 84 cm²", "D) 96 cm²"], "B) 42 cm²")],
    },
    "10-12": {
      Easy: [seed("What is the gradient of the line through (1, 2) and (3, 6)?", ["A) 1", "B) 2", "C) 3", "D) 4"], "B) 2"), seed("What is 2³ × 2²?", ["A) 2⁵", "B) 4⁵", "C) 2⁶", "D) 4⁶"], "A) 2⁵")],
      Medium: [seed("Solve x² − 9 = 0.", ["A) x = 9", "B) x = 3 only", "C) x = −3 only", "D) x = 3 or −3"], "D) x = 3 or −3"), seed("What is the next term in 3, 7, 11, 15, …?", ["A) 16", "B) 18", "C) 19", "D) 20"], "C) 19")],
      Hard: [seed("A quantity increases by 10% from 80. What is the new value?", ["A) 82", "B) 88", "C) 90", "D) 98"], "B) 88"), seed("If f(x) = 2x + 5, what is f(4)?", ["A) 8", "B) 9", "C) 13", "D) 18"], "C) 13")],
    },
  },
  "stem-quiz": {
    "6-7": {
      Easy: [seed("What does CPU stand for?", ["A) Central Processing Unit", "B) Computer Power Unit", "C) Central Program Utility", "D) Computer Processing User"], "A) Central Processing Unit"), seed("Which device is used to type letters into a computer?", ["A) Monitor", "B) Keyboard", "C) Speaker", "D) Printer"], "B) Keyboard")],
      Medium: [seed("Which component stores data permanently in a computer?", ["A) RAM", "B) CPU", "C) SSD", "D) Keyboard"], "C) SSD"), seed("Which device shows pictures and text from a computer?", ["A) Mouse", "B) Monitor", "C) Microphone", "D) USB cable"], "B) Monitor")],
      Hard: [seed("What does an algorithm provide in computer science?", ["A) A computer's physical parts", "B) A step-by-step solution to a problem", "C) Internet access", "D) Computer electricity"], "B) A step-by-step solution to a problem"), seed("Which is the best example of an algorithm?", ["A) A random guess", "B) Ordered instructions to make a sandwich", "C) A computer screen", "D) A battery"], "B) Ordered instructions to make a sandwich")],
    },
    "8-9": {
      Easy: [seed("Which part of a computer stores data temporarily while programs run?", ["A) SSD", "B) RAM", "C) Monitor", "D) Keyboard"], "B) RAM"), seed("What does URL stand for?", ["A) Uniform Resource Locator", "B) User Reading Link", "C) Universal Router Line", "D) Unit Response List"], "A) Uniform Resource Locator")],
      Medium: [seed("Which number system uses only 0 and 1?", ["A) Decimal", "B) Binary", "C) Roman", "D) Fractional"], "B) Binary"), seed("What is a computer network?", ["A) A single keyboard", "B) Connected devices that share information", "C) A computer game", "D) A printer cable only"], "B) Connected devices that share information")],
      Hard: [seed("What is the main purpose of encryption?", ["A) Make files larger", "B) Protect information from unauthorized access", "C) Increase screen brightness", "D) Delete software"], "B) Protect information from unauthorized access"), seed("Which practice best protects an online account?", ["A) Sharing a password", "B) Using the same short password everywhere", "C) Using a unique strong password", "D) Writing a password publicly"], "C) Using a unique strong password")],
    },
    "10-12": {
      Easy: [seed("Which protocol is commonly used to load secure websites?", ["A) FTP", "B) HTTP", "C) HTTPS", "D) HTML"], "C) HTTPS"), seed("Which data structure follows first-in, first-out order?", ["A) Stack", "B) Queue", "C) Tree", "D) Graph"], "B) Queue")],
      Medium: [seed("What is the purpose of an operating system?", ["A) Manage hardware and software resources", "B) Only create presentations", "C) Replace the CPU", "D) Print documents"], "A) Manage hardware and software resources"), seed("What does a database primary key do?", ["A) Formats text", "B) Uniquely identifies a record", "C) Encrypts every file", "D) Connects to Wi-Fi"], "B) Uniquely identifies a record")],
      Hard: [seed("Why is version control useful in a software project?", ["A) It makes screens brighter", "B) It tracks changes and supports collaboration", "C) It removes all bugs automatically", "D) It replaces testing"], "B) It tracks changes and supports collaboration"), seed("Which is a key property of a well-designed algorithm?", ["A) It has no steps", "B) It is unambiguous and finite", "C) It needs internet access", "D) It always uses pictures"], "B) It is unambiguous and finite")],
    },
  },
  "pe-quiz": {
    "6-7": {
      Easy: [seed("How many players are on the field for one soccer team during a match?", ["A) 9", "B) 10", "C) 11", "D) 12"], "C) 11"), seed("Which drink is usually best to have during a normal PE lesson?", ["A) Water", "B) Fizzy drink", "C) Energy drink", "D) Coffee"], "A) Water")],
      Medium: [seed("Which exercise mainly improves cardiovascular fitness?", ["A) Running", "B) Stretching", "C) Meditation", "D) Sitting"], "A) Running"), seed("Which activity best improves flexibility?", ["A) Stretching", "B) Sleeping", "C) Watching TV", "D) Sitting still"], "A) Stretching")],
      Hard: [seed("What is the main purpose of a warm-up before exercise?", ["A) To make you tired", "B) To prepare the body and reduce injury risk", "C) To lower your heart rate", "D) To replace exercise"], "B) To prepare the body and reduce injury risk"), seed("What should you do if you feel a sharp pain during exercise?", ["A) Keep going quickly", "B) Stop and tell an adult or teacher", "C) Ignore it", "D) Race a friend"], "B) Stop and tell an adult or teacher")],
    },
    "8-9": {
      Easy: [seed("Which component of fitness describes how long your muscles can work?", ["A) Muscular endurance", "B) Flexibility", "C) Reaction time", "D) Balance"], "A) Muscular endurance"), seed("What is a balanced diet?", ["A) Eating one food only", "B) Eating a variety of food groups", "C) Skipping water", "D) Eating only sweets"], "B) Eating a variety of food groups")],
      Medium: [seed("Why is cooldown activity useful after exercise?", ["A) It suddenly stops blood flow", "B) It helps the body return gradually to rest", "C) It replaces hydration", "D) It makes muscles weaker"], "B) It helps the body return gradually to rest"), seed("Which activity most develops muscular strength?", ["A) Controlled bodyweight exercises", "B) Reading a book", "C) Sitting quietly", "D) Watching a match"], "A) Controlled bodyweight exercises")],
      Hard: [seed("What should a safe PE teammate do?", ["A) Ignore team rules", "B) Communicate and respect others", "C) Push to win", "D) Refuse feedback"], "B) Communicate and respect others"), seed("Which is a sign of responsible training?", ["A) Skipping every warm-up", "B) Increasing effort gradually", "C) Exercising through severe pain", "D) Avoiding water"], "B) Increasing effort gradually")],
    },
    "10-12": {
      Easy: [seed("Which fitness component is most important for repeated sprinting?", ["A) Cardiovascular endurance", "B) Hair colour", "C) Handwriting", "D) Hearing"], "A) Cardiovascular endurance"), seed("What does the FITT principle help you plan?", ["A) Training frequency, intensity, time, and type", "B) Food colouring", "C) Team names", "D) School uniforms"], "A) Training frequency, intensity, time, and type")],
      Medium: [seed("Why should a training plan include rest days?", ["A) To prevent all movement", "B) To support recovery and adaptation", "C) To avoid learning skills", "D) To reduce sleep"], "B) To support recovery and adaptation"), seed("Which measurement can help monitor exercise intensity?", ["A) Heart rate", "B) Shoe colour", "C) Height of a chair", "D) Number of pens"], "A) Heart rate")],
      Hard: [seed("What is progressive overload?", ["A) Training less every week", "B) Gradually increasing training demands", "C) Avoiding all challenge", "D) Repeating the same effort forever"], "B) Gradually increasing training demands"), seed("Why is technique important when lifting or training?", ["A) It reduces injury risk and improves effectiveness", "B) It makes rules unnecessary", "C) It removes the need for rest", "D) It means no warm-up is needed"], "A) It reduces injury risk and improves effectiveness")],
    },
  },
  "geography-quiz": {
    "6-7": {
      Easy: [seed("What is the largest continent in the world?", ["A) Africa", "B) Europe", "C) Asia", "D) Australia"], "C) Asia"), seed("Which direction is opposite to east?", ["A) North", "B) South", "C) West", "D) Up"], "C) West")],
      Medium: [seed("Which ocean is the largest?", ["A) Atlantic Ocean", "B) Indian Ocean", "C) Arctic Ocean", "D) Pacific Ocean"], "D) Pacific Ocean"), seed("What do we call a large body of salt water?", ["A) Ocean", "B) River", "C) Pond", "D) Stream"], "A) Ocean")],
      Hard: [seed("Which country has the largest land area in the world?", ["A) Canada", "B) China", "C) United States", "D) Russia"], "D) Russia"), seed("What is a map key used for?", ["A) To open a door", "B) To explain map symbols", "C) To measure temperature", "D) To name oceans"], "B) To explain map symbols")],
    },
    "8-9": {
      Easy: [seed("What is the capital city of the United Arab Emirates?", ["A) Dubai", "B) Abu Dhabi", "C) Sharjah", "D) Al Ain"], "B) Abu Dhabi"), seed("Which line divides Earth into the Northern and Southern Hemispheres?", ["A) Prime Meridian", "B) Equator", "C) Tropic of Cancer", "D) Arctic Circle"], "B) Equator")],
      Medium: [seed("Which climate is most common in the UAE?", ["A) Tropical rainforest", "B) Desert", "C) Tundra", "D) Polar"], "B) Desert"), seed("What is population density?", ["A) Total rainfall", "B) Number of people per area", "C) Height above sea level", "D) Number of countries"], "B) Number of people per area")],
      Hard: [seed("Which process turns liquid water into water vapour?", ["A) Condensation", "B) Evaporation", "C) Precipitation", "D) Collection"], "B) Evaporation"), seed("What does a scale on a map help a reader understand?", ["A) Distance in real life", "B) Eye colour", "C) Population only", "D) Time of day"], "A) Distance in real life")],
    },
    "10-12": {
      Easy: [seed("Which map type is most useful for showing population distribution?", ["A) Political map", "B) Thematic map", "C) Road sign", "D) Weather symbol"], "B) Thematic map"), seed("What is urbanisation?", ["A) Growth of towns and cities", "B) Formation of mountains", "C) Movement of oceans", "D) Change of seasons"], "A) Growth of towns and cities")],
      Medium: [seed("Which factor can drive international migration?", ["A) Employment opportunities", "B) A map symbol", "C) Latitude only", "D) A compass point"], "A) Employment opportunities"), seed("What is sustainable development?", ["A) Using all resources immediately", "B) Meeting needs without harming future generations", "C) Stopping all building", "D) Avoiding technology"], "B) Meeting needs without harming future generations")],
      Hard: [seed("What does GIS stand for?", ["A) Global Internet System", "B) Geographic Information System", "C) General Island Scale", "D) Graphical Image Source"], "B) Geographic Information System"), seed("Which action best reduces the urban heat-island effect?", ["A) Adding more shaded green spaces", "B) Removing all trees", "C) Darkening every roof", "D) Increasing car traffic"], "A) Adding more shaded green spaces")],
    },
  },
  "ict-display-challenge": {
    "6-7": {
      Easy: [seed("The supplied ICT display shows people using computers around a globe. Which benefit matches this idea?", ["A) Sharing information and connecting digitally", "B) Only playing games", "C) Making screens darker", "D) Avoiding teamwork"], "A) Sharing information and connecting digitally"), seed("Which action is a positive use of ICT?", ["A) Sharing a class project", "B) Hiding important work", "C) Damaging a device", "D) Ignoring all instructions"], "A) Sharing a class project")],
      Medium: [seed("Which shortcut on the supplied keyboard display creates a new document?", ["A) Ctrl + W", "B) Ctrl + O", "C) Ctrl + N", "D) Ctrl + P"], "C) Ctrl + N"), seed("Which shortcut on the supplied keyboard display opens an existing file?", ["A) Ctrl + O", "B) Ctrl + W", "C) Ctrl + N", "D) Ctrl + X"], "A) Ctrl + O")],
      Hard: [seed("The Computing banner includes a student using a headset to explore a digital world. What technology is shown?", ["A) A printer", "B) Virtual reality (VR)", "C) A spreadsheet", "D) A keyboard shortcut"], "B) Virtual reality (VR)"), seed("What is a sensible way to use a VR headset at school?", ["A) Follow teacher safety instructions", "B) Run while wearing it", "C) Share it without cleaning", "D) Ignore the room around you"], "A) Follow teacher safety instructions")],
    },
    "8-9": {
      Easy: [seed("What does digital communication allow people to do?", ["A) Exchange information using devices", "B) Stop all messages", "C) Remove the need for language", "D) Avoid collaboration"], "A) Exchange information using devices"), seed("Which is an example of a digital collaboration tool?", ["A) A shared online document", "B) A blank wall", "C) A paperclip", "D) A closed book"], "A) A shared online document")],
      Medium: [seed("What does Ctrl + W commonly do?", ["A) Opens a new file", "B) Closes a document or tab", "C) Saves a file", "D) Prints a page"], "B) Closes a document or tab"), seed("Why are keyboard shortcuts useful?", ["A) They can speed up common actions", "B) They stop files saving", "C) They remove all menus", "D) They replace learning"], "A) They can speed up common actions")],
      Hard: [seed("What is one educational use of virtual reality?", ["A) Exploring simulated environments", "B) Removing internet safety", "C) Replacing every classroom rule", "D) Storing food"], "A) Exploring simulated environments"), seed("Which digital habit supports respectful collaboration?", ["A) Giving clear, kind feedback", "B) Deleting others' work", "C) Sharing passwords", "D) Posting without thinking"], "A) Giving clear, kind feedback")],
    },
    "10-12": {
      Easy: [seed("What is the main purpose of a digital network?", ["A) Share data and resources between devices", "B) Make keyboards heavier", "C) Remove all storage", "D) Print without ink"], "A) Share data and resources between devices"), seed("What is cloud storage used for?", ["A) Saving files on remote servers", "B) Storing weather only", "C) Repairing screens", "D) Replacing passwords"], "A) Saving files on remote servers")],
      Medium: [seed("Which shortcut is commonly used to create a new file in many applications?", ["A) Ctrl + N", "B) Ctrl + W", "C) Ctrl + O", "D) Ctrl + L"], "A) Ctrl + N"), seed("Which shortcut normally opens an existing file?", ["A) Ctrl + O", "B) Ctrl + N", "C) Ctrl + W", "D) Ctrl + R"], "A) Ctrl + O")],
      Hard: [seed("Why can immersive technology be useful for learning?", ["A) It can simulate complex environments safely", "B) It removes the need for reflection", "C) It makes every source reliable", "D) It replaces all teachers"], "A) It can simulate complex environments safely"), seed("Which is a responsible consideration when using VR?", ["A) Accessibility and physical safety", "B) Ignoring motion discomfort", "C) Sharing private accounts", "D) Avoiding breaks"], "A) Accessibility and physical safety")],
    },
  },
  "digital-technology-or-not": {
    "6-7": {
      Easy: [seed("Digital technology is a tool that helps us get, send, and save what?", ["A) Information", "B) Rain", "C) Sand", "D) Shadows"], "A) Information"), seed("Which object is digital technology?", ["A) Computer", "B) Teddy bear", "C) Paper book", "D) Football"], "A) Computer")],
      Medium: [seed("Which object is not digital technology?", ["A) Keyboard", "B) Printer", "C) Tablet", "D) Toy doll"], "D) Toy doll"), seed("Which item could help you type information into a computer?", ["A) Keyboard", "B) Balloon", "C) Apple", "D) Coin"], "A) Keyboard")],
      Hard: [seed("Which pair contains only digital technology?", ["A) Printer and smartphone", "B) Teddy and ball", "C) Apple and book", "D) Doll and balloon"], "A) Printer and smartphone"), seed("A class needs to save a story. Which device is the best choice?", ["A) A computer", "B) A football", "C) A toy car", "D) A paintbrush"], "A) A computer")],
    },
    "8-9": {
      Easy: [seed("Which action shows digital technology helping people share information?", ["A) Sending a class email", "B) Throwing away notes", "C) Closing a book", "D) Drawing on a wall"], "A) Sending a class email"), seed("Which device can both receive and send digital information?", ["A) Smartphone", "B) Cushion", "C) Pencil case", "D) Water bottle"], "A) Smartphone")],
      Medium: [seed("Which item is an example of non-digital technology?", ["A) A printed paper map", "B) A tablet", "C) A webcam", "D) A laptop"], "A) A printed paper map"), seed("Why is a printer considered digital technology when connected to a computer?", ["A) It receives digital information to produce output", "B) It is made of paper", "C) It needs no electricity", "D) It cannot share information"], "A) It receives digital information to produce output")],
      Hard: [seed("Which sequence best describes a digital information task?", ["A) Input, process, output", "B) Sleep, eat, run", "C) Draw, erase, hide", "D) Open, drop, roll"], "A) Input, process, output"), seed("A digital device stores a photo. What type of information is the photo?", ["A) Data", "B) Weather", "C) Energy only", "D) Paper"], "A) Data")],
    },
    "10-12": {
      Easy: [seed("What distinguishes digital technology from a non-digital object?", ["A) It can process or communicate encoded information", "B) It is always blue", "C) It is always small", "D) It never needs power"], "A) It can process or communicate encoded information"), seed("Which is an example of a digital storage medium?", ["A) SSD", "B) Wooden ruler", "C) Paper clip", "D) Rubber ball"], "A) SSD")],
      Medium: [seed("Which device most clearly performs both input and output?", ["A) Smartphone touchscreen", "B) Paper notebook", "C) Plastic ruler", "D) Water bottle"], "A) Smartphone touchscreen"), seed("What is data transmission?", ["A) Moving information between devices", "B) Painting a wall", "C) Measuring a desk", "D) Folding paper"], "A) Moving information between devices")],
      Hard: [seed("Why is a keyboard classified as part of a digital system?", ["A) It provides input data to a computing device", "B) It stores food", "C) It prints without a device", "D) It is a non-technical toy"], "A) It provides input data to a computing device"), seed("Which classification is most accurate?", ["A) A printer is an output device in a digital system", "B) A teddy bear is a storage device", "C) A balloon is a network", "D) A book is a CPU"], "A) A printer is an output device in a digital system")],
    },
  },
};

function addResourceQuestions(slug: QuizActivitySlug, gradeBand: GradeBand, level: QuizLevel, ...questions: QuestionSeed[]) {
  bank[slug][gradeBand][level].push(...questions);
}

// Broader core-subject pools: each addition is a different concept family, not a paraphrase of the original supplied question.
addResourceQuestions("science-quiz", "6-7", "Easy", seed("Which sense helps you hear a bell?", ["A) Hearing", "B) Taste", "C) Smell", "D) Touch"], "A) Hearing"));
addResourceQuestions("science-quiz", "6-7", "Medium", seed("What do we call water changing into a gas?", ["A) Evaporation", "B) Freezing", "C) Melting", "D) Condensation"], "A) Evaporation"));
addResourceQuestions("science-quiz", "6-7", "Hard", seed("Which force pulls objects toward Earth?", ["A) Gravity", "B) Magnetism", "C) Friction", "D) Electricity"], "A) Gravity"));
addResourceQuestions("science-quiz", "8-9", "Easy", seed("Which organ is used for gas exchange in humans?", ["A) Lungs", "B) Heart", "C) Brain", "D) Skin"], "A) Lungs"));
addResourceQuestions("science-quiz", "8-9", "Medium", seed("Which particle has a negative charge?", ["A) Electron", "B) Proton", "C) Neutron", "D) Nucleus"], "A) Electron"));
addResourceQuestions("science-quiz", "8-9", "Hard", seed("What does biodiversity describe?", ["A) Variety of living organisms", "B) Amount of rainfall", "C) Rock hardness", "D) Day length"], "A) Variety of living organisms"));
addResourceQuestions("science-quiz", "10-12", "Easy", seed("What is the pH of a neutral solution at room temperature?", ["A) 7", "B) 0", "C) 3", "D) 14"], "A) 7"));
addResourceQuestions("science-quiz", "10-12", "Medium", seed("What is diffusion?", ["A) Movement from high to low concentration", "B) Creation of new atoms", "C) Stopping particle motion", "D) Breaking all bonds"], "A) Movement from high to low concentration"));
addResourceQuestions("science-quiz", "10-12", "Hard", seed("Which statement about DNA is correct?", ["A) It carries genetic information", "B) It is a type of rock", "C) It is only in plants", "D) It prevents cell division"], "A) It carries genetic information"));

addResourceQuestions("mathematics-quiz", "6-7", "Easy", seed("What is 9 × 6?", ["A) 45", "B) 54", "C) 56", "D) 63"], "B) 54"));
addResourceQuestions("mathematics-quiz", "6-7", "Medium", seed("What is 3/5 of 100?", ["A) 30", "B) 50", "C) 60", "D) 80"], "C) 60"));
addResourceQuestions("mathematics-quiz", "6-7", "Hard", seed("Solve 4x = 32.", ["A) 6", "B) 7", "C) 8", "D) 9"], "C) 8"));
addResourceQuestions("mathematics-quiz", "8-9", "Easy", seed("What is 15% of 80?", ["A) 8", "B) 10", "C) 12", "D) 15"], "C) 12"));
addResourceQuestions("mathematics-quiz", "8-9", "Medium", seed("Expand 3(x + 4).", ["A) 3x + 4", "B) 3x + 12", "C) x + 12", "D) 7x"], "B) 3x + 12"));
addResourceQuestions("mathematics-quiz", "8-9", "Hard", seed("What is the circumference of a circle with radius 5 cm, using π ≈ 3.14?", ["A) 15.7 cm", "B) 31.4 cm", "C) 78.5 cm", "D) 10 cm"], "B) 31.4 cm"));
addResourceQuestions("mathematics-quiz", "10-12", "Easy", seed("What is the value of log₁₀(100)?", ["A) 1", "B) 2", "C) 10", "D) 100"], "B) 2"));
addResourceQuestions("mathematics-quiz", "10-12", "Medium", seed("What is the derivative of x²?", ["A) x", "B) 2x", "C) x²", "D) 2"], "B) 2x"));
addResourceQuestions("mathematics-quiz", "10-12", "Hard", seed("What is the probability of rolling an even number on a fair six-sided die?", ["A) 1/6", "B) 1/3", "C) 1/2", "D) 2/3"], "C) 1/2"));

addResourceQuestions("stem-quiz", "6-7", "Easy", seed("Which part of a computer lets you move the pointer?", ["A) Mouse", "B) Monitor", "C) Speaker", "D) Printer"], "A) Mouse"));
addResourceQuestions("stem-quiz", "6-7", "Medium", seed("Which device produces a paper copy of a document?", ["A) Printer", "B) Keyboard", "C) Scanner", "D) Microphone"], "A) Printer"));
addResourceQuestions("stem-quiz", "6-7", "Hard", seed("Why should instructions in an algorithm be in the correct order?", ["A) So the task can be completed correctly", "B) To make a screen brighter", "C) To change a password", "D) To remove storage"], "A) So the task can be completed correctly"));
addResourceQuestions("stem-quiz", "8-9", "Easy", seed("What does a web browser help you do?", ["A) Visit and use websites", "B) Print without ink", "C) Store food", "D) Replace hardware"], "A) Visit and use websites"));
addResourceQuestions("stem-quiz", "8-9", "Medium", seed("Which component converts a physical action into computer input?", ["A) Keyboard", "B) Monitor", "C) Projector", "D) Speaker"], "A) Keyboard"));
addResourceQuestions("stem-quiz", "8-9", "Hard", seed("What is a key advantage of two-factor authentication?", ["A) It adds a second security check", "B) It shares passwords", "C) It removes user accounts", "D) It stops all updates"], "A) It adds a second security check"));
addResourceQuestions("stem-quiz", "10-12", "Easy", seed("What does HTML mainly describe?", ["A) Structure of web content", "B) A spreadsheet formula", "C) A network cable", "D) A database row"], "A) Structure of web content"));
addResourceQuestions("stem-quiz", "10-12", "Medium", seed("What is an API used for?", ["A) Allowing software systems to communicate", "B) Cleaning a keyboard", "C) Increasing monitor size", "D) Replacing storage"], "A) Allowing software systems to communicate"));
addResourceQuestions("stem-quiz", "10-12", "Hard", seed("What does computational complexity help estimate?", ["A) How resource use grows with input size", "B) Screen brightness", "C) Font colour", "D) File title length"], "A) How resource use grows with input size"));

addResourceQuestions("pe-quiz", "6-7", "Easy", seed("Which body part helps you pump blood around your body?", ["A) Heart", "B) Elbow", "C) Ear", "D) Toe"], "A) Heart"));
addResourceQuestions("pe-quiz", "6-7", "Medium", seed("Why is water important during exercise?", ["A) It helps you stay hydrated", "B) It replaces every meal", "C) It stops breathing", "D) It makes shoes heavier"], "A) It helps you stay hydrated"));
addResourceQuestions("pe-quiz", "6-7", "Hard", seed("What is good sportsmanship?", ["A) Respecting rules and other players", "B) Arguing with everyone", "C) Ignoring the referee", "D) Refusing teamwork"], "A) Respecting rules and other players"));
addResourceQuestions("pe-quiz", "8-9", "Easy", seed("Which fitness component helps you move quickly after a signal?", ["A) Reaction time", "B) Flexibility", "C) Balance", "D) Body mass"], "A) Reaction time"));
addResourceQuestions("pe-quiz", "8-9", "Medium", seed("What is the purpose of stretching after a workout?", ["A) Support flexibility and recovery", "B) Replace all exercise", "C) Increase dehydration", "D) Stop circulation"], "A) Support flexibility and recovery"));
addResourceQuestions("pe-quiz", "8-9", "Hard", seed("Why should a team communicate during a game?", ["A) To coordinate safely and effectively", "B) To distract everyone", "C) To avoid rules", "D) To stop moving"], "A) To coordinate safely and effectively"));
addResourceQuestions("pe-quiz", "10-12", "Easy", seed("Which exercise best develops lower-body power?", ["A) Squat jump", "B) Reading", "C) Drawing", "D) Sleeping"], "A) Squat jump"));
addResourceQuestions("pe-quiz", "10-12", "Medium", seed("What does recovery include after hard training?", ["A) Rest, hydration, and suitable nutrition", "B) Ignoring sleep", "C) Repeating maximum effort nonstop", "D) Avoiding all food"], "A) Rest, hydration, and suitable nutrition"));
addResourceQuestions("pe-quiz", "10-12", "Hard", seed("What is a reason to monitor training load?", ["A) To reduce overtraining risk", "B) To remove all progress", "C) To skip every warm-up", "D) To stop goal setting"], "A) To reduce overtraining risk"));

addResourceQuestions("geography-quiz", "6-7", "Easy", seed("Which direction does a compass needle point when it points north?", ["A) North", "B) South", "C) East", "D) West"], "A) North"));
addResourceQuestions("geography-quiz", "6-7", "Medium", seed("What is the name for land surrounded by water?", ["A) Island", "B) Mountain", "C) Desert", "D) Valley"], "A) Island"));
addResourceQuestions("geography-quiz", "6-7", "Hard", seed("What is a hemisphere?", ["A) Half of Earth", "B) A type of ocean", "C) A country", "D) A map symbol"], "A) Half of Earth"));
addResourceQuestions("geography-quiz", "8-9", "Easy", seed("Which Emirate is the smallest by area?", ["A) Ajman", "B) Abu Dhabi", "C) Dubai", "D) Sharjah"], "A) Ajman"));
addResourceQuestions("geography-quiz", "8-9", "Medium", seed("What is a renewable resource?", ["A) A resource that can be naturally replaced", "B) A resource used once only", "C) A map key", "D) A weather symbol"], "A) A resource that can be naturally replaced"));
addResourceQuestions("geography-quiz", "8-9", "Hard", seed("Which map line measures distance north or south of the Equator?", ["A) Latitude", "B) Longitude", "C) Scale", "D) Contour"], "A) Latitude"));
addResourceQuestions("geography-quiz", "10-12", "Easy", seed("What does a choropleth map use to show data values?", ["A) Different colours or shades", "B) Only road names", "C) Sound effects", "D) Photographs only"], "A) Different colours or shades"));
addResourceQuestions("geography-quiz", "10-12", "Medium", seed("What is an example of a push factor for migration?", ["A) Conflict or lack of jobs", "B) A new park", "C) A map scale", "D) Low building height"], "A) Conflict or lack of jobs"));
addResourceQuestions("geography-quiz", "10-12", "Hard", seed("Why is water security important in arid regions?", ["A) Reliable clean water supports people and development", "B) It makes maps unnecessary", "C) It ends all migration", "D) It changes latitude"], "A) Reliable clean water supports people and development"));

// Supplied ICT resources: shortcut posters, Excel booklets, I Can posters, computing rules, the ICT/Computing displays, and Digital Technology presentation.
addResourceQuestions("digital-technology-or-not", "6-7", "Easy",
  seed("Which shortcut poster helps you save your work?", ["A) Ctrl + S", "B) Ctrl + W", "C) Ctrl + P", "D) Ctrl + X"], "A) Ctrl + S"),
  seed("Which tool can you use to choose a program on a computer?", ["A) Mouse", "B) Water bottle", "C) Lunch box", "D) Ruler"], "A) Mouse"),
  seed("What should you keep away from a computer?", ["A) Food and drinks", "B) A clean keyboard", "C) Your teacher", "D) A chair"], "A) Food and drinks"),
);
addResourceQuestions("digital-technology-or-not", "6-7", "Medium",
  seed("In a spreadsheet, what is a box for one piece of data called?", ["A) Cell", "B) Poster", "C) Folder", "D) Mouse"], "A) Cell"),
  seed("Which websites should you use during a class activity?", ["A) Websites your teacher has asked you to use", "B) Any website you find", "C) Unknown links", "D) Websites shared by strangers"], "A) Websites your teacher has asked you to use"),
  seed("After typing in a spreadsheet cell, which key can move you down?", ["A) Enter", "B) Escape", "C) Caps Lock", "D) Spacebar"], "A) Enter"),
);
addResourceQuestions("digital-technology-or-not", "6-7", "Hard",
  seed("Which spreadsheet function adds numbers together?", ["A) SUM", "B) SAVE", "C) SORT", "D) STOP"], "A) SUM"),
  seed("What should you do if something online worries or upsets you?", ["A) Tell a teacher", "B) Keep it secret", "C) Share it with everyone", "D) Click more links"], "A) Tell a teacher"),
  seed("What can a chart help you do with spreadsheet data?", ["A) See data visually", "B) Turn off the computer", "C) Type a password", "D) Log out"], "A) See data visually"),
);

addResourceQuestions("digital-technology-or-not", "8-9", "Easy",
  seed("Which shortcut undoes your most recent action?", ["A) Ctrl + Z", "B) Ctrl + Y", "C) Ctrl + O", "D) Ctrl + P"], "A) Ctrl + Z"),
  seed("What is the active cell in a spreadsheet?", ["A) The selected cell ready for input", "B) The whole worksheet", "C) The printer", "D) The menu bar"], "A) The selected cell ready for input"),
  seed("Which action keeps personal information safer?", ["A) Keeping login details private", "B) Sharing passwords", "C) Posting your address", "D) Using a friend’s account"], "A) Keeping login details private"),
);
addResourceQuestions("digital-technology-or-not", "8-9", "Medium",
  seed("Which shortcut is used to print a document?", ["A) Ctrl + P", "B) Ctrl + C", "C) Ctrl + V", "D) Ctrl + N"], "A) Ctrl + P"),
  seed("What does a spreadsheet formula bar show?", ["A) The formula in the selected cell", "B) The classroom timetable", "C) The computer password", "D) A printed chart only"], "A) The formula in the selected cell"),
  seed("Why do we sort a spreadsheet column?", ["A) To make data easier to read and understand", "B) To delete all data", "C) To change every cell colour", "D) To turn off filters"], "A) To make data easier to read and understand"),
);
addResourceQuestions("digital-technology-or-not", "8-9", "Hard",
  seed("Which function finds the mean value of selected numbers?", ["A) AVERAGE", "B) PRINT", "C) PASTE", "D) CLOSE"], "A) AVERAGE"),
  seed("Before sorting a list with connected data, what should you select?", ["A) The list and its connected data", "B) One random cell only", "C) The school logo", "D) An empty worksheet"], "A) The list and its connected data"),
  seed("What is the most respectful action when another student is using a device?", ["A) Wait and do not touch their device", "B) Press keys for them", "C) Move their mouse", "D) Close their work"], "A) Wait and do not touch their device"),
);

addResourceQuestions("digital-technology-or-not", "10-12", "Easy",
  seed("Which shortcut selects all text or items in many applications?", ["A) Ctrl + A", "B) Ctrl + S", "C) Ctrl + W", "D) Ctrl + T"], "A) Ctrl + A"),
  seed("What does the cell reference E12 identify?", ["A) Column E and row 12", "B) Row E and column 12", "C) Page 12", "D) Formula 12"], "A) Column E and row 12"),
  seed("Which practice supports responsible use of shared technology?", ["A) Taking turns and working with others", "B) Locking others out", "C) Hiding shared files", "D) Ignoring classroom rules"], "A) Taking turns and working with others"),
);
addResourceQuestions("digital-technology-or-not", "10-12", "Medium",
  seed("Which shortcut cuts selected content so it can be moved?", ["A) Ctrl + X", "B) Ctrl + C", "C) Ctrl + V", "D) Ctrl + B"], "A) Ctrl + X"),
  seed("What is a range in a spreadsheet?", ["A) A group of cells across rows, columns, or both", "B) A single letter only", "C) A web browser", "D) A password"], "A) A group of cells across rows, columns, or both"),
  seed("Why should data be given appropriate number formatting?", ["A) To make dates, currency, and values easier to interpret", "B) To remove all formulas", "C) To hide the worksheet", "D) To stop charts working"], "A) To make dates, currency, and values easier to interpret"),
);
addResourceQuestions("digital-technology-or-not", "10-12", "Hard",
  seed("Which shortcut redoes an action that was undone?", ["A) Ctrl + Y", "B) Ctrl + Z", "C) Ctrl + U", "D) Ctrl + I"], "A) Ctrl + Y"),
  seed("What is a key benefit of filtering spreadsheet data?", ["A) It helps locate relevant records without deleting the rest", "B) It permanently removes every row", "C) It changes passwords", "D) It turns numbers into pictures"], "A) It helps locate relevant records without deleting the rest"),
  seed("Which response best protects wellbeing when online content is upsetting?", ["A) Stop and report it to a trusted adult", "B) Repost it immediately", "C) Reply with personal details", "D) Continue alone"], "A) Stop and report it to a trusted adult"),
);

addResourceQuestions("ict-display-challenge", "6-7", "Easy",
  seed("Which keyboard shortcut opens a file you already made?", ["A) Ctrl + O", "B) Ctrl + N", "C) Ctrl + S", "D) Ctrl + P"], "A) Ctrl + O"),
  seed("The ICT display shows people around a globe. What are they using technology to do?", ["A) Connect and share information", "B) Hide all information", "C) Turn off every screen", "D) Avoid teamwork"], "A) Connect and share information"),
);
addResourceQuestions("ict-display-challenge", "6-7", "Medium",
  seed("Which shortcut poster means close a document or tab?", ["A) Ctrl + W", "B) Ctrl + C", "C) Ctrl + V", "D) Ctrl + A"], "A) Ctrl + W"),
  seed("Which action is a safe way to look after classroom technology?", ["A) Sit sensibly and use it carefully", "B) Eat beside it", "C) Pull cables", "D) Touch another person’s screen"], "A) Sit sensibly and use it carefully"),
);
addResourceQuestions("ict-display-challenge", "6-7", "Hard",
  seed("Which shortcut makes a copy of selected text or an image?", ["A) Ctrl + C", "B) Ctrl + X", "C) Ctrl + Z", "D) Ctrl + P"], "A) Ctrl + C"),
  seed("Before leaving a shared computer, what should you do?", ["A) Log off correctly", "B) Leave your account open", "C) Share your password", "D) Switch off at the wall"], "A) Log off correctly"),
);

addResourceQuestions("ict-display-challenge", "8-9", "Easy",
  seed("Which shortcut pastes content you copied?", ["A) Ctrl + V", "B) Ctrl + C", "C) Ctrl + P", "D) Ctrl + W"], "A) Ctrl + V"),
  seed("What does digital collaboration mean?", ["A) Working together using technology", "B) Never sharing work", "C) Using only one device silently", "D) Avoiding feedback"], "A) Working together using technology"),
);
addResourceQuestions("ict-display-challenge", "8-9", "Medium",
  seed("Which shortcut makes a document title bold?", ["A) Ctrl + B", "B) Ctrl + I", "C) Ctrl + U", "D) Ctrl + T"], "A) Ctrl + B"),
  seed("Why should a student only visit teacher-approved websites in class?", ["A) To support safe and relevant learning", "B) To make devices slower", "C) To avoid all research", "D) To skip lesson instructions"], "A) To support safe and relevant learning"),
);
addResourceQuestions("ict-display-challenge", "8-9", "Hard",
  seed("Which key can capture an image of what is on a screen?", ["A) PrtScn", "B) Enter", "C) Tab", "D) Shift"], "A) PrtScn"),
  seed("What is an appropriate first response to unwanted online content?", ["A) Tell a teacher or trusted adult", "B) Share it widely", "C) Keep clicking", "D) Send personal details"], "A) Tell a teacher or trusted adult"),
);

addResourceQuestions("ict-display-challenge", "10-12", "Easy",
  seed("Which shortcut opens a new browser tab?", ["A) Ctrl + T", "B) Ctrl + N", "C) Ctrl + S", "D) Ctrl + W"], "A) Ctrl + T"),
  seed("What does a network allow connected devices to do?", ["A) Exchange data and resources", "B) Remove all files", "C) Stop communication", "D) Make keyboards wireless automatically"], "A) Exchange data and resources"),
);
addResourceQuestions("ict-display-challenge", "10-12", "Medium",
  seed("Which shortcut underlines selected text?", ["A) Ctrl + U", "B) Ctrl + I", "C) Ctrl + B", "D) Ctrl + A"], "A) Ctrl + U"),
  seed("Why is it important to keep login credentials private?", ["A) It helps prevent unauthorized account access", "B) It makes websites colourful", "C) It removes the need to log off", "D) It automatically sorts data"], "A) It helps prevent unauthorized account access"),
);
addResourceQuestions("ict-display-challenge", "10-12", "Hard",
  seed("Which shortcut zooms in on many applications?", ["A) Ctrl + +", "B) Ctrl + -", "C) Ctrl + P", "D) Ctrl + X"], "A) Ctrl + +"),
  seed("Which principle supports responsible immersive-technology use?", ["A) Consider physical safety and accessibility", "B) Ignore discomfort", "C) Share private accounts", "D) Avoid teacher guidance"], "A) Consider physical safety and accessibility"),
);

export const QUIZ_ACTIVITY_SLUGS = Object.keys(bank) as QuizActivitySlug[];

export function getQuestionPoolSize(slug: QuizActivitySlug, gradeBand: GradeBand) {
  return (["Easy", "Medium", "Hard"] as const).reduce((total, level) => total + bank[slug][gradeBand][level].length, 0);
}

export function getQuestionRoute(slug: QuizActivitySlug, gradeBand: GradeBand, random = Math.random, excludedQuestionIds: string[] = []): QuizQuestion[] {
  const gradeBank = bank[slug][gradeBand];
  const excluded = new Set(excludedQuestionIds);
  return (["Easy", "Medium", "Hard"] as const).map(level => {
    const alternatives = gradeBank[level];
    const indexedAlternatives = alternatives.map((question, index) => ({ question, id: `${slug}:${gradeBand}:${level}:${index + 1}` }));
    const freshAlternatives = indexedAlternatives.filter(question => !excluded.has(question.id));
    const candidates = freshAlternatives.length ? freshAlternatives : indexedAlternatives;
    const chosen = candidates[Math.floor(random() * candidates.length)] ?? candidates[0];
    return { ...chosen.question, id: chosen.id, level };
  });
}

export function resolveQuestionRoute(slug: QuizActivitySlug, gradeBand: GradeBand, questionIds: string[]): QuizQuestion[] {
  if (questionIds.length !== 3 || new Set(questionIds).size !== 3) throw new Error("This quiz route is not valid. Please reopen the activity.");
  const allQuestions = (["Easy", "Medium", "Hard"] as const).flatMap(level => bank[slug][gradeBand][level].map((item, index) => ({ ...item, id: `${slug}:${gradeBand}:${level}:${index + 1}`, level })));
  const route = questionIds.map(id => allQuestions.find(question => question.id === id));
  if (route.some(question => !question)) throw new Error("This quiz route is not valid. Please reopen the activity.");
  return route as QuizQuestion[];
}

export function toPublicQuestions(questions: QuizQuestion[]) {
  return questions.map(({ id, level, prompt, options }) => ({ id, level, prompt, options }));
}
