import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {

    const [theme, setTheme] = useState('')

    useEffect(() => {
        if(localStorage.getItem("theme") == "dark") {
            document.body.classList.add("dark")
            setTheme("dark")
        }
    }, [])


    const handleSwitch = () => {
        if (theme == "") {
            setTheme("dark")
            document.body.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.body.classList.remove("dark")
            localStorage.setItem("theme", "")
            setTheme('')
        }
    }

    return (
        <div className='absolute top-14 z-[80] bg-slate-900 dark:bg-slate-200 right-3 w-[40px] h-[25px] ease-in-out duration-1000 cursor-pointer  rounded-full' onClick={handleSwitch} >
            <span className='dark:float-right float-left  ease-in-out duration-500'>{!theme ? '🌞' : '🌑'}</span>
        </div>
    )
}

export default ThemeSwitcher
