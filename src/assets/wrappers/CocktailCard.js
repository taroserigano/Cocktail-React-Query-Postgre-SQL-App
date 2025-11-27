import styled from 'styled-components';
const Wrapper = styled.article`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: var(--borderRadiusXL);
  overflow: hidden;
  border: 2px solid rgba(168, 85, 247, 0.2);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--borderRadiusXL);
    padding: 2px;
    background: linear-gradient(
      135deg,
      var(--neon-purple),
      var(--primary-500),
      var(--accent-500),
      var(--neon-blue)
    );
    background-size: 300% auto;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.6s ease;
    animation: shimmer 4s linear infinite;
  }
  
  :hover {
    box-shadow: 0 0 60px rgba(168, 85, 247, 0.8),
                0 0 100px rgba(168, 85, 247, 0.4),
                0 16px 64px rgba(0, 0, 0, 0.6);
    transform: translateY(-12px) scale(1.03);
    border-color: transparent;
  }
  
  :hover::before {
    opacity: 1;
  }
  
  .img-container {
    position: relative;
    overflow: hidden;
    height: 18rem;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%);
    cursor: pointer;
    display: block;
  }
  
  .favorite-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(168, 85, 247, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 0;
  }
  
  .favorite-btn svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--grey-400);
    transition: all 0.4s ease;
  }
  
  .favorite-btn:hover {
    transform: scale(1.1);
    border-color: rgba(168, 85, 247, 0.6);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
  }
  
  .favorite-btn:hover svg {
    color: var(--primary-400);
  }
  
  .favorite-btn.active {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%);
    border-color: rgba(168, 85, 247, 0.8);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
  }
  
  .favorite-btn.active svg {
    color: var(--neon-pink);
    animation: heartBeat 0.6s ease;
  }
  
  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.3); }
    50% { transform: scale(0.9); }
    75% { transform: scale(1.2); }
  }
  
  .img-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 10s linear infinite;
    z-index: 1;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .img-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(10, 10, 10, 0.3) 100%
    );
    opacity: 0.5;
    transition: opacity 0.6s ease;
    z-index: 2;
  }
  
  :hover .img-container::after {
    opacity: 0.6;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    filter: brightness(0.9) contrast(1.1);
  }
  
  :hover img {
    transform: scale(1.15) rotate(3deg);
    filter: brightness(1.1) contrast(1.2) saturate(1.2);
  }
  
  .footer {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: transparent;
    position: relative;
    z-index: 3;
    
    h4 {
      font-weight: 900;
      font-family: 'Orbitron', sans-serif;
      background: linear-gradient(
        135deg,
        var(--white) 0%,
        var(--grey-300) 50%,
        var(--white) 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.35rem;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      animation: shimmer 3s linear infinite;
    }
    
    h5 {
      font-weight: 700;
      font-family: 'Orbitron', sans-serif;
      background: linear-gradient(135deg, var(--neon-purple) 0%, var(--neon-blue) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
    }
    
    p {
      color: var(--grey-400);
      font-size: 0.9rem;
      margin-bottom: 1rem;
      line-height: 1.6;
      font-weight: 500;
    }
    
    .btn {
      margin-top: auto;
      background: linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%);
      background-size: 200% auto;
      padding: 0.875rem 1.75rem;
      border-radius: var(--borderRadius);
      border: 2px solid rgba(168, 85, 247, 0.3);
      font-weight: 700;
      font-family: 'Orbitron', sans-serif;
      font-size: 0.8rem;
      text-align: center;
      letter-spacing: 0.15em;
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.6s ease;
    }
    
    .btn::after {
      content: '→';
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      background-position: right center;
      box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
      border-color: rgba(168, 85, 247, 0.6);
      padding-right: 3rem;
    }
    
    .btn:hover::before {
      left: 100%;
    }
    
    .btn:hover::after {
      opacity: 1;
      right: 1rem;
    }
  }
`;

export default Wrapper;
