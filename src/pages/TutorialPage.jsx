import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Leaf,
  Recycle,
  Droplets,
  Sun,
  TreePine,
  Trash2,
  Award,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle,
  Play,
  Sparkles,
  Globe,
  Heart,
  Lightbulb,
  Target
} from 'lucide-react'

// Learning modules for kids
const learningModules = [
  {
    id: 1,
    title: 'What is Recycling? ♻️',
    icon: Recycle,
    color: '#22c55e',
    emoji: '♻️',
    description: 'Learn how to give old things a new life!',
    duration: '5 min',
    points: 50,
    slides: [
      {
        title: 'What is Recycling?',
        content: 'Recycling means turning old things into new things! Instead of throwing things away, we can give them a second life.',
        image: '♻️',
        fact: 'Fun Fact: Recycling one aluminum can saves enough energy to run a TV for 3 hours!'
      },
      {
        title: 'The 3 Rs',
        content: 'Remember the 3 Rs: Reduce (use less), Reuse (use again), Recycle (make new from old)!',
        image: '🔄',
        fact: 'Tip: Always try to Reduce first, then Reuse, and finally Recycle!'
      },
      {
        title: 'What Can We Recycle?',
        content: 'Paper, plastic bottles, glass jars, and metal cans can all be recycled. Look for the recycling symbol!',
        image: '📦',
        fact: 'Did you know? Paper can be recycled 5-7 times before the fibers become too short!'
      },
      {
        title: 'How to Recycle at Home',
        content: 'Rinse containers, remove caps, and sort items into the right bins. Ask your parents for help!',
        image: '🏠',
        fact: 'Super Tip: Clean recyclables help workers stay safe and healthy!'
      }
    ],
    quiz: [
      { question: 'What does the ♻️ symbol mean?', options: ['Trash', 'Recycle', 'Water'], correct: 1 },
      { question: 'What are the 3 Rs?', options: ['Run, Rest, Repeat', 'Reduce, Reuse, Recycle', 'Read, Write, Run'], correct: 1 },
      { question: 'Can glass bottles be recycled?', options: ['Yes!', 'No', 'Maybe'], correct: 0 }
    ]
  },
  {
    id: 2,
    title: 'Save Water 💧',
    icon: Droplets,
    color: '#3b82f6',
    emoji: '💧',
    description: 'Discover why water is precious and how to save it!',
    duration: '5 min',
    points: 50,
    slides: [
      {
        title: 'Why is Water Important?',
        content: 'Water keeps us alive! We need it to drink, cook, clean, and grow food. Plants and animals need water too!',
        image: '💧',
        fact: 'Amazing Fact: Your body is about 60% water!'
      },
      {
        title: 'Water is Precious',
        content: 'Only 1% of Earths water is fresh water we can use. The rest is salt water in the oceans!',
        image: '🌊',
        fact: 'Did you know? A dripping tap can waste over 5,000 liters of water per year!'
      },
      {
        title: 'Ways to Save Water',
        content: 'Turn off the tap while brushing teeth, take shorter showers, and fix leaky taps!',
        image: '🚿',
        fact: 'Hero Tip: A 5-minute shower uses less water than a full bath!'
      },
      {
        title: 'Be a Water Hero!',
        content: 'Tell your friends about saving water. Small actions make a big difference when everyone helps!',
        image: '🦸',
        fact: 'You can save 8 liters of water by turning off the tap while brushing!'
      }
    ],
    quiz: [
      { question: 'How much of Earths water can we drink?', options: ['100%', '50%', 'Only 1%'], correct: 2 },
      { question: 'What wastes water?', options: ['Leaky taps', 'Short showers', 'Collecting rainwater'], correct: 0 },
      { question: 'When should you turn off the tap?', options: ['Never', 'While brushing teeth', 'All day'], correct: 1 }
    ]
  },
  {
    id: 3,
    title: 'Plant a Tree 🌳',
    icon: TreePine,
    color: '#16a34a',
    emoji: '🌳',
    description: 'Learn about trees and why they are Earths superheroes!',
    duration: '5 min',
    points: 50,
    slides: [
      {
        title: 'Trees are Amazing!',
        content: 'Trees give us oxygen to breathe, shade to rest, and homes for birds and animals!',
        image: '🌳',
        fact: 'Wow! One large tree can provide a days oxygen for 4 people!'
      },
      {
        title: 'Trees Clean Our Air',
        content: 'Trees breathe in dirty air (CO2) and breathe out clean air (oxygen). They are natural air purifiers!',
        image: '🌬️',
        fact: 'Cool Fact: Trees can absorb pollution and make our cities cleaner!'
      },
      {
        title: 'How to Plant a Tree',
        content: 'Dig a hole, place the plant gently, cover with soil, and water it. Watch it grow bigger every year!',
        image: '🌱',
        fact: 'Pro Tip: Plant trees during monsoon season for best growth!'
      },
      {
        title: 'Take Care of Trees',
        content: 'Water young trees regularly, dont break branches, and never carve on tree bark. Be a tree friend!',
        image: '💚',
        fact: 'Trees can live for hundreds of years if we take care of them!'
      }
    ],
    quiz: [
      { question: 'What do trees give us?', options: ['Oxygen', 'Candy', 'Toys'], correct: 0 },
      { question: 'What do trees absorb?', options: ['Music', 'CO2 (dirty air)', 'Light'], correct: 1 },
      { question: 'When is the best time to plant trees in India?', options: ['Summer', 'Monsoon', 'Winter'], correct: 1 }
    ]
  },
  {
    id: 4,
    title: 'Energy Savers ⚡',
    icon: Sun,
    color: '#f59e0b',
    emoji: '⚡',
    description: 'Become an energy-saving superhero at home!',
    duration: '5 min',
    points: 50,
    slides: [
      {
        title: 'What is Energy?',
        content: 'Energy powers our lights, fans, TVs, and phones. Most energy comes from burning coal which pollutes the air.',
        image: '⚡',
        fact: 'Did you know? The Sun gives us free, clean energy every day!'
      },
      {
        title: 'Why Save Energy?',
        content: 'When we use less energy, we pollute less and save money. Its good for Earth and our family!',
        image: '🌍',
        fact: 'Saving energy at home helps polar bears keep their icy homes!'
      },
      {
        title: 'Easy Ways to Save Energy',
        content: 'Turn off lights when leaving a room, unplug chargers, and use natural light during the day!',
        image: '💡',
        fact: 'LED bulbs use 75% less energy than old bulbs!'
      },
      {
        title: 'Be an Energy Detective!',
        content: 'Walk around your home and find things using energy that dont need to be on. Turn them off!',
        image: '🔍',
        fact: 'Challenge: Count how many things you can turn off today!'
      }
    ],
    quiz: [
      { question: 'What should you do when leaving a room?', options: ['Leave lights on', 'Turn off lights', 'Add more lights'], correct: 1 },
      { question: 'Which gives us clean energy?', options: ['Coal', 'Sun', 'Plastic'], correct: 1 },
      { question: 'LED bulbs use ____ energy than old bulbs', options: ['More', 'Same', 'Less'], correct: 2 }
    ]
  },
  {
    id: 5,
    title: 'Say No to Plastic 🚫',
    icon: Trash2,
    color: '#ef4444',
    emoji: '🚫',
    description: 'Learn why plastic is harmful and find better alternatives!',
    duration: '5 min',
    points: 50,
    slides: [
      {
        title: 'The Plastic Problem',
        content: 'Plastic takes 500+ years to break down! It fills our oceans and hurts sea animals who mistake it for food.',
        image: '🌊',
        fact: 'Shocking: 8 million tons of plastic enter our oceans every year!'
      },
      {
        title: 'Animals Need Our Help',
        content: 'Sea turtles, fish, and birds can get trapped in plastic or eat it by mistake. We must help them!',
        image: '🐢',
        fact: 'Sad Fact: Over 1 million sea birds die from plastic each year.'
      },
      {
        title: 'Better Choices',
        content: 'Use cloth bags instead of plastic bags, steel bottles instead of plastic bottles, and say no to straws!',
        image: '👜',
        fact: 'Hero Tip: One reusable bag can replace 500 plastic bags!'
      },
      {
        title: 'Be a Plastic Fighter!',
        content: 'Carry your own bag and bottle. Pick up plastic trash you see. Inspire your friends to do the same!',
        image: '💪',
        fact: 'Together we can make India plastic-free!'
      }
    ],
    quiz: [
      { question: 'How long does plastic last?', options: ['1 year', '10 years', '500+ years'], correct: 2 },
      { question: 'What should you use instead of plastic bags?', options: ['More plastic', 'Cloth bags', 'Paper only'], correct: 1 },
      { question: 'How can you help animals?', options: ['Use more plastic', 'Reduce plastic use', 'Ignore the problem'], correct: 1 }
    ]
  },
  {
    id: 6,
    title: 'Composting Magic 🌱',
    icon: Leaf,
    color: '#84cc16',
    emoji: '🌱',
    description: 'Turn kitchen waste into garden gold!',
    duration: '5 min',
    points: 50,
    slides: [
      {
        title: 'What is Composting?',
        content: 'Composting turns food scraps and leaves into super soil for plants. Its like magic recycling from nature!',
        image: '🌱',
        fact: 'Nature is amazing: Worms and tiny bugs help break down the waste!'
      },
      {
        title: 'What Can We Compost?',
        content: 'Fruit peels, vegetable scraps, tea bags, eggshells, and dry leaves can all become compost!',
        image: '🍌',
        fact: 'Tip: No meat, dairy, or oily foods in the compost!'
      },
      {
        title: 'How to Start Composting',
        content: 'Get a bin, add food scraps and dry leaves in layers, keep it moist, and stir sometimes. Wait and watch!',
        image: '🗑️',
        fact: 'In 2-3 months, you will have rich, dark compost!'
      },
      {
        title: 'Using Your Compost',
        content: 'Mix compost into garden soil to help plants grow big and strong. Your plants will thank you!',
        image: '🌻',
        fact: 'Compost is called "black gold" by gardeners!'
      }
    ],
    quiz: [
      { question: 'What can you compost?', options: ['Plastic', 'Fruit peels', 'Batteries'], correct: 1 },
      { question: 'What helps break down compost?', options: ['Robots', 'Worms and bugs', 'Fire'], correct: 1 },
      { question: 'What color is good compost?', options: ['Blue', 'Dark brown/black', 'Pink'], correct: 1 }
    ]
  }
]

