# The Emotion 300 Project: An Emotion Classification Messaging App w/ P300 Speller

https://user-images.githubusercontent.com/69090449/129691013-6144dbd2-fd52-4590-812b-3717bce19e68.mp4

## TLDR. OF SOLUTION.

Due to the fact that text messaging cannot accurately convey tone, emotion, facial expressions, gestures, oral speech, or face-to-face conversation, many messages tend to be misinterpreted or misunderstood. The real meaning of your message gets lost through the medium. All too often, relationships go sour due to miscommunication via text messages. People are hurt by the people around them just because a lack of understanding of a persons intention through Social Medial. To keep this from happening, the solution proposed is using Emotivs product to classify specific emotions, and as such the text message will demonstrate a certain colour. Knowing that many people with disabilities struggle to have their voices heard, an emotion classification social media app would be crucial to allow for a seamless conversation, especially with the integrated p300 speller in the web app to allow those who have a physical disability to communicate hands free.

With almost 4 billion people active on social media platforms it is hard to argue that Social Media has not had an important impact on society in the 21st century. Though it has impacted billions through its existence, it failed to efficiently provide a positive impact to the disabled community. Furthermore, many disabled individuals, both physically and mentally impaired, may lack the ability to accurately portray the emotion that they want to give to their friends, family, and loved ones. With Emotion300, we provide a fast and intuitive method for the disabled to interact with social media and additionally show emotions through their messages.

## THE PROJECT BREAKDOWN.

