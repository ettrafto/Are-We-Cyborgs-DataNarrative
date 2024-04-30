import React from 'react';

const Interview = (()=>{
    return(
        <>
            <div className='interview-label'>I asked an 8th grader these questions.</div>
            <ul>
                <ul>
                    <div className='interview-question'>How many hours a day do you typically spend on your smartphone?</div>
                    <div className='interview-answer'>3 Hours 45 Minutes</div>
                </ul>
                <ul>
                    <div className='interview-question'>What are your three most-used apps?</div>
                    <div className='interview-answer'>
                        <ol>
                            <li>tiktok</li>
                            <li>Intagram</li>
                            <li>Spotify</li>
                        </ol>
                    </div>
                </ul>
                <ul>
                    <div className='interview-question'>Do you feel anxious or uneasy when you cannot find your phone or it’s not with you?</div>
                    <div className='interview-answer'>Yeah, I need it for communication</div>
                </ul>
                <ul>
                    <div className='interview-question'>Have you ever felt that you might be missing out on something important when not checking your phone frequently?</div>
                    <div className='interview-answer'>Yeah I definitly feel anxious about that</div>
                </ul>
                <ul>
                    <div className='interview-question'>How often do you check your phone while doing homework?</div>
                    <div className='interview-answer'>Every 5 Minutes</div>
                </ul>
                <ul>
                    <div className='interview-question'>What do you think are the positive and negative effects of smartphones on your daily life?</div>
                    <div className='interview-answer'>Positives: Communication and Entertainment</div>
                    <div className='interview-answer'>Negatives: You could get addicted and attached, become dependent</div>

                </ul>
                <ul>
                    <div className='interview-question'>How do you feel when you spend a long time away from your phone?</div>
                    <div className='interview-answer'>I feel like I need my phone, it weighs on me</div>
                </ul>

            </ul>
        </>
    );
});

export default Interview;