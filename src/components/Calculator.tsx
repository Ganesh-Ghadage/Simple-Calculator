import { evaluate } from "mathjs"
import React, { useEffect, useState } from "react"

function Calculator() {
    const [expression, setExpression] = useState<string>('')
    const [prevExpression, setPrevExpression] = useState<string>('')

 
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
                        
            if (event.code.includes('Digit') || event.code.includes('Numpad')) {
                if (event.key === 'Enter') {
                    handleTotal()
                    return;
                }
                setExpression((prev) => prev + event.key);
            }
            if(event.code === 'Backspace'){
                handleClear()
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };

    }, [expression]);

    const handleKey = (e: React.MouseEvent):void => {
        const keyTarget = e.target as HTMLElement
        setExpression(expression.concat(keyTarget.innerText))
    }

    const handleTotal = (): void => {
        const total = evaluate(expression)
        setPrevExpression(expression)
        setExpression(total.toString())
    }

    const handleAC = ():void => {
        setExpression('')
    }

    const handleClear = ():void => {
        setExpression(expression.slice(0, - 1))
    }
 
  return (
    <div className='w-[40%] mx-auto bg-slate-900 p-4'>
        <div className="bg-white p-1 mb-4">
            <div className='w-full p-2 bg-slate-600 h-20 text-2xl border-white border-2'>
                <p className="text-left text-lg">{prevExpression ? prevExpression : '0'}</p>
                <p className="text-right text-2xl font-bold">{expression ? expression : '0'}</p>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-2">
            <p className="w-full h-10 bg-neutral-600 text-2xl font-bold col-span-1 col-start-2" onClick={handleClear}>⌫</p>
            <p className="w-full h-10 bg-neutral-600 text-2xl font-bold col-span-1" onClick={handleAC}>AC</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
                <div className="grid grid-cols-3 gap-2 w-full">
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>7</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>8</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>9</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>4</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>5</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>6</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>1</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>2</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>3</p>
                    <p className="w-full h-10"></p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>.</p>
                    <p className="w-full h-10 bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>0</p>
                </div>
            </div>
            <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-2">
                    <p className="w-full bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>+</p>
                    <p className="w-full bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>-</p>
                    <p className="w-full bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>/</p>
                    <p className="w-full bg-neutral-600 text-2xl font-bold" onClick={(e) => handleKey(e)}>*</p>
                </div>
                <div>
                    <p className="w-full h-full bg-neutral-600 text-2xl font-bold" onClick={handleTotal}>=</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Calculator