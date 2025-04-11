"use client"

import { useState, useEffect, useRef } from "react"

const commands = {
	help: `Available commands:
- help: Show this help message
- about: About me
- skills: My technical skills
- projects: View my projects
- contact: How to reach me
- clear: Clear the terminal`,
	about: `Hello! I am a sophomore computer engineering student at UCI interested in computer architecture and lower level computing!
More specifically I am interested in FPGA development, hardware accelerators, and machine learning.`,
	skills: `Technical Skills:
- Programming languages: Python, C/C++, Verilog, HLS, JavaScript
- Hardware: STM32, PCB Design, SMD and THT soldering
- Other: Git, Linux/Unix`,
	projects: `My Projects:
1. Micromouse - Autonomouse maze-solving competition robot 'mouse'
2. Profilometer - Open-source tool for UC Davis' Pavement Research Center
3. Weather App - Using OpenWeather API
4. Personal Portfolio - A terminal-themed website (you're looking at it!)

Type 'contact' to see how you can reach out about these projects.`,
	contact: `Get in touch:
- Email: adamhw@uci.edu
- GitHub: github.com/adamhwu
- LinkedIn: linkedin.com/in/adamhw`,
	clear: "clear",
	"": "",
}

const TerminalContent = () => {
	const [history, setHistory] = useState([
		{ text: "Welcome to my terminal portfolio! Type 'help' to see available commands.", type: "system" },
	])
	const [currentCommand, setCurrentCommand] = useState("")
	const [typingText, setTypingText] = useState("")
	const [typingIndex, setTypingIndex] = useState(0)
	const [showCursor, setShowCursor] = useState(true)
	const [isTyping, setIsTyping] = useState(true)
	const terminalEndRef = useRef(null)

	// Initial typing animation
	useEffect(() => {
		const initialText = "echo 'Hello, visitor! Welcome to my terminal portfolio.'"

		if (typingIndex < initialText.length) {
			const timeout = setTimeout(
				() => {
					setTypingText(initialText.substring(0, typingIndex + 1))
					setTypingIndex(typingIndex + 1)
				},
				20 + Math.random() * 30,
			)

			return () => clearTimeout(timeout)
		} else if (isTyping) {
			// When typing is complete, execute the command
			setTimeout(() => {
				setHistory((prev) => [
					...prev,
					{ text: typingText, type: "command" },
					{ text: "Hello, visitor! Welcome to my terminal portfolio.", type: "output" },
				])
				setTypingText("")
				setTypingIndex(0)
				setIsTyping(false)
			}, 500)
		}
	}, [typingIndex, isTyping, typingText])

	// Blinking cursor effect
	useEffect(() => {
		const cursorInterval = setInterval(() => {
			setShowCursor((prev) => !prev)
		}, 500)

		return () => clearInterval(cursorInterval)
	}, [])

	// Scroll to bottom when history changes
	//useEffect(() => {
	//	terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
	//}, [history])
	//
	const handleKeyDown = (e) => {
		if (isTyping) return

		if (e.key === "Enter") {
			const trimmedCommand = currentCommand.trim().toLowerCase()

			// Add command to history
			setHistory((prev) => [...prev, { text: currentCommand, type: "command" }])

			// Process command
			if (trimmedCommand === "clear") {
				setHistory([])
			}
			else if (trimmedCommand === "./site") {
				window.location.href = '/Traditional'; // go to /dashboard
			}
			else {
				const output =
					commands[trimmedCommand] || `Command not found: ${trimmedCommand}. Type 'help' for available commands.`
				setHistory((prev) => [...prev, { text: output, type: "output" }])
			}

			// Reset current command
			setCurrentCommand("")
		}
	}

	return (
		<div className="terminal-content">
			{history.map((item, index) => (
				<div key={index} className={`terminal-line ${item.type}`}>
					{item.type === "command" && <span className="prompt">$ </span>}
					{item.text}
				</div>
			))}

			{isTyping ? (
				<div className="terminal-line command">
					<span className="prompt">$ </span>
					{typingText}
				</div>
			) : (
				<div className="terminal-input-line">
					<span className="prompt">$ </span>
					<input
						type="text"
						className="terminal-input"
						value={currentCommand}
						onChange={(e) => setCurrentCommand(e.target.value)}
						onKeyDown={handleKeyDown}
						autoFocus
					/>
				</div>
			)}

			<div ref={terminalEndRef} />

			<style jsx>{`
        .terminal-content {
          font-family: 'Fira Code', monospace;
          line-height: 1.6;
        }
        
        .terminal-line {
          margin-bottom: 8px;
          white-space: pre-wrap;
          word-break: break-word;
        }
        
        .system {
          color: #58a6ff;
        }
        
        .command {
          color: #e6edf3;
        }
        
        .output {
          color: #c9d1d9;
        }
        
        .prompt {
          color: #7ee787;
          margin-right: 8px;
        }
        
        .cursor {
          display: inline-block;
          width: 8px;
          height: 16px;
          background-color: #58a6ff;
          animation: blink 1s step-end infinite;
          vertical-align: middle;
        }
        
        .terminal-input-line {
          display: flex;
          align-items: center;
        }
        
        .terminal-input {
          background: transparent;
          border: none;
          color: #e6edf3;
          font-family: 'Fira Code', monospace;
          font-size: 14px;
          outline: none;
          flex: 1;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
		</div>
	)
}

export default TerminalContent


