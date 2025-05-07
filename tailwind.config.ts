import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				pastel: {
					pink: {
						50: '#FAE7FB',
						100: '#F7D4F8',
						200: '#F3AADD',
						300: '#EE85D3',
						400: '#E967C8',
						500: '#E34ABE',
						600: '#D52FAE',
						700: '#B01C8E',
						800: '#8C166F',
						900: '#67104F',
					},
					purple: {
						50: '#F3EAFC',
						100: '#E8D5F9',
						200: '#D8BBF5',
						300: '#C8A8E9',
						400: '#B790DF',
						500: '#A678D5',
						600: '#9560CB',
						700: '#7A42AE',
						800: '#60338C',
						900: '#46256A',
					},
					blue: {
						50: '#EDF1FC',
						100: '#DCE4F9',
						200: '#C3C7F3',
						300: '#A6AAE9',
						400: '#898BDF',
						500: '#6D6CD5',
						600: '#514DCB',
						700: '#3F3AA7',
						800: '#312E84',
						900: '#232161',
					},
					peach: {
						50: '#FFF2F0',
						100: '#FFE5E1',
						200: '#F5BCBA',
						300: '#FF8C85',
						400: '#FF6D64',
						500: '#FF4E43',
						600: '#FF2F22',
						700: '#E6180A',
						800: '#B41308',
						900: '#820E05',
					},
					beige: {
						50: '#F9F6F2',
						100: '#F3EDDF',
						200: '#F3DCDC',
						300: '#E6CDB6',
						400: '#DDBD9C',
						500: '#D4AE83',
						600: '#CA9E69',
						700: '#B6864B',
						800: '#8E693B',
						900: '#664C2A',
					},
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			backgroundImage: {
				'gradient-pastel': 'linear-gradient(135deg, #FAE7FB 0%, #F3DCDC 25%, #F5BCBA 50%, #E3AADD 75%, #C8A8E9 90%, #C3C7F3 100%)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
