import { useEffect, useState } from 'react';

interface TTSUtteranceMessage {
    text: string | number
    pronounced?: string
}

interface CharMapper {
    [k: string]: string
}

export default function Component(): JSX.Element {
    const [displayContent, setDisplayContent] = useState<string>('')

    useEffect(() => {
        triggerMessage()
    }, [])

    function triggerMessage() {
        const ttsUtteranceMessageArray = createMessageArray()
        for (const ttsUtteranceMessage of ttsUtteranceMessageArray) {
            speakAndDisplay(ttsUtteranceMessage)
        }
        
    }

    function createMessageArray(): Array<TTSUtteranceMessage> {
        const location = window.location.href === 'http://localhost:3000/' ? 'https://www.93821498723149071238470128973819037451891019237401.men' : window.location.href
        const url = new URL(location)
        const tld = url.hostname.split('.').pop()
        const domain = url.hostname.split('.').reverse()[1]
        const path = url.pathname.split('')
    
        let domainCharArray = `${domain}.|${path}`.split('')
        if (domainCharArray[domainCharArray.length - 1] === '/') domainCharArray = domainCharArray.slice(0, -1) 
        const mapper: CharMapper = { '/': 'slash', '.': 'dot' }
    
        const TTSUtteranceMessageArray = domainCharArray.map((char: string | number): TTSUtteranceMessage => {
            console.log(char)
            if (char in mapper) return { text: char, pronounced: mapper[char] }
            if (char === '|') {
                if (tld) return { text: tld }
                return { text: '', pronounced: '' } // No TLD
            }
    
            return { text: char }
        })

        const pronouncePath = path.length > 1 ? `${path}`.replace('/', '') : ''
        TTSUtteranceMessageArray.push({
            text: `${domain}.${tld}${pronouncePath}`,
            pronounced: `${domain} dot ${tld}${pronouncePath}`
        })

        return TTSUtteranceMessageArray
    }

    function speakAndDisplay(
        ttsUtteranceMessage: TTSUtteranceMessage,
    ): void {
        const ttsUtterance = new SpeechSynthesisUtterance()
        ttsUtterance.onstart = () => setDisplayContent(ttsUtteranceMessage.text.toString())
        let msg = ttsUtteranceMessage.text

        if (ttsUtteranceMessage.pronounced) msg = ttsUtteranceMessage.pronounced
        
        if (!isNaN(Number(msg))) {
            const calcPitch = 0.25 * +msg
            ttsUtterance.rate = 0.75 * +msg
            ttsUtterance.pitch = calcPitch > 2 ? 2 : calcPitch <= 0 ? 0.5 : calcPitch // Quick and dirty
        } else {
            ttsUtterance.rate = 0.8
            ttsUtterance.pitch = 0.65
        }
        
        ttsUtterance.text = msg.toString()
        window.speechSynthesis.speak(ttsUtterance)
    }
    

    return <>
        {displayContent}
    </>
}