1. **Data Streaming** - Using the Cortex API wrapper provided in the Emotiv Github, we were able to stream in power band data from a synthetic to a Node JS server. We used [socket.io](http://socket.io) to provide a stream of communication between users in a conversation room as well as to create a method of grabbing data from an active Cortex API session. 
2. **Web Application** - Seamless, Intuitive Designed Chatroom to Speak to Others over Text Message
3. **Emotion Classification** - Through our Web App, The User is Able to Have Their Feelings and Emotion (Valence and Arousal) Heard
4. **Emotion Exhibition -** After the Classification of the Emotion, It is Exhibited Through the Message Based off of the Colour.
5. **P300 Speller** - Although given the Opportunity to Use a Keyboard, the User has the ability to use a Speller for a Hands Free experience.

Now, there is a lot that goes into this but ultimately, this would lead to fixing the problem with text messages and allow for accurately conveying emotion, expressions, and connotation. This will permit people to very easily interpret and understand the intention behind someones message. 

Emotions are intrinsically related to the way that individuals interact with each other as well as machines. A human being can understand the emotional state of another human being and behave in the best manner to improve the communication in a certain situation. This is because emotions can be recognized through words, voice intonation, facial expressions and body language. In contrast, machines cannot understand the feelings of an individual.

In this context, affective computing aims to improve the communication among individuals and machines by recognizing human emotions and thus making that interaction easier, usable and effective.

## PROJECT RECREATION.

### Cortex API Initialization

Firstly, to use Emotion300, you must register yourself with an EmotivID, which will allow gaining access to a suite of free applications to assist you in fully utilizing your Emotiv device. From these applications, you must download the Emotiv APP 

[EMOTIV App](https://emotiv.gitbook.io/cortex-manual/)

Next, you will want to create a new Cortex App, where you will receive a unique user id and user secret. Keep these, you won't be able to access Emotion300 without them. To learn more about how to complete this process, refer to the documentation here:

[Getting Started](https://emotiv.gitbook.io/cortex-api/)

### Setting Up Emotion300

[GitHub - anmutechsupport/EmotivateHackathonEmotionP300](https://github.com/anmutechsupport/EmotivateHackathonEmotionP300)

### Step 1.

```bash
cd nodeSocket
npm install
npm run devStart
```

Once you've cloned the repo, enter the nodeSocket directory; this is where the main [socket.io](http://socket.io) server runs. Install all the dependencies using npm install, and the package.json should have a script shortcut for running the server.js file. 

### Step 2.

```bash
cd PyProcessing 
pip install -r requirements.txt
python flaskserve.py
```

Next, you should set up the flask server which handles all signal classification. All the dependencies used can be found and installed through the requirements.txt file. Please ensure that you are using the latest stable version of python. 

### Step 3.

[https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

Lastly, to host the application, use the Visual Studio Code Live Server plugin or any other local server hosting plugin in your preferable IDE/visual editor. The emotidetection/index.html is the page that you want to host using the local server. 

After all 3 steps, you should now have Emotion300 fully functional!

# COLAB LINKS.

## P300 Algorithm

[Google Colaboratory](https://colab.research.google.com/drive/1zgdP8xpEj1k7jKsD6i2Woz4YUKTpFKnv#scrollTo=AhTL4FXp6rFO)

## Emotion Detection Algorithm

[Google Colaboratory](https://colab.research.google.com/drive/1y3M_dv__mjf2x9HnpgyBjFEjFKCWtmCI#scrollTo=hka-rLhQeXmA)

# THE EMOTION ILLITERACY PROBLEM.

We’ve all been there, struggling to convey our emotions over email (or texts or tweets), and struggling to interpret the emotions of others. The difficulty of expressive writing isn’t new, of course, but what’s relatively recent is the overwhelming amount of electronic exchanges we have with people whose personalities we only know digitally. Without the benefit of vocal inflections or physical gestures, it can be tough to tell:

- e-sarcastic from e-serious
- e-cold from e-formal
- e-busy from e-angry

So we’re bound to make some wrong assumptions on both ends, and as behavioural scientists have found over the past few years, we definitely do. The evidence has given us a better sense of why the internet causes so many breakdowns and what we can do about it.

**Message Senders**

Let’s begin with message senders. A big problem people have when conveying digital emotions is often that they fail to appreciate there’s a problem at all. In one experiment from a 2005 study, test participants emailed 10 statements to a recipient. Some statements were serious, some sarcastic. These senders believed the recipient would correctly identify the intended emotion behind most of the messages. In fact, the recipients only identified seriousness or sarcasm 56% of the time, which isn’t much better than chance 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f210e92-ce6b-4f43-99c6-3af61fc1c5a1/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f210e92-ce6b-4f43-99c6-3af61fc1c5a1/Untitled.png)

Here’s the key twist: When the same messages were transmitted through a voice recording, the recipient interpreted the emotion correctly 73% of the time, just about what senders expected. Vocal tones captured the emotional nuance that email couldn’t. The researchers believe that when people type out a sarcastic line, they hear it in their heads as sarcastic, and thus fail to appreciate that others won’t hear it the same way. If comprehending human communication consisted merely of translating sentences and syntax into thoughts and ideas, there would be no room for misunderstanding.

**Message Recipient**

 It’s well-documented among psychologists that when people lack information, they tend to rely on stereotypes to fill in the gaps. In the case of emails and other digital messages, the missing information tends to be a full appreciation of the sender’s personality. That’s why it’s usually clear when a friend or loved one is joking in a note or text, but not always clear that a remote colleague is doing the same.

Take another experiment from a different 2005 study. This time, test participants rated the intelligence of a stranger based on answers to questions received via email. Since they never met the message sender, recipients had to rely on a (fictional) photo and brief bio. In some cases, the sender was a well-dressed Asian with a high GPA and a double major in physics and philosophy. In others, it was a white kid in a Metallica T-shirt with a middling GPA in hotel management who’d been a high school football player.

Email misinterpretation tends to comes in two forms: neutral or negative. Test participants rated the Asian’s email answers as more intelligent than Metallica dude’s. But when the exact same answers were given to other test participants over the phone–with voice filling in some of the character gaps–the two strangers were rated as equally smart. So when we receive an email from someone we don’t know too well, we often revert to personality stereotypes, and in doing so raise the chances of emotional misinterpretation.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5961c48-3424-4a84-8631-b41fb042b086/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5961c48-3424-4a84-8631-b41fb042b086/Untitled.png)

Digital miscommunication wouldn’t be much of a problem if we always adopted the most optimistic or generous view of an ambiguous email or text. But that’s not what we do. 

The misinterpretation tends to comes in two forms: neutral or negative. So we dull positive notes (largely because the lack of emotional cues makes us less engaged with the message), and we assume the worst in questionable ones.

This digital slide toward neutrality or negativity came through in a study from the University of Alabama. Test participants were paired up and instructed simply to converse and get to know each other. Some interacted face to face; others via instant message. The face-to-face interaction took more reported effort–you had to actually acknowledge and deal with another living being–but also resulted in more positive ratings of the partner’s character, and an overall more enjoyable experience, ***because emotion was conveyed***

And that is what is important, we cannot expect to move back ten years and have more face to face communication. However, what we can do is attempt to express emotion through text messages. Now, before, emoticons, text messaging was rather boring, you were not able to demonstrate how exactly you were feeling. 

It was emojis that really allowed for higher traction when it came to messaging. Why? Because of the slight ability to express emotion. However, that is not to say that emojis have been fully successful — people continue to misinterpret texts, leading to an ending of relationship, misunderstanding a crucial email etc.

