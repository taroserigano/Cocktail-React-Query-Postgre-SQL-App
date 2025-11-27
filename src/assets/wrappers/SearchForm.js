import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 5rem;
  position: relative;
  
  .form {
    display: grid;
    grid-template-columns: 1fr auto;
    max-width: 700px;
    margin: 0 auto;
    gap: 0;
    box-shadow: 0 0 60px rgba(168, 85, 247, 0.4),
                0 8px 32px rgba(0, 0, 0, 0.5);
    border-radius: var(--borderRadiusLarge);
    overflow: hidden;
    border: 2px solid transparent;
    background: rgba(10, 10, 10, 0.6) padding-box,
                linear-gradient(
                  135deg,
                  var(--neon-purple),
                  var(--primary-500),
                  var(--accent-500),
                  var(--neon-blue)
                ) border-box;
    background-size: 300% auto;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    backdrop-filter: blur(20px) saturate(180%);
    animation: shimmer 4s linear infinite;
  }
  
  .form::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      135deg,
      var(--neon-purple),
      var(--primary-500),
      var(--accent-500),
      var(--neon-blue)
    );
    background-size: 300% auto;
    border-radius: var(--borderRadiusXL);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.6s ease;
    animation: shimmer 4s linear infinite;
  }
  
  .form:focus-within {
    box-shadow: 0 0 80px rgba(168, 85, 247, 0.7),
                0 0 120px rgba(168, 85, 247, 0.4),
                0 12px 64px rgba(0, 0, 0, 0.6);
    transform: translateY(-4px) scale(1.02);
  }
  
  .form:focus-within::before {
    opacity: 1;
    animation: pulse 2s ease-in-out infinite;
  }
  
  .form:focus-within::after {
    opacity: 1;
  }
  
  @keyframes pulse {
    0%, 100% { transform: translateY(-50%) scale(1); }
    50% { transform: translateY(-50%) scale(1.1); }
  }
  
  .form-input {
    border: none;
    border-radius: 0;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    background: transparent;
    font-weight: 600;
    font-family: 'Space Grotesk', sans-serif;
    color: var(--white);
    letter-spacing: 0.02em;
  }
  
  .form-input::placeholder {
    color: var(--grey-500);
    font-weight: 500;
  }
  
  .form-input:focus {
    box-shadow: none;
    border: none;
    outline: none;
  }
  
  .btn {
    border-radius: 0;
    padding: 0.875rem 2.5rem;
    font-weight: 800;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%);
    background-size: 200% auto;
    position: relative;
    overflow: hidden;
    border: none;
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
    margin-left: 0.75rem;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-block;
    font-size: 1.2em;
  }
  
  .btn:hover {
    background-position: right center;
    transform: none;
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
  }
  
  .btn:hover::before {
    left: 100%;
  }
  
  .btn:hover::after {
    transform: translateX(6px);
  }
`;

export default Wrapper;
