import styled from 'styled-components';

const Wrapper = styled.div`
  .hero-section {
    text-align: center;
    margin-bottom: 5rem;
    animation: fadeIn 0.8s ease-out;
  }
  
  .title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 1.5rem;
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  
  .glow-line {
    width: 150px;
    height: 4px;
    margin: 0 auto;
    background: linear-gradient(90deg, transparent, var(--primary-500), var(--accent-500), transparent);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
    animation: shimmer 3s linear infinite;
  }
  
  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
    margin-bottom: 5rem;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    padding: 3rem 2rem;
    border-radius: var(--borderRadiusXL);
    border: 2px solid rgba(168, 85, 247, 0.2);
    text-align: center;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }
  
  .feature-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%);
    animation: rotate 10s linear infinite;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  .feature-card:hover::before {
    opacity: 1;
  }
  
  .feature-card:hover {
    transform: translateY(-12px);
    border-color: rgba(168, 85, 247, 0.6);
    box-shadow: 0 0 60px rgba(168, 85, 247, 0.6),
                0 0 100px rgba(168, 85, 247, 0.3);
  }
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.6));
    animation: pulse 3s ease-in-out infinite;
  }
  
  .feature-card h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--white);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .feature-card p {
    color: var(--grey-300);
    line-height: 1.8;
    font-size: 1rem;
  }
  
  .mission-section {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    padding: 4rem 3rem;
    border-radius: var(--borderRadiusXL);
    border: 2px solid rgba(168, 85, 247, 0.3);
    margin-bottom: 5rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .mission-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--neon-purple), var(--primary-500), var(--accent-500), var(--neon-blue));
    background-size: 300% auto;
    animation: shimmer 4s linear infinite;
  }
  
  .mission-section h2 {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .mission-text {
    color: var(--grey-200);
    font-size: 1.25rem;
    line-height: 2;
    max-width: 900px;
    margin: 0 auto;
    font-weight: 400;
  }
  
  .stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    margin-top: 5rem;
  }
  
  .stat {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(10px);
    border-radius: var(--borderRadiusLarge);
    border: 2px solid rgba(168, 85, 247, 0.15);
    transition: all 0.4s ease;
  }
  
  .stat:hover {
    transform: translateY(-8px);
    border-color: rgba(168, 85, 247, 0.4);
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
  }
  
  .stat h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 3rem;
    background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    font-weight: 900;
  }
  
  .stat p {
    color: var(--grey-400);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.05);
      opacity: 0.9;
    }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
    
    .mission-section {
      padding: 2.5rem 1.5rem;
    }
    
    .mission-text {
      font-size: 1.1rem;
    }
  }
`;

export default Wrapper;
