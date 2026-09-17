/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#02040a',
          900: '#050814',
          850: '#090e1f',
          800: '#0f162e',
          700: '#172244',
          600: '#22325e',
        },
        neon: {
          cyan: '#00f2fe',
          teal: '#00e5a3',
          emerald: '#10b981',
          blue: '#3b82f6',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          fuchsia: '#d946ef',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 35px -5px rgba(0, 242, 254, 0.35)',
        'neon-indigo': '0 0 40px -5px rgba(99, 102, 241, 0.35)',
        'neon-teal': '0 0 35px -5px rgba(0, 229, 163, 0.35)',
        'neon-amber': '0 0 35px -5px rgba(245, 158, 11, 0.35)',
        'card-prism': '0 10px 40px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'mesh-float': 'meshFloat 18s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'floatAnim 6s ease-in-out infinite',
        'float-delayed': 'floatAnim 7s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-beam': 'borderBeam 4s linear infinite',
      },
      keyframes: {
        meshFloat: {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1) rotate(8deg)' },
          '66%': { transform: 'translate(-20px, 40px) scale(0.95) rotate(-6deg)' },
          '100%': { transform: 'translate(10px, -20px) scale(1.05) rotate(4deg)' },
        },
        floatAnim: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        borderBeam: {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        }
      }
    },
  },
  plugins: [],
}
