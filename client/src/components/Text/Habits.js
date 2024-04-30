import React from 'react';

const Habit = (()=>{
    return(
        <>
            <div className='habit-heading'>Here are some ways to combat this</div>
            <ul>
                <li className='habit-title'>Scheduled Phone-Free Time:</li>
                <li className='habit'>Encourage setting specific times during the day when smartphones are put away, especially during meals, family time, or before bed.</li>
                <li className='habit-title'>Mindful Usage Monitoring:</li>
                <li className='habit'>Suggest regular checks on screen time through built-in apps to raise awareness of usage patterns and encourage more conscious engagement with devices.</li>
                <li className='habit-title'>Physical Activity Breaks:</li>
                <li className='habit'>Recommend replacing some screen time with physical activities to reduce sedentary behavior and improve physical health.</li>
                <li className='habit-title'>Notification Management:</li>
                <li className='habit'>Advise configuring phone settings to minimize unnecessary notifications that can cause distractions and stress.</li>
                <li className='habit-title'>Productive Use:</li>
                <li className='habit'>Promote the use of smartphones for educational purposes and productivity enhancement rather than just entertainment and social media browsing.</li>
                <li className='habit-title'>Digital Detox:</li>
                <li className='habit'>Propose regular challenges, such as one-day or weekend-long digital detoxes to encourage less reliance on digital devices.</li>

            </ul>
        </>
    );
});

export default Habit;