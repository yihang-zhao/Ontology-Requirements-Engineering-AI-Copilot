// Predefined terms and replacements
const terms = {
  vague: ['Finding/describing', 'different sources', 'manual process', 'find', 'time-consuming', 'perform', 'little supervision', 'released'],
  jargon: ['computer science', 'data', 'music data', 'multi-modal data', 'knowledge discovery', 'analytical', 'Web', 'automatic', 'musical work', 'covered'],
  granular: ['researcher', '"Penny Lane"', '"The Beatles"', 'first recording', 'February 1967', '"Kai Warner"', '1976'],
  'non-obvious': ['multiple formats', 'unmanageable', 'Possibility']
};

const replacements = {
  'Finding/describing': ['Discovering', 'Identifying', 'Locating'],
  'different sources': ['various origins', 'diverse sources', 'multiple platforms'],
  'manual process': ['hand-operated procedure', 'non-automated process', 'human-driven approach'],
  'find': ['locate', 'identify', 'discover'],
  'time-consuming': ['lengthy', 'prolonged', 'slow'],
  'perform': ['execute', 'carry out', 'conduct'],
  'little supervision': ['minimal oversight', 'limited monitoring', 'reduced supervision'],
  'released': ['published', 'issued', 'launched'],
  'computer science': ['CS', 'computing', 'informatics'],
  'data': ['information', 'records', 'datasets'],
  'music data': ['musical information', 'audio records', 'song metadata'],
  'multi-modal data': ['diverse data types', 'varied data formats', 'heterogeneous data'],
  'knowledge discovery': ['insight extraction', 'information retrieval', 'data mining'],
  'analytical': ['investigative', 'exploratory', 'examinational'],
  'Web': ['internet', 'online', 'World Wide Web'],
  'automatic': ['automated', 'computerized', 'mechanical'],
  'musical work': ['composition', 'piece', 'song'],
  'covered': ['reproduced', 'remade', 'adapted'],
  'researcher': ['investigator', 'scientist', 'analyst'],
  '"Penny Lane"': ['the song', 'the track', 'the composition'],
  '"The Beatles"': ['the band', 'the group', 'the ensemble'],
  'first recording': ['initial release', 'debut version', 'original recording'],
  'February 1967': ['02/1967', 'Feb \'67', 'early 1967'],
  '"Kai Warner"': ['the artist', 'the musician', 'the performer'],
  '1976': ['the year 1976', 'the mid-1970s', 'the late 20th century'],
  'multiple formats': ['various forms', 'different structures', 'diverse representations'],
  'unmanageable': ['overwhelming', 'uncontrollable', 'difficult to handle'],
  'Possibility': ['potential', 'capability', 'opportunity']
};
  
// Function to highlight terms
function highlightTerms(className) {
  const termElements = document.querySelectorAll('.term');
  termElements.forEach(term => term.classList.remove('term', ...Object.keys(terms)));

  terms[className].forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    document.querySelectorAll('.section p').forEach(p => {
      p.innerHTML = p.innerHTML.replace(regex, `<span class="term ${className}">${term}</span>`);
    });
  });
}
  
// Function to show options for a term
function showOptions(term) {
  const options = document.querySelector('.options');
  options.innerHTML = '';
  const text = term.textContent.toLowerCase();
  if (replacements[text]) {
    replacements[text].forEach(replacement => {
      const span = document.createElement('span');
      span.textContent = replacement;
      span.addEventListener('click', () => {
        term.textContent = replacement;
        options.style.display = 'none';
      });
      options.appendChild(span);
    });
    const rect = term.getBoundingClientRect();
    options.style.top = `${rect.bottom + window.scrollY}px`;
    options.style.left = `${rect.left + window.scrollX}px`;
    options.style.display = 'block';
  }
};
  
// Add click event listeners to term buttons
document.querySelectorAll('.term-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const className = btn.classList[1];
    highlightTerms(className);
  });
});

// Add hover event listeners to highlighted terms
document.addEventListener('mouseover', e => {
  if (e.target.classList.contains('term')) {
    showOptions(e.target);
  }
});

// Hide options when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.options')) {
    document.querySelector('.options').style.display = 'none';
  }
});

// User info form submission
document.getElementById('userInfoForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Simulate saving user information
  setTimeout(function () {
    document.getElementById('saveMessage').style.display = 'block';
    setTimeout(function () {
      document.getElementById('saveMessage').style.display = 'none';
    }, 2000);
  }, 1000);
});

