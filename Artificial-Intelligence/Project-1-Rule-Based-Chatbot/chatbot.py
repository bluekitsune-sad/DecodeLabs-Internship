"""DecodeLabs AI Project 1 - Rule-Based Chatbot.

A simple deterministic chatbot that recognises predefined intents and replies
with predefined responses. It does NOT use any LLM or external AI service.
"""

import re

KNOWLEDGE_BASE = {
    "how are you": "I am just a small rule-based chatbot, but I am doing great! Thanks for asking.",
    "what is your name": "I am ChatBuddy, a simple rule-based chatbot built with Python.",
    "who are you": "I am ChatBuddy, a rule-based chatbot that matches your words to predefined responses.",
    "what can you do": "I can greet you, answer basic questions, help you get started, and talk with you until you say goodbye.",
    "thank you": "You are very welcome! Is there anything else I can help you with?",
    "thanks": "You are welcome! Happy to help.",
    "help": "You can type 'hello' to say hi, ask 'what can you do', or ask 'how are you'. Type 'exit', 'quit', 'bye' or 'goodbye' to end the chat.",
    "hello": "Hi there! Welcome to ChatBuddy. How can I help you today?",
    "hi": "Hey! Nice to see you. What shall we talk about?",
    "hey": "Hey there! How is your day going?",
    "good morning": "Good morning! I hope you have a wonderful day.",
    "good night": "Good night! Sleep well.",
}

EXIT_COMMANDS = ("exit", "quit", "bye", "goodbye")

FALLBACK_RESPONSE = "I do not understand that yet. Try typing 'help' to see what I can do."


def sanitize_input(raw: str) -> str:
    """Normalize user input: lowercase and strip surrounding whitespace."""
    return raw.lower().strip()


def is_exit_command(user_input: str) -> bool:
    """Return True when the normalized input matches an exit command."""
    return user_input in EXIT_COMMANDS


def get_reply(user_input: str) -> str:
    """Return the matched predefined response, or the fallback response.

    Single-word keywords are matched on word boundaries (so 'hi' does not
    match inside 'something'). Multi-word phrases are matched as substrings.
    """
    for keyword, reply in KNOWLEDGE_BASE.items():
        if matches_keyword(keyword, user_input):
            return reply
    return FALLBACK_RESPONSE


def matches_keyword(keyword: str, user_input: str) -> bool:
    """Check whether a knowledge-base keyword appears in the user input."""
    if " " in keyword:
        return keyword in user_input
    return bool(re.search(rf"\b{re.escape(keyword)}\b", user_input))


def run_chatbot() -> None:
    """Run the continuous chat loop until the user explicitly exits."""
    print("=" * 60)
    print("ChatBuddy - Rule-Based Chatbot")
    print("Type 'exit', 'quit', 'bye' or 'goodbye' to end the chat.")
    print("=" * 60)

    while True:
        raw = input("You: ")
        user_input = sanitize_input(raw)

        if is_exit_command(user_input):
            print("Bot: Goodbye! Have a great day.")
            break

        reply = get_reply(user_input)
        print(f"Bot: {reply}")


if __name__ == "__main__":
    run_chatbot()