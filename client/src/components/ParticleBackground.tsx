import { useRef, useEffect } from "react";
import { useDeviceType } from "@/hooks/use-mobile";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const deviceType = useDeviceType();
  
  const shouldAnimate = deviceType === 'desktop';
  
  useEffect(() => {
    if (!shouldAnimate) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    setCanvasDimensions();
    
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(setCanvasDimensions, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.01;
        
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        
        if (this.x < 0 || this.x > width) {
          this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > height) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
    const fpsInterval = 1000 / fps;
    
    const animate = (timestamp: number) => {
      if (!ctx) return;
      
      const elapsed = timestamp - lastTime;
      
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
    };
  }, [shouldAnimate]);
  
  if (!shouldAnimate) return null;
  
  return (
    <canvas 
      ref={canvasRef} 
      id="particles" 
      aria-hidden="true"
      className="absolute top-0 left-0 w-full h-screen z-0 opacity-60"
    />
  );
}