// User story block selection
const userStoryBlocks = document.querySelectorAll('.user-story-block');
let selectedBlock = null;

userStoryBlocks.forEach(function (block) {
  block.addEventListener('click', function () {
    if (selectedBlock) {
      selectedBlock.classList.remove('selected');
    }
    block.classList.add('selected');
    selectedBlock = block;
  });
});

// Brainstorming button click
document.getElementById('brainstormingBtn').addEventListener('click', function () {
  const preselectedSentences = document.getElementById('preselectedSentences');
  preselectedSentences.innerHTML = '';

  // Generate random preselected sentences
  const sentences = generateRandomSentences(5);
  sentences.forEach(function (sentence) {
    const sentenceElement = document.createElement('div');
    sentenceElement.classList.add('preselected-sentence');
    sentenceElement.textContent = sentence;
    sentenceElement.addEventListener('click', function () {
      selectSentence(this);
    });
    preselectedSentences.appendChild(sentenceElement);
  });

  document.getElementById('ideationBlock').style.display = 'block';
  document.getElementById('refreshBtn').style.display = 'inline-block';
});

// Refresh button click
document.getElementById('refreshBtn').addEventListener('click', function () {
  const preselectedSentences = document.getElementById('preselectedSentences');
  preselectedSentences.innerHTML = '';

  // Generate new random preselected sentences
  const sentences = generateRandomSentences(5);
  sentences.forEach(function (sentence) {
    const sentenceElement = document.createElement('div');
    sentenceElement.classList.add('preselected-sentence');
    sentenceElement.textContent = sentence;
    sentenceElement.addEventListener('click', function () {
      selectSentence(this);
    });
    preselectedSentences.appendChild(sentenceElement);
  });
});

// Select a preselected sentence
function selectSentence(sentenceElement) {
  const selectedSentence = document.querySelector('.preselected-sentence.selected');
  if (selectedSentence) {
    selectedSentence.classList.remove('selected');
  }
  sentenceElement.classList.add('selected');
  document.getElementById('confirmBtn').disabled = false;
};

// Confirm button click
document.getElementById('confirmBtn').addEventListener('click', function () {
  const selectedSentence = document.querySelector('.preselected-sentence.selected').textContent;
  if (selectedBlock) {
    selectedBlock.querySelector('p').textContent = selectedSentence;
    document.getElementById('ideationBlock').style.display = 'none';
    document.getElementById('refreshBtn').style.display = 'none';
    document.getElementById('confirmBtn').disabled = true;
    selectedBlock.classList.remove('selected');
    selectedBlock = null;
  }
});

// Generate random preselected sentences
function generateRandomSentences(count) {
  const sentences = [
    'The ontology should define key concepts such as music, artist, album, and genre.',
    'Relationships like "performed by" and "belongs to" can connect the concepts.',
    'Properties such as title, release date, and duration can be associated with the concepts.',
    'The ontology can provide a common vocabulary for integrating music data from different sources.',
    'Mapping rules can be defined to align the ontology with existing schemas and formats.',
    'Querying and reasoning over the integrated data can be performed using the ontology.',
    'The ontology enables a formal and explicit representation of music-related knowledge.',
    'It supports reasoning and inference to derive new knowledge from the existing data.',
    'The ontology promotes data interoperability and facilitates knowledge sharing and reuse.'
  ];

  const randomSentences = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    randomSentences.push(sentences[randomIndex]);
  }

  return randomSentences;
};

// ... previous JavaScript code ...

