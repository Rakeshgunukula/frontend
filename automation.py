import speech_recognition as sr
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import pyttsx3

r = sr.Recognizer()
engine = pyttsx3.init()

def speak(text):
    engine.say(text)
    engine.runAndWait()

driver = webdriver.Chrome()
driver.get("https://frontend-blond-ten-4yhr83pw4k.vercel.app/")
time.sleep(1)

speak("Automation started")

while True:
    try:
        with sr.Microphone() as source:
            print("Speak product name or say exit")
            r.adjust_for_ambient_noise(source)
            audio = r.listen(source, timeout=5, phrase_time_limit=5)

        command = r.recognize_google(audio, language="te-IN")
        command = command.lower().strip()
        print("You said:", command)

        if command == "exit":
            speak("Closing automation")
            driver.quit()
            break

        search_box = driver.find_element(By.ID, "productInput")
        search_box.clear()
        search_box.send_keys(command)
        search_box.send_keys(Keys.ENTER)

        speak(f"Searching for {command}")

    except sr.WaitTimeoutError:
        print("No speech detected")
        continue

    except sr.UnknownValueError:
        print("Could not understand")
        continue

    except Exception as e:
        print("Error:", e)
        continue