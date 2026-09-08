# Project 1 — Rule-Based AI Chatbot

## Project Title

**ChatBuddy — Rule-Based AI Chatbot**

## Description

ChatBuddy is a simple, deterministic chatbot written in Python. It accepts text
input from the user, normalizes it, matches it against a predefined knowledge
base of intents, and replies with a predefined response. It keeps chatting until
the user explicitly exits.

This is a rule-based chatbot. It does **not** use machine learning, an LLM, or
any external AI service.

## Objective

Demonstrate the foundational AI concepts of a rule-based agent:

- Control flow and continuous interaction
- Decision-making from predefined rules
- Input handling and sanitization
- Deterministic logic (same input -> same output)

## Features

- Continuous chat loop
- Input normalization (lowercase, trimmed whitespace)
- Dictionary-based knowledge base with a deterministic fallback
- 8+ built-in intents
- Multiple exit commands
- No external dependencies
- Graceful handling of unknown input

## Technologies Used

- Python 3
- Standard library only (`input`, `print`, dictionaries, strings)

## How It Works

1. The program starts and prints a short greeting.
2. It loops while waiting for user input.
3. Each input is normalized (`lower().strip()`).
4. The input is checked against the exit commands first.
5. If it is not an exit command, the input is matched against the keywords in
   the knowledge base dictionary.
6. The first matching keyword determines the reply.
7. If nothing matches, a deterministic fallback response is returned.
8. The loop repeats until an exit command is typed.

## Supported Intents

| Intent            | Example inputs                    | Usage                         |
| ----------------- | --------------------------------- | ----------------------------- |
| Greeting          | `hello`, `hi`, `hey`              | Friendly greeting             |
| Time of day       | `good morning`, `good night`      | Day-based greeting            |
| How are you       | `how are you`                     | Small talk                    |
| Identity/name     | `what is your name`, `who are you`| Bot introduces itself         |
| Capabilities/help | `what can you do`, `help`         | Bot explains itself           |
| Thanks            | `thank you`, `thanks`             | Acknowledges gratitude        |

## Exit Commands

The following words end the chat:

```text
exit
quit
bye
goodbye
```

## How to Run

Make sure Python 3 is installed, then run:

```bash
python chatbot.py
```

No installation or dependencies are required.

## Example Interaction

```text
============================================================
ChatBuddy - Rule-Based Chatbot
Type 'exit', 'quit', 'bye' or 'goodbye' to end the chat.
============================================================
You: hello
Bot: Hi there! Welcome to ChatBuddy. How can I help you today?
You: WHAT IS YOUR NAME?
Bot: I am ChatBuddy, a simple rule-based chatbot built with Python.
You: something random
Bot: I do not understand that yet. Try typing 'help' to see what I can do.
You: exit
Bot: Goodbye! Have a great day.
```

Note how `hello` and `WHAT IS YOUR NAME?` are matched correctly even though the
casing differs — input is normalized before matching.

## Project Structure

```text
Project-1-Rule-Based-Chatbot/
│
├── chatbot.py
├── README.md
└── .gitignore
```

## Future Improvements

- Add more intents and a larger knowledge base
- Support simple multi-word pattern matching (e.g. regex for "I am <name>")
- Add session persistence and conversation history
- Extend to a hybrid design with an LLM fallback for unknown inputs