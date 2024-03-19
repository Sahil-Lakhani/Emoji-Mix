# Emoji-Mix


## What is Emoji-Mix?
Welcome to Emoji-Mix, a dynamic platform designed for exploring various combinations of emojis and discovering new ones based on your input. Below, you'll find detailed documentation outlining the functionality of our API.

## How to run Emoji-Mix?
```shell 
git clone https://github.com/fdjdalksf/Emoji-Mix.git
cd Emoji-Mix
npm i 
node index.js
```

## Valid Routes for Emoji-Mix
- Method : `POST` 
	- Endpoint: `/api/getPossibleEmojisForCombination`
	- Description: Receive an array of emojis that can be combined with the provided emoji.
	- `body`:
		```json
		{
			"emoji": "🐙"
		}
		```
	
	- `response`:
	```json
		{
			"possibleEmojis": [
        					"☕",
        					"🌈",
        					"🌍",
        					"🌛",
        					"🌜",
        					"🌟",
        					"🌪️",
        					"🌭",
        					"🌲",
        					"🌶️",
        					"🌼",
        					"🍍",
        					"🍽️",
        					"🎂",
        					"🎃",
        					"🎈",
        					"🎊",
        					"🥲",
        					"🥸",
        					"🔥",
        					"⭐",
        					"🕳️",
        					"🦠",
        					"👁️",
        					"💐",
        					"⛄",
        					"☁️",
        					"🙈",
        					"🦁",
        					"🦥",
        					"🐙",
        					"🕷️",
        					"🥑",
        					"🧀",
        					"🧁",
        					"👑",
        					"💎",
        					"📰",
        					"🔮"
    ]
		}

- Method : `POST` 
	- Endpoint: `/api/findValidEmojiCombo`
	- Description: Retrieves a URL of an image representing the combination of two emojis.

	- `body`:
		```json
		{
			"leftEmoji": "🐙",
  			"rightEmoji": "🌍"
		}
		```
	- `response`: 
		```json
		{"https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f419/u1f419_u1f30d.png"
		}
		```
	- `error`:
		- `code: 404, message: {error: "....."}`