export type GradeBand = "6-7" | "8-9" | "10-12";
export type QuizLevel = "Easy" | "Medium" | "Hard";
export type QuizActivitySlug = "science-quiz" | "mathematics-quiz" | "stem-quiz" | "pe-quiz" | "geography-quiz" | "ict-display-challenge" | "digital-technology-or-not" | "ict-foundations" | "keyboard-shortcuts" | "excel-skills";

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
  "ict-foundations": {
    "6-7": { Easy: [seed("Which device helps you move a pointer on a screen?", ["A) Mouse", "B) Speaker", "C) Printer", "D) Headphones"], "A) Mouse"), seed("Which action keeps a computer area safe?", ["A) Keep food and drinks away", "B) Pull cables", "C) Share passwords", "D) Press every key"], "A) Keep food and drinks away"), seed("Which device can show pictures from a computer?", ["A) Monitor", "B) Keyboard", "C) Microphone", "D) USB cable"], "A) Monitor")], Medium: [seed("What does ICT help people do?", ["A) Share and use information", "B) Remove all teamwork", "C) Stop learning", "D) Avoid communication"], "A) Share and use information"), seed("What should you do before leaving a shared computer?", ["A) Log off correctly", "B) Leave your account open", "C) Share your password", "D) Pull out cables"], "A) Log off correctly"), seed("Which is an input device?", ["A) Keyboard", "B) Monitor", "C) Projector", "D) Printer"], "A) Keyboard")], Hard: [seed("Why should you only use teacher-approved websites in class?", ["A) They support safe, relevant learning", "B) They make the device slower", "C) They stop research", "D) They remove all choices"], "A) They support safe, relevant learning"), seed("What is a digital network used for?", ["A) Sharing data between connected devices", "B) Storing food", "C) Cleaning a screen", "D) Replacing every program"], "A) Sharing data between connected devices"), seed("Which habit supports respectful digital collaboration?", ["A) Give kind feedback", "B) Delete others' work", "C) Use another person's account", "D) Ignore instructions"], "A) Give kind feedback")] },
    "8-9": { Easy: [seed("What does a computer network allow devices to do?", ["A) Share information", "B) Remove all data", "C) Stop communication", "D) Make screens larger"], "A) Share information"), seed("Which practice protects a personal account?", ["A) Keep login details private", "B) Share a password", "C) Post an address", "D) Use a stranger's account"], "A) Keep login details private"), seed("Which device stores files permanently?", ["A) SSD", "B) RAM", "C) Monitor", "D) Mouse"], "A) SSD")], Medium: [seed("Which system uses only 0 and 1 to represent data?", ["A) Binary", "B) Decimal only", "C) Roman numerals", "D) Alphabetical coding"], "A) Binary"), seed("What is a strong first action if online content feels unsafe?", ["A) Tell a trusted adult", "B) Share it widely", "C) Keep clicking", "D) Send personal details"], "A) Tell a trusted adult"), seed("What does an operating system do?", ["A) Manages computer hardware and software", "B) Only prints pages", "C) Replaces every app", "D) Creates Wi-Fi"], "A) Manages computer hardware and software")], Hard: [seed("Why does a unique strong password matter?", ["A) It reduces unauthorised account access", "B) It makes screens colourful", "C) It replaces logging off", "D) It removes updates"], "A) It reduces unauthorised account access"), seed("What is encryption designed to do?", ["A) Protect data from unauthorised access", "B) Increase screen brightness", "C) Delete files", "D) Make networks slower"], "A) Protect data from unauthorised access"), seed("What is an appropriate response to a phishing message?", ["A) Do not click; report it", "B) Reply with a password", "C) Forward it to everyone", "D) Download every attachment"], "A) Do not click; report it")] },
    "10-12": { Easy: [seed("What does HTTPS indicate for a website connection?", ["A) A secure web connection", "B) A spreadsheet formula", "C) A printer setting", "D) An image format"], "A) A secure web connection"), seed("What is cloud storage?", ["A) Saving files on remote servers", "B) Saving weather only", "C) Repairing hardware", "D) Replacing passwords"], "A) Saving files on remote servers"), seed("What is an API commonly used for?", ["A) Letting software systems communicate", "B) Cleaning a keyboard", "C) Increasing monitor size", "D) Replacing data"], "A) Letting software systems communicate")], Medium: [seed("What does a database primary key do?", ["A) Uniquely identifies a record", "B) Formats text", "C) Connects to Wi-Fi", "D) Prints a report"], "A) Uniquely identifies a record"), seed("Why is version control useful?", ["A) It tracks changes and supports collaboration", "B) It removes all bugs", "C) It replaces testing", "D) It blocks teamwork"], "A) It tracks changes and supports collaboration"), seed("Which design choice supports digital accessibility?", ["A) Clear labels and readable contrast", "B) Tiny unlabelled buttons", "C) Colour alone for meaning", "D) Auto-playing sound only"], "A) Clear labels and readable contrast")], Hard: [seed("What security property does multi-factor authentication add?", ["A) An additional proof of identity", "B) A shared password", "C) A public account", "D) No sign-in process"], "A) An additional proof of identity"), seed("Why should software inputs be validated?", ["A) To reduce errors and unsafe data", "B) To make code longer", "C) To remove users", "D) To prevent saving"], "A) To reduce errors and unsafe data"), seed("What is a key responsible-use principle for AI tools?", ["A) Check outputs and protect privacy", "B) Treat every output as certain", "C) Share personal data", "D) Avoid human judgement"], "A) Check outputs and protect privacy")] },
  },
  "keyboard-shortcuts": {
    "6-7": { Easy: [seed("Which shortcut saves your work?", ["A) Ctrl + S", "B) Ctrl + W", "C) Ctrl + P", "D) Ctrl + X"], "A) Ctrl + S"), seed("Which shortcut creates a new document?", ["A) Ctrl + N", "B) Ctrl + O", "C) Ctrl + C", "D) Ctrl + V"], "A) Ctrl + N"), seed("Which key usually starts a new line?", ["A) Enter", "B) Shift", "C) Alt", "D) Tab"], "A) Enter")], Medium: [seed("Which shortcut opens an existing file?", ["A) Ctrl + O", "B) Ctrl + W", "C) Ctrl + Z", "D) Ctrl + P"], "A) Ctrl + O"), seed("Which shortcut copies selected text?", ["A) Ctrl + C", "B) Ctrl + X", "C) Ctrl + V", "D) Ctrl + A"], "A) Ctrl + C"), seed("Which shortcut pastes copied content?", ["A) Ctrl + V", "B) Ctrl + C", "C) Ctrl + S", "D) Ctrl + O"], "A) Ctrl + V")], Hard: [seed("Which shortcut closes a document or tab?", ["A) Ctrl + W", "B) Ctrl + N", "C) Ctrl + P", "D) Ctrl + B"], "A) Ctrl + W"), seed("Which shortcut undoes your last action?", ["A) Ctrl + Z", "B) Ctrl + Y", "C) Ctrl + X", "D) Ctrl + S"], "A) Ctrl + Z"), seed("Why are shortcuts useful?", ["A) They speed up common actions", "B) They stop work saving", "C) They remove learning", "D) They replace all menus"], "A) They speed up common actions")] },
    "8-9": { Easy: [seed("Which shortcut selects all text or items?", ["A) Ctrl + A", "B) Ctrl + B", "C) Ctrl + U", "D) Ctrl + P"], "A) Ctrl + A"), seed("Which shortcut prints a document?", ["A) Ctrl + P", "B) Ctrl + N", "C) Ctrl + W", "D) Ctrl + O"], "A) Ctrl + P"), seed("Which shortcut makes selected text bold?", ["A) Ctrl + B", "B) Ctrl + I", "C) Ctrl + U", "D) Ctrl + T"], "A) Ctrl + B")], Medium: [seed("Which shortcut cuts selected content to move it?", ["A) Ctrl + X", "B) Ctrl + C", "C) Ctrl + V", "D) Ctrl + Z"], "A) Ctrl + X"), seed("Which shortcut redoes an action you undid?", ["A) Ctrl + Y", "B) Ctrl + Z", "C) Ctrl + W", "D) Ctrl + P"], "A) Ctrl + Y"), seed("Which shortcut underlines selected text?", ["A) Ctrl + U", "B) Ctrl + B", "C) Ctrl + I", "D) Ctrl + A"], "A) Ctrl + U")], Hard: [seed("What is a good shortcut habit before closing work?", ["A) Save first", "B) Share passwords", "C) Pull cables", "D) Delete files"], "A) Save first"), seed("Why should students learn keyboard shortcuts?", ["A) To work efficiently and accurately", "B) To avoid using devices", "C) To remove safety rules", "D) To skip instructions"], "A) To work efficiently and accurately"), seed("Which key captures a screen image on many keyboards?", ["A) PrtScn", "B) Caps Lock", "C) Escape", "D) Spacebar"], "A) PrtScn")], },
    "10-12": { Easy: [seed("Which shortcut opens a new browser tab?", ["A) Ctrl + T", "B) Ctrl + W", "C) Ctrl + R", "D) Ctrl + L"], "A) Ctrl + T"), seed("Which shortcut finds text on a page?", ["A) Ctrl + F", "B) Ctrl + H", "C) Ctrl + S", "D) Ctrl + Q"], "A) Ctrl + F"), seed("Which shortcut zooms in in many applications?", ["A) Ctrl + +", "B) Ctrl + -", "C) Ctrl + P", "D) Ctrl + X"], "A) Ctrl + +")], Medium: [seed("Which shortcut refreshes a browser page?", ["A) Ctrl + R", "B) Ctrl + P", "C) Ctrl + B", "D) Ctrl + S"], "A) Ctrl + R"), seed("What should you do before using a shortcut from an unfamiliar source?", ["A) Check it is appropriate and safe", "B) Run it immediately", "C) Share it with everyone", "D) Disable security"], "A) Check it is appropriate and safe"), seed("Why should keyboard shortcuts be taught with accessibility in mind?", ["A) They can support different ways of working", "B) They only help experts", "C) They replace all input devices", "D) They stop collaboration"], "A) They can support different ways of working")], Hard: [seed("Which is the best reason to use a keyboard shortcut instead of repeated mouse actions?", ["A) It can reduce repetitive steps", "B) It removes the need to check work", "C) It guarantees every answer", "D) It hides information"], "A) It can reduce repetitive steps"), seed("What should a clear shortcut reference include?", ["A) The key combination and its action", "B) Only a decoration", "C) A password", "D) A student name"], "A) The key combination and its action"), seed("Which practice protects shared-device work?", ["A) Save, sign out, and leave the device ready", "B) Leave private files open", "C) Share sign-in details", "D) Turn off at the wall"], "A) Save, sign out, and leave the device ready")] },
  },
  "excel-skills": {
    "6-7": { Easy: [seed("What is one box in a spreadsheet called?", ["A) Cell", "B) Poster", "C) Folder", "D) Mouse"], "A) Cell"), seed("Which key can move you down after typing in a cell?", ["A) Enter", "B) Escape", "C) Caps Lock", "D) Shift"], "A) Enter"), seed("What can a chart help you do?", ["A) See data visually", "B) Turn off a computer", "C) Type a password", "D) Close a book"], "A) See data visually")], Medium: [seed("Which function adds numbers together?", ["A) SUM", "B) SAVE", "C) SORT", "D) STOP"], "A) SUM"), seed("What does a row run across in a spreadsheet?", ["A) Horizontally", "B) Only diagonally", "C) In a circle", "D) Outside the sheet"], "A) Horizontally"), seed("What does a column run in a spreadsheet?", ["A) Vertically", "B) Only diagonally", "C) In a circle", "D) Outside the sheet"], "A) Vertically")], Hard: [seed("Why should a spreadsheet be saved often?", ["A) To protect your work", "B) To remove formulas", "C) To hide cells", "D) To stop charts"], "A) To protect your work"), seed("What is a sensible way to check spreadsheet data?", ["A) Review entries before using them", "B) Guess every value", "C) Delete the headings", "D) Share private data"], "A) Review entries before using them"), seed("Which item is usually used for a spreadsheet heading?", ["A) A clear label", "B) A password", "C) A random symbol", "D) An empty cell only"], "A) A clear label")] },
    "8-9": { Easy: [seed("What is the active cell?", ["A) The selected cell ready for input", "B) The whole worksheet", "C) The printer", "D) The menu bar"], "A) The selected cell ready for input"), seed("What does the formula bar show?", ["A) The formula in the selected cell", "B) The timetable", "C) A password", "D) Only a chart"], "A) The formula in the selected cell"), seed("Why do people sort a spreadsheet column?", ["A) To make data easier to read", "B) To delete all data", "C) To turn off filters", "D) To change every colour"], "A) To make data easier to read")], Medium: [seed("What does AVERAGE calculate?", ["A) The mean of selected numbers", "B) A new password", "C) A printed page", "D) A file name"], "A) The mean of selected numbers"), seed("What should be selected before sorting related data?", ["A) The list and its connected data", "B) One random cell", "C) The school logo", "D) An empty sheet"], "A) The list and its connected data"), seed("What is a spreadsheet range?", ["A) A group of cells", "B) A single letter", "C) A browser", "D) A password"], "A) A group of cells")], Hard: [seed("Why use number formatting?", ["A) To make dates, currency, and values easier to interpret", "B) To remove all formulas", "C) To hide the worksheet", "D) To stop charts"], "A) To make dates, currency, and values easier to interpret"), seed("What does filtering data allow you to do?", ["A) Locate relevant records without deleting the rest", "B) Remove every row", "C) Change passwords", "D) Turn numbers into pictures"], "A) Locate relevant records without deleting the rest"), seed("Which chart is useful for comparing category values?", ["A) Bar chart", "B) Password chart", "C) Folder chart", "D) Mouse chart"], "A) Bar chart")], },
    "10-12": { Easy: [seed("What does the reference E12 mean?", ["A) Column E and row 12", "B) Row E and column 12", "C) Page 12", "D) Formula 12"], "A) Column E and row 12"), seed("What is a formula in a spreadsheet?", ["A) An instruction that calculates a value", "B) A picture only", "C) A password", "D) A font"], "A) An instruction that calculates a value"), seed("Which formula begins a calculation in common spreadsheets?", ["A) =", "B) #", "C) @", "D) &"], "A) =")], Medium: [seed("What is the purpose of a relative cell reference?", ["A) It adjusts when copied to another cell", "B) It never changes", "C) It locks every sheet", "D) It deletes a formula"], "A) It adjusts when copied to another cell"), seed("What does a spreadsheet filter support?", ["A) Viewing rows that match a condition", "B) Deleting every row", "C) Changing all passwords", "D) Creating new hardware"], "A) Viewing rows that match a condition"), seed("Why should headings be clear in a data table?", ["A) They make fields easier to interpret", "B) They make values disappear", "C) They replace formulas", "D) They prevent saving"], "A) They make fields easier to interpret")], Hard: [seed("Why should source data be checked before analysis?", ["A) Inaccurate input can produce misleading results", "B) Charts cannot use numbers", "C) Formulas remove all errors", "D) Sorting changes facts"], "A) Inaccurate input can produce misleading results"), seed("What is a benefit of a well-chosen chart?", ["A) It communicates patterns clearly", "B) It hides all values", "C) It replaces data checking", "D) It stops collaboration"], "A) It communicates patterns clearly"), seed("What should you consider before sharing a spreadsheet?", ["A) Whether it contains private data", "B) Only its background colour", "C) Whether it has one row", "D) Whether it is empty"], "A) Whether it contains private data")] },
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

// Additional resource-led alternatives: distinct concepts extend every active ICT route before fallback is ever needed.
addResourceQuestions("ict-foundations", "6-7", "Easy", seed("Which device lets you hear sound from a computer?", ["A) Headphones", "B) Keyboard", "C) Monitor", "D) Mouse"], "A) Headphones"));
addResourceQuestions("ict-foundations", "6-7", "Medium", seed("Which information should you keep private online?", ["A) Your password", "B) A class topic", "C) A book title", "D) A weather report"], "A) Your password"));
addResourceQuestions("ict-foundations", "6-7", "Hard", seed("Why should you take turns on a shared device?", ["A) So everyone can work fairly", "B) To make the device slower", "C) To stop collaboration", "D) To hide the keyboard"], "A) So everyone can work fairly"));
addResourceQuestions("ict-foundations", "8-9", "Easy", seed("Which component shows the visual output from a computer?", ["A) Monitor", "B) Keyboard", "C) Microphone", "D) Scanner"], "A) Monitor"));
addResourceQuestions("ict-foundations", "8-9", "Medium", seed("What does it mean to log off a shared device?", ["A) End your account session safely", "B) Delete the computer", "C) Turn off the internet", "D) Share your password"], "A) End your account session safely"));
addResourceQuestions("ict-foundations", "8-9", "Hard", seed("Why is it important not to touch another student’s device while they work?", ["A) It respects their work and privacy", "B) It improves Wi-Fi", "C) It changes the keyboard language", "D) It makes screens brighter"], "A) It respects their work and privacy"));
addResourceQuestions("ict-foundations", "10-12", "Easy", seed("Which device is designed to capture spoken sound as input?", ["A) Microphone", "B) Speaker", "C) Projector", "D) Monitor"], "A) Microphone"));
addResourceQuestions("ict-foundations", "10-12", "Medium", seed("What is a reasonable purpose of an acceptable-use rule in an ICT room?", ["A) Set safe and respectful expectations", "B) Prevent all learning", "C) Replace teacher support", "D) Make passwords public"], "A) Set safe and respectful expectations"));
addResourceQuestions("ict-foundations", "10-12", "Hard", seed("Which action best protects a shared account from unauthorised use?", ["A) Sign out when finished", "B) Leave it open", "C) Post the password", "D) Let anyone use it"], "A) Sign out when finished"));

addResourceQuestions("keyboard-shortcuts", "6-7", "Easy", seed("Which shortcut prints your work?", ["A) Ctrl + P", "B) Ctrl + N", "C) Ctrl + O", "D) Ctrl + W"], "A) Ctrl + P"));
addResourceQuestions("keyboard-shortcuts", "6-7", "Medium", seed("Which shortcut puts copied words into a new place?", ["A) Ctrl + V", "B) Ctrl + C", "C) Ctrl + X", "D) Ctrl + W"], "A) Ctrl + V"));
addResourceQuestions("keyboard-shortcuts", "6-7", "Hard", seed("Which shortcut brings back an action after Undo?", ["A) Ctrl + Y", "B) Ctrl + Z", "C) Ctrl + S", "D) Ctrl + P"], "A) Ctrl + Y"));
addResourceQuestions("keyboard-shortcuts", "8-9", "Easy", seed("Which shortcut opens a file you already saved?", ["A) Ctrl + O", "B) Ctrl + N", "C) Ctrl + W", "D) Ctrl + A"], "A) Ctrl + O"));
addResourceQuestions("keyboard-shortcuts", "8-9", "Medium", seed("Which shortcut makes selected text italic in many programs?", ["A) Ctrl + I", "B) Ctrl + B", "C) Ctrl + U", "D) Ctrl + P"], "A) Ctrl + I"));
addResourceQuestions("keyboard-shortcuts", "8-9", "Hard", seed("Which shortcut can select every item in a document?", ["A) Ctrl + A", "B) Ctrl + C", "C) Ctrl + P", "D) Ctrl + Z"], "A) Ctrl + A"));
addResourceQuestions("keyboard-shortcuts", "10-12", "Easy", seed("Which shortcut zooms out in many applications?", ["A) Ctrl + -", "B) Ctrl + +", "C) Ctrl + P", "D) Ctrl + N"], "A) Ctrl + -"));
addResourceQuestions("keyboard-shortcuts", "10-12", "Medium", seed("Which shortcut commonly focuses the browser address bar?", ["A) Ctrl + L", "B) Ctrl + W", "C) Ctrl + P", "D) Ctrl + B"], "A) Ctrl + L"));
addResourceQuestions("keyboard-shortcuts", "10-12", "Hard", seed("Which shortcut is normally used to close the current browser tab?", ["A) Ctrl + W", "B) Ctrl + T", "C) Ctrl + L", "D) Ctrl + A"], "A) Ctrl + W"));

addResourceQuestions("excel-skills", "6-7", "Easy", seed("What is a spreadsheet used for?", ["A) Organising information", "B) Washing a screen", "C) Recording sound only", "D) Drawing with a mouse only"], "A) Organising information"));
addResourceQuestions("excel-skills", "6-7", "Medium", seed("Which word describes boxes going up and down in a spreadsheet?", ["A) Columns", "B) Rows", "C) Charts", "D) Tabs"], "A) Columns"));
addResourceQuestions("excel-skills", "6-7", "Hard", seed("What should you check before using a number in a chart?", ["A) That the data was entered correctly", "B) That the screen is blue", "C) That the keyboard is hidden", "D) That the file is closed"], "A) That the data was entered correctly"));
addResourceQuestions("excel-skills", "8-9", "Easy", seed("What is a worksheet?", ["A) A named set of rows and columns", "B) A computer mouse", "C) A password", "D) A printer tray"], "A) A named set of rows and columns"));
addResourceQuestions("excel-skills", "8-9", "Medium", seed("Which feature helps show only spreadsheet rows that match a rule?", ["A) Filter", "B) Print", "C) Zoom", "D) Paste"], "A) Filter"));
addResourceQuestions("excel-skills", "8-9", "Hard", seed("What can chart handles be used for?", ["A) Resize a selected chart", "B) Create a password", "C) Delete all cells", "D) Open a browser"], "A) Resize a selected chart"));
addResourceQuestions("excel-skills", "10-12", "Easy", seed("What does the cell reference B4 mean?", ["A) Column B and row 4", "B) Row B and column 4", "C) Book 4", "D) Formula B4"], "A) Column B and row 4"));
addResourceQuestions("excel-skills", "10-12", "Medium", seed("What is the main benefit of using a spreadsheet function?", ["A) It simplifies a repeated calculation", "B) It hides every value", "C) It removes all rows", "D) It replaces labels"], "A) It simplifies a repeated calculation"));
addResourceQuestions("excel-skills", "10-12", "Hard", seed("Why should a chart title and axes be labelled clearly?", ["A) So viewers can interpret the data", "B) So the chart cannot be resized", "C) So formulas stop working", "D) So no data is needed"], "A) So viewers can interpret the data"));

addResourceQuestions("ict-display-challenge", "6-7", "Easy", seed("What can ICT help a class do with a shared project?", ["A) Work together and share ideas", "B) Hide all work", "C) Avoid learning", "D) Break equipment"], "A) Work together and share ideas"));
addResourceQuestions("ict-display-challenge", "6-7", "Medium", seed("Which shortcut poster helps you save your work?", ["A) Ctrl + S", "B) Ctrl + W", "C) Ctrl + N", "D) Ctrl + X"], "A) Ctrl + S"));
addResourceQuestions("ict-display-challenge", "6-7", "Hard", seed("What should you do if you see something online that worries you?", ["A) Tell a teacher", "B) Keep clicking", "C) Share it widely", "D) Ignore it forever"], "A) Tell a teacher"));
addResourceQuestions("ict-display-challenge", "8-9", "Easy", seed("Which device is most useful for entering text into a document?", ["A) Keyboard", "B) Speaker", "C) Projector", "D) Monitor"], "A) Keyboard"));
addResourceQuestions("ict-display-challenge", "8-9", "Medium", seed("What does Ctrl + S usually do?", ["A) Saves the current work", "B) Closes the file", "C) Opens a new file", "D) Prints a page"], "A) Saves the current work"));
addResourceQuestions("ict-display-challenge", "8-9", "Hard", seed("Why is checking a digital source before sharing it responsible?", ["A) It helps avoid spreading incorrect information", "B) It makes the keyboard faster", "C) It removes the internet", "D) It creates a new password"], "A) It helps avoid spreading incorrect information"));
addResourceQuestions("ict-display-challenge", "10-12", "Easy", seed("Which service supports storing and sharing class files online?", ["A) Cloud storage", "B) A paperclip", "C) A desk", "D) A projector screen"], "A) Cloud storage"));
addResourceQuestions("ict-display-challenge", "10-12", "Medium", seed("What does Ctrl + F commonly help a user do?", ["A) Find text on a page", "B) Format every chart", "C) Close all windows", "D) Print a folder"], "A) Find text on a page"));
addResourceQuestions("ict-display-challenge", "10-12", "Hard", seed("Which action is best before sharing collaborative work online?", ["A) Check permissions and remove private details", "B) Share passwords", "C) Upload every personal file", "D) Ignore the audience"], "A) Check permissions and remove private details"));

addResourceQuestions("digital-technology-or-not", "6-7", "Easy", seed("Which tool can save a digital drawing?", ["A) Tablet", "B) Football", "C) Ruler", "D) Lunch box"], "A) Tablet"));
addResourceQuestions("digital-technology-or-not", "6-7", "Medium", seed("Which object sends information into a computer?", ["A) Keyboard", "B) Poster", "C) Chair", "D) Book"], "A) Keyboard"));
addResourceQuestions("digital-technology-or-not", "6-7", "Hard", seed("Which group contains only digital devices?", ["A) Laptop, printer, tablet", "B) Ball, ruler, book", "C) Chair, pencil, coat", "D) Apple, cup, bag"], "A) Laptop, printer, tablet"));
addResourceQuestions("digital-technology-or-not", "8-9", "Easy", seed("Which device can take a photo and save it as information?", ["A) Smartphone", "B) Pencil", "C) Paper map", "D) Water bottle"], "A) Smartphone"));
addResourceQuestions("digital-technology-or-not", "8-9", "Medium", seed("Which digital system part gives information to a user?", ["A) Output", "B) Input", "C) Storage only", "D) Paper"], "A) Output"));
addResourceQuestions("digital-technology-or-not", "8-9", "Hard", seed("Why is a connected printer part of a digital system?", ["A) It receives processed data as output", "B) It is made from paper", "C) It has no role in information", "D) It cannot use a computer"], "A) It receives processed data as output"));
addResourceQuestions("digital-technology-or-not", "10-12", "Easy", seed("Which technology can capture physical movement as digital data?", ["A) Motion sensor", "B) Wooden ruler", "C) Paper book", "D) Plastic cup"], "A) Motion sensor"));
addResourceQuestions("digital-technology-or-not", "10-12", "Medium", seed("Which stage changes raw input into useful information?", ["A) Processing", "B) Decoration", "C) Storage shelf", "D) Printing paper"], "A) Processing"));
addResourceQuestions("digital-technology-or-not", "10-12", "Hard", seed("Why is a digital technology classification based on function rather than appearance?", ["A) It depends on handling information", "B) Every device has the same colour", "C) Size proves capability", "D) Only screens are digital"], "A) It depends on handling information"));

// School-scale ICT routes: additional alternatives are append-only so completed-session IDs continue to resolve exactly.
addResourceQuestions("ict-foundations", "6-7", "Easy",
  seed("Which device lets you type words into a document?", ["A) Keyboard", "B) Monitor", "C) Speaker", "D) Printer"], "A) Keyboard"),
  seed("What does a trackpad help you do?", ["A) Move the pointer on screen", "B) Print a poster", "C) Play sound only", "D) Store a file"], "A) Move the pointer on screen"),
  seed("Which tool lets you speak into a computer?", ["A) Microphone", "B) Headphones", "C) Monitor", "D) Printer"], "A) Microphone"),
  seed("Which action treats computer equipment carefully?", ["A) Use gentle hands", "B) Pull a cable", "C) Place a drink beside it", "D) Hit the keys"], "A) Use gentle hands"),
  seed("Where should you click to start a program?", ["A) Its program icon", "B) The computer cable", "C) The monitor edge", "D) A classroom chair"], "A) Its program icon"),
  seed("Which device gives you sound from a computer?", ["A) Speaker", "B) Mouse", "C) Keyboard", "D) Webcam"], "A) Speaker"),
);
addResourceQuestions("ict-foundations", "6-7", "Medium",
  seed("You notice a typing mistake. What is a sensible next step?", ["A) Click and correct it", "B) Pull out a cable", "C) Hide the screen", "D) Share your password"], "A) Click and correct it"),
  seed("Why should the space around a computer be kept tidy?", ["A) It helps people use equipment safely", "B) It stops all learning", "C) It changes every password", "D) It makes a monitor wireless"], "A) It helps people use equipment safely"),
  seed("What should you do if you cannot find the program your teacher asked you to use?", ["A) Ask the teacher for help", "B) Open random programs", "C) Change another student’s work", "D) Turn off the computer"], "A) Ask the teacher for help"),
  seed("What is a good reason to use your own account on a shared computer?", ["A) It keeps your work separate", "B) It makes the keyboard larger", "C) It removes classroom rules", "D) It makes food safe near devices"], "A) It keeps your work separate"),
  seed("Which choice shows responsible computer-area behaviour?", ["A) Wait for your turn", "B) Push ahead of others", "C) Touch another person’s mouse", "D) Leave rubbish on the desk"], "A) Wait for your turn"),
  seed("What should you do before closing a class document after editing it?", ["A) Save the work", "B) Share the password", "C) Unplug the monitor", "D) Delete the title"], "A) Save the work"),
);
addResourceQuestions("ict-foundations", "6-7", "Hard",
  seed("Why should you ask before entering personal information on a website?", ["A) To help protect your privacy", "B) To make the website brighter", "C) To remove all accounts", "D) To make a chart"], "A) To help protect your privacy"),
  seed("A classmate leaves a device signed in. What is the respectful choice?", ["A) Tell the teacher and do not use the account", "B) Read their work", "C) Send messages as them", "D) Change their password"], "A) Tell the teacher and do not use the account"),
  seed("Why should you avoid unknown links during a lesson?", ["A) They may not be safe or relevant", "B) They make every task easier", "C) They replace teacher guidance", "D) They automatically save work"], "A) They may not be safe or relevant"),
  seed("What makes a classroom computer rule fair?", ["A) It helps everyone work safely", "B) It lets one student control every device", "C) It removes all turn-taking", "D) It shares private accounts"], "A) It helps everyone work safely"),
  seed("Why is a clear shared-device routine useful?", ["A) The next student can begin safely and respectfully", "B) It removes the need to save", "C) It makes passwords public", "D) It stops all collaboration"], "A) The next student can begin safely and respectfully"),
  seed("Which action supports safe online communication?", ["A) Use kind, appropriate words", "B) Post private details", "C) Send hurtful comments", "D) Pretend to be someone else"], "A) Use kind, appropriate words"),
);

addResourceQuestions("ict-foundations", "8-9", "Easy",
  seed("Which device records a voice as computer input?", ["A) Microphone", "B) Speaker", "C) Projector", "D) Printer"], "A) Microphone"),
  seed("What is the purpose of a web browser?", ["A) To access websites", "B) To print without paper", "C) To replace a keyboard", "D) To make a network cable"], "A) To access websites"),
  seed("Which item is an output device?", ["A) Projector", "B) Keyboard", "C) Scanner", "D) Mouse"], "A) Projector"),
  seed("Which action opens software from its picture on screen?", ["A) Selecting its icon", "B) Pulling a cable", "C) Turning a chair", "D) Closing the monitor"], "A) Selecting its icon"),
  seed("What does a storage device help a computer do?", ["A) Keep files", "B) Move a pointer", "C) Display a website", "D) Hear a voice"], "A) Keep files"),
  seed("What is a sensible way to look after a school laptop?", ["A) Carry it carefully with two hands", "B) Carry it by the screen", "C) Place a drink on it", "D) Pull it by a cable"], "A) Carry it carefully with two hands"),
);
addResourceQuestions("ict-foundations", "8-9", "Medium",
  seed("Why should a student use a teacher-approved website for class research?", ["A) It is chosen for safe, relevant learning", "B) It makes every answer correct", "C) It removes all rules", "D) It hides all sources"], "A) It is chosen for safe, relevant learning"),
  seed("Which action protects a shared computer after you finish?", ["A) Sign out of your account", "B) Leave files open", "C) Save the password in public", "D) Switch off at the wall"], "A) Sign out of your account"),
  seed("What should you do if you receive an unexpected message asking for a password?", ["A) Do not reply and tell an adult", "B) Send the password", "C) Forward it to everyone", "D) Open every link"], "A) Do not reply and tell an adult"),
  seed("Why does a class need rules about food and drinks near equipment?", ["A) Spills can damage technology", "B) Food makes software faster", "C) Drinks improve Wi-Fi", "D) It changes the keyboard layout"], "A) Spills can damage technology"),
  seed("Which behaviour helps a partner activity run well?", ["A) Share time and listen", "B) Keep the device all lesson", "C) Delete a partner’s work", "D) Ignore instructions"], "A) Share time and listen"),
  seed("What does digital citizenship include?", ["A) Using technology safely and respectfully", "B) Using every website without thought", "C) Avoiding all communication", "D) Sharing all private details"], "A) Using technology safely and respectfully"),
);
addResourceQuestions("ict-foundations", "8-9", "Hard",
  seed("Why should passwords not be shared with friends?", ["A) Accounts and work can be accessed without permission", "B) It makes a monitor dim", "C) It prevents saving", "D) It stops keyboard shortcuts"], "A) Accounts and work can be accessed without permission"),
  seed("A website asks for more personal information than a task needs. What is the best response?", ["A) Stop and ask a trusted adult", "B) Enter everything quickly", "C) Share a friend’s details", "D) Click every advert"], "A) Stop and ask a trusted adult"),
  seed("Why should a student review a source before sharing it with a group?", ["A) To reduce the chance of spreading incorrect information", "B) To make the file larger", "C) To remove the internet", "D) To avoid all teamwork"], "A) To reduce the chance of spreading incorrect information"),
  seed("What is a respectful response when another student is presenting on a screen?", ["A) Wait and avoid changing their device", "B) Press keys to help", "C) Close their program", "D) Take their login"], "A) Wait and avoid changing their device"),
  seed("Why are updates and security checks important on school devices?", ["A) They can help protect systems and data", "B) They make rules unnecessary", "C) They remove the need to save", "D) They stop all learning"], "A) They can help protect systems and data"),
  seed("Which action is appropriate when an online image or message makes you uncomfortable?", ["A) Stop and report it", "B) Keep it secret forever", "C) Repost it", "D) Reply with personal details"], "A) Stop and report it"),
);

addResourceQuestions("ict-foundations", "10-12", "Easy",
  seed("Which device turns a paper page into a digital file?", ["A) Scanner", "B) Speaker", "C) Projector", "D) Mouse"], "A) Scanner"),
  seed("What does an application program help a user do?", ["A) Complete a specific task", "B) Physically cool a computer", "C) Replace the internet", "D) Remove all data"], "A) Complete a specific task"),
  seed("Which device normally provides audio output?", ["A) Headphones", "B) Webcam", "C) Keyboard", "D) Touchpad"], "A) Headphones"),
  seed("What is the purpose of a school acceptable-use policy?", ["A) Guide safe, appropriate technology use", "B) Stop all access to learning tools", "C) Publish passwords", "D) Replace every teacher"], "A) Guide safe, appropriate technology use"),
  seed("Which action best protects a device from accidental damage?", ["A) Keep liquids away from it", "B) Stack books on its keyboard", "C) Pull its cables", "D) Carry it by one corner"], "A) Keep liquids away from it"),
  seed("What is a benefit of a shared digital workspace?", ["A) People can collaborate on files", "B) It removes all privacy needs", "C) It makes information public by default", "D) It prevents saving"], "A) People can collaborate on files"),
);
addResourceQuestions("ict-foundations", "10-12", "Medium",
  seed("Why should editing permissions be chosen carefully in a shared document?", ["A) They control who can change content", "B) They make the screen larger", "C) They remove all versions", "D) They create a password automatically"], "A) They control who can change content"),
  seed("Which practice best supports accessible digital instructions?", ["A) Use clear wording and descriptive labels", "B) Rely only on colour", "C) Use tiny text only", "D) Hide all headings"], "A) Use clear wording and descriptive labels"),
  seed("What is an appropriate first step before using an unfamiliar online tool for class?", ["A) Check with the teacher", "B) Enter personal data", "C) Bypass every warning", "D) Share the login"], "A) Check with the teacher"),
  seed("Why should a student remove private information before sharing a file publicly?", ["A) To protect people’s privacy", "B) To make the filename longer", "C) To disable comments", "D) To prevent saving"], "A) To protect people’s privacy"),
  seed("What does it mean to use a device responsibly in a computing area?", ["A) Follow rules and respect other users", "B) Change others’ files", "C) Leave an account open", "D) Ignore safety guidance"], "A) Follow rules and respect other users"),
  seed("Why should a student lock or sign out of a device before leaving it?", ["A) It helps prevent unauthorised access", "B) It improves speaker volume", "C) It turns data into paper", "D) It starts a new spreadsheet"], "A) It helps prevent unauthorised access"),
);
addResourceQuestions("ict-foundations", "10-12", "Hard",
  seed("What is the most responsible way to handle a link from an unknown sender?", ["A) Verify it before opening", "B) Open it immediately", "C) Send it to every contact", "D) Disable security tools"], "A) Verify it before opening"),
  seed("Why should a group agree on rules before collaborating online?", ["A) It sets respectful expectations for everyone", "B) It removes accountability", "C) It makes data inaccurate", "D) It gives one person every control"], "A) It sets respectful expectations for everyone"),
  seed("Which action helps keep a shared digital file trustworthy?", ["A) Check changes before publishing", "B) Remove all labels", "C) Share edit access with strangers", "D) Copy unverified information"], "A) Check changes before publishing"),
  seed("What is the best response if an account may have been accessed by someone else?", ["A) Tell a trusted adult and follow the account-security steps", "B) Share the password more widely", "C) Ignore the situation", "D) Delete every file"], "A) Tell a trusted adult and follow the account-security steps"),
  seed("Why does careful technology use include physical safety as well as online safety?", ["A) Equipment and people both need protection", "B) Physical actions never matter", "C) Rules apply only to websites", "D) Devices cannot be damaged"], "A) Equipment and people both need protection"),
  seed("Which choice demonstrates respectful digital feedback?", ["A) Give specific, kind suggestions", "B) Post an insult", "C) Change another person’s work silently", "D) Share a private comment publicly"], "A) Give specific, kind suggestions"),
);

addResourceQuestions("keyboard-shortcuts", "6-7", "Easy",
  seed("Which key removes the letter just before the cursor?", ["A) Backspace", "B) Enter", "C) Shift", "D) Tab"], "A) Backspace"),
  seed("Which key makes a space between words?", ["A) Spacebar", "B) Escape", "C) Caps Lock", "D) Alt"], "A) Spacebar"),
  seed("Which key can move to the next box or field?", ["A) Tab", "B) Delete", "C) Ctrl", "D) Home"], "A) Tab"),
  seed("Which key can cancel a small action or close a menu?", ["A) Escape", "B) Enter", "C) Shift", "D) Spacebar"], "A) Escape"),
  seed("Which key helps you type one capital letter while you hold it?", ["A) Shift", "B) Backspace", "C) Tab", "D) Delete"], "A) Shift"),
  seed("What should you do after using a shortcut that changes your work?", ["A) Check the result", "B) Pull out the keyboard", "C) Share a password", "D) Turn off the screen"], "A) Check the result"),
);
addResourceQuestions("keyboard-shortcuts", "6-7", "Medium",
  seed("Which shortcut makes selected text bold?", ["A) Ctrl + B", "B) Ctrl + U", "C) Ctrl + I", "D) Ctrl + P"], "A) Ctrl + B"),
  seed("Which shortcut cuts selected words so they can be moved?", ["A) Ctrl + X", "B) Ctrl + C", "C) Ctrl + V", "D) Ctrl + S"], "A) Ctrl + X"),
  seed("Which shortcut selects all the text in a document?", ["A) Ctrl + A", "B) Ctrl + B", "C) Ctrl + O", "D) Ctrl + W"], "A) Ctrl + A"),
  seed("Which shortcut can undo your most recent change?", ["A) Ctrl + Z", "B) Ctrl + Y", "C) Ctrl + N", "D) Ctrl + P"], "A) Ctrl + Z"),
  seed("Which shortcut underlines selected text?", ["A) Ctrl + U", "B) Ctrl + B", "C) Ctrl + I", "D) Ctrl + X"], "A) Ctrl + U"),
  seed("Why is Ctrl + C followed by Ctrl + V useful?", ["A) It copies content to another place", "B) It closes a file", "C) It turns off the screen", "D) It deletes every word"], "A) It copies content to another place"),
);
addResourceQuestions("keyboard-shortcuts", "6-7", "Hard",
  seed("Which shortcut can help you find a word in a long page?", ["A) Ctrl + F", "B) Ctrl + P", "C) Ctrl + N", "D) Ctrl + W"], "A) Ctrl + F"),
  seed("Which shortcut can make text italic in many programs?", ["A) Ctrl + I", "B) Ctrl + B", "C) Ctrl + U", "D) Ctrl + O"], "A) Ctrl + I"),
  seed("What is the best shortcut habit after finishing a document?", ["A) Save it before closing", "B) Share the password", "C) Delete the title", "D) Pull out a cable"], "A) Save it before closing"),
  seed("Why is Ctrl + Z helpful while editing?", ["A) It can reverse a mistake", "B) It prints a file", "C) It opens a new program", "D) It makes text bold"], "A) It can reverse a mistake"),
  seed("Which key would you use to make a new line in a document?", ["A) Enter", "B) Escape", "C) Alt", "D) Caps Lock"], "A) Enter"),
  seed("What is a sensible response if you are unsure what a shortcut will do?", ["A) Ask for help or check the shortcut display", "B) Press it repeatedly", "C) Change a friend’s work", "D) Close every program"], "A) Ask for help or check the shortcut display"),
);

addResourceQuestions("keyboard-shortcuts", "8-9", "Easy",
  seed("Which shortcut saves the current document?", ["A) Ctrl + S", "B) Ctrl + P", "C) Ctrl + W", "D) Ctrl + X"], "A) Ctrl + S"),
  seed("Which shortcut creates a new document?", ["A) Ctrl + N", "B) Ctrl + O", "C) Ctrl + C", "D) Ctrl + V"], "A) Ctrl + N"),
  seed("Which shortcut commonly closes the current document or tab?", ["A) Ctrl + W", "B) Ctrl + T", "C) Ctrl + A", "D) Ctrl + L"], "A) Ctrl + W"),
  seed("Which key helps type several capital letters until pressed again?", ["A) Caps Lock", "B) Shift", "C) Tab", "D) Escape"], "A) Caps Lock"),
  seed("Which key usually moves the cursor to the beginning of a line?", ["A) Home", "B) End", "C) Delete", "D) Ctrl"], "A) Home"),
  seed("What does Ctrl + P commonly prepare a document for?", ["A) Printing", "B) Pasting", "C) Password recovery", "D) Playing audio"], "A) Printing"),
);
addResourceQuestions("keyboard-shortcuts", "8-9", "Medium",
  seed("Which shortcut opens a find box in many documents and browsers?", ["A) Ctrl + F", "B) Ctrl + G", "C) Ctrl + H", "D) Ctrl + L"], "A) Ctrl + F"),
  seed("Which shortcut italicises selected text in many programs?", ["A) Ctrl + I", "B) Ctrl + U", "C) Ctrl + B", "D) Ctrl + S"], "A) Ctrl + I"),
  seed("Which shortcut opens a new browser tab?", ["A) Ctrl + T", "B) Ctrl + W", "C) Ctrl + R", "D) Ctrl + P"], "A) Ctrl + T"),
  seed("Which shortcut zooms in in many applications?", ["A) Ctrl + +", "B) Ctrl + -", "C) Ctrl + 0", "D) Ctrl + W"], "A) Ctrl + +"),
  seed("Which shortcut zooms out in many applications?", ["A) Ctrl + -", "B) Ctrl + +", "C) Ctrl + P", "D) Ctrl + N"], "A) Ctrl + -"),
  seed("Why should a shortcut be used only when you know its action?", ["A) To avoid unwanted changes", "B) To make the keyboard louder", "C) To remove all files", "D) To skip saving work"], "A) To avoid unwanted changes"),
);
addResourceQuestions("keyboard-shortcuts", "8-9", "Hard",
  seed("Which shortcut normally refreshes the current browser page?", ["A) Ctrl + R", "B) Ctrl + N", "C) Ctrl + A", "D) Ctrl + U"], "A) Ctrl + R"),
  seed("Which shortcut moves focus to the browser address bar?", ["A) Ctrl + L", "B) Ctrl + F", "C) Ctrl + B", "D) Ctrl + X"], "A) Ctrl + L"),
  seed("Which shortcut can restore the original zoom level in many browsers?", ["A) Ctrl + 0", "B) Ctrl + +", "C) Ctrl + -", "D) Ctrl + P"], "A) Ctrl + 0"),
  seed("What is a benefit of using Ctrl + A before applying a text style?", ["A) The style can affect all selected content", "B) It turns off the keyboard", "C) It opens a printer", "D) It signs out of an account"], "A) The style can affect all selected content"),
  seed("Why is it useful to combine Ctrl + X and Ctrl + V carefully?", ["A) It moves selected content to a new place", "B) It makes a new tab", "C) It prints all files", "D) It removes every menu"], "A) It moves selected content to a new place"),
  seed("What should a keyboard-shortcut guide make clear?", ["A) The keys and the action they perform", "B) A class password", "C) A private name", "D) Only a decoration"], "A) The keys and the action they perform"),
);

addResourceQuestions("keyboard-shortcuts", "10-12", "Easy",
  seed("Which shortcut saves the file you are working on?", ["A) Ctrl + S", "B) Ctrl + W", "C) Ctrl + P", "D) Ctrl + Q"], "A) Ctrl + S"),
  seed("Which shortcut starts a new document in many applications?", ["A) Ctrl + N", "B) Ctrl + O", "C) Ctrl + F", "D) Ctrl + L"], "A) Ctrl + N"),
  seed("Which shortcut prints a document?", ["A) Ctrl + P", "B) Ctrl + B", "C) Ctrl + I", "D) Ctrl + U"], "A) Ctrl + P"),
  seed("Which shortcut selects all content in a document?", ["A) Ctrl + A", "B) Ctrl + T", "C) Ctrl + R", "D) Ctrl + W"], "A) Ctrl + A"),
  seed("Which shortcut copies selected information?", ["A) Ctrl + C", "B) Ctrl + X", "C) Ctrl + V", "D) Ctrl + Z"], "A) Ctrl + C"),
  seed("Which shortcut pastes information from the clipboard?", ["A) Ctrl + V", "B) Ctrl + C", "C) Ctrl + A", "D) Ctrl + W"], "A) Ctrl + V"),
);
addResourceQuestions("keyboard-shortcuts", "10-12", "Medium",
  seed("Which shortcut makes selected text bold?", ["A) Ctrl + B", "B) Ctrl + I", "C) Ctrl + U", "D) Ctrl + L"], "A) Ctrl + B"),
  seed("Which shortcut underlines selected text?", ["A) Ctrl + U", "B) Ctrl + B", "C) Ctrl + I", "D) Ctrl + O"], "A) Ctrl + U"),
  seed("Which shortcut commonly reopens a recently closed browser tab?", ["A) Ctrl + Shift + T", "B) Ctrl + Shift + P", "C) Ctrl + Shift + S", "D) Ctrl + Shift + X"], "A) Ctrl + Shift + T"),
  seed("Which shortcut can undo the latest change?", ["A) Ctrl + Z", "B) Ctrl + Y", "C) Ctrl + R", "D) Ctrl + T"], "A) Ctrl + Z"),
  seed("Which shortcut redoes an action after Undo?", ["A) Ctrl + Y", "B) Ctrl + Z", "C) Ctrl + A", "D) Ctrl + L"], "A) Ctrl + Y"),
  seed("Why can keyboard shortcuts support efficient work?", ["A) They reduce repeated pointer movements", "B) They make every task automatic", "C) They remove the need to review work", "D) They prevent collaboration"], "A) They reduce repeated pointer movements"),
);
addResourceQuestions("keyboard-shortcuts", "10-12", "Hard",
  seed("Which shortcut focuses the address bar so you can type a web address?", ["A) Ctrl + L", "B) Ctrl + T", "C) Ctrl + W", "D) Ctrl + P"], "A) Ctrl + L"),
  seed("Which shortcut is most useful for locating a term in a long report?", ["A) Ctrl + F", "B) Ctrl + N", "C) Ctrl + P", "D) Ctrl + S"], "A) Ctrl + F"),
  seed("Which shortcut closes the active tab in many browsers?", ["A) Ctrl + W", "B) Ctrl + T", "C) Ctrl + R", "D) Ctrl + 0"], "A) Ctrl + W"),
  seed("Why should a student check where the cursor or selection is before using a shortcut?", ["A) The shortcut may act on that location or selection", "B) The keyboard needs a password", "C) It makes a new account", "D) It changes the screen colour"], "A) The shortcut may act on that location or selection"),
  seed("Which shortcut pair is a safe routine before leaving shared work?", ["A) Ctrl + S, then sign out", "B) Ctrl + X, then delete", "C) Ctrl + W, then share the password", "D) Ctrl + P, then pull a cable"], "A) Ctrl + S, then sign out"),
  seed("Why is a shortcut reference useful in a classroom?", ["A) It helps students use common commands consistently", "B) It makes access rules unnecessary", "C) It replaces all digital safety", "D) It gives everyone the same account"], "A) It helps students use common commands consistently"),
);

addResourceQuestions("excel-skills", "6-7", "Easy",
  seed("What do we call the boxes that go across a spreadsheet?", ["A) Rows", "B) Columns", "C) Charts", "D) Tabs"], "A) Rows"),
  seed("What do we call the boxes that go down a spreadsheet?", ["A) Columns", "B) Rows", "C) Titles", "D) Formulas"], "A) Columns"),
  seed("What should you add at the top of a list to explain its data?", ["A) A heading", "B) A password", "C) A random symbol", "D) A blank chart"], "A) A heading"),
  seed("Which symbol begins a formula in a spreadsheet?", ["A) =", "B) #", "C) ?", "D) &"], "A) ="),
  seed("What is a group of nearby spreadsheet cells called?", ["A) Range", "B) Keyboard", "C) Browser", "D) Folder"], "A) Range"),
  seed("What can sorting help you do with a class list?", ["A) Put it in a useful order", "B) Remove every name", "C) Turn it into a password", "D) Close the workbook"], "A) Put it in a useful order"),
);
addResourceQuestions("excel-skills", "6-7", "Medium",
  seed("What does the formula =5+3 calculate?", ["A) 8", "B) 53", "C) 2", "D) 15"], "A) 8"),
  seed("Which function can find the largest number in a group of cells?", ["A) MAX", "B) SUM", "C) SAVE", "D) SORT"], "A) MAX"),
  seed("Which function can find the smallest number in a group of cells?", ["A) MIN", "B) NEW", "C) PRINT", "D) PASTE"], "A) MIN"),
  seed("Why should a chart have a clear title?", ["A) It tells viewers what the data is about", "B) It hides the numbers", "C) It turns off formulas", "D) It removes headings"], "A) It tells viewers what the data is about"),
  seed("What should you do if a number in a spreadsheet looks wrong?", ["A) Check the original entry", "B) Ignore it", "C) Delete all cells", "D) Share it immediately"], "A) Check the original entry"),
  seed("What does it mean to select a cell?", ["A) Choose it so you can work in it", "B) Print it automatically", "C) Lock the keyboard", "D) Hide a row"], "A) Choose it so you can work in it"),
);
addResourceQuestions("excel-skills", "6-7", "Hard",
  seed("Why can a bar chart be useful for class survey answers?", ["A) It compares amounts clearly", "B) It deletes the survey", "C) It turns answers into passwords", "D) It stops data being entered"], "A) It compares amounts clearly"),
  seed("What should happen to a formula if you change one of the numbers it uses?", ["A) Its result should update", "B) The spreadsheet must close", "C) Every cell must disappear", "D) The keyboard changes language"], "A) Its result should update"),
  seed("Which practice helps other people understand a spreadsheet?", ["A) Use clear labels", "B) Hide every heading", "C) Mix unrelated data", "D) Leave cells unexplained"], "A) Use clear labels"),
  seed("Why is it useful to save a spreadsheet with a meaningful file name?", ["A) It is easier to find later", "B) It removes all charts", "C) It stops typing", "D) It hides data"], "A) It is easier to find later"),
  seed("What should a student check before sharing a spreadsheet with a class?", ["A) That it has no private information", "B) That it has no rows", "C) That it is unsaved", "D) That all labels are removed"], "A) That it has no private information"),
  seed("Which feature can show data as pictures and bars?", ["A) Chart", "B) Password", "C) Folder", "D) Cursor"], "A) Chart"),
);

addResourceQuestions("excel-skills", "8-9", "Easy",
  seed("What does the reference C7 mean?", ["A) Column C, row 7", "B) Row C, column 7", "C) Chart 7", "D) Cell colour 7"], "A) Column C, row 7"),
  seed("What does a worksheet contain?", ["A) Rows and columns of cells", "B) Only a password", "C) A computer mouse", "D) A web address"], "A) Rows and columns of cells"),
  seed("Which feature can arrange names from A to Z?", ["A) Sort", "B) Paste", "C) Zoom", "D) Print"], "A) Sort"),
  seed("What does a spreadsheet chart represent?", ["A) Data visually", "B) A computer virus", "C) A login name", "D) A keyboard shortcut"], "A) Data visually"),
  seed("Why might you adjust a column width?", ["A) To show its data clearly", "B) To remove all values", "C) To close a worksheet", "D) To change a password"], "A) To show its data clearly"),
  seed("What is one benefit of using a formula instead of calculating each answer separately?", ["A) It can recalculate automatically", "B) It hides every value", "C) It removes headings", "D) It stops sorting"], "A) It can recalculate automatically"),
);
addResourceQuestions("excel-skills", "8-9", "Medium",
  seed("Which formula adds the values in B2 to B5?", ["A) =SUM(B2:B5)", "B) =SAVE(B2:B5)", "C) =SORT(B2:B5)", "D) =PRINT(B2:B5)"], "A) =SUM(B2:B5)"),
  seed("Which formula can find the largest score in C2:C10?", ["A) =MAX(C2:C10)", "B) =MIN(C2:C10)", "C) =AVERAGE(C2:C10)", "D) =COUNT(C2:C10)"], "A) =MAX(C2:C10)"),
  seed("Which formula can find the smallest number in D2:D8?", ["A) =MIN(D2:D8)", "B) =MAX(D2:D8)", "C) =SUM(D2:D8)", "D) =SORT(D2:D8)"], "A) =MIN(D2:D8)"),
  seed("Why should related columns be sorted together?", ["A) To keep each record matched correctly", "B) To remove formulas", "C) To hide headings", "D) To stop filters"], "A) To keep each record matched correctly"),
  seed("What does a filter let you do?", ["A) Show rows that match a condition", "B) Permanently delete every row", "C) Rename all formulas", "D) Add a new computer"], "A) Show rows that match a condition"),
  seed("Which chart is often useful for showing parts of a whole?", ["A) Pie chart", "B) Keyboard chart", "C) Password chart", "D) Folder chart"], "A) Pie chart"),
);
addResourceQuestions("excel-skills", "8-9", "Hard",
  seed("Why is a column heading important in a data table?", ["A) It explains the meaning of the values below", "B) It stops calculations", "C) It deletes filters", "D) It locks every cell"], "A) It explains the meaning of the values below"),
  seed("What is the likely result of copying a relative reference one row down?", ["A) The row number adjusts", "B) The workbook closes", "C) The formula becomes a chart", "D) The column disappears"], "A) The row number adjusts"),
  seed("Why should you inspect a chart before presenting it?", ["A) To check it represents the data accurately", "B) To remove its title", "C) To hide the values", "D) To prevent saving"], "A) To check it represents the data accurately"),
  seed("What should you do when a filter hides rows you still need later?", ["A) Clear or change the filter", "B) Delete the workbook", "C) Print the keyboard", "D) Hide all columns"], "A) Clear or change the filter"),
  seed("Why does consistent number formatting improve a spreadsheet?", ["A) Values are easier to compare", "B) It makes formulas disappear", "C) It changes all data", "D) It removes charts"], "A) Values are easier to compare"),
  seed("What is a sensible first check when a formula gives an unexpected result?", ["A) Check its cell references", "B) Close the program", "C) Delete all rows", "D) Change the font"], "A) Check its cell references"),
);

addResourceQuestions("excel-skills", "10-12", "Easy",
  seed("What does the range A1:A10 include?", ["A) Cells A1 through A10", "B) Every cell in row 1", "C) Ten worksheets", "D) Only cell A10"], "A) Cells A1 through A10"),
  seed("Which formula calculates the mean of B2:B6?", ["A) =AVERAGE(B2:B6)", "B) =SUM(B2:B6)", "C) =MAX(B2:B6)", "D) =MIN(B2:B6)"], "A) =AVERAGE(B2:B6)"),
  seed("What does the function COUNT normally return?", ["A) The number of numeric entries", "B) The largest value", "C) A chart title", "D) A password"], "A) The number of numeric entries"),
  seed("Which type of reference stays fixed when copied?", ["A) Absolute reference", "B) Relative reference", "C) Chart reference", "D) Tab reference"], "A) Absolute reference"),
  seed("What does a filter help an analyst do?", ["A) Focus on matching records", "B) Remove every calculation", "C) Turn numbers into text", "D) Hide a workbook permanently"], "A) Focus on matching records"),
  seed("Why are meaningful sheet names useful?", ["A) They help organise a workbook", "B) They delete all rows", "C) They make formulas invalid", "D) They replace a chart"], "A) They help organise a workbook"),
);
addResourceQuestions("excel-skills", "10-12", "Medium",
  seed("Which formula finds the largest value in E2:E20?", ["A) =MAX(E2:E20)", "B) =MIN(E2:E20)", "C) =COUNT(E2:E20)", "D) =AVERAGE(E2:E20)"], "A) =MAX(E2:E20)"),
  seed("Which formula finds the smallest value in F2:F20?", ["A) =MIN(F2:F20)", "B) =MAX(F2:F20)", "C) =SUM(F2:F20)", "D) =FILTER(F2:F20)"], "A) =MIN(F2:F20)"),
  seed("Why should categories be clear before making a chart?", ["A) They help viewers understand what is compared", "B) They make data private", "C) They disable formulas", "D) They turn a worksheet into a browser"], "A) They help viewers understand what is compared"),
  seed("What does sorting a table by a score column help reveal?", ["A) The highest and lowest values", "B) Only the file name", "C) The keyboard layout", "D) A website password"], "A) The highest and lowest values"),
  seed("What is a good reason to use conditional formatting?", ["A) Highlight values that meet a rule", "B) Remove every formula", "C) Stop charts from changing", "D) Delete worksheet titles"], "A) Highlight values that meet a rule"),
  seed("Why is a data range needed when creating a chart?", ["A) It tells the chart what values to display", "B) It prevents saving", "C) It makes every label bold", "D) It removes columns"], "A) It tells the chart what values to display"),
);
addResourceQuestions("excel-skills", "10-12", "Hard",
  seed("Why can an inaccurate source value create a misleading chart?", ["A) Charts depend on the data they receive", "B) Charts change passwords", "C) Charts remove all labels", "D) Charts prevent sorting"], "A) Charts depend on the data they receive"),
  seed("What is the benefit of using an absolute reference in a copied formula?", ["A) A fixed cell remains unchanged", "B) Every cell becomes blank", "C) The formula cannot calculate", "D) The sheet is deleted"], "A) A fixed cell remains unchanged"),
  seed("Why might a chart axis need a descriptive label?", ["A) It explains the measurement or category", "B) It hides the data", "C) It disables filters", "D) It locks a workbook"], "A) It explains the measurement or category"),
  seed("What should you do before sharing spreadsheet data beyond your class?", ["A) Review permissions and private details", "B) Remove all headings", "C) Share editing access publicly", "D) Ignore who can view it"], "A) Review permissions and private details"),
  seed("Why is a spreadsheet audit trail useful in a group project?", ["A) It helps explain changes to data", "B) It makes every cell identical", "C) It stops collaboration", "D) It replaces data checking"], "A) It helps explain changes to data"),
  seed("Which action helps prevent a chart from exaggerating a small difference?", ["A) Choose an appropriate scale", "B) Remove the axis labels", "C) Hide the source data", "D) Use random colours only"], "A) Choose an appropriate scale"),
);

addResourceQuestions("ict-display-challenge", "6-7", "Easy",
  seed("Which device lets you see work from a computer?", ["A) Monitor", "B) Keyboard", "C) Mouse", "D) Microphone"], "A) Monitor"),
  seed("Which action uses ICT to help a class share ideas?", ["A) Making a shared digital poster", "B) Hiding all the work", "C) Turning off every device", "D) Pulling a cable"], "A) Making a shared digital poster"),
  seed("Which shortcut saves a file?", ["A) Ctrl + S", "B) Ctrl + W", "C) Ctrl + X", "D) Ctrl + P"], "A) Ctrl + S"),
  seed("What could a virtual-reality headset help you explore?", ["A) A digital place", "B) A paper file only", "C) A keyboard key", "D) A food tray"], "A) A digital place"),
  seed("Which action shows good care for classroom technology?", ["A) Keep food and drinks away", "B) Pull the wires", "C) Press keys roughly", "D) Put bags on the keyboard"], "A) Keep food and drinks away"),
);
addResourceQuestions("ict-display-challenge", "6-7", "Medium",
  seed("Which shortcut opens a new document?", ["A) Ctrl + N", "B) Ctrl + O", "C) Ctrl + W", "D) Ctrl + C"], "A) Ctrl + N"),
  seed("What does Ctrl + P usually help you do?", ["A) Print work", "B) Paste work", "C) Close work", "D) Underline work"], "A) Print work"),
  seed("Why is ICT helpful for teamwork?", ["A) People can share ideas and work together", "B) It stops people talking", "C) It hides every file", "D) It removes classroom rules"], "A) People can share ideas and work together"),
  seed("How should you move when wearing a VR headset at school?", ["A) Follow the teacher’s safety guidance", "B) Run around the room", "C) Ignore people nearby", "D) Swap it without permission"], "A) Follow the teacher’s safety guidance"),
  seed("What should you do if the computer screen shows something worrying?", ["A) Tell a teacher", "B) Keep clicking", "C) Share it with the class", "D) Type your password"], "A) Tell a teacher"),
);
addResourceQuestions("ict-display-challenge", "6-7", "Hard",
  seed("Which shortcut pastes something you copied?", ["A) Ctrl + V", "B) Ctrl + C", "C) Ctrl + X", "D) Ctrl + Z"], "A) Ctrl + V"),
  seed("Why should a class use only teacher-approved websites?", ["A) They support safe learning", "B) They make files disappear", "C) They remove teamwork", "D) They make passwords public"], "A) They support safe learning"),
  seed("What is the best way to treat a shared computer?", ["A) Take turns and use it carefully", "B) Keep it all lesson", "C) Change someone else’s work", "D) Leave rubbish beside it"], "A) Take turns and use it carefully"),
  seed("What is one safe way to use a VR headset?", ["A) Take breaks if you feel uncomfortable", "B) Keep using it when dizzy", "C) Walk without checking the room", "D) Wear it while running"], "A) Take breaks if you feel uncomfortable"),
  seed("Why should you log off a shared computer?", ["A) To keep your account private", "B) To make a new chart", "C) To change the keyboard", "D) To stop all files saving"], "A) To keep your account private"),
);

addResourceQuestions("ict-display-challenge", "8-9", "Easy",
  seed("Which device can send a spoken message to a computer?", ["A) Microphone", "B) Monitor", "C) Printer", "D) Speaker"], "A) Microphone"),
  seed("What does a digital network help devices do?", ["A) Share information", "B) Turn into paper", "C) Stop all messages", "D) Remove all files"], "A) Share information"),
  seed("Which shortcut selects all text in a document?", ["A) Ctrl + A", "B) Ctrl + P", "C) Ctrl + W", "D) Ctrl + N"], "A) Ctrl + A"),
  seed("Which use of ICT helps a group prepare a presentation?", ["A) Working in a shared document", "B) Deleting each other’s work", "C) Refusing to communicate", "D) Sharing passwords"], "A) Working in a shared document"),
  seed("Which action keeps a computing area safe?", ["A) Keep cables clear and equipment tidy", "B) Eat over the keyboard", "C) Swap accounts", "D) Touch another student’s screen"], "A) Keep cables clear and equipment tidy"),
);
addResourceQuestions("ict-display-challenge", "8-9", "Medium",
  seed("Which shortcut copies selected text?", ["A) Ctrl + C", "B) Ctrl + X", "C) Ctrl + V", "D) Ctrl + Z"], "A) Ctrl + C"),
  seed("What does Ctrl + Z commonly do?", ["A) Undo the last action", "B) Print the file", "C) Open a tab", "D) Save a document"], "A) Undo the last action"),
  seed("Why should feedback in a shared digital project be kind and clear?", ["A) It supports respectful collaboration", "B) It makes Wi-Fi faster", "C) It removes the need to save", "D) It hides the project"], "A) It supports respectful collaboration"),
  seed("What is virtual reality useful for in a learning activity?", ["A) Exploring a simulated environment", "B) Replacing every safety rule", "C) Storing drinks", "D) Printing a website"], "A) Exploring a simulated environment"),
  seed("Why should you check a source before sharing it online?", ["A) To avoid spreading incorrect information", "B) To make a keyboard louder", "C) To remove a file", "D) To avoid all discussion"], "A) To avoid spreading incorrect information"),
);
addResourceQuestions("ict-display-challenge", "8-9", "Hard",
  seed("Which shortcut moves selected text so it can be placed elsewhere?", ["A) Ctrl + X", "B) Ctrl + C", "C) Ctrl + V", "D) Ctrl + S"], "A) Ctrl + X"),
  seed("Which shortcut redoes an action after Undo?", ["A) Ctrl + Y", "B) Ctrl + Z", "C) Ctrl + O", "D) Ctrl + N"], "A) Ctrl + Y"),
  seed("Why should you keep login details private when collaborating online?", ["A) To protect your account and work", "B) To make your document colourful", "C) To change the folder icon", "D) To remove all permissions"], "A) To protect your account and work"),
  seed("What should a learner consider before sharing a VR experience with classmates?", ["A) Safety, comfort, and accessibility", "B) Only screen colour", "C) How to avoid breaks", "D) How to hide safety rules"], "A) Safety, comfort, and accessibility"),
  seed("What is a sensible response to an unknown website link in a class chat?", ["A) Ask a teacher before opening it", "B) Share it widely", "C) Enter account details", "D) Download everything"], "A) Ask a teacher before opening it"),
);

addResourceQuestions("ict-display-challenge", "10-12", "Easy",
  seed("Which tool supports real-time collaboration on a class document?", ["A) A shared online workspace", "B) A disconnected printer", "C) A paper cup", "D) A locked screen"], "A) A shared online workspace"),
  seed("What does digital communication involve?", ["A) Exchanging information through technology", "B) Removing all messages", "C) Avoiding collaboration", "D) Turning data into food"], "A) Exchanging information through technology"),
  seed("Which shortcut copies selected content?", ["A) Ctrl + C", "B) Ctrl + V", "C) Ctrl + X", "D) Ctrl + W"], "A) Ctrl + C"),
  seed("Which device gives visual output to a whole class?", ["A) Projector", "B) Keyboard", "C) Microphone", "D) Scanner"], "A) Projector"),
  seed("What is a sensible way to care for a shared headset?", ["A) Follow the cleaning and handling guidance", "B) Throw it onto a desk", "C) Leave it on the floor", "D) Use it while charging without permission"], "A) Follow the cleaning and handling guidance"),
);
addResourceQuestions("ict-display-challenge", "10-12", "Medium",
  seed("Which shortcut cuts selected content to the clipboard?", ["A) Ctrl + X", "B) Ctrl + C", "C) Ctrl + V", "D) Ctrl + P"], "A) Ctrl + X"),
  seed("Which shortcut resets browser zoom in many browsers?", ["A) Ctrl + 0", "B) Ctrl + +", "C) Ctrl + -", "D) Ctrl + L"], "A) Ctrl + 0"),
  seed("Why are permission settings important in shared cloud files?", ["A) They control who can view or edit", "B) They make the internet faster", "C) They remove version history", "D) They stop all sharing"], "A) They control who can view or edit"),
  seed("What is an important reason to include breaks during immersive learning?", ["A) To support comfort and wellbeing", "B) To make virtual scenes disappear", "C) To avoid collaboration", "D) To remove teacher guidance"], "A) To support comfort and wellbeing"),
  seed("Why should a class confirm the audience before publishing digital work?", ["A) To share it with the intended people", "B) To delete every file", "C) To remove feedback", "D) To make a password weaker"], "A) To share it with the intended people"),
);
addResourceQuestions("ict-display-challenge", "10-12", "Hard",
  seed("Which shortcut can help locate a phrase quickly in a web page?", ["A) Ctrl + F", "B) Ctrl + P", "C) Ctrl + T", "D) Ctrl + W"], "A) Ctrl + F"),
  seed("Which shortcut refreshes a browser page?", ["A) Ctrl + R", "B) Ctrl + B", "C) Ctrl + U", "D) Ctrl + A"], "A) Ctrl + R"),
  seed("Why should collaborative changes be reviewed before a final publication?", ["A) To check accuracy and appropriateness", "B) To remove all contributors", "C) To make content private by default", "D) To prevent feedback"], "A) To check accuracy and appropriateness"),
  seed("What is a responsible way to respond if a VR experience causes discomfort?", ["A) Pause and tell the teacher", "B) Continue without a break", "C) Move faster", "D) Hide the problem"], "A) Pause and tell the teacher"),
  seed("What is the main digital-safety risk of leaving an account open on a shared device?", ["A) Someone else could access the account", "B) The monitor will shrink", "C) A printer will stop working", "D) The keyboard will change colour"], "A) Someone else could access the account"),
);

addResourceQuestions("digital-technology-or-not", "6-7", "Easy",
  seed("Which object can take and save a digital photo?", ["A) Tablet", "B) Paper clip", "C) Football", "D) Wooden ruler"], "A) Tablet"),
  seed("Which object is not a digital device?", ["A) Paper book", "B) Smartphone", "C) Laptop", "D) Printer"], "A) Paper book"),
  seed("Which device can send a message to someone?", ["A) Smartphone", "B) Cushion", "C) Pencil", "D) Lunch box"], "A) Smartphone"),
  seed("Which object can show information from a computer?", ["A) Monitor", "B) Chair", "C) Ball", "D) Coat"], "A) Monitor"),
);
addResourceQuestions("digital-technology-or-not", "6-7", "Medium",
  seed("Which action is an example of getting information with technology?", ["A) Reading a class message on a tablet", "B) Folding a paper plane", "C) Kicking a ball", "D) Tying a shoe"], "A) Reading a class message on a tablet"),
  seed("Which part of a digital system lets you type information in?", ["A) Keyboard", "B) Monitor", "C) Speaker", "D) Printer"], "A) Keyboard"),
  seed("Which device can print digital work onto paper?", ["A) Printer", "B) Mouse", "C) Headphones", "D) Webcam"], "A) Printer"),
  seed("A tablet is used to make a picture. Which action can save it?", ["A) Tap Save", "B) Throw the tablet", "C) Close without saving", "D) Put it under a book"], "A) Tap Save"),
);
addResourceQuestions("digital-technology-or-not", "6-7", "Hard",
  seed("Which sequence shows a digital message being shared?", ["A) Type, send, receive", "B) Sleep, run, eat", "C) Draw, hide, tear", "D) Jump, clap, stop"], "A) Type, send, receive"),
  seed("Which group contains only things that can handle digital information?", ["A) Laptop, tablet, smartphone", "B) Book, ball, ruler", "C) Chair, cup, bag", "D) Pencil, coat, apple"], "A) Laptop, tablet, smartphone"),
  seed("Why is a printer part of a digital system?", ["A) It receives information and produces output", "B) It is made of paper", "C) It stores food", "D) It is not connected to anything"], "A) It receives information and produces output"),
  seed("A computer shows a graph after you enter numbers. What is the graph?", ["A) Output", "B) Input", "C) A keyboard", "D) A password"], "A) Output"),
);

addResourceQuestions("digital-technology-or-not", "8-9", "Easy",
  seed("Which device can record sound as digital information?", ["A) Smartphone", "B) Ruler", "C) Paper book", "D) Football"], "A) Smartphone"),
  seed("Which item is a digital output device?", ["A) Projector", "B) Pencil", "C) Desk", "D) Backpack"], "A) Projector"),
  seed("Which action sends information digitally?", ["A) Emailing a teacher", "B) Closing a paper notebook", "C) Sharpening a pencil", "D) Folding a worksheet"], "A) Emailing a teacher"),
  seed("Which device can store a digital file?", ["A) SSD", "B) Paper cup", "C) Rubber ball", "D) Wooden ruler"], "A) SSD"),
);
addResourceQuestions("digital-technology-or-not", "8-9", "Medium",
  seed("A webcam captures an image for a computer. What role does it have?", ["A) Input", "B) Output", "C) Paper storage", "D) Non-digital tool"], "A) Input"),
  seed("Which action is processing in a digital system?", ["A) A program calculates a total", "B) A user presses a key", "C) A printer shows a page", "D) A student carries a book"], "A) A program calculates a total"),
  seed("Which item is most clearly non-digital?", ["A) Wooden ruler", "B) Smartwatch", "C) Laptop", "D) Barcode scanner"], "A) Wooden ruler"),
  seed("Why can a touchscreen be both input and output?", ["A) It displays information and receives touches", "B) It only stores paper", "C) It cannot show information", "D) It has no role in a system"], "A) It displays information and receives touches"),
);
addResourceQuestions("digital-technology-or-not", "8-9", "Hard",
  seed("Which sequence best represents an online quiz system?", ["A) Answer typed, score calculated, result shown", "B) Book opened, chair moved, bell rings", "C) Paper folded, bag packed, desk cleaned", "D) Food eaten, water poured, door closed"], "A) Answer typed, score calculated, result shown"),
  seed("Why is a barcode scanner digital technology?", ["A) It captures information for a computer system", "B) It is always wireless", "C) It is made of plastic", "D) It cannot communicate data"], "A) It captures information for a computer system"),
  seed("Which device is a clear example of an output device?", ["A) Speaker", "B) Keyboard", "C) Microphone", "D) Scanner"], "A) Speaker"),
  seed("What makes a paper map different from a navigation app?", ["A) The app can process and update digital information", "B) The paper map uses no symbols", "C) The app cannot show a route", "D) The paper map sends data automatically"], "A) The app can process and update digital information"),
);

addResourceQuestions("digital-technology-or-not", "10-12", "Easy",
  seed("Which device converts sound into digital input?", ["A) Microphone", "B) Speaker", "C) Projector", "D) Printer"], "A) Microphone"),
  seed("Which is a digital storage service?", ["A) Cloud drive", "B) Paper tray", "C) Pencil case", "D) Noticeboard"], "A) Cloud drive"),
  seed("Which system component gives a user a printed result?", ["A) Printer", "B) Keyboard", "C) Scanner", "D) Mouse"], "A) Printer"),
  seed("Which object is non-digital because it does not process or communicate encoded information?", ["A) Wooden ruler", "B) Smartphone", "C) Smartwatch", "D) Laptop"], "A) Wooden ruler"),
);
addResourceQuestions("digital-technology-or-not", "10-12", "Medium",
  seed("Which stage of an information system changes sensor readings into a useful result?", ["A) Processing", "B) Storage shelf", "C) Decoration", "D) Paper filing"], "A) Processing"),
  seed("Why is a cloud document a digital technology service?", ["A) It stores and shares encoded information", "B) It is always printed", "C) It cannot be updated", "D) It uses no data"], "A) It stores and shares encoded information"),
  seed("Which device is an input device in a video conference?", ["A) Webcam", "B) Projector", "C) Speaker", "D) Printer"], "A) Webcam"),
  seed("What is an accurate classification of a smart thermostat?", ["A) A digital system that senses and processes data", "B) A non-digital ruler", "C) A printed document", "D) A manual storage box"], "A) A digital system that senses and processes data"),
);
addResourceQuestions("digital-technology-or-not", "10-12", "Hard",
  seed("Why does a spreadsheet formula count as processing?", ["A) It transforms input values into a result", "B) It only stores paper", "C) It displays no information", "D) It deletes all data"], "A) It transforms input values into a result"),
  seed("Which route shows digital data travelling through a system?", ["A) Sensor input, program processing, screen output", "B) Book, bag, desk", "C) Pencil, ruler, paper", "D) Door, floor, wall"], "A) Sensor input, program processing, screen output"),
  seed("Why is a smartwatch digital technology even though it is worn like a watch?", ["A) It processes and communicates information", "B) It has a strap", "C) It is small", "D) It shows only the time on paper"], "A) It processes and communicates information"),
  seed("What is the best reason to classify a device by what it does?", ["A) Its information-handling function defines its role", "B) Its colour always defines it", "C) Its size always defines it", "D) Its brand name defines it"], "A) Its information-handling function defines its role"),
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