// Function to generate user stories
function generateUserStories() {
  const userStories = [
    {
      persona: 'John, a software engineer',
      goal: 'Develop a music recommendation system',
      keywords: 'music recommendation, collaborative filtering, content-based filtering',
      scenarioBefore: 'Users struggle to discover new music based on their preferences',
      scenarioAfter: 'The recommendation system suggests personalized music to users',
      stories: '"Bohemian Rhapsody" is a song by the British rock band "Queen"'
    },
    // ... add more user stories ...
  ];

  const userStoryContainer = document.getElementById('userStoryContainer');
  userStoryContainer.innerHTML = '';

  for (let i = 0; i < 4; i++) {
    const story = userStories[i];
    const userStoryElement = document.createElement('div');
    userStoryElement.classList.add('user-story', 'row');
    userStoryElement.innerHTML = `
      <div class="col-md-6">
        <div class="persona">${story.persona}</div>
        <div class="goal">${story.goal}</div>
        <div class="keywords">${story.keywords}</div>
        <div class="scenario-before">${story.scenarioBefore}</div>
        <div class="scenario-after">${story.scenarioAfter}</div>
        <div class="stories">${story.stories}</div>
        <div class="bubble-container">
          <div class="bubble scenario" data-color="red" data-content="${story.scenarioBefore}<br>${story.scenarioAfter}"></div>
          <div class="bubble skills" data-color="blue" data-content="Skills related to ${story.persona}"></div>
          <div class="bubble career" data-color="green" data-content="Career related to ${story.persona}"></div>
          <div class="bubble scenario" data-color="orange" data-content="${story.scenarioBefore}<br>${story.scenarioAfter}"></div>
          <div class="bubble skills" data-color="purple" data-content="Skills related to ${story.persona}"></div>
          <div class="bubble career" data-color="teal" data-content="Career related to ${story.persona}"></div>
        </div>
      </div>
    `;
    userStoryContainer.appendChild(userStoryElement);
  }

  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach(bubble => {
    const color = bubble.dataset.color;
    bubble.style.borderColor = color;

    bubble.addEventListener('click', () => {
      bubble.style.backgroundColor = color;
    });

    bubble.addEventListener('mouseenter', () => {
      const content = bubble.dataset.content;
      const bubbleContent = document.createElement('div');
      bubbleContent.classList.add('bubble-content');
      bubbleContent.innerHTML = content;
      bubble.appendChild(bubbleContent);
      bubbleContent.style.display = 'block';
    });

    bubble.addEventListener('mouseleave', () => {
      const bubbleContent = bubble.querySelector('.bubble-content');
      bubbleContent.style.display = 'none';
    });
  });
}

// Function to generate bubble selection
function generateBubbleSelection() {
  const bubbleSelectionContainer = document.getElementById('bubbleSelectionContainer');
  bubbleSelectionContainer.innerHTML = '';

  const colors = ['red', 'blue', 'green', 'orange', 'purple', 'teal'];
  const contents = [
    'Scenario example 1',
    'Scenario example 2',
    'Skills example 1',
    'Skills example 2',
    'Career example 1',
    'Career example 2'
  ];

  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.classList.add('bubble-selection');

    for (let j = 0; j < 6; j++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.style.borderColor = colors[j];
      bubble.dataset.color = colors[j];
      bubble.dataset.content = contents[j];

      bubble.addEventListener('click', () => {
        bubble.style.backgroundColor = colors[j];
      });

      row.appendChild(bubble);
    }

    bubbleSelectionContainer.appendChild(row);
  }
}

// Function to refresh user stories
function refreshUserStories() {
  const userStoryElements = document.querySelectorAll('.user-story');
  userStoryElements.forEach(userStoryElement => {
    const refreshBtn = document.createElement('button');
    refreshBtn.classList.add('btn', 'btn-secondary', 'refresh-btn');
    refreshBtn.textContent = 'Refresh';
    refreshBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * userStories.length);
      const story = userStories[randomIndex];
      userStoryElement.innerHTML = `
        <div class="col-md-6">
          <div class="persona">${story.persona}</div>
          <div class="goal">${story.goal}</div>
          <div class="keywords">${story.keywords}</div>
          <div class="scenario-before">${story.scenarioBefore}</div>
          <div class="scenario-after">${story.scenarioAfter}</div>
          <div class="stories">${story.stories}</div>
        </div>
      `;
      userStoryElement.appendChild(refreshBtn);
    });
    userStoryElement.appendChild(refreshBtn);
  });
}

// Event listener for "Give Suggestions" button
document.getElementById('suggestionsBtn').addEventListener('click', () => {
  document.getElementById('userStoryContainer').style.display = 'none';
  document.getElementById('suggestionsBtn').style.display = 'none';
  document.getElementById('bubbleSelectionContainer').style.display = 'block';
  document.getElementById('resultsBtn').style.display = 'inline-block';
  generateBubbleSelection();
});

// Event listener for "Suggest Results" button
document.getElementById('resultsBtn').addEventListener('click', () => {
  document.getElementById('bubbleSelectionContainer').style.display = 'none';
  document.getElementById('resultsBtn').style.display = 'none';
  document.getElementById('userStoryContainer').style.display = 'block';
  document.getElementById('suggestionsBtn').style.display = 'inline-block';
  refreshUserStories();
});

// Generate initial user stories
generateUserStories();