function TutorialPage() {
  const [selectedModule, setSelectedModule] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizComplete, setQuizComplete] = useState(false)
  const [completedModules, setCompletedModules] = useState(() => {
    const saved = localStorage.getItem('eco_completed_modules')
    return saved ? JSON.parse(saved) : []
  })
  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem('eco_learning_points')
    return saved ? parseInt(saved) : 0
  })

  const startModule = (module) => {
    setSelectedModule(module)
    setCurrentSlide(0)
    setShowQuiz(false)
    setQuizAnswers({})
    setQuizComplete(false)
  }

  const nextSlide = () => {
    if (currentSlide < selectedModule.slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const answerQuiz = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }))
  }

  const submitQuiz = () => {
    const module = selectedModule
    const score = module.quiz.reduce((acc, q, i) => {
      return acc + (quizAnswers[i] === q.correct ? 1 : 0)
    }, 0)
    
    if (score === module.quiz.length && !completedModules.includes(module.id)) {
      const newCompleted = [...completedModules, module.id]
      setCompletedModules(newCompleted)
      localStorage.setItem('eco_completed_modules', JSON.stringify(newCompleted))
      
      const newPoints = totalPoints + module.points
      setTotalPoints(newPoints)
      localStorage.setItem('eco_learning_points', newPoints.toString())
    }
    
    setQuizComplete(true)
  }

  const closeModule = () => {
    setSelectedModule(null)
    setCurrentSlide(0)
    setShowQuiz(false)
    setQuizAnswers({})
    setQuizComplete(false)
  }

  const getQuizScore = () => {
    return selectedModule.quiz.reduce((acc, q, i) => {
      return acc + (quizAnswers[i] === q.correct ? 1 : 0)
    }, 0)
  }

  return (
    <div className="tutorial-page">
      <div className="container">
        {/* Hero Section */}
        <div className="tutorial-hero">
          <div className="hero-content">
            <div className="hero-icon-wrap">
              <BookOpen size={40} />
            </div>
            <div>
              <h1>Eco Learning Zone 🌍</h1>
              <p>Fun lessons to become an Earth Hero! Learn, Play & Save the Planet!</p>
            </div>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <Star size={24} />
              <div>
                <span className="stat-value">{totalPoints}</span>
                <span className="stat-label">Points Earned</span>
              </div>
            </div>
            <div className="hero-stat">
              <Award size={24} />
              <div>
                <span className="stat-value">{completedModules.length}/{learningModules.length}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <h3>Your Learning Journey</h3>
          <div className="progress-bar-wrap">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(completedModules.length / learningModules.length) * 100}%` }}
            />
          </div>
          <p>{completedModules.length === learningModules.length ? '🎉 Amazing! You completed all lessons!' : `${learningModules.length - completedModules.length} lessons left to become an Earth Hero!`}</p>
        </div>

        {/* Module Grid */}
        <div className="modules-section">
          <h2>Choose a Lesson</h2>
          <div className="modules-grid">
            {learningModules.map(module => (
              <div 
                key={module.id}
                className={`module-card ${completedModules.includes(module.id) ? 'completed' : ''}`}
                onClick={() => startModule(module)}
                style={{ '--module-color': module.color }}
              >
                <div className="module-icon">
                  <span className="emoji">{module.emoji}</span>
                  {completedModules.includes(module.id) && (
                    <div className="completed-badge">
                      <CheckCircle size={20} />
                    </div>
                  )}
                </div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <div className="module-meta">
                  <span className="duration">⏱️ {module.duration}</span>
                  <span className="points">⭐ +{module.points} pts</span>
                </div>
                <button className="start-btn">
                  {completedModules.includes(module.id) ? 'Review' : 'Start Learning'}
                  <Play size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="fun-facts-section">
          <h2>💡 Did You Know?</h2>
          <div className="facts-grid">
            <div className="fact-card">
              <Globe size={32} />
              <p>Earth is the only planet with trees and fresh water!</p>
            </div>
            <div className="fact-card">
              <Recycle size={32} />
              <p>Recycling 1 ton of paper saves 17 trees!</p>
            </div>
            <div className="fact-card">
              <Heart size={32} />
              <p>Bees pollinate 80% of our food crops!</p>
            </div>
            <div className="fact-card">
              <Lightbulb size={32} />
              <p>Sunlight can power your whole house for free!</p>
            </div>
          </div>
        </div>

        {/* Eco Pledge Section */}
        <div className="pledge-section">
          <Target size={40} />
          <h2>Take the Eco Pledge! 🌟</h2>
          <p>I promise to protect our Earth by reducing, reusing, and recycling. I will save water, plant trees, and inspire others to do the same!</p>
          <div className="pledge-badges">
            <span>🌳 Tree Planter</span>
            <span>💧 Water Saver</span>
            <span>♻️ Recycling Champion</span>
            <span>⚡ Energy Hero</span>
          </div>
        </div>
      </div>

      {/* Module Modal */}
      {selectedModule && (
        <div className="module-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModule}>×</button>
            
            {!showQuiz ? (
              // Slides View
              <div className="slide-view">
                <div className="slide-header" style={{ background: selectedModule.color }}>
                  <span className="slide-emoji">{selectedModule.emoji}</span>
                  <h2>{selectedModule.title}</h2>
                  <div className="slide-progress">
                    {currentSlide + 1} / {selectedModule.slides.length}
                  </div>
                </div>
                
                <div className="slide-content">
                  <div className="slide-image">
                    <span>{selectedModule.slides[currentSlide].image}</span>
                  </div>
                  <h3>{selectedModule.slides[currentSlide].title}</h3>
                  <p className="slide-text">{selectedModule.slides[currentSlide].content}</p>
                  <div className="fact-bubble">
                    <Sparkles size={18} />
                    <span>{selectedModule.slides[currentSlide].fact}</span>
                  </div>
                </div>
                
                <div className="slide-nav">
                  <button 
                    className="nav-btn prev" 
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeft size={24} />
                    Back
                  </button>
                  <div className="dots">
                    {selectedModule.slides.map((_, i) => (
                      <span key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} />
                    ))}
                  </div>
                  <button className="nav-btn next" onClick={nextSlide}>
                    {currentSlide === selectedModule.slides.length - 1 ? 'Take Quiz!' : 'Next'}
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            ) : !quizComplete ? (
              // Quiz View
              <div className="quiz-view">
                <div className="quiz-header" style={{ background: selectedModule.color }}>
                  <span className="slide-emoji">🧠</span>
                  <h2>Quick Quiz!</h2>
                  <p>Let's see what you learned!</p>
                </div>
                
                <div className="quiz-content">
                  {selectedModule.quiz.map((q, qIndex) => (
                    <div key={qIndex} className="quiz-question">
                      <h4>{qIndex + 1}. {q.question}</h4>
                      <div className="quiz-options">
                        {q.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            className={`option-btn ${quizAnswers[qIndex] === oIndex ? 'selected' : ''}`}
                            onClick={() => answerQuiz(qIndex, oIndex)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    className="submit-quiz-btn"
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < selectedModule.quiz.length}
                  >
                    Check My Answers! ✨
                  </button>
                </div>
              </div>
            ) : (
              // Results View
              <div className="results-view">
                <div className="results-header" style={{ 
                  background: getQuizScore() === selectedModule.quiz.length ? '#22c55e' : '#f59e0b' 
                }}>
                  <span className="results-emoji">
                    {getQuizScore() === selectedModule.quiz.length ? '🎉' : '💪'}
                  </span>
                  <h2>
                    {getQuizScore() === selectedModule.quiz.length 
                      ? 'Perfect Score!' 
                      : 'Good Try!'}
                  </h2>
                </div>
                
                <div className="results-content">
                  <div className="score-circle">
                    <span className="score">{getQuizScore()}/{selectedModule.quiz.length}</span>
                    <span className="score-label">Correct</span>
                  </div>
                  
                  {getQuizScore() === selectedModule.quiz.length ? (
                    <div className="success-message">
                      <CheckCircle size={32} />
                      <p>Amazing! You earned <strong>+{selectedModule.points} points!</strong></p>
                      <p>You're now an expert on {selectedModule.title}!</p>
                    </div>
                  ) : (
                    <div className="retry-message">
                      <p>You got {getQuizScore()} out of {selectedModule.quiz.length} correct.</p>
                      <p>Review the lesson and try again to earn your points!</p>
                    </div>
                  )}
                  
                  <div className="results-actions">
                    <button className="btn-secondary" onClick={closeModule}>
                      Back to Lessons
                    </button>
                    {getQuizScore() < selectedModule.quiz.length && (
                      <button className="btn-primary" onClick={() => startModule(selectedModule)}>
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .tutorial-page {
          padding: var(--space-6) 0 var(--space-16);
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfeff 50%, #fef3c7 100%);
        }

        .tutorial-hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-8);
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: var(--radius-2xl);
          color: white;
          margin-bottom: var(--space-8);
          box-shadow: 0 10px 40px rgba(34, 197, 94, 0.3);
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .hero-icon-wrap {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tutorial-hero h1 {
          color: white;
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }

        .tutorial-hero p {
          opacity: 0.9;
          font-size: var(--text-lg);
        }

        .hero-stats {
          display: flex;
          gap: var(--space-4);
        }

        .hero-stat {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-xl);
          backdrop-filter: blur(10px);
        }

        .hero-stat .stat-value {
          display: block;
          font-size: var(--text-2xl);
          font-weight: 700;
        }

        .hero-stat .stat-label {
          font-size: var(--text-sm);
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .tutorial-hero {
            flex-direction: column;
            text-align: center;
            gap: var(--space-6);
          }
          
          .hero-content {
            flex-direction: column;
          }
        }

        /* Progress Section */
        .progress-section {
          background: white;
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-8);
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        .progress-section h3 {
          margin-bottom: var(--space-4);
        }

        .progress-bar-wrap {
          height: 20px;
          background: var(--color-gray-100);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: var(--space-3);
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #16a34a);
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }

        /* Modules Section */
        .modules-section h2 {
          text-align: center;
          margin-bottom: var(--space-6);
          font-size: var(--text-2xl);
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-6);
          margin-bottom: var(--space-12);
        }

        .module-card {
          background: white;
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: var(--shadow-md);
          position: relative;
          overflow: hidden;
        }

        .module-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--module-color);
        }

        .module-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border-color: var(--module-color);
        }

        .module-card.completed {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        }

        .module-icon {
          position: relative;
          display: inline-block;
          margin-bottom: var(--space-4);
        }

        .module-icon .emoji {
          font-size: 4rem;
          display: block;
        }

        .completed-badge {
          position: absolute;
          bottom: -5px;
          right: -5px;
          background: #22c55e;
          color: white;
          border-radius: var(--radius-full);
          padding: 4px;
          box-shadow: var(--shadow-md);
        }

        .module-card h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-2);
          color: var(--color-text);
        }

        .module-card p {
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
        }

        .module-meta {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .start-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          background: var(--module-color);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .start-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Fun Facts Section */
        .fun-facts-section {
          margin-bottom: var(--space-12);
        }

        .fun-facts-section h2 {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .facts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: var(--space-4);
        }

        .fact-card {
          background: white;
          padding: var(--space-5);
          border-radius: var(--radius-xl);
          text-align: center;
          box-shadow: var(--shadow-sm);
        }

        .fact-card svg {
          color: var(--color-primary);
          margin-bottom: var(--space-3);
        }

        .fact-card p {
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
        }

        /* Pledge Section */
        .pledge-section {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          padding: var(--space-8);
          border-radius: var(--radius-2xl);
          text-align: center;
          box-shadow: var(--shadow-lg);
        }

        .pledge-section svg {
          color: #f59e0b;
          margin-bottom: var(--space-4);
        }

        .pledge-section h2 {
          margin-bottom: var(--space-3);
        }

        .pledge-section > p {
          max-width: 600px;
          margin: 0 auto var(--space-6);
          color: var(--color-text-secondary);
          font-size: var(--text-lg);
        }

        .pledge-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-3);
        }

        .pledge-badges span {
          background: white;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: var(--text-sm);
          box-shadow: var(--shadow-sm);
        }

        /* Module Modal */
        .module-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--space-4);
          backdrop-filter: blur(5px);
        }

        .modal-content {
          background: white;
          border-radius: var(--radius-2xl);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .close-btn {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: var(--radius-full);
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
        }

        .close-btn:hover {
          background: white;
          transform: scale(1.1);
        }

        /* Slide View */
        .slide-header {
          padding: var(--space-8) var(--space-6);
          text-align: center;
          color: white;
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        .slide-emoji {
          font-size: 3rem;
          display: block;
          margin-bottom: var(--space-3);
        }

        .slide-header h2 {
          color: white;
          margin-bottom: var(--space-2);
        }

        .slide-progress {
          font-size: var(--text-sm);
          opacity: 0.8;
        }

        .slide-content {
          padding: var(--space-8);
          text-align: center;
        }

        .slide-image {
          font-size: 5rem;
          margin-bottom: var(--space-4);
        }

        .slide-content h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-4);
        }

        .slide-text {
          font-size: var(--text-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
          line-height: 1.6;
        }

        .fact-bubble {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          padding: var(--space-3) var(--space-5);
          border-radius: var(--radius-xl);
          font-size: var(--text-sm);
          color: #92400e;
        }

        .slide-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-6) var(--space-6);
          border-top: 1px solid var(--color-border);
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          border-radius: var(--radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-btn.prev {
          background: var(--color-gray-100);
          border: none;
          color: var(--color-text-secondary);
        }

        .nav-btn.prev:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nav-btn.next {
          background: var(--color-primary);
          border: none;
          color: white;
        }

        .nav-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .dots {
          display: flex;
          gap: var(--space-2);
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: var(--radius-full);
          background: var(--color-gray-200);
          transition: all 0.2s ease;
        }

        .dot.active {
          background: var(--color-primary);
          transform: scale(1.2);
        }

        /* Quiz View */
        .quiz-header {
          padding: var(--space-6);
          text-align: center;
          color: white;
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        .quiz-header h2 {
          color: white;
        }

        .quiz-content {
          padding: var(--space-6);
        }

        .quiz-question {
          margin-bottom: var(--space-6);
        }

        .quiz-question h4 {
          margin-bottom: var(--space-3);
          font-size: var(--text-lg);
        }

        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .option-btn {
          padding: var(--space-3) var(--space-4);
          background: var(--color-gray-50);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          text-align: left;
          font-size: var(--text-base);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .option-btn:hover {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }

        .option-btn.selected {
          border-color: var(--color-primary);
          background: var(--color-primary);
          color: white;
        }

        .submit-quiz-btn {
          width: 100%;
          padding: var(--space-4);
          background: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-lg);
          font-size: var(--text-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: var(--space-4);
        }

        .submit-quiz-btn:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 5px 20px rgba(34, 197, 94, 0.3);
        }

        .submit-quiz-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Results View */
        .results-header {
          padding: var(--space-8);
          text-align: center;
          color: white;
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        .results-emoji {
          font-size: 4rem;
          display: block;
          margin-bottom: var(--space-3);
        }

        .results-header h2 {
          color: white;
        }

        .results-content {
          padding: var(--space-8);
          text-align: center;
        }

        .score-circle {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, var(--color-primary), #16a34a);
          border-radius: var(--radius-full);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-6);
          color: white;
        }

        .score-circle .score {
          font-size: var(--text-3xl);
          font-weight: 700;
        }

        .score-circle .score-label {
          font-size: var(--text-sm);
          opacity: 0.8;
        }

        .success-message, .retry-message {
          margin-bottom: var(--space-6);
        }

        .success-message svg {
          color: var(--color-success);
          margin-bottom: var(--space-3);
        }

        .results-actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
        }

        .btn-secondary, .btn-primary {
          padding: var(--space-3) var(--space-6);
          border-radius: var(--radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary {
          background: var(--color-gray-100);
          border: none;
          color: var(--color-text);
        }

        .btn-primary {
          background: var(--color-primary);
          border: none;
          color: white;
        }

        .btn-secondary:hover, .btn-primary:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}

export default TutorialPage
