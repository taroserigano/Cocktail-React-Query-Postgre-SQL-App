import Wrapper from '../assets/wrappers/AboutPage';

const About = () => {
  return (
    <Wrapper>
      <div className="hero-section">
        <h1 className="title">About MixMaster</h1>
        <div className="glow-line"></div>
      </div>
      
      <div className="content-grid">
        <div className="feature-card">
          <div className="icon">🍸</div>
          <h3>Discover</h3>
          <p>
            Explore thousands of premium cocktail recipes from the world's most comprehensive cocktail database. From timeless classics to cutting-edge creations.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="icon">✨</div>
          <h3>Create</h3>
          <p>
            Design and save your own signature cocktails. Build your personal collection and become the master mixologist you were meant to be.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="icon">🚀</div>
          <h3>Elevate</h3>
          <p>
            Transform every gathering into an unforgettable experience. Whether it's a casual evening or a celebration, craft the perfect drink for any occasion.
          </p>
        </div>
      </div>
      
      <div className="mission-section">
        <h2>Our Mission</h2>
        <p className="mission-text">
          MixMaster brings the art of mixology to your fingertips. Powered by cutting-edge technology and the world's most extensive cocktail database, we're revolutionizing how you discover, create, and share exceptional drinks. Join thousands of cocktail enthusiasts elevating their craft, one perfect pour at a time.
        </p>
      </div>
      
      <div className="stats-section">
        <div className="stat">
          <h3>10K+</h3>
          <p>Cocktail Recipes</p>
        </div>
        <div className="stat">
          <h3>500+</h3>
          <p>Ingredients</p>
        </div>
        <div className="stat">
          <h3>∞</h3>
          <p>Possibilities</p>
        </div>
      </div>
    </Wrapper>
  );
};
export default About;
