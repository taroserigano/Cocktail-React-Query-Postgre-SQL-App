import styled from 'styled-components';

const Wrapper = styled.nav`
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(30px) saturate(180%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), 
              0 0 1px rgba(168, 85, 247, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 2px solid rgba(168, 85, 247, 0.2);
  
  .nav-center {
    width: var(--view-width);
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1.25rem 2rem;
  }
  .logo {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(
      135deg,
      #bf00ff 0%,
      var(--primary-500) 25%,
      var(--accent-500) 50%,
      #00f5ff 75%,
      var(--primary-500) 100%
    );
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 900;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    animation: shimmer 4s linear infinite;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.6));
  }
  
  .cocktail-icon {
    animation: pulse 2s ease-in-out infinite, float 3s ease-in-out infinite;
    filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8));
  }
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px);
    }
    50% { 
      transform: translateY(-5px);
    }
  }
  
  @keyframes pulse {
    0%, 100% { 
      opacity: 1;
      transform: scale(1);
    }
    50% { 
      opacity: 0.7;
      transform: scale(1.1);
    }
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 1rem;
  }
  .nav-link {
    color: var(--grey-300);
    padding: 0.75rem 1.5rem;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    letter-spacing: 0.1em;
    font-weight: 600;
    border-radius: var(--borderRadius);
    font-size: 0.85rem;
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .random-btn {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%) !important;
    background-size: 200% auto;
    border-color: rgba(168, 85, 247, 0.5);
  }
  
  .random-btn svg {
    animation: shuffle 2s ease-in-out infinite;
  }
  
  .random-btn:hover svg {
    animation: shuffle 0.5s ease-in-out infinite;
  }
  
  @keyframes shuffle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
  
  .nav-link::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(14, 165, 233, 0.1));
    transition: width 0.4s ease;
    z-index: -1;
  }
  
  .nav-link:hover {
    color: var(--white);
    border-color: rgba(168, 85, 247, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  }
  
  .nav-link:hover::before {
    width: 100%;
  }
  
  .active {
    color: var(--white);
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(14, 165, 233, 0.3) 100%);
    border: 2px solid rgba(168, 85, 247, 0.5);
    font-weight: 700;
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 
                0 0 60px rgba(168, 85, 247, 0.3);
    backdrop-filter: blur(10px);
  }
  
  .active::before {
    display: none;
  }
  @media (min-width: 768px) {
    .nav-center {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .nav-links {
      flex-direction: row;
      margin-top: 0;
      gap: 0.5rem;
    }
  }
`;

export default Wrapper;
